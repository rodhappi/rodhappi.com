---
name: session-memory
description: >
  Manage session state persistence, checkpoints, and cross-session memory.
  Activate when saving or restoring work state, creating checkpoints before
  risky operations, or recovering context after compaction. Also activate
  when the context-manager skill recommends a checkpoint at 75% utilization.
---

# Session Memory

Manage checkpoints and session state to preserve work across compactions and sessions.

## When to Activate

- User requests a checkpoint or state save
- Before risky operations (destructive edits, large refactors, branch switches)
- After context compaction to assess what was preserved
- When starting work that builds on a previous session
- When the context-manager recommends a checkpoint (at 75% utilization)
- Before ending a session with significant in-progress work

## Checkpoint Operations

### Create Checkpoint

Write a checkpoint file to `.claude/memory/checkpoints/{timestamp}-{name}.json`.

1. Gather current state: what task is in progress, key decisions made, files modified, pending work
2. Generate timestamp in format `YYYYMMDDTHHMMSSZ` (UTC)
3. Use the user-provided name, or auto-generate from the current task description
4. Write JSON following the Checkpoint Schema below
5. Confirm to the user: checkpoint name, timestamp, file path

### List Checkpoints

Read `.claude/memory/checkpoints/` directory and list all checkpoint files sorted by timestamp (newest first). For each, show:
- Timestamp (human-readable)
- Name
- Trigger (manual, auto-compact, abort)
- Current task summary (first 80 characters)

### Describe Checkpoint

Read a specific checkpoint JSON file and present its full contents in readable format:
- When it was created and why (trigger)
- What task was in progress
- What decisions had been made
- Which files were modified
- What work remained

**Note:** Full state restore (reapplying a checkpoint) will be available through the `/rewind` command in Layer 4. For now, describing the checkpoint gives the user enough context to manually resume.

## Session Summary Management

The session summary at `.claude/memory/session-summary.md` is the bridge between sessions. It is:
- **Written** by this skill (manual save) and by the pre-compact hook (automatic save)
- **Read** by the session-start hook (automatic load on startup)

### Save Session Summary

Overwrite `.claude/memory/session-summary.md` with the current state. This is a complete snapshot, not an append.

### Load Session Summary

Read `.claude/memory/session-summary.md` and present its contents. Useful after compaction to review what was preserved.

### Update Session Summary

Modify specific sections of the session summary without rewriting the entire file. Useful for incremental updates during long sessions.

## Checkpoint JSON Schema

```json
{
  "version": "1.0",
  "timestamp": "2026-02-18T14:30:00Z",
  "name": "descriptive-name",
  "trigger": "manual | auto-compact | abort",
  "session_id": "from-hook-or-generated",
  "state": {
    "current_task": "Description of what was being worked on",
    "decisions": [
      "Decision 1 with rationale",
      "Decision 2 with rationale"
    ],
    "files_modified": [
      "path/to/file1.md",
      "path/to/file2.json"
    ],
    "pending_work": "Description of what remains to be done"
  }
}
```

## Session Summary Format

```markdown
# Session Summary

**Last updated:** {ISO timestamp}
**Session:** {session identifier}

## Current Task
{What was being worked on}

## Key Decisions
- {Decision 1}
- {Decision 2}

## Files Modified
- {file path 1}
- {file path 2}

## Pending Work
{What remains to be done}

## Notes
{Any additional context for the next session}
```

## L1 Integration

- **Token cost of checkpoint creation:** ~500-1,000 tokens to gather state and write the file. Cheap operation, safe to do at any utilization level.
- **Token cost of session summary injection:** The session-start hook makes the summary path available. Reading it adds ~200-500 tokens depending on content length. Within the budget of a small rule file.
- **Context-budget rule connection:** The rule's 75% threshold says "suggest a checkpoint." This skill is what creates that checkpoint. The rule is the trigger; this skill is the action.
- **Context-budget rule connection:** The rule's 85% threshold says "save state immediately." This skill provides the save mechanism.

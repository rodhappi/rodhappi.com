---
name: checkpoint
description: >
  Create a named checkpoint to save current work state. Wraps the session-memory
  skill's checkpoint creation. Use before risky operations or when you want to
  save a restore point.
---

# /checkpoint -- Create Named Save Point

Create a checkpoint to save the current work state for future recovery.

## When to Activate

- User says "checkpoint", "save checkpoint", "save state"
- Before risky operations (destructive edits, large refactors)
- When the context-budget rule recommends a checkpoint at 75% utilization
- Before ending a session with significant in-progress work

## Procedure

### Step 1: Gather State

Collect current state information:
- What task is in progress
- Key decisions made in this session
- Files modified since last checkpoint
- Pending work remaining

### Step 2: Create Checkpoint

Using the `session-memory` skill's "Create Checkpoint" operation:

1. Accept an optional name from the user (e.g., `/checkpoint before-refactor`)
2. If no name provided, auto-generate from the current task description
3. Write the checkpoint JSON to `.claude/memory/checkpoints/{timestamp}-{name}.json`
4. Follow the checkpoint schema defined in the `session-memory` skill

### Step 3: Confirm

Report to the user:
- Checkpoint name and timestamp
- File path for reference
- Summary of what was captured

## Integration

- Uses the `session-memory` skill for all checkpoint operations
- The `pre-compact-save` hook creates automatic checkpoints; this command creates manual ones
- Checkpoints can be listed and described via the `session-memory` skill
- Restore from checkpoint via `/rewind`

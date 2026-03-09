---
name: rewind
description: >
  Restore work state from a previous checkpoint. Lists available checkpoints,
  describes the selected one, and guides manual state restoration including
  showing file changes since the checkpoint.
---

# /rewind -- Restore Previous State

List checkpoints and guide restoration of a previous work state.

## When to Activate

- User says "rewind", "restore checkpoint", "go back"
- After a failed operation when recovery is needed
- When the `error-recovery` skill recommends checkpoint restore

## Procedure

### Step 1: List Checkpoints

Using the `session-memory` skill's "List Checkpoints" operation:
- Show all available checkpoints sorted by timestamp (newest first)
- For each: timestamp, name, trigger type, task summary

### Step 2: Select Checkpoint

Ask the user which checkpoint to restore. If only one exists, offer it directly.

### Step 3: Describe Checkpoint

Using the `session-memory` skill's "Describe Checkpoint" operation:
- Show the full checkpoint state: task, decisions, files modified, pending work
- Show the timestamp so the user knows what "version" of their work this represents

### Step 4: Assess File Changes

Show what has changed since the checkpoint was created:
- Use `git diff` to show file modifications
- Use `git status` to show new/deleted files
- Help the user understand what would be "lost" by rewinding

### Step 5: Guide Restoration

Since automated state restore is complex (files may have changed, new files created, etc.), guide the user through manual restoration:

1. **Review the checkpoint state** -- what was being worked on, what was decided
2. **Revert files if needed** -- `git checkout -- {file}` for specific files, or `git stash` for all changes
3. **Resume from checkpoint** -- use the pending work description as a starting point
4. **Update session summary** -- note the rewind for future reference

### Step 6: Confirm

Report to the user:
- Which checkpoint was restored
- What files were reverted (if any)
- What the current state is
- Next steps to continue from the restored state

## Integration

- Uses the `session-memory` skill for checkpoint listing and description
- Uses git commands for file change assessment and reversion
- The `error-recovery` skill may invoke this command as part of Strategy 3 (Checkpoint Restore)

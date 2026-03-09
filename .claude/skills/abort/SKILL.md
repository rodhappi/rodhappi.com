---
name: abort
description: >
  Gracefully terminate the current workflow. Saves an abort checkpoint,
  documents completed and incomplete work, and stops the workflow cleanly.
  Wraps the error-recovery skill's abort protocol.
---

# /abort -- Graceful Workflow Termination

Stop the current workflow cleanly with state preservation.

## When to Activate

- User says "abort", "stop workflow", "cancel"
- When a workflow reaches an unrecoverable state
- When the cost of continuing exceeds the cost of restarting
- When the `error-recovery` skill recommends graceful abort

## Procedure

### Step 1: Save Abort Checkpoint

Using the `error-recovery` skill's Abort Protocol and the `session-memory` skill:

1. Create a checkpoint with trigger `"abort"`
2. Include in the checkpoint:
   - What was being attempted
   - Where it failed or why it was aborted
   - All error messages encountered (if failure-triggered)

### Step 2: Document Completed Work

List everything that was successfully completed:
- Files created or modified
- Tests that pass
- Decisions that were made and remain valid
- Phases or tasks that are done

### Step 3: Document Incomplete Work

List everything that remains:
- Tasks not yet started
- Tasks partially completed (with description of what is done vs. remaining)
- Known issues that triggered the abort

### Step 4: Report to User

Present a clear summary:
- **Completed:** What was accomplished
- **Incomplete:** What remains
- **Checkpoint:** File path for future recovery
- **Next steps:** Recommendations for resuming (fix the issue, restart from checkpoint, try different approach)

### Step 5: Stop

Do not continue the workflow after abort. The user must explicitly restart or rewind.

## Integration

- Uses the `error-recovery` skill's Abort Protocol for the structured abort process
- Uses the `session-memory` skill for checkpoint creation
- The abort checkpoint can be restored via `/rewind`
- Updates the session summary so the next session knows about the abort

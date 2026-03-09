---
name: error-recovery
description: >
  Handle failures, plan rollback strategies, and guide retry attempts.
  Activate when operations fail unexpectedly, when work needs to be undone,
  or when a workflow reaches an unrecoverable state. Provides structured
  failure analysis and recovery strategies ordered by severity.
---

# Error Recovery

Analyze failures and guide recovery through structured strategies.

## When to Activate

- An operation or command fails unexpectedly
- Work needs to be undone or rolled back
- A workflow reaches a point where it cannot continue
- Multiple retry attempts have failed
- User asks for help recovering from an error
- An orchestration pattern encounters a failure (pipeline phase error, agent failure)

## Failure Analysis Protocol

When a failure occurs, work through these steps in order:

1. **Identify what failed.** Determine the component type:
   - File operation (read, write, edit)
   - Shell command or tool invocation
   - Agent execution (spawned sub-process)
   - Hook execution (event-triggered script)
   - Workflow step (part of a larger sequence)

2. **Determine failure scope.** How much is affected?
   - **Single operation:** One file or command failed, everything else is fine
   - **Task-level:** The current task cannot proceed, but the session is healthy
   - **Session-level:** The session state may be corrupted or context is exhausted

3. **Check for checkpoints.** Read `.claude/memory/checkpoints/` directory. If a recent checkpoint exists, note it as a recovery option.

4. **Assess failure type.**
   - **Transient:** Network timeout, file lock, temporary resource unavailability. Retry may succeed.
   - **Permanent:** Wrong approach, missing dependency, logic error. Different strategy needed.

## Recovery Strategies

Apply strategies in order of increasing severity. Use the lightest recovery that works.

### Strategy 1: Retry

**For:** Transient failures (network, timing, temporary locks).

- Wait briefly, then retry the same operation
- Maximum 2 retries before escalating to the next strategy
- If the error message changes between retries, stop retrying -- the failure is not transient

### Strategy 2: Partial Rollback

**For:** A single operation failed within a larger task. Completed work is valid.

- Undo only the failed operation's effects
- Use `git diff` and `git checkout -- {file}` to revert specific file changes
- Preserve all completed, successful work
- Attempt the failed operation with a different approach

### Strategy 3: Checkpoint Restore

**For:** Multiple operations failed or the task state is unclear.

- List available checkpoints from `.claude/memory/checkpoints/`
- Describe the most recent relevant checkpoint (use session-memory skill)
- Guide the user through resuming from that checkpoint
- Note: Full automated restore is available through `/rewind` in Layer 4

### Strategy 4: Graceful Abort

**For:** Recovery is not possible or the cost of recovery exceeds restarting.

- Execute the Abort Protocol below
- Do not leave the session in an inconsistent state

## Abort Protocol

When a workflow must be terminated:

1. **Save a checkpoint** with trigger `"abort"` using the session-memory skill. Include:
   - What was being attempted
   - Where it failed and why
   - All error messages encountered

2. **Document completed work:**
   - Files successfully created or modified
   - Tests that pass
   - Decisions that were made and remain valid

3. **Document incomplete work:**
   - What was in progress when the failure occurred
   - What steps remain
   - Any partial state that needs cleanup

4. **Report to user** with a clear summary:
   - What was accomplished before the failure
   - What the failure was
   - The checkpoint location for future recovery
   - Recommended next steps

This protocol is what the future `/abort` command (Layer 4) will invoke.

## L2 Integration

When orchestration patterns encounter failures, this skill provides the recovery strategy:

- **Fan-Out failure:** One agent in a parallel set fails. The fan-out-coordinator continues with remaining agents and flags the failure. This skill helps assess whether the missing result is critical or if synthesis can proceed without it.
- **Pipeline failure:** A phase in a sequential pipeline fails. The pipeline-orchestrator stops at the failed phase. This skill helps determine whether to retry the failed phase, skip it, or abort the pipeline.
- **Iterative failure:** A produce-validate cycle stalls (validator keeps finding issues, producer cannot fix them). The iterative-retriever hits max iterations. This skill helps decide whether the best-so-far result is usable or if a different approach is needed.

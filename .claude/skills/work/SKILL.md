---
name: work
description: >
  Execute implementation from an approved plan and task breakdown. Picks tasks
  one at a time (WIP=1), implements test-first per Article II, validates
  continuously, and marks tasks complete. Requires an approved plan.
---

# /work -- Execute Implementation

Implement the feature by working through the task breakdown.

## Workflow Position

```
/specify → /clarify → /plan → /approve → [/work] → /review → /compound
```

**Gate in:** Plan approved (via `/approve`)
**Gate out:** All tests passing, all tasks complete

## When to Activate

- After plan is approved via `/approve`
- User says "work", "start working", "implement"
- To resume implementation after a break

## Procedure

### Step 1: Verify Gate In

- Check that `specs/{feature-name}/plan.md` exists
- Check that `specs/{feature-name}/tasks.md` exists
- Verify plan has been approved

### Step 2: Task Loop (WIP = 1)

For each task in `tasks.md`, in dependency order:

1. **Select next task:** Pick the first non-blocked, pending task
2. **Mark in progress:** Update task status in `tasks.md`
3. **Write test first (Article II):**
   - Write the test that validates the task's requirement
   - Run the test -- it should fail (red)
4. **Implement:**
   - Write the minimum code to make the test pass
   - Follow existing codebase patterns
5. **Validate:**
   - Run the test -- it should pass (green)
   - Run the full test suite -- no regressions
6. **Mark complete:** Update task status in `tasks.md`
7. **Repeat** for the next task

### Step 3: Continuous Validation

During implementation:
- After each task, run the full test suite
- If a test fails that was previously passing, fix the regression before continuing
- If a task cannot be completed, document the blocker and move to the next unblocked task
- Periodically run `cross-validate` skill to check spec-to-code consistency

### Step 4: Checkpoint on Risk

Before risky operations (large refactors, dependency changes):
- Create a checkpoint via `session-memory` skill
- Document what is about to change and why

### Step 5: Gate Check

When all tasks are complete:
- Run the full test suite one final time
- **All pass:** Inform user they can proceed with `/review`
- **Any fail:** List failing tests and continue fixing

## Constitutional Compliance

- **Article II (Test-First):** Every task starts with writing a failing test
- **Article IV (Integration-First):** Integration tests use real dependencies (mocks only for excepted external APIs)

## Suggested Next Step

- **If all tasks complete and all tests passing:** Run `/review` to start the multi-agent code review.
- **If tests are failing:** Fix the failing tests before proceeding. Do not start review with broken tests.
- **If context is above 75%:** Run `/checkpoint` to save progress, then continue `/work` in a new session.

## L1 Integration

Implementation is context-intensive. Create checkpoints at 75% utilization (per context-budget rule). If context reaches 85%, save state and suggest compaction before continuing.

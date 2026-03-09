---
name: human-checkpoint
description: >
  Define and manage human-in-the-loop approval points in workflows. Activate at
  Plan→Work transitions (user must approve plan before implementation) and at
  Review→Complete (user reviews findings). Presents clear approval summaries
  and records decisions.
---

# Human Checkpoint

Manage HITL (human-in-the-loop) approval points where a human must review and approve before the workflow continues.

## When to Activate

- **Plan → Work:** User must approve the implementation plan before coding begins
- **Review → Complete:** User must review all findings and approve disposition
- When any workflow step has been flagged as requiring human approval
- When the `quality-gates` rule blocks progress pending human decision

## Approval Points

### Plan Approval (before `/work`)

Present to the user:

1. **Plan summary:** Goal, approach, number of tasks
2. **Constitutional compliance:** Result of `constitutional-check` (all articles pass/fail)
3. **Risk assessment:** From the plan
4. **Estimated scope:** Number of files, components affected
5. **Decision needed:** Approve plan / Request changes / Reject

### Review Approval (after `/review`)

Present to the user:

1. **Review summary:** Number of findings by severity (P1/P2/P3/P4)
2. **P1 findings:** Each P1 finding with details (these must be resolved, not waived)
3. **P2-P4 findings:** Summary with option to waive with justification
4. **Decision needed:** Approve (all P1 resolved) / Request fixes / Reject

## Approval Protocol

1. **Present** the approval summary clearly and concisely
2. **Wait** for explicit user response -- do not assume approval
3. **Record** the decision:
   - What was approved/rejected
   - Timestamp
   - Any conditions or caveats noted by the user
4. **Proceed or halt** based on the decision:
   - Approved → continue to next phase
   - Request changes → return to previous phase with feedback
   - Rejected → stop workflow, save checkpoint via `session-memory` skill

## Integration

- Uses `/approve` command for explicit approval actions
- Uses `session-memory` skill to save checkpoint if workflow is halted
- Uses `error-recovery` skill if rejection requires rollback

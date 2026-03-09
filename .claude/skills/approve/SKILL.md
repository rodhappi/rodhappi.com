---
name: approve
description: >
  Approve a pending human-in-the-loop checkpoint. Used at plan approval
  (before /work) and review approval (before completion). Records the
  approval decision and unblocks the next workflow phase.
---

# /approve -- Approve Pending Checkpoint

Record human approval and unblock the next workflow phase.

## Workflow Position

Used at HITL checkpoints:
- After `/plan` → before `/work` (plan approval)
- After `/review` → before completion (review approval)

## When to Activate

- User says "approve", "looks good", "proceed"
- At any HITL checkpoint requiring human sign-off

## Procedure

### Step 1: Identify What Needs Approval

Check the current workflow state:
- Is there a plan awaiting approval? → Plan approval
- Is there a review awaiting approval? → Review approval
- Neither? → Inform user there is nothing pending approval

### Step 2: Present Summary

Show the user what they are approving:

**For plan approval:**
- Plan goal and approach summary
- Task count and estimated scope
- Constitutional compliance status
- Risk assessment highlights

**For review approval:**
- Finding summary by severity
- Confirm all P1 findings are resolved
- P2-P4 findings with disposition (fixed, deferred, waived)

### Step 3: Record Decision

Record the approval:
- What was approved (plan/review)
- Timestamp
- Any conditions or notes from the user

### Step 4: Unblock Next Phase

- **Plan approved:** Workflow can proceed to `/work`
- **Review approved:** Workflow proceeds to completion (or `/archive` for brownfield, then `/compound`)

## Notes

- Approval is explicit -- silence or ambiguity is not approval
- The user can also reject or request changes instead of approving
- If rejecting: document the reason and return to the previous phase

## Suggested Next Step

- **If plan was approved:** Run `/work` to begin implementation.
- **If review was approved (greenfield):** Run `/compound` to capture session learnings.
- **If review was approved (brownfield):** Run `/archive` to merge changes to source specs, then `/compound`.
- **If the user rejected:** Return to the previous phase (`/plan` or `/review`) to address feedback.

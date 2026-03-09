---
name: plan
description: >
  Create an implementation plan and task breakdown from an approved specification.
  Spawns research agents for context, validates constitutional compliance, and
  produces plan.md and tasks.md. Requires an approved spec with no ambiguity markers.
---

# /plan -- Create Implementation Plan

Produce an implementation plan and task breakdown from a specification.

## Workflow Position

```
/specify → /clarify → [/plan] → /approve → /work → /review → /compound
```

**Gate in:** Spec approved, no `[NEEDS CLARIFICATION]` markers
**Gate out:** Constitutional compliance (Articles I, III)

## When to Activate

- After a specification is approved (no clarification markers)
- User says "plan", "create a plan", "plan the implementation"

## Procedure

### Step 1: Verify Gate In

Read `specs/{feature-name}/spec.md`:
- Check for `[NEEDS CLARIFICATION]` markers -- if any exist, direct user to `/clarify` first
- Verify the spec exists and is substantive

### Step 2: Research (Fan-Out)

Spawn research agents in parallel:
- **`framework-docs-researcher`** -- look up relevant framework/library documentation
- **`repo-analyst`** -- analyze codebase for patterns relevant to implementation
- **`git-history-analyzer`** -- understand how similar features were implemented before

### Step 3: Draft Plan

Using `templates/plan-template.md`, create `specs/{feature-name}/plan.md`:

1. Reference the spec (path and version)
2. State the implementation goal
3. Describe the technical approach
4. Document constitutional compliance (Articles I, III)
5. List components affected (new and modified)
6. List dependencies
7. Define test strategy (unit, integration, acceptance)
8. Assess risks with mitigations
9. Define rollback plan

### Step 4: Create Task Breakdown

Using `templates/tasks-template.md`, create `specs/{feature-name}/tasks.md`:

1. Break implementation into phases
2. Create individual tasks with:
   - Spec requirement traceability (FR-N)
   - Description of what to implement
   - Test to write first (Article II)
   - Expected files to create/modify
   - Dependencies on other tasks
3. Order tasks with dependencies

### Step 5: Constitutional Gate

Run the `constitutional-check` skill:
- **Article I (Spec-First):** Plan references approved spec ✓
- **Article III (Simplicity):** Plan uses ≤3 modules, no premature abstractions

If any article fails, revise the plan before presenting.

### Step 6: Present for Approval

Present the plan summary to the user via the `human-checkpoint` skill:
- Goal, approach, task count
- Constitutional compliance results
- Risk assessment
- User must `/approve` before proceeding to `/work`

## Output

- `specs/{feature-name}/plan.md` -- implementation plan
- `specs/{feature-name}/tasks.md` -- task breakdown

## Suggested Next Step

- **If constitutional gate passed:** Run `/approve` to review and approve the plan before implementation begins.
- **If constitutional gate failed:** Revise the plan to address the violations, then re-run the constitutional gate.

## L1 Integration

Research phase spawns 3 agents (~3,000-6,000 tokens of results). Plan and tasks creation is in-context work. Total context impact is moderate. If context is above 60%, consider compacting before starting.

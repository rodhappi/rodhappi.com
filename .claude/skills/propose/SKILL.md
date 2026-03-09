---
name: propose
description: >
  Create a change proposal for modifying an existing system. Entry point for
  brownfield workflows. Analyzes the current system, assesses impact, and
  produces a proposal with delta specifications.
---

# /propose -- Create Change Proposal

Entry point for the brownfield workflow. Produces a change proposal with impact analysis.

## Workflow Position

```
[/propose] → /clarify → /plan → /approve → /work → /review → /archive → /compound
```

**Gate in:** None (entry point for brownfield)
**Gate out:** Proposal document complete with impact analysis

## When to Activate

- User wants to modify an existing system or feature
- User says "propose", "create a proposal", "change proposal"
- Starting a brownfield workflow

## Procedure

### Step 1: Understand the Change

1. Get the change description from the user
2. Identify the existing system/feature being modified
3. Locate the source specification (if one exists at `specs/{feature}/spec.md`)

### Step 2: Analysis (Fan-Out)

Spawn research agents in parallel:
- **`repo-analyst`** -- analyze the affected codebase area
- **`git-history-analyzer`** -- understand how the area has evolved
- **`knowledge-searcher`** -- check for relevant past decisions and patterns

### Step 3: Create Change Folder

Create the change directory: `changes/{change-name}/`

### Step 4: Draft Proposal

Using `templates/proposal-template.md`, create `changes/{change-name}/proposal.md`:

1. Describe the proposed change and motivation
2. Define the problem with the current system
3. Describe the approach
4. Produce impact analysis:
   - Which components are affected
   - Breaking changes (if any)
   - Risk assessment
5. Define delta specifications:
   - **Added:** New requirements
   - **Modified:** Changed requirements (show original → new)
   - **Removed:** Deprecated requirements (with rationale)
6. Document alternatives considered

### Step 5: Impact Analysis

Create `changes/{change-name}/impact.md`:
- List all files that will be modified
- Identify downstream dependencies
- Estimate scope of testing needed
- Flag any migration requirements

### Step 6: Present

Present the proposal to the user. They can:
- Approve and proceed to `/clarify` (if ambiguities) or `/plan`
- Request modifications to the proposal
- Reject the approach

## Output

- `changes/{change-name}/proposal.md` -- change proposal
- `changes/{change-name}/impact.md` -- impact analysis

## Suggested Next Step

- **If the proposal has ambiguities:** Run `/clarify` to resolve them.
- **If the proposal is clear and complete:** Run `/plan` to create the implementation plan.
- **If the user requests modifications:** Revise the proposal and re-present.

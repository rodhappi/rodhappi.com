---
name: specify
description: >
  Create a feature specification through structured research and quality validation.
  Entry point for greenfield workflows. Spawns research agents, drafts the spec
  using the spec template, then runs specification agents to validate clarity,
  consistency, completeness, and testability.
---

# /specify -- Create Feature Specification

Entry point for the greenfield workflow. Produces a validated specification document.

## Workflow Position

```
[/specify] → /clarify → /plan → /approve → /work → /review → /compound
```

**Gate in:** None (entry point)
**Gate out:** No `[NEEDS CLARIFICATION]` markers in the spec

## When to Activate

- User wants to build a new feature from scratch
- User says "specify", "create a spec", "write a specification"
- Starting a greenfield workflow

## Procedure

### Phase 1: Understand the Feature

1. Get the feature name and description from the user
2. Create the spec directory: `specs/{feature-name}/`
3. Ask clarifying questions about scope, users, and constraints

### Phase 2: Research (Fan-Out)

Spawn research agents in parallel:
- **`repo-analyst`** -- analyze the existing codebase for relevant patterns and conventions
- **`best-practices-researcher`** -- find implementation patterns in the existing code
- **`knowledge-searcher`** -- check the knowledge base for prior art and past decisions

Synthesize research results to inform the specification.

### Phase 3: Draft Specification

Using `templates/spec-template.md` as the structure, create `specs/{feature-name}/spec.md`:

1. Write the problem statement based on user input
2. Draft user stories with acceptance criteria
3. Define functional requirements (FR-N format)
4. Define non-functional requirements (performance, security, accessibility)
5. List edge cases and error states
6. List dependencies and constraints
7. Explicitly define what is out of scope
8. Mark any unresolved questions with `[NEEDS CLARIFICATION]`

### Phase 4: Validate (Fan-Out)

Spawn specification agents in parallel:
- **`clarity-checker`** -- flag ambiguous language
- **`consistency-validator`** -- find contradictions
- **`completeness-auditor`** -- check coverage against standard checklist
- **`testability-reviewer`** -- verify all requirements are testable

### Phase 5: Integrate Feedback

Review agent findings and update the spec:
- Fix clarity issues (remove ambiguity)
- Resolve consistency conflicts
- Fill completeness gaps
- Make untestable requirements testable
- Mark remaining unresolved items with `[NEEDS CLARIFICATION]`

### Phase 6: Gate Check

Check for `[NEEDS CLARIFICATION]` markers:
- **None found:** Spec is ready. Inform user they can proceed with `/plan`
- **Markers found:** Inform user to run `/clarify` to resolve them before planning

## Output

- `specs/{feature-name}/spec.md` -- the specification document

## Suggested Next Step

- **If no `[NEEDS CLARIFICATION]` markers remain:** Run `/plan` to create the implementation plan.
- **If markers remain:** Run `/clarify` to resolve ambiguities before planning.

## L1 Integration

This command spawns up to 7 agents (3 research + 4 specification). Each runs in an isolated context. Results re-enter the parent context at ~1,000-2,000 tokens each. Total context impact: ~7,000-14,000 tokens for agent results. Check context utilization before Phase 2 if above 50%.

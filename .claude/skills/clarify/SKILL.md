---
name: clarify
description: >
  Resolve ambiguities and [NEEDS CLARIFICATION] markers in a specification.
  Present each unresolved question to the user with options and rationale,
  then update the spec with decisions. Used between /specify and /plan.
---

# /clarify -- Resolve Specification Ambiguities

Resolve `[NEEDS CLARIFICATION]` markers in a specification through user interaction.

## Workflow Position

```
/specify → [/clarify] → /plan → /approve → /work → /review → /compound
```

**Gate in:** Spec has `[NEEDS CLARIFICATION]` markers
**Gate out:** All markers resolved (none remain)

## When to Activate

- After `/specify` produces a spec with `[NEEDS CLARIFICATION]` markers
- When reviewing a spec and finding unresolved questions
- User says "clarify", "resolve ambiguities"

## Procedure

### Step 1: Load the Specification

Read `specs/{feature-name}/spec.md` and extract all `[NEEDS CLARIFICATION]` markers.

### Step 2: Present Each Marker

For each marker, present to the user:

1. **The question:** What needs to be decided
2. **Context:** Where in the spec this appears and why it matters
3. **Options:** 2-4 concrete options with trade-offs for each
4. **Recommendation:** Which option to prefer and why (if there is a clear preference)

### Step 3: Record Decisions

For each resolved marker:
1. Remove the `[NEEDS CLARIFICATION]` marker
2. Replace with the user's decision
3. Update any affected sections (acceptance criteria, requirements, etc.)

### Step 4: Verify

After all markers are resolved:
1. Scan the spec one final time for any remaining markers
2. Check that the resolutions are internally consistent
3. If new clarifications arose from decisions, add new markers and repeat

### Step 5: Gate Check

- **No markers remain:** Spec is ready. Inform user they can proceed with `/plan`
- **Markers remain:** Continue resolving or note which are blocked on external information

## Output

- Updated `specs/{feature-name}/spec.md` with all clarifications resolved

## Suggested Next Step

- **If no `[NEEDS CLARIFICATION]` markers remain:** Run `/plan` to create the implementation plan.
- **If markers remain but are blocked on external info:** Run `/checkpoint` to save progress. Resume `/clarify` when information is available.

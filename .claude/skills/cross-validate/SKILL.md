---
name: cross-validate
description: >
  Ensure consistency across related artifacts: spec, plan, tasks, tests, and code.
  Activate at phase transitions or when artifacts are updated to catch gaps where
  one artifact references something missing from another.
---

# Cross-Validate

Check that related artifacts are consistent with each other across workflow phases.

## When to Activate

- At phase transitions (spec → plan, plan → work, work → review)
- When a specification is updated after a plan was created
- When reviewing implementation completeness
- When the orchestrator needs artifact consistency verification

## Validation Pairs

### Spec → Plan
- Every functional requirement (FR-N) in the spec has a corresponding task in the plan
- Plan does not contain work outside the spec's scope
- Plan references the correct spec version

### Spec → Tasks
- Every acceptance criterion in the spec maps to at least one task
- Tasks cover edge cases and error states from the spec
- No orphan tasks (tasks without spec traceability)

### Plan → Tests
- Every task in the plan has a corresponding test or test case
- Test strategy in the plan matches actual test files
- Integration test requirements (Article IV) are reflected

### Spec → Code
- Every functional requirement is implemented
- Out-of-scope items from the spec are not implemented
- Non-functional requirements (performance, security, accessibility) are addressed

## Cross-Validation Protocol

1. **Identify artifact pair** to validate based on the current phase
2. **Read both artifacts** and extract their key elements (requirements, tasks, tests, etc.)
3. **Map elements** from source to target -- which source elements have matches?
4. **Report gaps:**
   - **Missing in target:** Source element has no corresponding target element
   - **Extra in target:** Target element has no corresponding source element
   - **Mismatched:** Elements exist in both but are inconsistent

## Output Format

```markdown
## Cross-Validation Report

**Source:** {artifact 1 path}
**Target:** {artifact 2 path}

### Coverage: {X of Y source elements mapped}

### Missing in Target
- {Source element} -- not found in {target}

### Extra in Target
- {Target element} -- not traced to {source}

### Mismatches
- {Element}: source says {X}, target says {Y}

### Assessment
{One paragraph: are these artifacts consistent enough to proceed?}
```

## L2 Integration

This skill can be used within pipeline orchestration patterns where one phase's output feeds into the next phase's validation.

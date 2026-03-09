# Implementation Plan: {Feature Name}

## Spec Reference
`specs/{feature}/spec.md` -- version {X.Y}

## Goal
{One sentence describing the implementation objective.}

## Approach
{2-3 paragraphs describing the technical approach. What patterns will be used? How does this integrate with existing code?}

## Constitutional Compliance

| Article | Status | Notes |
|---------|--------|-------|
| I. Spec-First | Pass | References spec at {path} |
| II. Test-First | Pass | Test strategy defined below |
| III. Simplicity | Pass | {Number} modules, no premature abstraction |

## Architecture

### Components Affected
| Component | Change Type | Description |
|-----------|-------------|-------------|
| {component} | New / Modified | {What changes} |

### Dependencies
- {Dependency 1}: {Why needed, version}
- {Dependency 2}: {Why needed, version}

## Task Breakdown
See `specs/{feature}/tasks.md` for the full task list.

**Summary:** {N} tasks across {M} phases.

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | {count} | {Phase description} |
| 2 | {count} | {Phase description} |

## Test Strategy

### Unit Tests
- {What will be unit tested}

### Integration Tests
- {What will be integration tested, with real dependencies per Article IV}

### Acceptance Tests
- {How acceptance criteria from spec will be verified}

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| {Risk 1} | High/Medium/Low | High/Medium/Low | {Strategy} |

## Rollback Plan
{How to undo this change if it fails. What to revert, what data to clean up.}

## Metadata
- **Created:** {date}
- **Author:** {name}
- **Plan path:** `specs/{feature}/plan.md`

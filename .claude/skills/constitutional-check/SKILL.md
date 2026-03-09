---
name: constitutional-check
description: >
  Validate artifacts against constitutional articles at quality gates. Activate
  at Plan→Work transitions, during /review, or when constitutional compliance
  is questioned. Checks relevant articles and returns pass/fail per article.
---

# Constitutional Check

Validate that an artifact (spec, plan, code, review) complies with relevant constitutional articles.

## When to Activate

- At the Plan → Work quality gate (checks Articles I, III)
- During `/review` (checks all articles via review agents)
- When a user or workflow questions constitutional compliance
- When the `quality-gates` rule requires constitutional validation

## Validation Protocol

### 1. Determine Applicable Articles

Based on the artifact type and current phase:

| Phase | Articles to Check |
|-------|-------------------|
| `/plan` | I (Spec-First), III (Simplicity) |
| `/work` | II (Test-First), IV (Integration-First) |
| `/review` | All (I through X) |

### 2. Check Each Article

For each applicable article, evaluate:

**Article I (Spec-First):**
- Does the artifact reference an approved specification?
- Can every code file trace to a spec requirement?
- Is there a spec at `specs/{feature}/spec.md`?

**Article II (Test-First):**
- Do test files exist for new code?
- Were tests committed before or with the implementation?

**Article III (Simplicity):**
- Does the plan involve 3 or fewer projects/modules?
- Are there abstractions without 3+ use cases?
- Is there over-engineering or premature optimization?

**Article IV (Integration-First):**
- Do integration tests use real dependencies?
- Are mocks used only for explicitly excepted external services?

**Articles V-X:** Checked by specialized review agents during `/review`:
- V (Security) → `security-sentinel`
- VI (Accessibility) → `accessibility-guardian`
- VII (Performance) → `performance-oracle`
- VIII (Documentation) → checked in review synthesis
- IX (Code Review) → enforced by workflow (review phase exists)
- X (Observability) → checked in review synthesis

### 3. Report Results

For each article checked:
- **Pass:** Article satisfied, with brief evidence
- **Fail:** Article violated, with specific violation and remediation steps
- **N/A:** Article not applicable to this artifact type

### 4. Determine Gate Outcome

- **All Pass/N/A:** Gate passes, proceed to next phase
- **Any Fail:** Gate fails, list all failures, do not proceed

## Article Reference

Full article definitions with rationale, enforcement, exceptions: `appendix/constitutional-articles.md`

## L1 Integration

This skill is lightweight (~500-1000 tokens when loaded). It reads existing artifacts and checks them against known criteria -- no external lookups or large file reads required.

# Dismiss False P1s with Contextual Analysis

## Category
Pattern

## Summary
When multiple review agents flag P1 findings, verify each against the actual code path and runtime context before treating them as blockers. Agents analyze in isolation and can miss guards, defaults, or layout math that make a finding unreachable or incorrect.

## Context
During the Escritos Card Layout review, two agents flagged P1 findings that were incorrect:

1. **Accessibility agent** flagged card tap targets as < 44px, calculating only padding (16px x 2 = 32px). In reality, the card contains a 64px thumbnail + padding = 96px minimum height — well above the threshold.

2. **Data integrity agent** flagged `meta.date.getMonth()` as a null crash risk. In reality, the `defaults()` function always provides a valid `Date` — first from `fs.statSync().mtime`, with a fallback to `new Date()`. The null path is unreachable.

Both were dismissed after contextual analysis by the orchestrator.

## Solution

### Verification Checklist for Agent P1 Findings
1. **Trace the data flow** — Does the flagged value actually reach the dangerous code path? Check for guards, defaults, and fallbacks.
2. **Calculate, don't estimate** — For dimensional concerns (tap targets, overflow), compute the actual rendered size including all contributing elements (padding + content + margin).
3. **Check scope** — Is the concern pre-existing (present before the current change) or newly introduced? Pre-existing issues are P2 at most for the current review.
4. **Test the claim** — If the agent says "X crashes when Y", try to construct input Y and verify whether it actually reaches the code path.

### Key Points
- Agents analyze code in isolation — they don't trace execution paths across functions
- The orchestrator's job is to apply contextual knowledge the agents lack
- Dismissing a false P1 requires documenting WHY it's false, not just overriding it
- When in doubt, keep the P1 and fix it — false negatives are costlier than false positives

## Tags
code-review, agents, p1-triage, false-positives, orchestration

## Metadata
- Created: 2026-03-02
- Source: Escritos Card Layout review — 2 false P1s dismissed after contextual verification
- Verified: Yes

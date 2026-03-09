# ADR-003: Plan-as-Spec for Informal Changes

## Category
Decision

## Status
Accepted

## Context
The AI-Assisted Development Framework requires a specification before implementation (Article I, Spec-First). However, for well-understood changes like a homepage redesign matching a reference site, the user provided a detailed implementation plan that contained all the elements of a spec: context, files to modify, detailed changes, and verification steps. Running `/specify` would have been redundant.

## Decision
A structured implementation plan can serve as an informal spec when it contains:
1. **Context** — what exists now and what the target state is
2. **Scope** — explicit list of files to modify and files not modified
3. **Detailed changes** — what to add, remove, and change in each file
4. **Verification steps** — how to confirm the changes work

This does not replace `/specify` for ambiguous or complex features. It applies when the requirements are well-understood and the user has already done the design thinking.

## Consequences
- **Positive:** Faster execution for clear, well-scoped changes. No redundant ceremony.
- **Negative:** No formal spec artifact in `specs/` for future reference. No automated validation (clarity, consistency, completeness, testability checks that `/specify` runs).
- **Mitigation:** The plan itself can be retrofitted into a spec if needed. The `/compound` step still captures learnings.

## Tags
workflow, spec-first, pragmatism, article-i

## Metadata
- Created: 2026-02-27
- Source: Homepage redesign session — discussion about skipping /specify
- Verified: Yes

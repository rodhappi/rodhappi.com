# Implementation Plan: Escritos Card Layout

## Spec Reference
`specs/escritos-card-layout/spec.md` -- version 1.0

## Goal
Replace the single featured post row in Escritos with a card layout showing thumbnails, dates, titles, and reading time for all posts from the current month.

## Approach

The implementation modifies two files: `build.js` and `css/style.css`. No template changes are needed — `templates/index.html` already uses `{{featured_section}}`, and the new card HTML will be injected through that same variable.

In `build.js`, three new functions are added: `calculateReadingTime()` for word-count-based reading time, `formatDateCard()` for the "DD MMM, YYYY" uppercase Spanish format, and month-based filtering logic that replaces the current `featured: true` selection. The frontmatter parser gains a `thumbnail` field. The featured section HTML generation switches from a single `.post-row` to multiple `.post-card` elements — one per current-month post. The archive section keeps its existing `.post-row` format but now receives all non-current-month posts instead of non-featured posts.

In `css/style.css`, mobile-first `.post-card` styles are added after the existing `.post-row` block (around line 660). Base styles target mobile (64px thumbnails, 1rem title), with tablet overrides in the existing `@media (min-width: 768px)` block. This follows the mobile-first pattern established in the recent CSS restructure.

## Constitutional Compliance

| Article | Status | Notes |
|---------|--------|-------|
| I. Spec-First | Pass | References validated spec at `specs/escritos-card-layout/spec.md` |
| II. Test-First | N/A | No test framework currently — verification via build output and manual check |
| III. Simplicity | Pass | 2 files modified, 3 small utility functions, no abstractions |

## Architecture

### Components Affected
| Component | Change Type | Description |
|-----------|-------------|-------------|
| `build.js` | Modified | Add `calculateReadingTime()`, `formatDateCard()`, `thumbnail` field parsing, month filtering, card HTML generation |
| `css/style.css` | Modified | Add ~25 lines of `.post-card` styles (base + responsive) |
| `content/*.md` | Modified | Add optional `thumbnail` frontmatter field to posts |

### Dependencies
- None. Zero external dependencies. All changes use vanilla JS and CSS.

## Task Breakdown
See `specs/escritos-card-layout/tasks.md` for the full task list.

**Summary:** 5 tasks across 2 phases.

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 4 | Build logic: thumbnail parsing, reading time, date format, month filtering + card HTML |
| 2 | 1 | CSS: post card styles (base + responsive) |

## Test Strategy

### Unit Tests
- No test framework. Functions can be verified via `node -e` if needed:
  - `calculateReadingTime("word ".repeat(200))` → 1
  - `formatDateCard(new Date(2026, 1, 26))` → "26 FEB, 2026"

### Integration Tests
- `node build.js` succeeds with no errors
- Generated `index.html` contains `.post-card` elements (not `.post-row`) in Escritos
- Generated `index.html` contains `.post-row` elements in Archivo

### Acceptance Tests
- Visual verification per spec Section 9 (8 verification steps)

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| No current-month posts (all 3 posts are Feb 2026, build is Mar 2026) | Medium | High | Escritos renders empty per spec. Add a test post dated March 2026, or verify empty state works correctly. |
| Thumbnail path XSS | Low | Low | `meta.thumbnail` is HTML-escaped like other frontmatter fields |
| Breaking Archivo layout | Medium | Low | Archivo HTML generation unchanged — only the post filtering logic changes |

## Rollback Plan
Revert changes to `build.js` and `css/style.css`. The template and content files are unaffected by rollback. Run `node build.js` to regenerate.

## Metadata
- **Created:** 2026-03-02
- **Plan path:** `specs/escritos-card-layout/plan.md`

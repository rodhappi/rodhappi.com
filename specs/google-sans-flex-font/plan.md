# Implementation Plan: Google Sans Flex as Default UI Font

## Spec Reference
`specs/google-sans-flex-font/spec.md` -- version 1.0

## Goal
Switch the site's base font from Merriweather to Google Sans Flex for all UI/chrome text, while preserving Merriweather for editorial content and the identity name.

## Approach
This is a CSS-only change with one template update. The approach is:

1. Add a `--font-sans` CSS custom property pointing to Google Sans Flex with sans-serif fallback.
2. Change the `body` font-family from `var(--font-serif)` to `var(--font-sans)`.
3. Explicitly set `font-family: var(--font-serif)` on the elements that must keep Merriweather: `.post-title`, `.post-content`, `.identity-name`, and `.post-card-title`.
4. Add the Google Sans Flex font link to `post.html` (it's already loaded in `index.html`).

The `.identity-line` already uses Google Sans Flex directly — its `font-family: 'Google Sans Flex', sans-serif` declaration becomes redundant once the body defaults to it, but we'll keep it for explicitness. The `.site-name` currently sets `font-family: var(--font-serif)` — since it's not content, it should switch to the new sans default; we'll remove its explicit serif declaration. The `.archive-toggle` also explicitly sets `var(--font-serif)` — same treatment.

## Constitutional Compliance

| Article | Status | Notes |
|---------|--------|-------|
| I. Spec-First | Pass | References spec at `specs/google-sans-flex-font/spec.md` |
| II. Test-First | Pass | Visual verification — no test framework available (noted in CLAUDE.md) |
| III. Simplicity | Pass | 2 files modified (CSS + template), no new modules or abstractions |

## Architecture

### Components Affected
| Component | Change Type | Description |
|-----------|-------------|-------------|
| `css/style.css` | Modified | Add `--font-sans` variable, change body font, add serif overrides for content elements |
| `templates/post.html` | Modified | Add Google Sans Flex to font loading link |

### Dependencies
- Google Fonts CDN: existing dependency, no version change

## Task Breakdown
See `specs/google-sans-flex-font/tasks.md` for the full task list.

**Summary:** 3 tasks across 2 phases.

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 2 | CSS changes: add variable + switch body font + add serif overrides |
| 2 | 1 | Template: add font link to post.html |

## Test Strategy

### Unit Tests
- N/A (no test framework; noted as constraint in CLAUDE.md)

### Integration Tests
- N/A

### Acceptance Tests
- Visual verification: open homepage, confirm nav/dates/labels are sans-serif
- Visual verification: open a post, confirm title and body are serif
- Visual verification: confirm `.identity-name` is serif on homepage
- Visual verification: confirm post card titles are serif on homepage
- Build check: `node build.js` produces successful output

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Content headings inherit sans-serif instead of serif | Medium | Low | `.post-content` sets serif, headings inside inherit it |
| `.site-name` loses its serif styling | Low | Low | Intentional — it's UI chrome, not content |
| Font flash on post pages (new font load) | Low | Medium | `font-display: swap` already in Google Fonts URL |

## Rollback Plan
Revert the 2 file changes (`css/style.css` and `templates/post.html`). No data changes, no build script changes. Single `git revert` if committed.

## Metadata
- **Created:** 2026-03-11
- **Author:** rodhappi
- **Plan path:** `specs/google-sans-flex-font/plan.md`

# Implementation Plan: Mobile-First Responsive Website

**Spec:** `specs/mobile-first-responsive/spec.md`
**Created:** 2026-03-01

---

## Goal

Restructure `css/style.css` from desktop-first to mobile-first. Base styles target mobile; enhancements applied via `@media (min-width: 768px)` (tablet) and `@media (min-width: 1024px)` (desktop). Fix tap targets, code font sizes, and post row mobile layout. No visual changes at desktop widths.

## Technical Approach

The restructure is a single-file CSS rewrite plus two one-line template changes. The strategy:

1. **Keep all rules lines 1–542 mostly intact** — these are base styles (reset, tokens, typography, links, code, blockquote, lists, images, hr, video, layout, skip link, animations) that already work at all sizes. Only code font sizes change here (FR-5).
2. **Rewrite the Header/Nav/Footer sections (lines 247–518)** — flip desktop defaults to mobile defaults. Navigation becomes slide-out by default; hamburger visible by default; footer stacks by default.
3. **Delete the `@media (max-width: 767px)` block (lines 546–609)** — redistribute its rules into the mobile base.
4. **Add two `@media (min-width)` blocks** — tablet (768px) restores horizontal nav, row layouts; desktop (1024px) for any further enhancements.
5. **Rewrite the Homepage section (lines 624–753)** — merge the mobile override into the base, restructure with min-width breakpoints.
6. **Preserve `prefers-reduced-motion` block unchanged.**

### Key principle: the desktop visual result must not change.

Every rule that currently exists for desktop will still exist — it just moves from "base" to inside a `@media (min-width: 768px)` or `@media (min-width: 1024px)` block. Every rule currently inside `@media (max-width: 767px)` becomes the new base.

## Constitutional Compliance

- **Article I (Spec-First):** Plan references approved spec at `specs/mobile-first-responsive/spec.md` ✓
- **Article III (Simplicity):** Single file restructure, no new abstractions, no new dependencies ✓

## Components Affected

| Component | Change Type |
|-----------|-------------|
| `css/style.css` | Major restructure (rewrite responsive sections) |
| `templates/index.html` | One-line change (viewport meta) |
| `templates/post.html` | One-line change (viewport meta) |

## Dependencies

None. All changes are CSS/HTML. No build pipeline or JS changes needed.

## Test Strategy

Manual verification at 4 viewport widths:
- **320px** — no overflow, everything functional
- **375px** — mobile layout correct, tap targets ≥44px, code ≥14px
- **768px** — tablet: horizontal nav, dotted leaders, row footer
- **1024px** — desktop: visually identical to current site

Plus:
- `node build.js` succeeds
- CSS file size increase ≤ 2KB
- No `@media (max-width: ...)` queries remain (except reduced-motion)
- Keyboard navigation functional

## Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Desktop visual regression | Medium | Compare before/after at 1024px carefully |
| Hamburger animation breaks | Low | Test nav open/close on mobile |
| Specificity conflicts | Low | Homepage rules already scoped with `.page-home` |

## Rollback Plan

Revert `css/style.css`, `templates/index.html`, and `templates/post.html` to their current state. Run `node build.js` to regenerate.

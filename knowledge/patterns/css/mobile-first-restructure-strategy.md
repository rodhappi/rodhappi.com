# Mobile-First CSS Restructure Strategy

## Category
Pattern

## Summary
Convert desktop-first CSS to mobile-first by flipping defaults: mobile overrides become base styles, desktop rules move into `@media (min-width)` blocks. The visual result at desktop widths stays identical.

## Context
A site built desktop-first has base styles targeting wide screens and a `@media (max-width: 767px)` block bolting on mobile exceptions. This is harder to maintain and misses tablet optimization. Converting to mobile-first means base styles target mobile, with enhancements added at wider breakpoints.

## Solution

### Strategy
1. **Keep universal rules intact** — typography, colors, links, images, code blocks, resets. These use `clamp()` and fluid values that work at all sizes. No changes needed.
2. **Flip layout defaults** — Navigation, footer, and page-specific layouts: take the current mobile-override rules and make them the base. Example: `.nav-toggle { display: none }` becomes `display: flex` (visible on mobile by default).
3. **Delete `max-width` media query** — Every rule from the old `@media (max-width: 767px)` block is now either in the base or unnecessary.
4. **Add `min-width` breakpoints** — Create `@media (min-width: 768px)` (tablet) and optionally `@media (min-width: 1024px)` (desktop). Move the original desktop defaults into these blocks.
5. **Verify desktop parity** — The desktop visual result must not change. Every rule that was a "base" before now lives inside a `min-width` block instead.

### Key Points
- The total number of CSS rules stays roughly the same — you're reorganizing, not adding
- Hamburger animation rules can live in the base (they only activate when `.nav-open` class is present, harmless on desktop where the toggle is hidden)
- `clamp()` values work identically regardless of mobile-first vs desktop-first structure
- File size may decrease if you clean up dead code during the restructure

## Trade-offs
| Pros | Cons |
|------|------|
| Easier to reason about progressive enhancement | Requires careful verification at desktop widths |
| Natural tablet support via intermediate breakpoint | One-time effort to flip all layout defaults |
| Simpler mental model: start small, add complexity | Can introduce regressions if not tested thoroughly |

## Tags
css, responsive, mobile-first, restructure, breakpoints

## Metadata
- Created: 2026-03-01
- Source: Mobile-first responsive restructure for www.rodhappi.com
- Verified: Yes (full /specify-/plan-/work-/review workflow)

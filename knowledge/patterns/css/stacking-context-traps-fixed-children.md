# CSS Stacking Context Traps Fixed-Position Children

## Context

A `position: fixed` element inside a parent that creates a stacking context (via `z-index` + `position: sticky/relative/absolute`) has its `z-index` scoped to that parent's stacking context. Even if the child has `z-index: 150`, it can appear behind an overlay with `z-index: 140` if the parent's stacking context has a lower `z-index: 100`.

## Example

```
.site-header { position: sticky; z-index: 100; }  ← creates stacking context
  .site-nav  { position: fixed; z-index: 150; }   ← trapped inside parent's context

.nav-overlay { position: fixed; z-index: 140; }   ← sits above header's context
```

Result: the nav panel (150) appears **behind** the overlay (140) because the parent header (100) < overlay (140).

## Fix

Raise the parent's `z-index` above the overlay:

```css
.site-header { z-index: 200; }  /* above overlay's 140 */
```

Now the nav panel inside renders above the overlay because its parent stacking context (200) is higher.

## Alternative Fixes

- Move the nav element **outside** the header in the DOM (breaks semantic structure)
- Remove `z-index` from the header (may cause other stacking issues)
- Use `isolation: isolate` strategically

## Rule of Thumb

When debugging z-index issues with `position: fixed` elements, check the **parent chain** for any element that creates a stacking context. The child's z-index only competes within that context, not globally.

## Discovery

Found when the mobile slide-out nav panel appeared transparent — the overlay was rendering on top of it despite the nav having a higher z-index. The header's `z-index: 100` was trapping the nav below the `z-index: 140` overlay.

## Tags

`css`, `z-index`, `stacking-context`, `mobile-nav`, `position-fixed`

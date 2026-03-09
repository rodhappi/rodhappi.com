# Tap Target Size Calculation for WCAG Compliance

## Category
Domain Expertise

## Summary
Calculate tap target height as: `(vertical padding x 2) + (font-size x line-height)`. Use this to verify WCAG 2.5.5 compliance (44px minimum) before implementation.

## Context
Three independent review agents flagged the same issue: `.back-link`, `.social-link`, and `.archive-toggle` had tap targets of ~40px, below the 44px WCAG 2.5.5 guideline. The root cause was `padding: 0.5rem` (8px) being too small given the font size and line-height.

## Formula

```
tap_height = (padding_top + padding_bottom) + (font_size * line_height)
```

### Example: Failing target
- `padding: 0.5rem 0` → 8px top + 8px bottom = 16px padding
- `font-size: 0.875rem` → ~14px
- `line-height: 1.7` → 14px * 1.7 = ~24px
- **Total: 16 + 24 = 40px** (below 44px)

### Example: Passing target
- `padding: 1rem 0` → 16px top + 16px bottom = 32px padding
- `font-size: 0.875rem` → ~14px
- `line-height: 1.7` → 14px * 1.7 = ~24px
- **Total: 32 + 24 = 56px** (above 44px, safe margin)

### Quick Reference
With `line-height: 1.7` and body `font-size: 1rem`:

| Vertical Padding | Approx Tap Height | WCAG 44px? |
|-------------------|-------------------|------------|
| `0.25rem` (4px) | ~36px | No |
| `0.5rem` (8px) | ~44px | Borderline |
| `0.75rem` (12px) | ~52px | Yes |
| `1rem` (16px) | ~60px | Yes (safe) |

## Key Points
- Use `padding: var(--space-md)` (1rem) for safe tap targets on buttons and important links
- `padding: var(--space-sm)` (0.5rem) is borderline — only use for non-critical inline links
- The hamburger button gets extra height from its bar elements + padding, so it passes more easily
- Always verify with computed styles in DevTools, not just CSS values

## Tags
accessibility, wcag, tap-targets, css, mobile, touch

## Metadata
- Created: 2026-03-01
- Source: Mobile-first review — 3 agents independently flagged tap target deficiency
- Verified: Yes

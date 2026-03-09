# Specification: Mobile-First Responsive Website

**Status:** Draft
**Created:** 2026-03-01
**Feature:** Restructure the entire site CSS to mobile-first with 3 breakpoints

---

## 1. Problem Statement

The site's CSS is currently desktop-first: base styles target desktop and a single `max-width: 767px` media query overrides for mobile. This creates several issues:

- **No tablet optimization** — devices 768–1024px get full desktop layout, which can feel cramped
- **Small tap targets** — hamburger button (~22px) and social links (0.8rem) are below the 44px WCAG guideline
- **Code font too small on mobile** — inline code drops to ~13px on small screens
- **Desktop-first structure** — harder to maintain; mobile exceptions are bolted on rather than foundational
- **Post row layout on mobile** — dotted leader lines and long titles can wrap awkwardly

The site already has good foundations: fluid typography via `clamp()`, flexbox layouts, responsive images, and a working mobile nav. This work restructures the CSS approach without changing visual design.

## 2. Definitions

- **Tap target:** The clickable/tappable area of an interactive element, including padding. Minimum 44×44px per WCAG 2.5.8.
- **Mobile:** Viewport width < 768px (base styles, no media query)
- **Tablet:** Viewport width 768px–1023px (`@media (min-width: 768px)`)
- **Desktop:** Viewport width ≥ 1024px (`@media (min-width: 1024px)`)
- **No overflow:** No horizontal scrollbar appears; no content is clipped or extends beyond the viewport

## 3. User Stories

**US-1:** As a mobile reader, I want tap targets that are easy to hit so I can navigate without frustration.
- **AC:** All interactive elements (buttons, links in nav/footer) have a minimum 44×44px tap target area (including padding).

**US-2:** As a tablet reader, I want the layout to use distinct styling rules for my screen size, not auto-scaled mobile or cramped desktop.
- **AC:** A tablet breakpoint (768px–1023px) applies its own spacing, shows horizontal navigation (not hamburger), and uses the full content width.

**US-3:** As a developer, I want the CSS to be mobile-first so I can maintain it more easily and reason about progressive enhancement.
- **AC:** Base styles (no media query) target mobile. Enhancements are applied via `min-width` breakpoints. No `max-width` media queries remain.

**US-4:** As a mobile reader, I want code blocks to be readable without zooming.
- **AC:** Computed code font size is at least 14px on all screen sizes.

## 4. Functional Requirements

### FR-1: Mobile-First CSS Structure
Restructure `css/style.css` so that:
- Base styles (outside any media query) define the mobile layout
- `@media (min-width: 768px)` adds tablet enhancements
- `@media (min-width: 1024px)` adds desktop enhancements
- Remove the existing `@media (max-width: 767px)` block and redistribute its rules
- The `@media (prefers-reduced-motion: reduce)` block is preserved unchanged

### FR-2: Breakpoint Reference
Add a CSS comment block in the Design Tokens section documenting breakpoints:
```css
/* Breakpoints: 768px (tablet), 1024px (desktop) */
```

### FR-3: Navigation — Mobile-First
- **Mobile (base):** `.nav-toggle` is `display: flex`. `.site-nav` is `position: fixed` with `transform: translateX(100%)` (slide-out overlay). `.nav-links` uses `flex-direction: column`.
- **Tablet (768px+):** `.nav-toggle` is `display: none`. `.site-nav` is `position: static`, `display: flex`, `transform: none`. `.nav-links` uses `flex-direction: row`.
- **Desktop (1024px+):** No changes from tablet.
- `.nav-overlay` behavior unchanged (created by JS, shown/hidden by class).

### FR-4: Tap Target Sizes
- `.nav-toggle`: `padding: var(--space-md)` (1rem = 16px) → total tap area ≥ 44×44px with bar content
- `.social-link`: `font-size: 0.875rem`, `padding: var(--space-sm) var(--space-xs)` → tap area ≥ 44px height via line-height + padding
- `.back-link`: `display: inline-block`, `padding: var(--space-sm) 0` → tap area ≥ 44px height
- `.archive-toggle`: already full-width with adequate height — verify ≥ 44px at mobile, no changes needed

### FR-5: Code Font Minimum Size
- `code`: `font-size: max(0.875em, 14px)`
- `pre code`: `font-size: max(0.85em, 14px)`

### FR-6: Post Row Mobile Layout
- **Mobile (base):** `.post-row` uses `flex-wrap: wrap`. `.post-row-leader` is `display: none`. `.post-row-date` appears below the title (full width via `width: 100%`).
- **Tablet (768px+):** `.post-row` uses `flex-wrap: nowrap`. `.post-row-leader` is `display: block`. `.post-row-date` appears inline after the leader.

### FR-7: Homepage Responsive
- `.page-home .site-main` padding: mobile base uses `padding-top: clamp(3rem, 8vw, 6rem)`, tablet+ uses `padding-top: clamp(6rem, 10vw, 10rem)`
- `.identity` block: `margin-bottom: var(--space-lg)` on mobile, `margin-bottom: var(--space-xl)` on tablet+
- `.identity-name`, `.identity-line`: existing `clamp()` values handle fluid sizing — no changes needed
- `.section-label`, `.archive-toggle`: no breakpoint-specific changes needed

### FR-8: Post Page Responsive
- Post header: existing `clamp()` on `.post-title` handles fluid sizing. Spacing uses design tokens (`--space-sm`, `--space-xl`) — no breakpoint-specific changes needed.
- Post content: images use `max-width: 100%` (already set). Code blocks use `overflow-x: auto` (already set). Blockquotes use `padding: var(--space-sm) var(--space-lg)` (already set).
- Long URLs and code lines: `word-break: break-word` added to `.post-content` to prevent horizontal overflow.

### FR-9: Footer Responsive
- **Mobile (base):** `.footer-inner` uses `flex-direction: column`, `align-items: center`, `gap: var(--space-md)`.
- **Tablet+ (768px):** `.footer-inner` uses `flex-direction: row`, `justify-content: space-between`, `align-items: center`.
- `.page-home .site-footer`: no `border-top`, social links centered (already scoped).

### FR-10: Viewport Meta
Add `viewport-fit=cover` to both templates:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

### FR-11: Remaining Components (Mobile-First Restructure)
These components already work responsively via fluid values but their CSS rules must be reorganized into the mobile-first structure:
- **Skip link** (`.skip-link`): no breakpoint-specific changes, just move to base styles
- **Video embed** (`.video-embed`): padding-bottom aspect ratio technique works at all sizes — no changes needed
- **Blockquote**: existing styles work at all sizes — no changes needed
- **Lists** (`ul`, `ol`): existing padding-left works at all sizes — no changes needed
- **Images** (`img`): `max-width: 100%` works at all sizes — no changes needed
- **Horizontal rule** (`hr`): no changes needed

## 5. Non-Functional Requirements

### NFR-1: No Visual Regression on Desktop
At 1024px+ viewport, the rendered layout must match the current site. Verified by manual comparison of: header, nav, post list, post page content, and footer.

### NFR-2: Performance
- No additional CSS files, fonts, or JS
- `css/style.css` file size increase ≤ 2KB (restructure adds some `min-width` rules but removes `max-width` rules)

### NFR-3: Accessibility (Article VI)
- All interactive elements have ≥ 44×44px tap targets (per FR-4)
- All existing ARIA attributes preserved
- All existing focus indicators preserved (`:focus-visible` outline)
- `@media (prefers-reduced-motion: reduce)` block preserved unchanged
- Color contrast ratios unchanged (same color tokens)

### NFR-4: Browser Support
Supported browsers (layout renders without horizontal overflow, nav functions, tap targets work):
- Chrome, Firefox, Safari, Edge — last 2 major versions
- iOS Safari 15+
- Android Chrome 90+

## 6. Files Modified

| File | Change |
|------|--------|
| `css/style.css` | Full restructure: mobile-first base + `min-width` breakpoints |
| `templates/index.html` | Add `viewport-fit=cover` to viewport meta |
| `templates/post.html` | Add `viewport-fit=cover` to viewport meta |

**Not modified:** `build.js`, `js/nav.js`, `content/*.md`

## 7. Edge Cases

- **Very narrow screens (<320px):** No horizontal overflow. Content may be tight but all elements remain visible and functional.
- **Very long post titles (30+ chars):** Wrap with `word-break: break-word` on mobile. No text-overflow truncation.
- **Empty archive:** Archive toggle renders, content area is empty. No visual breakage.
- **No featured post:** Homepage renders with empty escritos section.
- **Landscape phone (e.g., 667px):** Mobile styles apply (below 768px breakpoint). Layout scales naturally via existing `clamp()` values — no special handling needed.
- **Long code lines:** `pre` blocks use `overflow-x: auto` for horizontal scroll within the block.
- **Long URLs in post content:** `word-break: break-word` on `.post-content` prevents overflow.

## 8. Out of Scope

- Dark mode / color scheme changes
- New visual design or layout changes
- JavaScript changes (`nav.js` already handles mobile menu)
- Build pipeline changes
- New CSS features (container queries, subgrid)
- Print stylesheet

## 9. Verification

1. `node build.js` succeeds with no errors
2. **Desktop (1024px+):** Layout matches current site — header, nav, post rows, post page, footer all visually identical
3. **Tablet (768px):** Horizontal nav visible, hamburger hidden, footer horizontal, post rows show dotted leaders
4. **Mobile (375px):** Hamburger visible, nav slides out, post rows stacked (no leader), tap targets ≥ 44px, code ≥ 14px
5. **Narrow (320px):** No horizontal overflow on any page
6. **Post page:** Content readable, images contained, code blocks scroll horizontally, footer stacks
7. **Reduced motion:** `prefers-reduced-motion` still disables animations
8. **Keyboard navigation:** Tab order and focus indicators work on all sizes
9. **CSS structure:** No `@media (max-width: ...)` rules remain (except `prefers-reduced-motion`)
10. **File size:** `css/style.css` increase ≤ 2KB vs. current

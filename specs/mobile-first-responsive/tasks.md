# Tasks: Mobile-First Responsive Website

**Plan:** `specs/mobile-first-responsive/plan.md`

---

## Phase 1: CSS Restructure

### Task 1.1: Add breakpoint reference and fix code font sizes
- **Spec:** FR-2, FR-5
- **Do:** Add breakpoint comment to Design Tokens section. Change `code` font-size to `max(0.875em, 14px)` and `pre code` to `max(0.85em, 14px)`.
- **Files:** `css/style.css` (lines 12–32, 114–136)
- **Dependencies:** None

### Task 1.2: Rewrite navigation to mobile-first
- **Spec:** FR-3, FR-4
- **Do:**
  - `.nav-toggle`: change `display: none` → `display: flex`, increase padding to `var(--space-md)`
  - `.site-nav`: add mobile slide-out positioning as base (position fixed, transform, etc.)
  - `.site-nav.nav-open`: move to base
  - `.nav-links`: add `flex-direction: column` as base
  - `.nav-link`: set `font-size: 1.1rem` as base
  - `.social-links`: set `gap: var(--space-sm)` as base
  - `.social-link`: increase font-size to `0.875rem`, add padding for tap target
  - Hamburger animation rules: move to base (no media query)
- **Files:** `css/style.css` (lines 279–348, 546–598)
- **Dependencies:** None

### Task 1.3: Rewrite archive and footer to mobile-first
- **Spec:** FR-4, FR-9
- **Do:**
  - `.archive-link`: add `flex-direction: column; gap: var(--space-xs)` as base
  - `.footer-inner`: change to `flex-direction: column; align-items: center` as base
  - `.back-link`: add `display: inline-block; padding: var(--space-sm) 0` for tap target
  - Add `word-break: break-word` to `.post-content`
- **Files:** `css/style.css` (lines 433–441, 501–518, 600–608)
- **Dependencies:** None

### Task 1.4: Rewrite homepage section to mobile-first
- **Spec:** FR-6, FR-7
- **Do:**
  - `.page-home .site-main`: use mobile `clamp(3rem, 8vw, 6rem)` as base
  - `.post-row`: add `flex-wrap: wrap` as base
  - `.post-row-leader`: add `display: none` as base
  - `.post-row-title`: set `white-space: normal` as base
  - `.post-row-date`: add `width: 100%` as base for stacked layout
  - `.identity`: set `margin-bottom: var(--space-lg)` as base
  - Delete the `@media (max-width: 767px)` block at lines 745–753
- **Files:** `css/style.css` (lines 624–753)
- **Dependencies:** None

### Task 1.5: Create min-width breakpoint blocks
- **Spec:** FR-1, FR-3, FR-6, FR-7, FR-8, FR-9
- **Do:** Delete the old `@media (max-width: 767px)` block (lines 546–609). Create two new blocks:
  - `@media (min-width: 768px)` — tablet:
    - `.nav-toggle { display: none }`
    - `.site-nav` — reset to inline flex, remove fixed positioning
    - `.nav-links { flex-direction: row; gap: var(--space-md) }`
    - `.nav-link { font-size: 0.875rem }`
    - `.social-links { gap: var(--space-xs) }`
    - `.archive-link { flex-direction: row; gap: var(--space-md) }`
    - `.footer-inner { flex-direction: row; justify-content: space-between; align-items: center }`
    - `.page-home .site-main { padding-top: clamp(6rem, 10vw, 10rem) }`
    - `.post-row { flex-wrap: nowrap }`
    - `.post-row-leader { display: block }`
    - `.post-row-title { white-space: nowrap }`
    - `.post-row-date { width: auto }`
    - `.identity { margin-bottom: var(--space-xl) }`
  - `@media (min-width: 1024px)` — desktop:
    - Currently no additional rules needed (tablet covers desktop). Add empty block with comment for future use, or omit if unnecessary.
  - Hamburger animation rules stay in base (they only activate when `.nav-open` class is present, so they're harmless on desktop where hamburger is hidden)
- **Files:** `css/style.css`
- **Dependencies:** Tasks 1.2, 1.3, 1.4

## Phase 2: Template Changes

### Task 2.1: Update viewport meta tags
- **Spec:** FR-10
- **Do:** In both templates, change viewport meta to include `viewport-fit=cover`
- **Files:** `templates/index.html`, `templates/post.html`
- **Dependencies:** None

## Phase 3: Verification

### Task 3.1: Build and verify
- **Spec:** Verification section
- **Do:**
  1. Run `node build.js` — confirm success
  2. Measure CSS file size — confirm ≤ 2KB increase
  3. Grep for `max-width:` in CSS — confirm only `prefers-reduced-motion` and `max-width: 320px` (nav) remain
  4. Manual viewport checks at 320px, 375px, 768px, 1024px
- **Files:** None (verification only)
- **Dependencies:** All previous tasks

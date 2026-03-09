# Tasks: Escritos Card Layout

## Spec Reference
`specs/escritos-card-layout/spec.md`

## Plan Reference
`specs/escritos-card-layout/plan.md`

## Status Summary
- Total: 5
- Pending: 0
- In Progress: 0
- Complete: 5
- Blocked: 0

---

## Phase 1: Build Logic

### Task 1.1: Add thumbnail field and reading time calculation
- **Status:** Complete
- **Spec requirement:** FR-1, FR-2
- **Description:** Add `thumbnail` field to frontmatter parser (store as `meta.thumbnail`, HTML-escaped, empty string if absent). Add `calculateReadingTime(markdownBody)` function: split on `\s+`, divide by 200, `Math.ceil()`, minimum 1. Store as `meta.readingTime` (integer). Call it during post parsing.
- **Test:** Run `node build.js` — no errors. Verify `meta.thumbnail` and `meta.readingTime` are populated (add temporary `console.log`).
- **Files:** `build.js`
- **Blocked by:** None

### Task 1.2: Add formatDateCard function
- **Status:** Complete
- **Spec requirement:** FR-5
- **Description:** Add `formatDateCard(date)` function returning "DD MMM, YYYY" with uppercase 3-letter Spanish month abbreviations (ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC). Day is unpadded. Store result as `meta.dateCard`.
- **Test:** Verify output format matches spec examples: "26 FEB, 2026", "1 ENE, 2025".
- **Files:** `build.js`
- **Blocked by:** None

### Task 1.3: Implement current-month filtering
- **Status:** Complete
- **Spec requirement:** FR-3
- **Description:** Replace `featured: true` selection logic with month-based filtering. At build time, get current month/year from `new Date()`. Filter posts: those matching current month/year go to Escritos (sorted newest first), all others go to Archivo. Remove the `featured` variable selection logic.
- **Test:** Run `node build.js`. Since all 3 current posts are dated February 2026 and build date is March 2026, Escritos should be empty and all posts should appear in Archivo.
- **Files:** `build.js`
- **Blocked by:** Task 1.1, Task 1.2

### Task 1.4: Generate post card HTML for Escritos
- **Status:** Complete
- **Spec requirement:** FR-4
- **Description:** Replace the featured section HTML generation with card layout. For each current-month post, generate `<a class="post-card">` with: optional `<img>` (only if `meta.thumbnail` is non-empty), `<div class="post-card-body">` containing date span (using `meta.dateCard`), title span, and reading time span (singular/plural: "1 minuto" vs "N minutos"). Pass resulting HTML as `featured_section` template variable. Archive HTML generation stays unchanged (`.post-row` format).
- **Test:** Run `node build.js`. Inspect generated `index.html` — Escritos section should contain `.post-card` elements (or be empty if no current-month posts). Archivo should contain `.post-row` elements.
- **Files:** `build.js`
- **Blocked by:** Task 1.3

---

## Phase 2: Styling

### Task 2.1: Add post card CSS styles
- **Status:** Complete
- **Spec requirement:** FR-6, FR-8
- **Description:** Add mobile-first `.post-card` styles after the `.post-row` block (~line 660). Base: `display: flex; gap: 0.75rem; padding: var(--space-md) 0;` Thumb: `64px × 64px, border-radius: 10px, object-fit: cover, margin: 0`. Title: `1rem, font-weight: 700`. Hover: `.post-card:hover .post-card-title { color: var(--color-accent) }`. Add tablet overrides in the existing `@media (min-width: 768px)` block: thumb 80px, gap 1rem, title 1.1rem. Disable link underline animation on `.post-card`.
- **Test:** Run `node build.js`. Open `index.html` in browser. Cards should display correctly at mobile and desktop widths.
- **Files:** `css/style.css`
- **Blocked by:** None

---

## Completion Criteria
- [x] All tasks marked Complete
- [x] `node build.js` succeeds
- [x] No blocked tasks remaining
- [x] Ready for `/review`

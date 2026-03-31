# Tasks: Post Description in Header

## Spec Reference
`specs/post-description-in-header/spec.md`

## Plan Reference
`specs/post-description-in-header/plan.md`

## Status Summary
- Total: 3
- Pending: 0
- In Progress: 0
- Complete: 3
- Blocked: 0

---

## Phase 1: Template + Build Changes

### Task 1.1: Add `description_html` to build.js rendering
- **Status:** Complete
- **Spec requirement:** FR-1, FR-2, FR-4
- **Description:** In `build.js`, before calling `renderTemplate` for post pages (line ~420), construct a `description_html` variable: if `post.meta.description` is non-empty, set it to `<p class="post-description">${post.meta.description}</p>`; otherwise set it to empty string. Pass `description_html` to `renderTemplate`.
- **Test:** Run `node build.js`. Inspect a generated post with description — HTML should contain `<p class="post-description">`. Inspect a post without description — no such element.
- **Files:** `build.js`
- **Blocked by:** None

### Task 1.2: Add `{{description_html}}` placeholder to post template
- **Status:** Complete
- **Spec requirement:** FR-1
- **Description:** In `templates/post.html`, add `{{description_html}}` between the `<h1 class="post-title">` and `<time class="post-date">` lines inside `.post-header`.
- **Test:** Run `node build.js`. Verify generated posts render description in the correct position.
- **Files:** `templates/post.html`
- **Blocked by:** None

---

## Phase 2: CSS Styling

### Task 2.1: Style `.post-description`
- **Status:** Complete
- **Spec requirement:** FR-3
- **Description:** Add CSS rule for `.post-description` after the `.post-title` rule (~line 434). Use `font-family: var(--font-serif)`, `color: var(--color-text-secondary)`, `font-size` slightly smaller than body (e.g., `1.05rem` or `1.1rem`), `margin-bottom: var(--space-sm)`, and `font-style: italic` for editorial distinction. No `font-weight: bold`.
- **Test:** Open a post with description in browser. Description should appear in serif italic, secondary color, between title and date.
- **Files:** `css/style.css`
- **Blocked by:** Phase 1

---

## Completion Criteria
- [ ] All tasks marked Complete
- [ ] All tests passing
- [ ] No blocked tasks remaining
- [ ] Ready for `/review`

# Tasks: Google Sans Flex as Default UI Font

## Spec Reference
`specs/google-sans-flex-font/spec.md`

## Plan Reference
`specs/google-sans-flex-font/plan.md`

## Status Summary
- Total: 3
- Pending: 0
- In Progress: 0
- Complete: 3
- Blocked: 0

---

## Phase 1: CSS Changes

### Task 1.1: Add `--font-sans` variable and switch body font
- **Status:** Complete
- **Spec requirement:** FR-1, FR-2
- **Description:** Add `--font-sans: 'Google Sans Flex', sans-serif;` to the `:root` block. Change `body` font-family from `var(--font-serif)` to `var(--font-sans)`. Remove the explicit `font-family: var(--font-serif)` from `.site-name` and `.archive-toggle` so they inherit the new sans-serif default.
- **Test:** Open homepage — nav links, dates, section labels, footer text, archive toggle should render in Google Sans Flex.
- **Files:** `css/style.css`
- **Blocked by:** None

### Task 1.2: Add serif overrides for content elements
- **Status:** Complete
- **Spec requirement:** FR-3, FR-4
- **Description:** Add `font-family: var(--font-serif)` to `.post-title`, `.post-content`, `.identity-name`, and `.post-card-title`. This ensures these elements keep Merriweather despite the body switching to sans-serif. Note: `.identity-line` already has its own `font-family` declaration and needs no change.
- **Test:** Open homepage — identity name and post card titles render in Merriweather. Open a post — title and body content (including h2-h6 inside `.post-content`) render in Merriweather.
- **Files:** `css/style.css`
- **Blocked by:** Task 1.1

---

## Phase 2: Template Update

### Task 2.1: Add Google Sans Flex font link to post.html
- **Status:** Complete
- **Spec requirement:** FR-5
- **Description:** Update the Google Fonts `<link>` in `templates/post.html` to include `Google+Sans+Flex:wght@400;500` (matching the format already used in `templates/index.html`). Currently post.html only loads Merriweather and JetBrains Mono.
- **Test:** Open a post page — inspect computed styles on header nav, date, footer. Confirm they use Google Sans Flex (not fallback sans-serif).
- **Files:** `templates/post.html`
- **Blocked by:** Phase 1

---

## Completion Criteria
- [ ] All tasks marked Complete
- [ ] `node build.js` runs successfully
- [ ] Homepage: UI text (nav, dates, labels, footer) renders in Google Sans Flex
- [ ] Homepage: `.identity-name` and post card titles render in Merriweather
- [ ] Post page: title and body content render in Merriweather
- [ ] Post page: header, nav, date, footer render in Google Sans Flex
- [ ] Ready for `/review`

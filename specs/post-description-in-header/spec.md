# Post Description in Header

## Status
Approved

## Summary
Display the post's `description` frontmatter field visually inside the post header, below the title and above the date. Currently the description is only used in the `<meta>` tag for SEO — readers never see it on the page itself.

## Problem Statement
Every post already has a `description` field in its frontmatter (e.g., *"Lo que dejé de creer, lo que ahora creo, y lo que estoy construyendo para aprender y crear."*). This text serves as a subtitle or lede that orients the reader, but it is invisible on the rendered post page. Adding it to the post header gives readers immediate context about what the post covers.

## User Stories

### Readers see a description below the post title
**As a** reader, **I want** to see a short description below the post title **so that** I understand the post's angle before reading.

**Acceptance Criteria:**
- [ ] The description text appears between the `<h1>` title and the `<time>` date inside `.post-header`
- [ ] Posts without a description render normally with no empty element or extra whitespace
- [ ] The description is visually distinct from the title (smaller, lighter weight)

## Functional Requirements

| # | Requirement | Priority | Acceptance Criteria |
|---|-------------|----------|---------------------|
| FR-1 | Add a `<p class="post-description">` element to `templates/post.html` inside `.post-header`, between the title and the date | Must | Element present in generated HTML when description exists |
| FR-2 | The element must only render when `{{description}}` is non-empty | Must | No empty `<p>` tag when description is blank |
| FR-3 | Style `.post-description` with serif font, secondary color, and appropriate spacing | Must | Visually distinct from title; consistent with editorial design system |
| FR-4 | Description text must be HTML-escaped (already handled by `build.js` `escapeHtml`) | Must | No XSS from description field |

## Non-Functional Requirements

### Performance
- No additional HTTP requests; CSS-only change + template change

### Security
- Description is already escaped via `escapeHtml()` in `parseFrontmatter()` (build.js:72) — no additional escaping needed

### Accessibility
- The description is regular paragraph text inside the `<header>` landmark — no additional ARIA needed
- Must maintain readable contrast ratio (using `--color-text-secondary` which is already compliant)

## Edge Cases and Error States

| Scenario | Expected Behavior |
|----------|-------------------|
| Post has no `description` in frontmatter | No `<p class="post-description">` rendered; no empty whitespace |
| Description is an empty string `""` | Same as no description — element not rendered |
| Description contains special HTML characters | Already escaped by `escapeHtml()` in build.js |

## Dependencies and Constraints
- `build.js` already passes `description` to `renderTemplate()` (line 423)
- `build.js` already escapes description (line 72)
- Conditional rendering (FR-2) requires a small change in `build.js` template rendering or a post-render cleanup

## Out of Scope
- Showing description on the homepage post cards (already has its own layout)
- Allowing Markdown in the description field
- Adding description to the index template

## Metadata
- **Created:** 2026-03-16
- **Author:** rodhappi
- **Version:** 1.0
- **Spec path:** `specs/post-description-in-header/spec.md`

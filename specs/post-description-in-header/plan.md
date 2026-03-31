# Implementation Plan: Post Description in Header

## Spec Reference
`specs/post-description-in-header/spec.md` -- version 1.0

## Goal
Display the post's `description` frontmatter field visually inside `.post-header`, between the title and date, only when non-empty.

## Approach
This is a 3-file change: template, build script, and CSS.

**Template (`templates/post.html`):** Add a `<p class="post-description">{{description}}</p>` element between the `<h1>` and `<time>` inside `.post-header`.

**Build script (`build.js`):** Handle the conditional rendering. The simplest approach: when `description` is empty, replace the entire `<p class="post-description">...</p>` line with an empty string. This can be done by wrapping the description placeholder in a conditional pattern, or by post-processing the rendered HTML to strip the empty element. The cleanest option is to add the description line to the template and strip it in `renderTemplate` when the value is empty — but that adds complexity. Simpler: build the description HTML string in `build.js` before passing to `renderTemplate`, passing a `description_html` variable that is either the full `<p>` tag or empty string.

**CSS (`css/style.css`):** Add `.post-description` rule with serif font, secondary color, and spacing that fits between the title and date.

## Constitutional Compliance

| Article | Status | Notes |
|---------|--------|-------|
| I. Spec-First | Pass | References spec at `specs/post-description-in-header/spec.md` |
| II. Test-First | Pass | Manual visual test; build output verified |
| III. Simplicity | Pass | 3 files modified, no new modules, no abstraction |

## Architecture

### Components Affected
| Component | Change Type | Description |
|-----------|-------------|-------------|
| `templates/post.html` | Modified | Add `{{description_html}}` placeholder in post-header |
| `build.js` | Modified | Build conditional `description_html` variable before rendering |
| `css/style.css` | Modified | Add `.post-description` styling |

### Dependencies
- None. All changes are within existing files.

## Task Breakdown
See `specs/post-description-in-header/tasks.md` for the full task list.

**Summary:** 3 tasks across 2 phases.

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 2 | Template + build changes (conditional description rendering) |
| 2 | 1 | CSS styling for `.post-description` |

## Test Strategy

### Unit Tests
- Not applicable (no test framework; static site)

### Integration Tests
- Run `node build.js` and verify:
  - Posts with description: generated HTML contains `<p class="post-description">` with correct text
  - Posts without description: no `<p class="post-description">` element in generated HTML

### Acceptance Tests
- Open a post with description in browser — description visible between title and date
- Open a post without description — no extra whitespace or empty element
- Description renders in serif font with secondary color

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Empty `<p>` rendered for posts without description | Low | Medium | Conditional rendering in build.js |
| Description too long breaks layout | Low | Low | CSS handles with normal text flow; descriptions are short by convention |

## Rollback Plan
Revert the 3 file changes (template, build.js, style.css). Run `node build.js` to regenerate.

## Metadata
- **Created:** 2026-03-16
- **Author:** rodhappi
- **Plan path:** `specs/post-description-in-header/plan.md`

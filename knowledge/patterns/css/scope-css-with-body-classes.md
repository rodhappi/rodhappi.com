# Scope CSS Changes with Body Classes

## Category
Pattern

## Summary
Add a class to `<body>` (e.g., `.page-home`) to scope page-specific CSS without affecting other pages that share the same stylesheet.

## Context
In a static site with multiple page types (homepage, post pages) sharing a single `style.css`, layout changes to one page type can break others. The homepage redesign needed generous top padding, no header, and a different footer — none of which should apply to post pages.

## Solution

### Structure
- Add a descriptive class to `<body>` in the page-specific template: `<body class="page-home">`
- Prefix all page-specific CSS rules with that class: `.page-home .site-main { ... }`
- Shared styles (typography, links, code blocks) remain unscoped and apply everywhere

### Key Points
- Zero risk of breaking other page types — selectors only match when the body class is present
- No need for separate stylesheets or CSS build tooling
- Works naturally with a build system that uses different templates per page type
- Keep the class name descriptive of the page type, not the visual change (`page-home` not `no-header`)

## Variations
- **Per-page classes:** `page-post`, `page-about`, etc. for sites with many distinct layouts
- **Feature classes:** `has-sidebar`, `full-width` for cross-cutting layout variants

## Trade-offs
| Pros | Cons |
|------|------|
| Simple, zero-dependency scoping | Slightly longer selectors |
| No risk of cross-page side effects | Requires remembering to add the class in templates |
| Works with any static site setup | Can lead to specificity issues if overused |

## Tags
css, static-site, layout, scoping, vanilla-css

## Metadata
- Created: 2026-02-27
- Source: Homepage redesign (edwinchen.ai reference layout)
- Verified: Yes

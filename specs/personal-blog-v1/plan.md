# Implementation Plan: Personal Blog v1

## Spec Reference
`specs/personal-blog-v1/spec.md` -- version 1.0

## Goal
Build the complete www.rodhappi.com personal blog: a Node.js build script that converts Markdown content to static HTML, plus the HTML templates, CSS design system, and JS navigation that make up the site.

## Approach

The implementation follows a bottom-up strategy across 4 phases: build engine first, then templates, then design system, then interactions. This order ensures each phase can be tested independently — the build script works before templates exist (it can output raw HTML), templates work before CSS exists (unstyled but functional), and interactions are layered on last as progressive enhancement.

The build script (`build.js`) is the core — a single-file Node.js script (~200-300 lines) that reads `content/*.md`, parses YAML frontmatter, converts Markdown to HTML using a custom parser (no dependencies), and writes output using `{{variable}}` template substitution. The Markdown parser handles standard syntax (headings, bold, italic, links, images, code blocks, lists, blockquotes, HR) plus the custom `@video(url)` directive. No external libraries — just `fs` and `path`.

Templates are two HTML files (`templates/index.html` and `templates/post.html`) using semantic HTML5 with `{{placeholder}}` markers. The CSS design system is a single `css/style.css` file organized as: reset, design tokens (custom properties), typography, layout, components, animations, responsive, and reduced-motion overrides. Navigation JS is minimal — `js/nav.js` handles only the mobile hamburger toggle (~30 lines).

## Constitutional Compliance

| Article | Status | Notes |
|---------|--------|-------|
| I. Spec-First | Pass | References `specs/personal-blog-v1/spec.md` v1.0 |
| II. Test-First | Pass | Test strategy defined below; manual verification due to no test framework (per CLAUDE.md note) |
| III. Simplicity | Pass | 4 files total (build.js, 2 templates, style.css, nav.js); zero dependencies; no abstractions |

## Architecture

### Components Affected
| Component | Change Type | Description |
|-----------|-------------|-------------|
| `build.js` | New | Build pipeline: Markdown parser + frontmatter parser + template engine |
| `templates/index.html` | New | Homepage HTML shell with `{{posts}}`, `{{featured}}` placeholders |
| `templates/post.html` | New | Post page HTML shell with `{{title}}`, `{{date}}`, `{{content}}` placeholders |
| `css/style.css` | New | Complete design system: tokens, typography, layout, animations |
| `js/nav.js` | New | Mobile navigation toggle (hamburger → slide-out menu) |
| `content/` | New | Directory for source Markdown posts |
| `media/` | New | Directory for images, SVGs |
| `posts/` | Generated | Output directory for compiled post HTML files |
| `index.html` | Generated | Output homepage |

### Dependencies
- Node.js v18+: Runtime for `build.js` (pre-installed, not a project dependency)
- Google Fonts CDN: Merriweather + JetBrains Mono (loaded via `<link>` in templates)

## Task Breakdown
See `specs/personal-blog-v1/tasks.md` for the full task list.

**Summary:** 10 tasks across 4 phases.

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1. Build Engine | 3 | Markdown parser, frontmatter parser, build script with template engine |
| 2. Templates | 2 | Homepage template, post page template |
| 3. Design System | 2 | CSS design tokens + typography + layout, responsive + components |
| 4. Interactions & Polish | 3 | Animations, navigation JS, sample content + integration test |

## Test Strategy

### Unit Tests
- No automated test framework in v1 (per CLAUDE.md note: "add one before enforcing")
- Manual verification of build script output against expected HTML

### Integration Tests
- Run `node build.js` with sample content and verify:
  - Correct number of output files generated
  - Frontmatter values appear in generated HTML
  - Featured post logic selects correctly
  - Archive is sorted newest-first
  - HTML output is well-formed

### Acceptance Tests
- Visual inspection of generated site in browser (desktop + mobile)
- Lighthouse audit for performance (FCP < 1.0s) and accessibility (WCAG 2.1 AA)
- Keyboard navigation test: Tab order, Escape closes menu, focus management
- `prefers-reduced-motion` test: verify animations disabled
- Color contrast verification: `#2c2c2c` on `#faf9f7` = 10.7:1 (passes AA)

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Custom Markdown parser misses edge cases | Medium | Medium | Keep parser simple; handle standard syntax only; test with diverse content |
| Google Fonts CDN downtime affects load | Low | Low | `font-display: swap` ensures text renders immediately with fallback |
| CSS `clamp()` not supported in target browser | Low | Low | All target browsers (last 2 versions) support `clamp()` since 2020 |
| Build script performance on many posts | Low | Low | Simple file I/O; Node.js handles hundreds of files easily |

## Rollback Plan
All source files are new (no modifications to existing files). Rollback is simply deleting the created files: `build.js`, `templates/`, `css/`, `js/`, `content/`, `media/`, and generated `posts/` + `index.html`. No database, no infrastructure changes.

## Metadata
- **Created:** 2026-02-26
- **Author:** rodhappi
- **Plan path:** `specs/personal-blog-v1/plan.md`

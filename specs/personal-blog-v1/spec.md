# Personal Blog v1 — www.rodhappi.com

## Status
Draft

## Summary
Build a minimal, elegant personal blog at www.rodhappi.com covering AI, tech, and topics relevant to Latin America. The site is a static blog built with vanilla HTML/CSS/JS, zero dependencies, powered by a custom Node.js build script that converts Markdown content to HTML. The design draws inspiration from edwinchen.ai — clean typography, generous whitespace, subtle interactions, and a sidebar/slide-out navigation. All content is in Spanish.

## Problem Statement
There is no website currently deployed at www.rodhappi.com. The author needs a personal blog to publish essays and technical writing. The blog must be fast (static HTML), easy to manage (write Markdown, run one build command), and visually distinctive without being heavy — a minimalist editorial aesthetic with subtle, elegant interactions that convey craft.

## User Stories

### US-1: Read a blog post
**As a** visitor, **I want** to read a well-typeset article on any device **so that** the reading experience is comfortable and distraction-free.

**Acceptance Criteria:**
- [ ] Post renders with Merriweather serif at fluid sizes (clamp-based)
- [ ] Content max-width is 46rem; line length stays within 60–80 characters
- [ ] Page loads in under 1 second on a 3G connection (minimal assets, no JS frameworks)
- [ ] Code blocks render in JetBrains Mono (no syntax highlighting in v1 — monospace styling only)
- [ ] Images render with `max-width: 100%; height: auto` — never overflow content width
- [ ] Post displays title, date, and body content

### US-2: Browse the homepage
**As a** visitor, **I want** to see a featured post and an archive of all posts **so that** I can discover content that interests me.

**Acceptance Criteria:**
- [ ] Homepage shows the author's identity (name, brief bio)
- [ ] A featured post ("Escritos" section) is prominently displayed
- [ ] An archive list ("Archivo" section) shows all other posts sorted newest-first
- [ ] Each archive entry shows the post title and date
- [ ] Clicking any post title navigates to the full post

### US-3: Navigate the site
**As a** visitor, **I want** to navigate between pages using a minimal navigation system **so that** I can move through the site fluidly.

**Acceptance Criteria:**
- [ ] Desktop (≥768px): persistent header navigation with home link and social links
- [ ] Mobile (<768px): hamburger toggle reveals slide-out menu (full-width overlay)
- [ ] Slide-out transition: 300ms ease `cubic-bezier(0.4, 0, 0.2, 1)`
- [ ] Current page/section is visually indicated
- [ ] Navigation includes social links (X, LinkedIn, GitHub)
- [ ] Escape key closes mobile menu and returns focus to toggle button

### US-4: Publish a new post
**As the** author, **I want** to write a Markdown file and run one command to publish **so that** content management is frictionless.

**Acceptance Criteria:**
- [ ] Create a `.md` file in `content/` with YAML frontmatter (title, date, description, featured)
- [ ] Run `node build.js` to generate `posts/*.html` and `index.html`
- [ ] Build completes with success message: `✓ N post(s) built successfully.`
- [ ] The new post appears on the homepage automatically
- [ ] Setting `featured: true` promotes the post to the "Escritos" section

### US-5: Experience subtle interactions
**As a** visitor, **I want** to notice polished micro-interactions **so that** the site feels crafted and alive without being distracting.

**Acceptance Criteria:**
- [ ] Link underlines animate from `scaleX(0)` to `scaleX(1)` on hover, 300ms `cubic-bezier(0.66, 0, 0.15, 1)`
- [ ] Page content fades in on load: `opacity 0→1` over 400ms `ease-out`
- [ ] Navigation slide-out: 300ms `cubic-bezier(0.4, 0, 0.2, 1)`
- [ ] All interactions are CSS-only (no JS animation libraries)
- [ ] When `prefers-reduced-motion: reduce` is active, all animations are disabled (instant state changes)

## Functional Requirements

| # | Requirement | Priority | Acceptance Criteria |
|---|-------------|----------|---------------------|
| FR-1 | Build script parses Markdown frontmatter (title, date, description, featured) | Must | Frontmatter values are extracted and available as template variables |
| FR-2 | Build script converts Markdown body to HTML (headings, bold, italic, links, images, code blocks, lists, blockquotes, HR) with HTML entity escaping in frontmatter values | Must | All standard Markdown syntax renders correctly; frontmatter values are HTML-escaped to prevent XSS |
| FR-3 | Build script supports `@video(url)` custom syntax for embedded video | Should | YouTube/Vimeo URLs render as responsive iframe embeds |
| FR-4 | Build script generates individual post pages from `templates/post.html` | Must | Each `content/*.md` produces a corresponding `posts/*.html` |
| FR-5 | Build script generates homepage from `templates/index.html` with post listings | Must | Homepage includes featured post and archive list |
| FR-6 | Featured post logic: most recent `featured: true` post; fallback to most recent post | Must | Correct post appears in "Escritos" section |
| FR-7 | Archive list: all non-featured posts, sorted newest first | Must | Posts appear in correct order with title and date |
| FR-8 | Post template includes back-to-home navigation | Must | Reader can return to homepage from any post |
| FR-9 | Slide-out mobile navigation with hamburger toggle | Must | Menu slides in/out smoothly on mobile viewports |
| FR-10 | Homepage displays author identity: name, role/bio | Must | Visible on homepage above or beside content |
| FR-11 | Social links in footer or navigation (X, LinkedIn, GitHub) | Should | Links open in new tab, use accessible labels |
| FR-12 | Build script runs with zero npm dependencies (Node.js stdlib only) | Must | `node build.js` works without `npm install` |
| FR-13 | CSS custom properties for design tokens (colors, fonts, spacing) | Must | All design values use CSS variables for consistency |
| FR-14 | Fluid typography using `clamp()` | Must | Font sizes scale smoothly between mobile and desktop |
| FR-15 | Animated link underlines using CSS transforms | Should | Underline animates `scaleX(0→1)` over 300ms with `cubic-bezier(0.66, 0, 0.15, 1)` |
| FR-16 | Page load fade-in animation | Should | Content fades `opacity 0→1` over 400ms `ease-out` |
| FR-17 | Template placeholders use `{{variable}}` syntax | Must | Build script replaces `{{title}}`, `{{date}}`, `{{content}}`, `{{posts}}` in templates |
| FR-18 | Build is idempotent — running twice produces identical output | Must | Old generated files are cleaned before each build |

## Non-Functional Requirements

### Performance
- First Contentful Paint < 1.0s (measured via Lighthouse with "Slow 3G" throttling profile)
- Total page weight < 100KB (excluding images) — no JS frameworks, no CSS frameworks
- Zero external JS dependencies at runtime
- Fonts loaded via `font-display: swap` to avoid FOIT

### Security
- No inline scripts (Content Security Policy compatible)
- External links use `rel="noopener noreferrer"`
- No user input processed (static site — minimal attack surface)
- OWASP Top 10: N/A for most categories (no server, no database, no auth), but XSS prevention applies to any dynamic content in build script

### Accessibility
- WCAG 2.1 AA compliance
- Semantic HTML5 structure (`<header>`, `<main>`, `<article>`, `<nav>`, `<footer>`)
- Skip-to-content link
- Color contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text
- Keyboard-navigable menu: Tab through links, Escape closes menu, focus returns to toggle
- `aria-expanded` and `aria-label` on navigation toggle
- Focus indicator: 2px solid `--color-accent` outline with 2px offset
- `prefers-reduced-motion` respected for all animations
- `lang="es"` on `<html>` element

## Edge Cases and Error States

| Scenario | Expected Behavior |
|----------|-------------------|
| No content files exist | Build script outputs warning: "No content files found." and generates empty homepage |
| No `featured: true` posts | Most recent post auto-promotes to featured section |
| Multiple `featured: true` posts | Most recent by frontmatter `date` is used for "Escritos"; ties broken alphabetically by filename; others go to archive |
| Post with missing frontmatter fields | Build script warns about missing fields but continues with defaults (title: filename, date: file mtime) |
| Malformed Markdown | Build script outputs best-effort HTML, logs warning |
| Content file with no body text | Generates post page with only title/date (empty body is valid) |
| Very long post titles | Title wraps naturally; no truncation |
| Image in Markdown points to missing file | Renders `<img>` with broken src (browser handles); build does not fail |
| `@video()` with invalid URL | Renders placeholder text indicating invalid video URL |
| Invalid frontmatter `date` value | Build script warns and falls back to file mtime |
| Two content files that would produce the same slug | Build script warns and skips the duplicate |

## Dependencies and Constraints

- **Runtime:** Node.js (v18+ for modern features) — must be pre-installed
- **No npm packages:** Build script uses only Node.js standard library (`fs`, `path`)
- **Fonts:** Google Fonts (Merriweather, JetBrains Mono) loaded via `<link>` — external dependency
- **Hosting:** Any static file host (GitHub Pages, Netlify, Vercel) — no server-side rendering
- **Language:** All UI text in Spanish (`lang="es"`)
- **File naming:** kebab-case, lowercase for all files
- **Browser support:** Modern evergreen browsers (Chrome, Firefox, Safari, Edge — last 2 versions). No IE11 support.
- **Encoding:** All files UTF-8

## Out of Scope

The following are explicitly deferred to keep v1 minimal and shippable. The architecture does not need to accommodate these — they can be added later without refactoring.

- RSS/Atom feed generation — future v2 enhancement
- Search functionality — archive is browsable; search adds complexity
- Comments/discussion system — no backend; consider third-party in future
- Analytics integration — add post-launch via script tag
- Dark mode / theme switching — future v2 enhancement
- CMS or admin interface — Markdown + CLI is the CMS
- Tags/categories/taxonomy system — flat archive is sufficient for <50 posts
- Pagination — single-page archive; revisit if archive exceeds 50 posts
- Image optimization pipeline — author provides optimized images manually
- Deployment automation (CI/CD) — manual deploy to static host for now
- Multi-language support — Spanish only for v1
- Server-side rendering or API endpoints — static site only
- Syntax highlighting for code blocks — monospace styling only in v1
- Live reload / watch mode for local development — author uses any static server manually

## Open Questions

_No open questions — all requirements are specified based on CLAUDE.md architecture and reference site analysis._

## Metadata
- **Created:** 2026-02-26
- **Author:** rodhappi
- **Version:** 1.0
- **Spec path:** `specs/personal-blog-v1/spec.md`

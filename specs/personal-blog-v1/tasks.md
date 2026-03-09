# Tasks: Personal Blog v1

## Spec Reference
`specs/personal-blog-v1/spec.md`

## Plan Reference
`specs/personal-blog-v1/plan.md`

## Status Summary
- Total: 10
- Pending: 10
- In Progress: 0
- Complete: 0
- Blocked: 0

---

## Phase 1: Build Engine

### Task 1.1: Create Markdown parser
- **Status:** Pending
- **Spec requirement:** FR-2, FR-3
- **Description:** Write a Markdown-to-HTML converter function that handles: headings (`##`-`######`), bold (`**`), italic (`*`), links (`[text](url)`), images (`![alt](src)`), inline code, fenced code blocks, unordered/ordered lists, blockquotes, horizontal rules, and the custom `@video(url)` directive. The parser operates line-by-line, tracking block-level state (inside code block, inside list, inside blockquote). No external dependencies — pure string manipulation with regex. HTML entities in raw text must be escaped (`<`, `>`, `&`, `"`).
- **Test:** Create a test Markdown file with all supported syntax. Run parser. Verify output HTML matches expected structure for each element type.
- **Files:** `build.js` (parser functions)
- **Blocked by:** None

### Task 1.2: Create frontmatter parser
- **Status:** Pending
- **Spec requirement:** FR-1
- **Description:** Write a YAML frontmatter parser that extracts key-value pairs between `---` delimiters at the top of a Markdown file. Must handle: `title` (string), `date` (YYYY-MM-DD string), `description` (string), `featured` (boolean). Values are HTML-entity-escaped before use in templates (XSS prevention per FR-2). Missing fields use defaults: title from filename (kebab-case to title case), date from file mtime. Invalid date values trigger a warning and fall back to file mtime.
- **Test:** Parse a frontmatter block with all fields. Parse one with missing fields. Parse one with invalid date. Verify defaults and warnings.
- **Files:** `build.js` (frontmatter functions)
- **Blocked by:** None

### Task 1.3: Create build script with template engine
- **Status:** Pending
- **Spec requirement:** FR-4, FR-5, FR-6, FR-7, FR-12, FR-17, FR-18
- **Description:** Write the main `build.js` orchestration: (1) Clean old generated files (posts/*.html, index.html) for idempotency. (2) Read all `content/*.md` files. (3) Parse frontmatter + Markdown body for each. (4) Determine featured post (most recent `featured: true`; ties broken alphabetically; fallback: most recent post). (5) Build archive list (all non-featured posts, sorted newest-first by date). (6) Read `templates/post.html`, replace `{{title}}`, `{{date}}`, `{{description}}`, `{{content}}` for each post → write to `posts/slug.html`. (7) Read `templates/index.html`, replace `{{featured_title}}`, `{{featured_date}}`, `{{featured_description}}`, `{{featured_url}}`, `{{posts}}` (archive HTML list) → write to `index.html`. (8) Output `✓ N post(s) built successfully.` Handle edge cases: no content files, duplicate slugs, empty content directory.
- **Test:** Create 3 sample .md files (1 featured, 2 regular). Run build. Verify: correct number of output files, featured selection, archive order, template variable replacement, success message.
- **Files:** `build.js` (main script), `content/` (directory creation), `posts/` (directory creation)
- **Blocked by:** Task 1.1, Task 1.2

---

## Phase 2: Templates

### Task 2.1: Create homepage template
- **Status:** Pending
- **Spec requirement:** FR-5, FR-8, FR-10, FR-11
- **Description:** Create `templates/index.html` — the homepage HTML shell. Structure: `<!DOCTYPE html>` with `lang="es"`, `<head>` with meta tags (charset, viewport, description), Google Fonts `<link>` (Merriweather 400/700, JetBrains Mono 400), CSS link. `<body>` contains: skip-to-content link, `<header>` with site title/author name and brief bio, `<nav>` with hamburger toggle (mobile) and social links (X, LinkedIn, GitHub with `rel="noopener noreferrer"` and `target="_blank"`), `<main id="content">` with: "Escritos" section (`{{featured_title}}`, `{{featured_date}}`, `{{featured_description}}`, `{{featured_url}}`), "Archivo" section (`{{posts}}` placeholder for archive list), `<footer>` with social links and copyright. All interactive elements have `aria-*` attributes. Navigation toggle has `aria-expanded` and `aria-label`.
- **Test:** Open in browser. Verify semantic HTML structure (inspect DOM). Check all `{{placeholder}}` names match what build.js expects. Validate with HTML validator.
- **Files:** `templates/index.html`
- **Blocked by:** None

### Task 2.2: Create post page template
- **Status:** Pending
- **Spec requirement:** FR-4, FR-8
- **Description:** Create `templates/post.html` — the individual post HTML shell. Structure mirrors homepage head (same fonts, CSS). `<body>` contains: skip-to-content link, `<header>` with back-to-home link (← Home), `<main id="content">` with `<article>`: `<h1>{{title}}</h1>`, `<time>{{date}}</time>`, `<div class="post-content">{{content}}</div>`. `<footer>` with back-to-home link and social links. Same accessibility attributes as homepage. `<meta name="description" content="{{description}}">` in head.
- **Test:** Open in browser with sample content injected. Verify structure, back navigation works (relative link `../index.html` or `/`), meta description populated.
- **Files:** `templates/post.html`
- **Blocked by:** None

---

## Phase 3: Design System

### Task 3.1: Create CSS design tokens, typography, and layout
- **Status:** Pending
- **Spec requirement:** FR-13, FR-14
- **Description:** Create `css/style.css` with: (1) Minimal reset (box-sizing, margin/padding reset). (2) CSS custom properties on `:root`: `--color-bg: #faf9f7`, `--color-text: #2c2c2c`, `--color-accent: #0040FF`, `--color-text-secondary` (for dates/meta), `--font-serif: 'Merriweather', Georgia, serif`, `--font-mono: 'JetBrains Mono', monospace`, `--content-width: 46rem`, `--transition-smooth: cubic-bezier(0.66, 0, 0.15, 1)`, `--transition-ease: cubic-bezier(0.4, 0, 0.2, 1)`. (3) Typography: body font-size using `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)`, line-height 1.6-1.8, heading scales using clamp. (4) Layout: `.content` max-width `var(--content-width)`, centered with auto margins, padding for mobile. (5) Base element styles: headings, paragraphs, links (color, underline), blockquotes, code blocks (background, padding, border-radius, font-mono), images (max-width 100%, height auto), lists, horizontal rules.
- **Test:** Apply to templates. Verify: fluid font scaling (resize browser), content stays within 46rem, colors match tokens, code blocks use JetBrains Mono, contrast ratio passes (10.7:1 for body text).
- **Files:** `css/style.css`
- **Blocked by:** None

### Task 3.2: Create responsive layout and component styles
- **Status:** Pending
- **Spec requirement:** FR-9, FR-10, FR-11
- **Description:** Add to `css/style.css`: (1) Header/nav styles: desktop (≥768px) persistent horizontal nav; mobile (<768px) hamburger button visible, nav hidden off-screen (transform: translateX(-100%)). (2) Homepage components: author identity section, "Escritos" featured card (title, date, description, link), "Archivo" post list (title + date per row). (3) Post page components: back-link, article header (title + date), post-content prose styles. (4) Footer styles: social links with "/" separator. (5) Skip-to-content link: visually hidden, visible on focus. (6) Focus indicators: 2px solid `var(--color-accent)` outline, 2px offset on all interactive elements. (7) Mobile slide-out nav: full-width overlay, transition on transform property.
- **Test:** Test at multiple viewport widths (320px, 768px, 1024px, 1440px). Verify hamburger appears below 768px, nav layout switches, content is readable at all sizes. Tab through page — verify focus indicators visible.
- **Files:** `css/style.css`
- **Blocked by:** Task 3.1

---

## Phase 4: Interactions & Polish

### Task 4.1: Create CSS animations
- **Status:** Pending
- **Spec requirement:** FR-15, FR-16
- **Description:** Add to `css/style.css`: (1) Link hover underline: use `::after` pseudo-element with `transform: scaleX(0)` → `scaleX(1)` on hover, `transition: transform 300ms cubic-bezier(0.66, 0, 0.15, 1)`, `transform-origin: left`. (2) Page load fade-in: `@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`, applied to `<main>` with `animation: fadeIn 400ms ease-out`. (3) Nav slide transition: `transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1)`. (4) `@media (prefers-reduced-motion: reduce)` block that sets all `transition-duration: 0s`, `animation-duration: 0s`, removes transforms.
- **Test:** Hover over links — verify underline animates from left. Reload page — verify fade-in. Toggle nav — verify slide. Enable "Reduce motion" in OS accessibility settings — verify all animations instant.
- **Files:** `css/style.css`
- **Blocked by:** Task 3.2

### Task 4.2: Create navigation JavaScript
- **Status:** Pending
- **Spec requirement:** FR-9
- **Description:** Create `js/nav.js`: (1) Query the hamburger toggle button and nav element. (2) On toggle click: toggle `.nav-open` class on body/nav, update `aria-expanded` attribute. (3) On Escape key (when menu open): close menu, return focus to toggle button. (4) On click outside nav (when open): close menu. (5) No external dependencies. Script loaded with `defer` attribute in templates. ~30 lines of vanilla JS.
- **Test:** On mobile viewport: click hamburger → menu slides in, `aria-expanded="true"`. Click again → closes, `aria-expanded="false"`. Press Escape → closes, focus on toggle. Click outside → closes. Verify no console errors.
- **Files:** `js/nav.js`
- **Blocked by:** Task 2.1, Task 2.2

### Task 4.3: Create sample content and run integration test
- **Status:** Pending
- **Spec requirement:** All FRs
- **Description:** (1) Create `content/` directory with 2-3 sample blog posts in Spanish: one `featured: true`, others regular. Posts should exercise all Markdown features (headings, bold, italic, links, images, code blocks, lists, blockquotes, `@video()`). (2) Create `media/` directory. (3) Run `node build.js`. (4) Verify all output files exist and are correct. (5) Open generated site in browser and verify all acceptance criteria from US-1 through US-5. (6) Run Lighthouse audit — verify performance score and accessibility score.
- **Test:** Full end-to-end: write content → build → open in browser → verify every acceptance criterion manually. This is the integration test.
- **Files:** `content/*.md`, `media/` (directory)
- **Blocked by:** Task 1.3, Task 2.1, Task 2.2, Task 3.2, Task 4.1, Task 4.2

---

## Completion Criteria
- [ ] All tasks marked Complete
- [ ] All tests passing
- [ ] No blocked tasks remaining
- [ ] `node build.js` runs successfully with sample content
- [ ] Generated site passes Lighthouse performance audit (FCP < 1.0s)
- [ ] Generated site passes Lighthouse accessibility audit (WCAG 2.1 AA)
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Ready for `/review`

# Tasks: SEO & AI Agent Discoverability

**Plan:** `specs/seo-agent-discoverability/plan.md`
**Created:** 2026-04-01

---

## Phase 1: Build Pipeline — New Variables & File Generation

### Task 1.1: Add new template variables to build.js
- **Traces to:** FR-4, FR-5, FR-6, FR-7, FR-8
- **Description:** Pass new variables to `renderTemplate()` for both post and index pages:
  - `{{url}}` — full canonical URL
  - `{{iso_date}}` — ISO 8601 date string
  - `{{json_ld}}` — pre-built JSON-LD script block
  - `{{site_url}}` — `https://www.rodhappi.com`
- **Files:** `build.js` (modify)
- **Dependencies:** None
- **Status:** [x] Complete

### Task 1.2: Generate robots.txt in build.js
- **Traces to:** FR-1
- **Description:** After generating posts/homepage, write `robots.txt` to root with AI crawler policy (allow search bots, block training bots, reference sitemap)
- **Files:** `build.js` (modify)
- **Dependencies:** None
- **Status:** [x] Complete

### Task 1.3: Generate sitemap.xml in build.js
- **Traces to:** FR-2
- **Description:** Generate XML sitemap listing homepage + all published post URLs with `lastmod` dates in ISO format
- **Files:** `build.js` (modify)
- **Dependencies:** None
- **Status:** [x] Complete

### Task 1.4: Generate feed.xml (RSS) in build.js
- **Traces to:** FR-9
- **Description:** Generate RSS 2.0 feed with all published posts (title, description, link, pubDate)
- **Files:** `build.js` (modify)
- **Dependencies:** None
- **Status:** [x] Complete

## Phase 2: Template Modifications

### Task 2.1: Add meta tags to post template
- **Traces to:** FR-4, FR-5, FR-6, FR-8, FR-10
- **Description:** Add to `<head>` of `templates/post.html`:
  - Open Graph tags (og:title, og:description, og:url, og:type=article)
  - Twitter Card tags (twitter:card=summary, twitter:title, twitter:description)
  - Canonical URL link
  - RSS autodiscovery link
  - JSON-LD BlogPosting schema (via `{{json_ld}}` variable)
- **Files:** `templates/post.html` (modify)
- **Dependencies:** Task 1.1
- **Status:** [x] Complete

### Task 2.2: Add meta tags to index template
- **Traces to:** FR-4, FR-5, FR-7, FR-8, FR-10
- **Description:** Add to `<head>` of `templates/index.html`:
  - Open Graph tags (og:title, og:description, og:url, og:type=website)
  - Twitter Card tags
  - Canonical URL link
  - RSS autodiscovery link
  - JSON-LD WebSite schema (via `{{json_ld}}` variable)
- **Files:** `templates/index.html` (modify)
- **Dependencies:** Task 1.1
- **Status:** [x] Complete

## Phase 3: Static Files & Deploy

### Task 3.1: Create llms.txt
- **Traces to:** FR-3
- **Description:** Hand-write `llms.txt` at project root with site description and links to key content
- **Files:** `llms.txt` (create)
- **Dependencies:** None
- **Status:** [x] Complete

### Task 3.2: Update deploy workflow
- **Traces to:** FR-11
- **Description:** Add `cp` commands for `robots.txt`, `sitemap.xml`, `feed.xml`, `llms.txt` to `_site/` in `.github/workflows/deploy.yml`
- **Files:** `.github/workflows/deploy.yml` (modify)
- **Dependencies:** Task 1.2, 1.3, 1.4, 3.1
- **Status:** [x] Complete

## Phase 4: Verification

### Task 4.1: Build and verify all outputs
- **Traces to:** All FRs
- **Description:** Run `node build.js` and verify:
  - `robots.txt` exists with correct content
  - `sitemap.xml` lists all posts + homepage
  - `feed.xml` is valid RSS
  - Generated HTML contains OG, Twitter, canonical, JSON-LD tags
- **Dependencies:** All previous tasks
- **Status:** [x] Complete

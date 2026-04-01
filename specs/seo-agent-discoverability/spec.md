# SEO & AI Agent Discoverability

## Status
Draft

## Summary
Make the blog discoverable by both traditional search engines and AI agents. The site currently has minimal meta tags and no SEO infrastructure files. This spec covers adding robots.txt, sitemap.xml, llms.txt, Open Graph/Twitter meta tags, JSON-LD structured data, and an RSS feed.

## Problem Statement
The site has only basic `<meta description>` and `<title>` tags. It lacks:
- No `robots.txt` — search engines and AI crawlers have no crawling instructions
- No `sitemap.xml` — crawlers can't discover all pages efficiently
- No `llms.txt` — AI agents have no structured summary of site content
- No Open Graph or Twitter Card tags — links shared on social media show no rich previews
- No JSON-LD structured data — search engines can't generate rich snippets
- No RSS feed — no syndication or feed reader support
- No canonical URLs — potential duplicate content issues

## User Stories

### US-1: Search engine discoverability
**As the** site owner, **I want** search engines to efficiently crawl and index all published posts **so that** the blog appears in search results.

**Acceptance Criteria:**
- [ ] `robots.txt` exists at site root allowing all crawlers
- [ ] `sitemap.xml` lists all published post URLs with last-modified dates
- [ ] Each page has a canonical URL tag

### US-2: AI agent discoverability
**As the** site owner, **I want** AI agents (ChatGPT, Claude, Perplexity) to understand and reference my content **so that** my posts appear in AI-powered search answers.

**Acceptance Criteria:**
- [ ] `llms.txt` provides a structured summary of site content for LLMs
- [ ] `robots.txt` allows AI search crawlers (ChatGPT-User, Claude-SearchBot, PerplexityBot)
- [ ] JSON-LD structured data helps AI agents parse post metadata

### US-3: Social sharing
**As the** site owner, **I want** links shared on social media to display rich previews **so that** posts get better click-through rates.

**Acceptance Criteria:**
- [ ] Open Graph tags (`og:title`, `og:description`, `og:url`, `og:type`) on all pages
- [ ] Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`) on all pages
- [ ] Homepage and post pages have appropriate OG metadata

### US-4: Feed syndication
**As a** reader, **I want** an RSS feed **so that** I can follow the blog in my feed reader.

**Acceptance Criteria:**
- [ ] RSS feed available at `/feed.xml`
- [ ] Feed auto-discovery link in HTML `<head>`
- [ ] Feed includes all published posts with title, description, date, and link

## Functional Requirements

| # | Requirement | Priority | Acceptance Criteria |
|---|-------------|----------|---------------------|
| FR-1 | Generate `robots.txt` at build time | Must | File exists at site root, allows search/AI search crawlers, blocks AI training crawlers, references sitemap |
| FR-2 | Generate `sitemap.xml` at build time | Must | Lists all published post URLs + homepage with `lastmod` dates |
| FR-3 | Create `llms.txt` | Must | Markdown file at site root describing the site and linking to key content |
| FR-4 | Add Open Graph meta tags to both templates | Must | `og:title`, `og:description`, `og:url`, `og:type` present in generated HTML |
| FR-5 | Add Twitter Card meta tags to both templates | Should | `twitter:card`, `twitter:title`, `twitter:description` present |
| FR-6 | Add JSON-LD BlogPosting schema to post template | Must | Valid schema.org BlogPosting in each post page |
| FR-7 | Add JSON-LD WebSite schema to index template | Should | Valid schema.org WebSite on homepage |
| FR-8 | Add canonical URL tags to both templates | Must | `<link rel="canonical">` on all pages |
| FR-9 | Generate RSS feed (`feed.xml`) at build time | Should | Valid RSS 2.0 feed with all published posts |
| FR-10 | Add RSS auto-discovery link to templates | Should | `<link rel="alternate" type="application/rss+xml">` in `<head>` |
| FR-11 | Update deploy workflow to include new files | Must | `robots.txt`, `sitemap.xml`, `llms.txt`, `feed.xml` deployed to `_site/` |

## Non-Functional Requirements

### Performance
- No additional HTTP requests from meta tags (they're inline HTML)
- Generated files (sitemap, feed, robots.txt) are small static files — negligible impact

### Security
- No secrets or sensitive data in any generated file
- `robots.txt` AI crawler policy is intentional: allow search, block training

### Accessibility
- No UI changes — all additions are metadata/infrastructure

## Technical Approach

### Build-time generation (in `build.js`)
These files are generated during the build, using post metadata already parsed by `build.js`:
- `robots.txt` — static content with sitemap reference
- `sitemap.xml` — list all published post URLs + homepage
- `feed.xml` — RSS 2.0 feed with post title, description, date, link

### Template modifications
- `templates/index.html` — add OG tags, Twitter tags, canonical, JSON-LD WebSite schema, RSS autodiscovery
- `templates/post.html` — add OG tags, Twitter tags, canonical, JSON-LD BlogPosting schema, RSS autodiscovery

### Static file
- `llms.txt` — hand-written Markdown file describing the site (not generated, since it's a curated summary)

### Deploy workflow update
- `.github/workflows/deploy.yml` — add `cp` commands for `robots.txt`, `sitemap.xml`, `feed.xml`, `llms.txt`

### robots.txt AI crawler strategy
```
# Allow search engine crawlers
User-agent: *
Allow: /

# Allow AI search crawlers (real-time retrieval)
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: PerplexityBot
User-agent: OAI-SearchBot
Allow: /

# Block AI training crawlers
User-agent: GPTBot
User-agent: Google-Extended
User-agent: CCBot
User-agent: anthropic-ai
Disallow: /

Sitemap: https://www.rodhappi.com/sitemap.xml
```

### Template placeholders needed
`build.js` already supports `{{title}}`, `{{description}}`, `{{date}}`, `{{content}}`. For OG/canonical tags, we'll need:
- `{{url}}` — full URL of the page (e.g., `https://www.rodhappi.com/posts/my-post.html`)
- `{{site_url}}` — `https://www.rodhappi.com`

## Edge Cases and Error States

| Scenario | Expected Behavior |
|----------|-------------------|
| Post with no description | Use title as fallback for OG/Twitter description |
| Post with special characters in title | HTML-escape in meta tags, XML-escape in sitemap/feed |
| No published posts (all drafts) | Sitemap contains only homepage; feed is empty but valid |
| Very long description (>200 chars) | Truncate at 160 characters for meta description best practice |

## Dependencies and Constraints
- Site URL hardcoded as `https://www.rodhappi.com` (already in CNAME)
- No `og:image` — site has no default social image yet (can be added later)
- `build.js` must be modified to generate new files and inject new template variables

## Out of Scope
- `og:image` / social sharing images (requires design work)
- Google Search Console verification/setup
- Cookie consent banner
- `.well-known/` directory (standards still evolving)
- `humans.txt` (nice-to-have, can add later)
- Analytics integration (handled separately by Pendo spec)

## Metadata
- **Created:** 2026-04-01
- **Author:** Claude (AI-assisted)
- **Version:** 1.0
- **Spec path:** `specs/seo-agent-discoverability/spec.md`

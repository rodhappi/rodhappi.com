# Implementation Plan: SEO & AI Agent Discoverability

**Spec:** `specs/seo-agent-discoverability/spec.md`
**Created:** 2026-04-01

---

## Goal

Make the blog discoverable by search engines, AI agents, and social platforms by adding metadata, structured data, and infrastructure files.

## Technical Approach

Two areas of work:

### 1. Template modifications (meta tags in HTML)
Add to `<head>` of both `templates/index.html` and `templates/post.html`:
- Open Graph tags (`og:title`, `og:description`, `og:url`, `og:type`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`)
- Canonical URL (`<link rel="canonical">`)
- RSS autodiscovery (`<link rel="alternate" type="application/rss+xml">`)
- JSON-LD structured data (WebSite schema for index, BlogPosting schema for posts)

This requires new template variables. `build.js` already has `renderTemplate()` which replaces `{{key}}` placeholders. We need to pass new variables:
- `{{url}}` — full page URL
- `{{slug}}` — post slug (for building URLs)
- `{{iso_date}}` — ISO 8601 date for JSON-LD
- `{{json_ld}}` — pre-rendered JSON-LD block (simpler than adding many template vars)

### 2. Build-time file generation (in `build.js`)
After generating posts and homepage, also generate:
- `robots.txt` — static content with AI crawler policy
- `sitemap.xml` — dynamic, lists all published posts + homepage
- `feed.xml` — RSS 2.0 feed with all published posts
- `llms.txt` — hand-written file (created manually, not by build.js)

### 3. Deploy workflow update
Add `cp` commands to `.github/workflows/deploy.yml` for the new root files.

## Implementation Order

The work naturally splits into phases:
1. **Build.js changes** — add new template variables, generate robots.txt/sitemap/feed
2. **Template changes** — add meta tags, canonical, OG, Twitter, JSON-LD, RSS link
3. **Static files** — create `llms.txt` manually
4. **Deploy update** — add new files to `_site/` staging

## Constitutional Compliance

| Article | Status | Notes |
|---------|--------|-------|
| I (Spec-First) | Pass | Spec at `specs/seo-agent-discoverability/spec.md` |
| III (Simplicity) | Pass | All changes in existing files (build.js, 2 templates, deploy.yml) + 1 new static file (llms.txt) |

## Components

| Component | Action | File |
|-----------|--------|------|
| Build pipeline | **Modify** | `build.js` |
| Homepage template | **Modify** | `templates/index.html` |
| Post template | **Modify** | `templates/post.html` |
| Deploy workflow | **Modify** | `.github/workflows/deploy.yml` |
| LLMs description | **Create** | `llms.txt` |

## Dependencies

- Site URL: `https://www.rodhappi.com` (hardcoded, matches CNAME)
- Existing `build.js` template variable system (`{{key}}` replacement)
- Existing post metadata (title, description, date, slug) — all already parsed

## Test Strategy

1. **Build verification:** Run `node build.js`, confirm new files are generated (`robots.txt`, `sitemap.xml`, `feed.xml`)
2. **HTML verification:** Check generated HTML for OG tags, Twitter tags, canonical, JSON-LD
3. **XML validation:** Verify sitemap.xml and feed.xml are well-formed XML
4. **JSON-LD validation:** Verify JSON-LD parses correctly (valid JSON in script tag)
5. **Manual verification:** After deploy, test with social media debuggers and Google's Rich Results Test

## Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Template variable conflicts with existing `{{key}}` | Low | New variable names are unique (`url`, `slug`, `iso_date`, `json_ld`) |
| Malformed XML in sitemap/feed | Medium | Use string escaping for special characters in URLs and content |
| JSON-LD invalid JSON | Low | Build as JS object, use `JSON.stringify()` |

## Rollback

Revert `build.js`, both templates, and `deploy.yml`. Delete `llms.txt`. Push.

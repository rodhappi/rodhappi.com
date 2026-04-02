# Consistent URL Encoding Across Output Formats

## Context

When a site generates URLs in multiple places (HTML links, XML sitemap, RSS feed, Open Graph tags, canonical tags, JSON-LD), the encoding must be consistent. If HTML links use raw UTF-8 (`posts/Cómo-adoptar...`) while the sitemap uses percent-encoding (`posts/C%C3%B3mo-adoptar...`), search engines may treat them as different URLs, fragmenting link equity and causing indexing confusion.

## Pattern

Use `encodeURIComponent()` on URL path segments everywhere URLs are constructed:

```javascript
const url = `${SITE_URL}/posts/${encodeURIComponent(post.slug)}.html`;
```

Apply this in:
- HTML `<a href="...">` links (post cards, navigation)
- `<link rel="canonical">` tags
- Open Graph `og:url` meta tags
- `<loc>` in sitemap.xml
- `<link>` and `<guid>` in RSS feed
- `url` in JSON-LD structured data

## Why not raw UTF-8?

Modern browsers handle raw UTF-8 in href attributes, but:
- XML requires percent-encoding for non-ASCII characters
- RFC 3986 specifies percent-encoding as the standard
- Search engines normalize URLs — inconsistency risks them being treated as separate pages

## Discovery

Found during SEO review. `renderPostCards()` used raw slugs while sitemap/feed generation used `encodeURIComponent()`. The data integrity reviewer flagged the inconsistency as P2.

## Tags

`seo`, `url-encoding`, `consistency`, `sitemap`, `rss`, `canonical`

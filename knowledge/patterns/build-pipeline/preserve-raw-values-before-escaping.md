# Preserve Raw Values Before HTML Escaping for Multi-Format Output

## Context

When a build pipeline parses content metadata (titles, descriptions) and HTML-escapes them early for safe HTML rendering, those escaped values become corrupted when used in other output formats like JSON-LD structured data, RSS/Atom feeds, or XML sitemaps.

For example, a title like `"AI & Latam"` becomes `"AI &amp; Latam"` after HTML escaping. If that escaped value is then passed to `JSON.stringify()`, the JSON-LD contains the literal string `AI &amp; Latam` instead of `AI & Latam`.

## Pattern

Store raw (unescaped) copies of metadata values **before** applying HTML escaping. Use the raw values for non-HTML output formats.

```javascript
// Before escaping, preserve raw values
meta.rawTitle = meta.title;
meta.rawDescription = meta.description || '';

// Then escape for HTML contexts
meta.title = escapeHtml(meta.title);
meta.description = escapeHtml(meta.description || '');
```

Use `meta.rawTitle` for:
- JSON-LD (`JSON.stringify()` handles its own escaping)
- RSS/Atom feeds (use `escapeXml()` on raw values, not double-escape)
- Plain text contexts

Use `meta.title` (escaped) for:
- HTML attributes (`content="..."`)
- HTML text nodes

## Additional Safety

When embedding JSON inside a `<script>` tag, sanitize `</` to prevent breaking out of the script block:

```javascript
const jsonLd = JSON.stringify(data).replace(/<\//g, '<\\/');
```

## Discovery

Found during the SEO & AI discoverability feature. The review caught that JSON-LD structured data contained HTML entities, making it invalid for search engines and AI agents parsing schema.org data.

## Tags

`build-pipeline`, `escaping`, `multi-format`, `json-ld`, `rss`, `seo`

# Validate URL Schemes on User-Provided Paths

## Category
Pattern

## Summary
Apply the same safe-URL allowlist to frontmatter fields rendered as HTML attribute URLs (e.g., `src`, `href`) as you do to inline markdown links. HTML-escaping alone does not block dangerous URL schemes like `javascript:` or `data:`.

## Context
During the Escritos Card Layout feature, a `thumbnail` frontmatter field was added and rendered as `<img src="${meta.thumbnail}">`. The value was HTML-escaped (preventing attribute breakout XSS), but `escapeHtml()` does not sanitize URL schemes. A value like `javascript:alert(1)` or `data:text/html,...` survives HTML-escaping intact. The security review agent caught this gap.

The codebase already had a `SAFE_URL` regex in `parseInline()` for markdown links — the fix was to apply the same pattern to the thumbnail path.

## Solution

### When to Apply
Any time a user-provided string (frontmatter field, config value) is rendered as a URL attribute in generated HTML (`src`, `href`, `action`, `poster`, etc.).

### How to Apply
1. Define an allowlist regex for safe URL schemes:
   ```javascript
   const SAFE_URL = /^(https?:\/\/|\/|\.\/|\.\.\/|media\/)/i;
   ```
2. Test the raw value before escaping:
   ```javascript
   meta.thumbnail = rawValue && SAFE_URL.test(rawValue) ? escapeHtml(rawValue) : '';
   ```
3. Reject values that don't match — default to empty string, not the raw value.

### Key Points
- `escapeHtml()` neutralizes `<`, `>`, `"`, `&` — prevents attribute breakout
- `escapeHtml()` does NOT neutralize `javascript:`, `data:`, or protocol-relative `//` URLs
- Both protections are needed: escaping for attribute context + allowlist for URL scheme
- Reuse the same allowlist pattern across the codebase for consistency

## Tags
security, xss, url-validation, frontmatter, html-escaping, owasp

## Metadata
- Created: 2026-03-02
- Source: Security review of Escritos Card Layout feature — thumbnail path validation
- Verified: Yes

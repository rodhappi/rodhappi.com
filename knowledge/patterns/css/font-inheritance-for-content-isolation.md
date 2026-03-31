# Font Inheritance for Content Isolation

## Context
When a site uses different fonts for UI chrome (sans-serif) and editorial content (serif), you need to isolate the content area without overriding every element type inside it.

## Pattern
Set `font-family` on the content container. All child elements (headings, paragraphs, blockquotes, lists) inherit it through the CSS cascade. No per-element overrides needed.

```css
/* Body defaults to sans-serif */
body { font-family: var(--font-sans); }

/* Content container switches to serif — children inherit */
.post-content { font-family: var(--font-serif); }

/* No need for .post-content h2, .post-content p, etc. */
```

## Why It Matters
- Fewer CSS rules, less maintenance
- `font-family` inherits naturally — no special behavior needed
- Adding new element types inside content (e.g., `<details>`, `<figure>`) automatically gets the right font

## When It Breaks
- If a child element has its own `font-family` declaration (e.g., `code` using `--font-mono`), that override takes precedence — which is usually the desired behavior.

## Origin
Confirmed during the Google Sans Flex font migration (`specs/google-sans-flex-font/`). The review verified that h2-h6 inside `.post-content` correctly inherited Merriweather without explicit overrides.

## Tags
css, font-family, inheritance, cascade, typography, content-isolation

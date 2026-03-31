# Google Sans Flex as Default UI Font

## Status
Draft

## Summary
Apply Google Sans Flex as the default font for all UI text across the site, while preserving Merriweather for editorial content (post titles, descriptions, body text) and for the `.identity-name` class. This creates a clear typographic hierarchy: sans-serif for interface elements, serif for content.

## Problem Statement
Currently, the site uses Merriweather (serif) as the base `font-family` for nearly all text. Google Sans Flex is only used on `.identity-line`. The user wants Google Sans Flex as the default font for all UI/chrome text, keeping Merriweather exclusively for content and the identity name — establishing a clearer visual separation between interface and editorial content.

## User Stories

### US-1: Consistent UI Typography
**As a** visitor, **I want** navigation, dates, labels, and other UI elements to use a clean sans-serif font **so that** the interface feels modern and the editorial content stands out by contrast.

**Acceptance Criteria:**
- [ ] Navigation links use Google Sans Flex
- [ ] Post card dates and reading time use Google Sans Flex
- [ ] Archive section labels and toggle use Google Sans Flex
- [ ] Footer text uses Google Sans Flex
- [ ] Section headings ("Escritos", "Archivo") use Google Sans Flex

### US-2: Preserved Editorial Identity
**As a** reader, **I want** post titles, descriptions, and body content to remain in Merriweather **so that** the reading experience retains its editorial quality.

**Acceptance Criteria:**
- [ ] Post page: `<h1>` title renders in Merriweather
- [ ] Post page: `.post-content` body renders in Merriweather (including headings within content)
- [ ] Homepage: `.identity-name` renders in Merriweather
- [ ] Post card titles on the homepage render in Merriweather

## Functional Requirements

| # | Requirement | Priority | Acceptance Criteria |
|---|-------------|----------|---------------------|
| FR-1 | Add `--font-sans` CSS custom property for Google Sans Flex | Must | Variable defined in `:root` with fallback to `sans-serif` |
| FR-2 | Set `body` base font to `var(--font-sans)` | Must | Default font for all text is Google Sans Flex |
| FR-3 | Apply `var(--font-serif)` to `.post-title`, `.post-content`, `.identity-name` | Must | These elements render in Merriweather |
| FR-4 | Apply `var(--font-serif)` to post card titles (`.post-card-title`) | Must | Card titles render in Merriweather |
| FR-5 | Load Google Sans Flex in `post.html` template | Must | Post pages load the font (currently only loaded in `index.html`) |
| FR-6 | Post description in meta/listings may use the default sans-serif | Should | Descriptions in cards use Google Sans Flex for UI consistency |

## Non-Functional Requirements

### Performance
- No additional font files beyond what's already loaded (Google Sans Flex is already in `index.html`; just needs adding to `post.html`)
- `font-display: swap` maintained for no render-blocking

### Security
- No impact (font loading from Google Fonts CDN, already in use)

### Accessibility
- Font size, weight, and contrast remain unchanged — no regression in readability
- WCAG 2.1 AA compliance maintained

## Edge Cases and Error States

| Scenario | Expected Behavior |
|----------|-------------------|
| Google Fonts CDN unavailable | Fallback to system sans-serif for UI, system serif for content |
| Content headings (h2-h6 inside `.post-content`) | Inherit Merriweather from `.post-content`, not the body sans-serif |
| Inline code inside content | Continue using `--font-mono` (JetBrains Mono) regardless of surrounding font |
| `.identity-line` | Remains Google Sans Flex (already is; no change needed) |

## Dependencies and Constraints
- Google Fonts CDN for font loading (existing dependency)
- No npm/build changes required — CSS-only change plus template font link update

## Out of Scope
- Changing font weights or sizes
- Adding new fonts beyond what's already used
- Modifying the JetBrains Mono (code) font usage
- Changing the `.identity-line` font (already Google Sans Flex)

## Open Questions
_None._

## Metadata
- **Created:** 2026-03-11
- **Author:** rodhappi
- **Version:** 1.0
- **Spec path:** `specs/google-sans-flex-font/spec.md`

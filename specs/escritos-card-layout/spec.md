# Specification: Escritos Card Layout

**Status:** Validated
**Created:** 2026-03-01
**Feature:** Redesign the "Escritos" section to show post cards with thumbnails, dates, titles, and reading time — listing all posts from the current month.

---

## 1. Problem Statement

The "Escritos" section currently shows a single featured post as a minimal row (title + dotted leader + short date). This doesn't match the desired design: a card layout with a thumbnail image, full date, bold title, and reading time. Additionally, only one post appears — the user wants all posts from the current month listed here.

## 2. Definitions

- **Current month:** The month in which `node build.js` is run. All posts with a `date` in that month appear in Escritos.
- **Post card:** A horizontal row with thumbnail (left), date + title + reading time (right).
- **Reading time:** `Math.ceil(wordCount / 200)` in minutes, displayed in Spanish (e.g., "5 minutos", "1 minuto").
- **Thumbnail:** An image path specified in frontmatter (`thumbnail: media/my-image.png`). Optional field.

## 3. User Stories

**US-1:** As a reader, I want to see a thumbnail, date, title, and reading time for each recent post so I can quickly decide what to read.
- **AC:** Each post card shows: thumbnail (if provided), date in "DD MMM, YYYY" format (Spanish, uppercase month abbreviation), bold title, and reading time.

**US-2:** As a reader, I want to see all posts from the current month in the Escritos section so I can find recent content easily.
- **AC:** All posts whose `date` falls in the same month/year as the build date appear in Escritos. Posts from earlier months appear only in Archivo.

**US-3:** As a content author, I want to add a thumbnail to my posts via frontmatter so I can control the visual appearance.
- **AC:** Adding `thumbnail: media/my-image.png` to a post's frontmatter displays that image in the post card.

## 4. Functional Requirements

### FR-1: Thumbnail Frontmatter Field
- Add support for an optional `thumbnail` field in YAML frontmatter
- Store as `meta.thumbnail` (HTML-escaped path)
- If not provided, `meta.thumbnail` is an empty string

### FR-2: Reading Time Calculation
- Add a `calculateReadingTime(markdownBody)` function to `build.js`
- Count words by splitting on whitespace: `body.trim().split(/\s+/).length`
- Divide by 200, round up: `Math.ceil(words / 200)`
- Store as `meta.readingTime` (integer, minutes)
- Display as `"N minutos"` (or `"1 minuto"` for singular)

### FR-3: Current-Month Filtering for Escritos
- Determine current month/year at build time: `new Date()` (local timezone) → month + year
- Filter posts: all posts where `meta.date` month and year match the build month/year go into Escritos
- Remaining posts go into Archivo
- Remove the `featured: true` flag logic for determining Escritos placement — month-based filtering replaces it
- Sort Escritos posts by date descending (newest first within the month)
- If no posts match the current month, the Escritos section heading remains visible but no cards are rendered (empty list, no placeholder message)

### FR-4: Post Card HTML Structure
Replace the current `.post-row` HTML in Escritos with a card layout:

```html
<a href="posts/slug.html" class="post-card">
  <img src="media/image.png" alt="" class="post-card-thumb" loading="lazy">
  <div class="post-card-body">
    <span class="post-card-date">26 FEB, 2026</span>
    <span class="post-card-title">Post Title Here</span>
    <span class="post-card-readtime">5 minutos</span>
  </div>
</a>
```

- If no thumbnail: omit the `<img>` element entirely (don't render an empty/broken image)
- Date format: `DD MMM, YYYY` with uppercase 3-letter Spanish month abbreviation (e.g., "26 FEB, 2026", "15 ENE, 2025")
- Title: rendered as a `<span>` (not `<h2>`) — styled bold via CSS
- Reading time: below the title, secondary color, smaller font

### FR-5: Date Format — Short Uppercase
Add a `formatDateCard(date)` function returning `"DD MMM, YYYY"`:
- Day: zero-padded or unpadded (match reference: no padding → "1 FEB, 2026")
- Month: 3-letter uppercase Spanish abbreviation
- Year: 4-digit

Spanish month abbreviations: ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC

### FR-6: Post Card CSS (Mobile-First)
New styles added to existing CSS. Base styles target mobile; tablet+ overrides go in the `@media (min-width: 768px)` block. Uses existing CSS custom properties (`--color-text`, `--color-text-secondary`, `--color-accent`, `--space-md`, `--space-xs`).

**Base (mobile):**
- **`.post-card`** — `display: flex; gap: 0.75rem; align-items: flex-start; padding: var(--space-md) 0; color: var(--color-text); text-decoration: none;` No link underline animation.
- **`.post-card-thumb`** — `width: 64px; height: 64px; border-radius: 10px; object-fit: cover; flex-shrink: 0; margin: 0;` Override the global `img` margin.
- **`.post-card-body`** — `display: flex; flex-direction: column; gap: var(--space-xs);`
- **`.post-card-date`** — `font-size: 0.75rem; color: var(--color-text-secondary); letter-spacing: 0.05em;`
- **`.post-card-title`** — `font-size: 1rem; font-weight: 700; line-height: 1.3;`
- **`.post-card:hover .post-card-title`** — `color: var(--color-accent);` (scoped to card hover, not title hover)
- **`.post-card-readtime`** — `font-size: 0.8rem; color: var(--color-text-secondary);`

**Tablet+ (`@media (min-width: 768px)`):**
- **`.post-card`** — `gap: 1rem;`
- **`.post-card-thumb`** — `width: 80px; height: 80px; border-radius: 12px;`
- **`.post-card-title`** — `font-size: 1.1rem;`

### FR-7: Archivo Keeps Post-Row Style
The Archivo section continues using the existing `.post-row` pattern (title + dotted leader + short date). No changes to Archivo layout. Archive now contains all posts NOT in the current month.

### FR-8: Responsive Post Card
Responsive values are now defined directly in FR-6 (mobile-first base + tablet breakpoint). Summary for reference:
- **Mobile (base):** Thumbnail `64px × 64px`, `border-radius: 10px`. Title font `1rem`. Card gap `0.75rem`.
- **Tablet+ (768px):** Thumbnail `80px × 80px`, `border-radius: 12px`. Title font `1.1rem`. Card gap `1rem`.

## 5. Non-Functional Requirements

### NFR-1: No Visual Regression
Archivo section, post pages, footer, and navigation must remain unchanged.

### NFR-2: Performance
No additional JS or CSS files. Thumbnail images should use `loading="lazy"`.

### NFR-3: Accessibility
- Thumbnail `<img>` uses `alt=""` (decorative — the title is the link text)
- Post card link is accessible: the entire card is the `<a>` element
- Reading time is informational, no ARIA needed
- Tap target: entire card row is clickable, well above 44px height

## 6. Files Modified

| File | Change |
|------|--------|
| `build.js` | Add `calculateReadingTime()`, `formatDateCard()`, month filtering, post card HTML generation |
| `css/style.css` | Add `.post-card` styles (~30 lines) |
| `content/*.md` | Add `thumbnail` field to frontmatter (optional) |

**Not modified:** `templates/index.html` (still uses `{{featured_section}}`), `templates/post.html`, `js/nav.js`

## 7. Edge Cases

- **No posts in current month:** Escritos section heading remains, no cards rendered, no placeholder message. Archivo shows all posts.
- **Post without thumbnail:** Card renders without `<img>`, text content shifts left to fill space.
- **Very long title:** Wraps naturally. No truncation.
- **1-minute reading time:** Display "1 minuto" (singular).
- **Post with 0 words (empty body):** Reading time = "1 minuto" (minimum).
- **Build run on the last day of the month vs first day:** Uses `new Date()` at build time. Posts are assigned to months based on their frontmatter `date`, not build date. Only the "current month" window shifts.

## 8. Out of Scope

- Dark mode
- Post card hover animations (beyond title color change)
- Thumbnail auto-extraction from post content
- Reading time in post pages (only on homepage cards)
- Changes to the Archivo section layout
- `featured` frontmatter flag removal (can be ignored; month filtering takes precedence)

## 9. Verification

1. `node build.js` succeeds
2. Escritos shows all posts from the current build month as cards
3. Each card: thumbnail (if provided), date in "DD MMM, YYYY" format, bold title, reading time
4. Card without thumbnail: no broken image, text aligns left
5. Archivo shows only posts from previous months
6. Mobile (375px): smaller thumbnails, readable layout
7. Desktop (1024px): 80px thumbnails, proper spacing
8. Post pages unaffected

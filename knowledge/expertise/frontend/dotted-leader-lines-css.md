# Dotted Leader Lines with CSS repeating-linear-gradient

## Category
Domain Expertise

## Summary
Use a flex spacer element with `repeating-linear-gradient` to create dotted leader lines between a title and a date in editorial-style post listings.

## Context
Editorial and minimalist blog designs (like edwinchen.ai) use dotted leader lines — the row of dots connecting a title to its date, similar to a table of contents. This is a purely CSS solution that requires no JavaScript or images.

## Technique

### HTML Structure
```html
<a href="..." class="post-row">
  <span class="post-row-title">Post Title</span>
  <span class="post-row-leader" aria-hidden="true"></span>
  <span class="post-row-date">febrero 2026</span>
</a>
```

### CSS
```css
.post-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.post-row-leader {
  flex: 1;
  min-width: 2rem;
  height: 1px;
  align-self: center;
  background: repeating-linear-gradient(
    to right,
    var(--color-border) 0,
    var(--color-border) 2px,
    transparent 2px,
    transparent 6px
  );
}
```

### Key Points
- `flex: 1` makes the leader fill all available space between title and date
- `min-width: 2rem` prevents the dots from disappearing on narrow screens
- `align-self: center` vertically centers the dots relative to the text baseline
- `aria-hidden="true"` on the leader — it's decorative, not content
- Adjust the gradient stops (`2px` dot, `4px` gap) to control dot density
- `white-space: nowrap` on the date prevents wrapping

## Variations
- **Solid line:** Replace `repeating-linear-gradient` with a solid `background-color` and `height: 1px`
- **Dashed:** Increase gap between gradient stops (e.g., `2px` dot, `8px` gap)
- **Color:** Use `var(--color-text-secondary)` for more visible dots

## Tags
css, design-pattern, typography, editorial, flexbox, leader-lines

## Metadata
- Created: 2026-02-27
- Source: Homepage redesign matching edwinchen.ai reference
- Verified: Yes

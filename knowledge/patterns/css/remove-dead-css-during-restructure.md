# Remove Dead CSS During Restructure

## Category
Pattern

## Summary
When a template changes significantly (e.g., homepage redesign), audit the CSS for orphaned classes in the same session. Dead code accumulates silently and inflates file size.

## Context
During a homepage redesign, the template switched from card-style featured posts (`.featured-link`, `.featured-title`, `.featured-date`, `.featured-description`) to simple post rows (`.post-row`). The old CSS classes were left behind — 60+ lines of dead code that bloated the stylesheet and confused the code review.

## Solution

### When to Audit
- Immediately after changing a template's HTML structure
- During any CSS restructure (mobile-first conversion, etc.)
- When the code review flags unused classes

### How to Audit
1. List all CSS class selectors in the stylesheet
2. Grep for each class across all templates and build output
3. Any class not referenced in templates or generated HTML is dead
4. Remove dead classes and re-run the build to verify nothing breaks

### Key Points
- Dead CSS doesn't cause errors — it's invisible until someone reviews the file
- The longer dead code sits, the harder it is to confidently remove (you forget why it was there)
- Removing 60 lines of dead CSS saved 764 bytes in this case

## Tags
css, cleanup, dead-code, maintenance, code-review

## Metadata
- Created: 2026-03-01
- Source: Review of mobile-first restructure found ~60 lines of orphaned classes from prior homepage redesign
- Verified: Yes

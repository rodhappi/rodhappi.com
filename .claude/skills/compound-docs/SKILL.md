---
name: compound-docs
description: >
  Create structured knowledge entries from confirmed candidates. Activate after
  /compound has user-confirmed candidates from reflection-loop. Applies
  category-specific templates and writes entries to knowledge/.
---

# Compound Docs

Transform confirmed knowledge candidates into structured, searchable entries.

## When to Activate

- Invoked by the `/compound` command at Step 4 (after user confirmation)
- Never standalone -- always receives confirmed candidates from `/compound`

## Entry Creation Protocol

For each confirmed candidate:

### Step 1: Select Template

Based on the candidate's category, use the corresponding template from `appendix/knowledge-templates.md`:

| Category | Template | Directory |
|----------|----------|-----------|
| Pattern | Pattern Template | `knowledge/patterns/` |
| Fix | Fix Template | `knowledge/fixes/` |
| Decision | Decision Template (ADR) | `knowledge/decisions/` |
| Anti-Pattern | Anti-Pattern Template | `knowledge/anti-patterns/` |
| Domain Expertise | Domain Expertise Template | `knowledge/expertise/` |
| Quick Capture | Quick Capture Template | Appropriate category dir |

### Step 2: Determine File Path

Follow the naming convention from `appendix/knowledge-templates.md`:

```
knowledge/patterns/{subcategory}/{descriptive-name}.md
knowledge/fixes/{technology-or-error-type}/{descriptive-name}.md
knowledge/decisions/adr-{number}-{title}.md
knowledge/anti-patterns/{descriptive-name}.md
knowledge/expertise/{domain}/{descriptive-name}.md
```

- Use kebab-case for all file and directory names
- Create subdirectories as needed (e.g., `knowledge/fixes/react/`)
- For Decisions: count existing files in `knowledge/decisions/` to determine the next ADR number (e.g., `adr-001-...`, `adr-002-...`)

### Step 3: Duplicate Check

Before writing, scan `knowledge/index.md`:
- Check for an existing entry with the same or very similar title
- Check for entries with overlapping tags
- If a potential duplicate is found, ask the user: update the existing entry or create a new one?

### Step 4: Fill Template

Apply the template, filling all sections with the candidate's raw content:
- **Title:** From the candidate title
- **Category:** From the candidate category
- **Summary:** First sentence of the raw content
- **Tags:** From the candidate tags
- **Metadata:** Set Created date to today, Source to current project, Verified to "No" (user can verify later)
- **Content sections:** Expand the raw content into the template's sections. If information is missing for a section, mark it with `[TODO: expand]`

### Step 5: Write File

Write the completed entry to the determined file path.

### Step 6: Update Index

Update `knowledge/index.md`:

1. **Category section:** Add a line under the appropriate category:
   ```
   - [{Title}]({relative-path}) -- {one-line summary}
   ```
   Replace the `_No entries yet._` placeholder if it is the first entry in that category.

2. **Recently Added section:** Add a line at the top:
   ```
   - {YYYY-MM-DD}: [{Title}]({relative-path})
   ```
   Replace the `_No entries yet._` placeholder if needed.

3. **Needs Expansion section** (Quick Captures only): Add a line:
   ```
   - [{Title}]({relative-path}) -- captured {date}, needs full template
   ```

## Quick Capture Mode

For candidates where:
- The user says "capture but don't expand" or "quick capture"
- Confidence is Low and the user still wants to capture

Use the Quick Capture template from `appendix/knowledge-templates.md`. This creates a minimal entry with a `[TODO: expand]` marker. Add to the "Needs Expansion" section of the index.

## Output

After writing all entries, report:
- Each file path written
- Each index update made
- Any entries that need expansion

## Integration

- The `/compound` command invokes this skill at Step 4
- Templates are defined in `appendix/knowledge-templates.md` (5 category templates + Quick Capture)
- The common template at `templates/knowledge-template.md` provides a simplified reference
- The `knowledge-searcher` agent (L3) will find these entries in future sessions

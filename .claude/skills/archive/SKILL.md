---
name: archive
description: >
  Merge approved changes back to source specifications and archive the change
  folder. Used after /review in brownfield workflows. Applies delta specs,
  updates source specs, and moves the change folder to the archive.
---

# /archive -- Merge Changes to Source Specs

Merge approved change delta specs back to the source specifications and archive.

## Workflow Position

```
/propose → /clarify → /plan → /approve → /work → /review → [/archive] → /compound
```

**Gate in:** Review approved (no P1 findings)
**Gate out:** Source specs updated, change folder archived

## When to Activate

- After a brownfield change passes review
- User says "archive", "merge changes"

## Procedure

### Step 1: Verify Gate In

- Confirm review has passed (no P1 findings)
- Locate the change folder at `changes/{change-name}/`
- Read the proposal to identify delta specifications

### Step 2: Apply Delta Specs

For each delta specification in the proposal:

**Added requirements:**
- Append new requirements to the source specification
- Add new acceptance criteria to relevant user stories
- Update the requirements numbering

**Modified requirements:**
- Replace the original requirement text with the new version
- Add a revision comment: `<!-- Modified from {original} on {date} -->`
- Update affected acceptance criteria

**Removed requirements:**
- Move to a "Deprecated" section in the source spec (do not delete)
- Add deprecation date and rationale
- Remove from active requirements list

### Step 3: Update Index

If `specs/index.md` exists, update it to reflect changes:
- Note modified specifications
- Add new specifications if created

### Step 4: Archive

Move the change folder:
- From: `changes/{change-name}/`
- To: `specs/_archive/{date}-{change-name}/`
- Date format: `YYYYMMDD`

### Step 5: Version Bump

Increment the spec version number in the updated specification.

## Output

- Updated source specification(s)
- Archived change folder at `specs/_archive/{date}-{change-name}/`

## Suggested Next Step

- **If this completes the brownfield workflow:** Run `/compound` to capture session learnings.
- **If additional changes are needed:** Start a new `/propose` cycle for the next change.

# Tasks: Pendo Analytics Integration

**Plan:** `specs/pendo-analytics/plan.md`
**Created:** 2026-04-01

---

## Phase 1: Template Modification

### Task 1.1: Add Pendo script to homepage template
- **Traces to:** FR-1, FR-2, FR-3, FR-4
- **Description:** Insert the Pendo agent loader and `pendo.initialize()` call in the `<head>` of `templates/index.html`, after the CSS link and before `</head>`
- **Files:** `templates/index.html` (modify)
- **Dependencies:** None
- **Status:** [x] Complete

### Task 1.2: Add Pendo script to post template
- **Traces to:** FR-1, FR-2, FR-3, FR-4
- **Description:** Insert the same Pendo script block in the `<head>` of `templates/post.html`, after the CSS link and before `</head>`
- **Files:** `templates/post.html` (modify)
- **Dependencies:** None
- **Status:** [x] Complete

## Phase 2: Verification

### Task 2.1: Build and verify output
- **Traces to:** FR-1, FR-4
- **Description:** Run `node build.js` and verify the Pendo script appears in generated `index.html` and a sample `posts/*.html`
- **Dependencies:** Task 1.1, Task 1.2
- **Status:** [x] Complete

### Task 2.2: Verify in Pendo dashboard
- **Traces to:** US-1
- **Description:** After deploy, check Pendo dashboard for incoming data (may take up to 2 hours)
- **Dependencies:** Task 2.1, deploy to production
- **Status:** [ ] Not started

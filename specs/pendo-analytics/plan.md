# Implementation Plan: Pendo Analytics Integration

**Spec:** `specs/pendo-analytics/spec.md`
**Created:** 2026-04-01

---

## Goal

Add Pendo analytics to every page of the site by inserting the Pendo agent script into the two HTML templates that generate all pages.

## Technical Approach

This is a two-line insertion into two files. No new files, no build changes, no abstractions.

### What gets added to each template

1. **Pendo agent loader** — the minified snippet from the install instructions, placed in `<head>` before `</head>`. Loads asynchronously from `cdn.pendo.io`.
2. **Pendo initialization** — `pendo.initialize()` call with anonymous visitor mode, placed right after the loader.

### Where it goes

Both `templates/index.html` and `templates/post.html` get the same script block added in `<head>`, after the CSS `<link>` tags and before `</head>`.

When `build.js` runs, it copies the template contents into every generated page. No changes to `build.js` needed — the script propagates automatically.

### Anonymous mode

The Pendo instructions reference authenticated user fields (email, name, etc.), but this is a public blog with no login. We initialize with anonymous visitor tracking:

```javascript
pendo.initialize({
  visitor: { id: 'VISITOR-UNIQUE-ID' }
});
```

Pendo auto-generates anonymous visitor IDs via cookies when it sees this placeholder value.

## Constitutional Compliance

| Article | Status | Notes |
|---------|--------|-------|
| I (Spec-First) | Pass | Spec at `specs/pendo-analytics/spec.md` |
| III (Simplicity) | Pass | 2 file edits, no new files, no abstractions, no build changes |

## Components

| Component | Action | File |
|-----------|--------|------|
| Homepage template | **Modify** | `templates/index.html` |
| Post template | **Modify** | `templates/post.html` |

That's it — two edits to existing files.

## Dependencies

- Pendo API key: `9db79206-b2b7-430d-a8b5-6c8830f89e7b` (provided in install PDF)
- Pendo CDN: `cdn.pendo.io` (external, async — graceful failure if unavailable)

## Test Strategy

Since this is a script tag insertion with no application logic:

1. **Build verification:** Run `node build.js`, confirm generated HTML contains the Pendo script
2. **Manual verification:** Open a generated page in browser, check Network tab for `pendo.js` loading from `cdn.pendo.io`
3. **Console verification:** Check browser console for `pendo` global object existing
4. **Dashboard verification:** After deploy, confirm Pendo dashboard shows data within 2 hours

## Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Script blocks page rendering | Low | Script uses `async` loading — non-blocking by design |
| Ad blockers prevent tracking | Expected | Acceptable — site functions normally without Pendo |
| API key incorrect | Low | Key comes directly from Pendo's install PDF |

## Rollback

Remove the Pendo script block from both templates. Push. Done.

# Pendo Analytics Integration

## Status
Draft

## Summary
Install Pendo's analytics snippet on the blog so that page views, navigation patterns, and visitor behavior are tracked across all pages. Since this is a public blog with no authentication, Pendo runs in anonymous visitor mode.

## Problem Statement
The site has no analytics. There is no visibility into which posts are read, how visitors navigate, or how much traffic the site receives. Pendo will provide product analytics and the ability to deploy in-app guides/messages in the future.

## User Stories

### US-1: Track anonymous page views
**As the** site owner, **I want** Pendo to load on every page **so that** I can see page view analytics in the Pendo dashboard.

**Acceptance Criteria:**
- [ ] Pendo agent script loads on the homepage (`index.html`)
- [ ] Pendo agent script loads on every post page (`posts/*.html`)
- [ ] Pendo receives data within 2 hours of first deploy (per Pendo docs)

### US-2: Anonymous visitor tracking
**As the** site owner, **I want** Pendo to initialize with anonymous visitors **so that** I get analytics without requiring user login.

**Acceptance Criteria:**
- [ ] `pendo.initialize()` is called with an anonymous visitor configuration
- [ ] No personally identifiable information is collected or hardcoded

## Functional Requirements

| # | Requirement | Priority | Acceptance Criteria |
|---|-------------|----------|---------------------|
| FR-1 | Add Pendo agent loader script to both HTML templates (`templates/index.html` and `templates/post.html`) | Must | Script tag present in generated HTML for all pages |
| FR-2 | Call `pendo.initialize()` with anonymous visitor mode after the agent loads | Must | `pendo.initialize()` executes on page load with no PII |
| FR-3 | Use the API key `9db79206-b2b7-430d-a8b5-6c8830f89e7b` from the provided install instructions | Must | Key matches in deployed code |
| FR-4 | Script must not block page rendering | Must | Script loads asynchronously; no measurable impact on First Contentful Paint |

## Non-Functional Requirements

### Performance
- Pendo script loads asynchronously (`async`) — must not block rendering or delay existing `nav.js`
- No measurable regression in page load time for the site's static content

### Security
- API key is a public client-side key (standard for analytics snippets) — not a secret
- No user PII is collected or transmitted
- Script loads from `cdn.pendo.io` (Pendo's official CDN)

### Accessibility
- No UI impact — Pendo agent is invisible until guides are configured in the Pendo dashboard

## Edge Cases and Error States

| Scenario | Expected Behavior |
|----------|-------------------|
| Pendo CDN is unreachable | Page loads normally; analytics silently fail (async script) |
| Ad blocker blocks Pendo | Page loads normally; no analytics collected |
| JavaScript disabled | Page renders normally (static HTML); no analytics |

## Technical Approach

The Pendo install has two parts per the provided instructions:

1. **Agent loader** (Step 1): A `<script>` tag that loads the Pendo agent from their CDN. This goes in the `<head>` of both templates.
2. **Initialization** (Step 2): A `pendo.initialize()` call. The instructions reference authenticated user data (visitor ID, email, name), but since this is a public blog with no login, we use anonymous mode instead.

### Anonymous initialization:
```javascript
pendo.initialize({
  visitor: { id: 'VISITOR-UNIQUE-ID' }
});
```
When `id` is set to `'VISITOR-UNIQUE-ID'` (the Pendo placeholder), Pendo auto-generates anonymous IDs using cookies.

Alternatively, omitting the `id` or passing an empty object lets Pendo handle anonymous tracking automatically.

### Placement:
- Agent loader: in `<head>` of both `templates/index.html` and `templates/post.html`
- Initialization: immediately after the agent loader, or in a separate `<script>` block

### File changes:
- `templates/index.html` — add Pendo script in `<head>`
- `templates/post.html` — add Pendo script in `<head>`
- No changes to `build.js`, `css/`, `js/nav.js`, or deployment workflow

## Dependencies and Constraints
- Pendo account with API key `9db79206-b2b7-430d-a8b5-6c8830f89e7b` (provided)
- Pendo CDN availability (`cdn.pendo.io`)
- No npm dependencies — this is a vanilla script tag insertion

## Out of Scope
- Pendo guides/tooltips configuration (done in Pendo dashboard, not code)
- Authenticated visitor tracking (no login system exists)
- Google Tag Manager integration (direct install per provided instructions)
- Cookie consent banner (can be added separately if needed)

## Metadata
- **Created:** 2026-04-01
- **Author:** Claude (AI-assisted)
- **Version:** 1.0
- **Spec path:** `specs/pendo-analytics/spec.md`

# Email Subscribe Form

## Status
Approved

## Summary
Add an email subscription form at the bottom of every post page, after the post content. The form collects an email address and sends it to a Google Sheet via Apps Script. Design is minimal, similar to Medium's subscribe box.

## Problem Statement
There is no way for readers to subscribe to the blog. Adding a simple email capture form at the end of each post allows the site owner to build a subscriber list.

## User Stories

### US-1: Subscribe to blog
**As a** reader, **I want** to enter my email at the end of a post **so that** I can receive updates.

**Acceptance Criteria:**
- [ ] Subscribe form appears after post content on every post page
- [ ] Form has an email input and a "Subscribe" button
- [ ] Form submits email to Google Sheets via Apps Script endpoint
- [ ] User sees a success message after subscribing
- [ ] Form is mobile responsive

## Functional Requirements

| # | Requirement | Priority | Acceptance Criteria |
|---|-------------|----------|---------------------|
| FR-1 | Add subscribe form component to post template after `.post-content` | Must | Form visible on all post pages |
| FR-2 | Form sends email via fetch POST to Apps Script endpoint | Must | Email appears in Google Sheet |
| FR-3 | Show success message after submission | Must | User sees confirmation text |
| FR-4 | Show error message if submission fails | Must | User sees error text |
| FR-5 | Basic email validation (HTML5 `required` + `type="email"`) | Must | Invalid emails are rejected by browser |
| FR-6 | Prevent double submission | Should | Button disabled during fetch |
| FR-7 | Mobile responsive layout | Must | Input and button stack or shrink gracefully on small screens |

## Technical Approach

- **HTML:** Add subscribe section in `templates/post.html` after the `<article>` closing tag, inside `<main>`
- **CSS:** Add styles in `css/style.css` matching the site's design system (Merriweather serif, warm cream bg, blue accent)
- **JS:** Inline `<script>` in the template or small addition — no separate file needed for a simple fetch POST
- **Endpoint:** `https://script.google.com/macros/s/AKfycbw8r3KjZJrInDUEfWNhRRv7a30UYzGw9N2S7WlvPuniZG35XyJ_hQljFUE4wTvOFmlG/exec`

## Design Reference
Minimal box with:
- Heading text (user will customize in Spanish)
- Subtitle text
- Email input + Subscribe button on same row (desktop), stacked (mobile)
- No border, subtle separator from post content

## Out of Scope
- Email verification / double opt-in
- Unsubscribe mechanism
- Newsletter sending
- CAPTCHA / spam protection (can add later)
- Homepage subscribe form (posts only)

## Metadata
- **Created:** 2026-04-01
- **Version:** 1.0
- **Spec path:** `specs/email-subscribe-form/spec.md`

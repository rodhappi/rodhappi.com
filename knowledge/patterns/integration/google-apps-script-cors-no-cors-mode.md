# Google Apps Script CORS Requires no-cors Mode from Static Sites

## Context

When a static site (e.g., GitHub Pages) makes a `fetch` POST to a Google Apps Script web app, the browser blocks the request with a CORS error:

```
Access to fetch at 'https://script.google.com/macros/s/.../exec' from origin 'https://www.example.com' has been blocked by CORS policy
```

Google Apps Script web apps redirect on POST (302), which triggers a CORS preflight that Apps Script doesn't handle.

## Pattern

Use `mode: 'no-cors'` and `Content-Type: 'text/plain'` to bypass the CORS restriction:

```javascript
fetch('https://script.google.com/macros/s/.../exec', {
  method: 'POST',
  mode: 'no-cors',
  headers: { 'Content-Type': 'text/plain' },
  body: JSON.stringify({ email: emailInput.value }),
})
```

## Tradeoffs

- The response is **opaque** — you cannot read the status code or body
- Success is shown **optimistically** (assume it worked if no network error)
- The `.catch()` handler only fires on network failures, not server errors
- The data still arrives correctly in Apps Script via `e.postData.contents`

## Alternatives

- Use a form submission with a hidden iframe (old-school, works but clunky)
- Use a CORS proxy (adds a dependency)
- Use a different backend (Formspree, Netlify Forms)

## Discovery

Found when deploying the email subscribe form on www.rodhappi.com (GitHub Pages) posting to Google Apps Script. Worked locally via `npx serve` but failed on the live site due to CORS.

## Tags

`google-apps-script`, `cors`, `fetch`, `static-site`, `subscribe-form`

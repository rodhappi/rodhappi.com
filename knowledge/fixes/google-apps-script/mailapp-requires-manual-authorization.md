# Google Apps Script MailApp Requires Explicit Authorization via Test Run

## Problem

After adding `MailApp.sendEmail()` to an existing Google Apps Script and redeploying, the email notification doesn't fire. No error is thrown — the call silently fails because the script lacks Gmail permissions.

## Cause

Google Apps Script only prompts for new permissions when you **manually run** a function from the editor. Redeploying a web app does not trigger the authorization flow, even if the code now requires additional scopes (like `gmail.send`).

## Fix

1. Create a temporary test function that calls `MailApp`:

```javascript
function testEmail() {
  MailApp.sendEmail(
    'you@example.com',
    'Test',
    'This is a test.'
  );
}
```

2. Select `testEmail` from the function dropdown in the Apps Script editor
3. Click **Run** (▶)
4. The authorization prompt appears — accept all permissions
5. Verify the test email arrives
6. Delete `testEmail` and redeploy as a **New version**

## Key Insight

When adding new Google services (MailApp, DriveApp, CalendarApp, etc.) to an existing script, always manually run a function that uses that service to trigger the authorization prompt before redeploying.

## Discovery

Found when adding email notifications to the blog subscribe form. The subscription data was arriving in Google Sheets, but no notification email was sent. Debug logging showed `EMAIL_SENT_OK` only after manually triggering authorization.

## Tags

`google-apps-script`, `mailapp`, `permissions`, `authorization`

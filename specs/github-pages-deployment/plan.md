# Implementation Plan: GitHub Pages Deployment

**Spec:** `specs/github-pages-deployment/spec.md`
**Created:** 2026-03-30

---

## Goal

Deploy `www.rodhappi.com` to GitHub Pages with automated builds on push to `main` and custom domain support.

## Technical Approach

This is a single-file implementation: one GitHub Actions workflow file. No code changes to the existing site.

### The Workflow (`.github/workflows/deploy.yml`)

The workflow does three things:

1. **Build** — Checks out the repo, runs `node build.js` to generate `index.html` and `posts/*.html`
2. **Package** — Since build output lives in the project root alongside source files, we need to stage only the deployable files into a clean directory, then upload that as a Pages artifact
3. **Deploy** — Uses `actions/deploy-pages` to publish

**Key detail:** `index.html` and `posts/` are in `.gitignore`, so they only exist after `build.js` runs. The workflow must:
- Run the build first
- Create a staging directory with only public files
- Generate the `CNAME` file in that staging directory
- Upload the staging directory as the artifact

### Staging Directory Structure

```
_site/
├── index.html          (copied from root after build)
├── posts/              (copied from root after build)
├── css/style.css       (copied from source)
├── js/nav.js           (copied from source)
├── media/              (copied from source)
└── CNAME               (generated: "www.rodhappi.com")
```

### GitHub Pages Configuration

After the first deploy, the user must:
1. Go to repo Settings → Pages → set source to "GitHub Actions"
2. Configure DNS (CNAME record: `www` → `rodhappi.github.io`)
3. Enable "Enforce HTTPS" after DNS propagates

## Constitutional Compliance

| Article | Status | Notes |
|---------|--------|-------|
| I (Spec-First) | Pass | Spec exists at `specs/github-pages-deployment/spec.md` |
| III (Simplicity) | Pass | Single workflow file, no new dependencies, no abstractions |

## Components

| Component | Action | File |
|-----------|--------|------|
| GitHub Actions workflow | **Create** | `.github/workflows/deploy.yml` |

That's it — one new file.

## Dependencies

- Node.js 20 (used in the workflow runner, not installed locally)
- GitHub Actions: `actions/checkout@v4`, `actions/setup-node@v4`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`

## Test Strategy

Since this is infrastructure (CI/CD), not application code:

1. **Manual verification:** Push to `main`, confirm the workflow runs green in the Actions tab
2. **Deployment verification:** Confirm `rodhappi.github.io` serves the site
3. **Domain verification:** After DNS setup, confirm `www.rodhappi.com` loads with HTTPS
4. **Failure test:** Push a broken markdown file, confirm the workflow fails and the previous deploy stays live

## Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| `upload-pages-artifact` path configuration wrong | Medium | Test with a push; easy to fix if wrong |
| DNS propagation delay | Expected | Document that it takes up to 48 hours |
| GitHub Pages needs manual activation in repo settings | Expected | Document the one-time setup steps |

## Rollback

Delete or disable the workflow file. GitHub Pages retains the last successful deployment. No data is at risk.

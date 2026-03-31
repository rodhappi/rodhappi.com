# Tasks: GitHub Pages Deployment

**Plan:** `specs/github-pages-deployment/plan.md`
**Created:** 2026-03-30

---

## Phase 1: Workflow Implementation

### Task 1.1: Create GitHub Actions deploy workflow
- **Traces to:** FR-1, FR-2, FR-3, FR-4
- **Description:** Create `.github/workflows/deploy.yml` that:
  1. Triggers on push to `main`
  2. Checks out the repo
  3. Sets up Node.js 20
  4. Runs `node build.js`
  5. Creates a `_site/` staging directory with only deployable files
  6. Generates `CNAME` file with `www.rodhappi.com`
  7. Uploads `_site/` as a Pages artifact
  8. Deploys to GitHub Pages
- **Files:** `.github/workflows/deploy.yml` (create)
- **Dependencies:** None
- **Status:** [x] Complete

## Phase 2: Manual Configuration (User)

### Task 2.1: Enable GitHub Pages in repo settings
- **Traces to:** FR-2
- **Description:** In GitHub repo Settings → Pages, set Build and deployment source to "GitHub Actions"
- **Dependencies:** Task 1.1 (workflow must exist first)
- **Status:** [ ] Not started

### Task 2.2: Configure DNS
- **Traces to:** FR-3, NFR-3
- **Description:** At domain registrar, add CNAME record: `www` → `rodhappi.github.io`
- **Dependencies:** Task 2.1
- **Status:** [ ] Not started

### Task 2.3: Enable HTTPS
- **Traces to:** NFR-3
- **Description:** After DNS propagates, enable "Enforce HTTPS" in GitHub Pages settings
- **Dependencies:** Task 2.2
- **Status:** [ ] Not started

## Phase 3: Verification

### Task 3.1: Verify deployment
- **Traces to:** US-1, US-3
- **Description:** Push to `main`, confirm workflow runs green, confirm site loads at `rodhappi.github.io`
- **Dependencies:** Task 2.1
- **Status:** [ ] Not started

### Task 3.2: Verify custom domain
- **Traces to:** US-2
- **Description:** Confirm site loads at `www.rodhappi.com` with HTTPS
- **Dependencies:** Task 2.2, Task 2.3
- **Status:** [ ] Not started

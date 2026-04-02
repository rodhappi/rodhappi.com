# Add Generated Build Artifacts to .gitignore

## Context

When `build.js` generates new output files (like `robots.txt`, `sitemap.xml`, `feed.xml`), they should be added to `.gitignore` alongside existing generated files (`index.html`, `posts/`). These files are rebuilt by CI on every deploy, so committing them creates unnecessary diffs and potential merge conflicts.

## Pattern

Whenever you add a new generated file to the build pipeline:

1. Add it to `.gitignore` with a root-anchored path (`/robots.txt`, not `robots.txt`)
2. Verify the CI/CD workflow copies it to the deploy staging directory
3. Do **not** commit the generated file itself

Root-anchoring (`/robots.txt`) prevents ignoring files with the same name in subdirectories (learned earlier when `/index.html` vs `index.html` caused `templates/index.html` to be excluded from git).

## Checklist for new build outputs

- [ ] File added to `.gitignore` with leading `/`
- [ ] File copied in deploy workflow (`cp file _site/`)
- [ ] `build.js` writes the file to the project root

## Discovery

During the SEO feature, `robots.txt`, `sitemap.xml`, and `feed.xml` were initially not gitignored, which would have resulted in committing generated files alongside source files.

## Tags

`gitignore`, `build-pipeline`, `ci-cd`, `generated-files`

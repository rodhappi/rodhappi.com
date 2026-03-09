# Short-Circuit When Already In Sync

> **Category:** Pattern (Architecture)
> **Confidence:** Medium
> **Added:** 2026-02-23
> **Tags:** `sync`, `idempotency`, `short-circuit`, `efficiency`

## Context

The `/bootstrap --sync` command was designed to update framework files in a target project. Even when no changes existed between source and destination, the original implementation would delete and re-copy all files -- creating unnecessary git status changes from metadata updates and giving the user no signal that nothing meaningful changed.

## Problem

Sync operations that always write, regardless of whether content differs, cause:
- **False positives in git:** File timestamps change even when content is identical, triggering `git status` noise
- **Wasted effort:** Deleting and re-copying identical files serves no purpose
- **User confusion:** The user receives a "sync complete" message with no indication that nothing actually changed
- **Risk without reward:** Every write operation carries a small risk of failure; unnecessary writes increase risk for zero benefit

## Solution

Before performing any writes, compare source and destination:

```
if diff -rq <source> <target> produces no output:
    report "Already up to date. No changes needed."
    stop -- do not proceed with the copy step
else:
    show what differs
    proceed with sync
```

The key insight is that **the diff is cheap** (reads only) while **the sync is expensive** (deletes + writes). Running the cheap check first avoids the expensive operation when it's not needed.

## Result

- Idempotent behavior: running sync twice produces the same result as running it once
- Clean git status: no spurious changes from unnecessary file overwrites
- Clear user feedback: "up to date" vs "X components changed" gives an accurate signal
- Reduced risk: fewer write operations means fewer failure points

## Applicability

Apply this pattern whenever an operation copies or deploys files from a known source to a known destination:
- File sync/deploy commands
- Build artifact staging
- Configuration propagation
- Any operation where "nothing to do" is a valid and common outcome

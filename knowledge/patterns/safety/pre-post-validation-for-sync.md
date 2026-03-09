# Pre/Post Validation for Destructive Sync Operations

> **Category:** Pattern (Safety)
> **Confidence:** High
> **Added:** 2026-02-23
> **Tags:** `sync`, `validation`, `safety`, `bootstrap`, `diff`

## Context

The `/bootstrap --sync` command overwrites framework-owned directories in a target project. The original implementation performed a blind `rm -rf && cp -R` with no visibility into what was actually changing. Users had no way to know in advance whether the sync would change 1 file or 100, or to verify that the sync succeeded.

## Problem

Destructive file operations (delete + copy) that overwrite without comparison create uncertainty:
- The user doesn't know what will change before it happens
- There's no verification that the operation completed correctly
- Unnecessary overwrites create git noise (even if content is identical, metadata changes)
- If something goes wrong mid-sync, it's hard to know what state the target is in

## Solution

Add a **pre-sync diff** and **post-sync diff** step around any destructive sync operation:

### Pre-Sync Validation
1. Run `diff -rq <source>/<component> <target>/<component>` for each component
2. Classify differences as **Modified**, **New**, or **Removed**
3. Present a summary table showing which components have changes and which are up to date
4. If all components match, short-circuit with "already up to date"
5. If differences exist, ask the user for confirmation before proceeding

### Post-Sync Validation
1. After the sync, re-run the same diffs
2. If all components now match the source, report success
3. If differences remain, report them as warnings

## Result

The sync becomes a transparent, auditable operation:
- Users see exactly what will change before it happens
- Confirmation prevents accidental overwrites
- Post-sync verification catches partial failures
- The "already up to date" short-circuit avoids unnecessary work

## Applicability

This pattern applies to any operation that overwrites files from a known source:
- Framework sync/update commands
- Template scaffolding tools
- Configuration deployment scripts
- Any "push" operation where source should match destination after completion

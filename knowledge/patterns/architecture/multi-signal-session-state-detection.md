# Multi-Signal Session State Detection

> **Category:** Pattern (Architecture)
> **Confidence:** High
> **Added:** 2026-02-23
> **Tags:** `session`, `state-detection`, `signals`, `update-me`, `priority`

## Context

The `/update-me` command needs to tell returning users where they left off and what to do next. The framework tracks state across multiple locations: session summaries, checkpoints, file system artifacts (specs, plans, tasks), git history, and the knowledge index. No single source is complete or always up-to-date.

## Problem

Session state is distributed across many signals, each with different reliability:
- Session summaries may be stale (last written during a previous session)
- Checkpoints may be auto-generated (from compaction) and lack context
- File system artifacts are always current but don't explain *why* the user stopped
- Git log shows what changed but not what's pending
- Knowledge index shows whether `/compound` was run but nothing else

Relying on any single signal produces incomplete or misleading status reports.

## Solution

Check multiple signals in a defined priority order:

| Priority | Signal | Strength | Weakness |
|----------|--------|----------|----------|
| 1 (highest) | File system state (specs, plans, tasks) | Ground truth -- reflects actual artifacts | Doesn't explain intent or blockers |
| 2 | Most recent checkpoint or session summary | Records intent, decisions, pending work | Can be stale |
| 3 | Git log | Shows recent activity and timestamps | Doesn't capture workflow phase |
| 4 (lowest) | Knowledge index | Shows if /compound was run | Very narrow signal |

The algorithm:
1. Use file system state to determine the **workflow phase** (what exists)
2. Use checkpoint/summary to understand **context** (what was happening)
3. Use git log to assess **recency** (how fresh is the state)
4. Use knowledge index to assess **completeness** (was the loop closed)

When signals conflict, trust higher-priority signals. For example, if the session summary says "working on Task 3" but tasks.md shows Task 3 complete, trust the file system.

## Result

The `/update-me` command produces accurate status reports even when individual signals are stale or incomplete. The layered approach degrades gracefully -- if session-summary.md is empty, the command still works from file system signals and git log.

## Applicability

This pattern applies to any system that must reconstruct state from distributed signals:
- IDE plugins resuming previous sessions
- CI/CD systems detecting pipeline state
- Project management tools inferring status from artifacts
- Any "where was I?" feature across session boundaries

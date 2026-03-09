---
name: update-me
description: >
  Session-start orientation for returning users. Reads session state from
  multiple signals (session summary, checkpoints, specs, tasks, git log,
  knowledge index) and tells the user where they left off, what's pending,
  and what to do next. Read-only -- never modifies files.
---

# /update-me -- Session Orientation

Tell a returning user where they left off and what to do next.

## When to Activate

- User types `/update-me` or asks "where did I leave off?"
- User starts a new session and wants to resume previous work
- After context compaction when the user needs to reorient

## Procedure

### Step 1: Read Session Summary

Read `.claude/memory/session-summary.md`. Extract:
- **Last updated** timestamp (how stale is it?)
- **Current Task** (what was in progress?)
- **Pending Work** (what was left to do?)
- **Key Decisions** (decisions the user should remember)
- **Notes** (any additional context)

If the file is empty, contains only the template default ("No previous session recorded"), or does not exist, note "No session summary available" and proceed to Step 2 -- the remaining signals are sufficient.

### Step 2: Check Latest Checkpoint

List files in `.claude/memory/checkpoints/` sorted by timestamp (newest first). If any exist, read the most recent checkpoint JSON and extract:
- `state.current_task`
- `state.pending_work`
- `trigger` (manual, auto-compact, abort -- informs how the session ended)

Compare the checkpoint timestamp against the session summary timestamp. Use whichever is more recent as the primary state signal.

### Step 3: Detect Workflow Phase

Check file system signals in this order to determine the current workflow phase. Stop at the first match:

| Check | Condition | Phase | Workflow |
|-------|-----------|-------|----------|
| 1 | `changes/*/proposal.md` exists | Brownfield active | brownfield |
| 2 | `specs/*/spec.md` exists | Greenfield active | greenfield |
| 3 | Neither | No active workflow | -- |

If multiple feature directories exist under `specs/` or `changes/`, list them all and use the one with the most recent modification time. If several are active, present them as a list and let the user indicate which to resume.

### Step 4: Determine Sub-Phase

If a workflow is active, determine the sub-phase by scanning for artifacts:

**For greenfield (`specs/{feature}/`):**

1. Check `specs/{feature}/tasks.md`:
   - Parse the **Status Summary** section for Pending/In Progress/Complete counts
   - All tasks Complete --> phase: **work-complete**, next: `/review`
   - Any tasks In Progress or mixed --> phase: **work-in-progress**, next: continue `/work`
   - All tasks Pending --> phase: **approved**, next: `/work`
2. If no `tasks.md` but `plan.md` exists --> phase: **plan-done**, next: `/approve`
3. If no `plan.md`, scan `spec.md` for `[NEEDS CLARIFICATION]` markers:
   - Markers found --> phase: **needs-clarification**, next: `/clarify`
   - No markers --> phase: **spec-ready**, next: `/plan`

**For brownfield (`changes/{change-name}/`):**

Apply the same logic starting from the proposal, then check for plan.md and tasks.md within the change directory.

**Review detection (both workflows):**

If git log shows a recent review (commit messages mentioning "review" in the last 5 commits), and tasks are all complete, consider the phase **review-done**:
- Greenfield --> next: `/compound`
- Brownfield --> next: `/archive`

### Step 5: Check Recent Activity

Run `git log --oneline -5` to see recent commits:
- Note the most recent commit message and date
- If commits exist after the session summary timestamp, note that work progressed beyond the summary

Read `knowledge/index.md` **Recently Added** section:
- If the most recent entry date matches the session summary date, `/compound` was run (clean exit)
- If no recent entries and pending work exists, `/compound` may have been skipped

### Step 6: Present Status Report

Present a concise status report:

```
## Session Status

**Last active:** {timestamp from most recent signal}
**Previous session ended:** {cleanly via /compound | mid-work | via compaction | unknown}

### Where You Left Off
{Current task from session summary or checkpoint, 1-2 sentences}

### Pending Work
{Pending work items, bulleted, max 5 items}

### Key Decisions to Remember
{Decisions from session summary, bulleted -- omit section if empty}

### Workflow State
**Workflow:** {greenfield | brownfield | none}
**Feature:** {feature-name or change-name}
**Phase:** {phase name}

### Suggested Next Step
> Run `/{command}` to {brief description of what it will do}.
```

If no workflow is active and no pending work exists:

```
### Suggested Next Step
> No active workflow. Run `/specify` to start a new feature, or `/propose` to modify existing code.
```

### Signal Priority

When signals conflict, use this priority:

1. **File system state** (specs, tasks, changes) -- ground truth
2. **Most recent checkpoint or session summary** (whichever is newer)
3. **Git log** (supplementary)
4. **Knowledge index** (supplementary)

## Output

- A concise status report presented directly to the user
- No files are created or modified by this skill

## L1 Integration

This command has low context impact:
- ~1,500 tokens to load the skill
- File reads: session-summary.md (~200-500 tokens), one checkpoint (~200 tokens), one spec scan (~100-500 tokens), knowledge index header (~200 tokens)
- Git log: ~100 tokens
- Total context cost: ~2,500-3,500 tokens
- No agent spawns -- purely read-only
- Safe to run at any context utilization level

## Relationship to Other Commands

| Command | For whom | Purpose |
|---------|----------|---------|
| `/start-development` | First-time users | Learn the framework |
| `/update-me` | Returning users | Resume where you left off |
| `/help-ai-assisted-dev` | Anyone | Static command reference |
| `/context-status` | Anyone | Context window utilization only |

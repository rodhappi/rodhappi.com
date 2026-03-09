---
name: logs
description: >
  Show execution history across recent sessions. Summarizes staged learnings,
  session summary, checkpoints, and git history. Answers "what happened
  recently?"
---

# /logs -- Execution History

Display a summary of recent activity across sessions.

## When to Activate

- User says "logs", "what happened", "recent activity", "session history"
- When resuming work after a break to understand recent context
- When investigating what changed across multiple sessions
- When preparing for a retrospective or `/compound`

## Key Distinction

| | `/logs` | `/trace` |
|---|---|---|
| **Scope** | Across sessions | Current session |
| **Focus** | What happened (events) | What was decided (decisions) |
| **Time range** | Last 7 days | Current session only |
| **Sources** | Staged learnings + git history | Checkpoints + session summary |

## Procedure

### Step 1: List Staged Learnings

List files in `.claude/memory/learnings/`:
- For each staging file, read and summarize: timestamp, session ID, trigger
- These represent breadcrumbs from previous session endings
- Sort by timestamp, most recent first

If no staging files exist, note "No staged learnings from previous sessions."

### Step 2: Read Current Session Summary

Read `.claude/memory/session-summary.md`:
- Summarize: current session focus, key decisions, files modified, pending work

If the file does not exist or is empty, note "No active session summary."

### Step 3: List Recent Checkpoints

List files in `.claude/memory/checkpoints/` with timestamps:
- Count total checkpoints
- Categorize by trigger type (manual, auto-compact, approve, etc.)
- Report the 5 most recent with timestamps

### Step 4: Read Git History

Run `git log --oneline --since="7 days ago"`:
- List recent commits across the last 7 days
- Group by date if there are many commits

### Step 5: Present Session Timeline

```
## Execution Log

### Current Session
- Focus: [from session-summary]
- Key actions: [from session-summary]
- Checkpoints this session: N

### Previous Sessions (from staged learnings)

#### [Date/Timestamp]
- Session ID: [id]
- Trigger: session-end
- Signals: [summary of what was captured]

#### [Earlier date]
- ...

### Git Activity (last 7 days)

#### [Date]
- [commit messages]

#### [Earlier date]
- ...

### Summary
- Sessions recorded: N
- Checkpoints total: N
- Commits (7 days): N
- Staged learnings pending: N
```

## L1 Integration

This command has low-medium context impact:
- Staged learning files are small JSON (~200 tokens each)
- Session summary (~500-1,000 tokens)
- Git log output (~200-500 tokens)
- Total estimate: ~2-4K tokens
- Safe at utilization below 85%

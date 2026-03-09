---
name: trace
description: >
  Show the decision history for the current session. Synthesizes checkpoints,
  session summary, and git log into a chronological timeline. Answers "how
  did we get here?"
---

# /trace -- Decision History

Reconstruct the chronological timeline of decisions made in the current session.

## When to Activate

- User says "trace", "decision history", "how did we get here"
- When reviewing what was decided before continuing work
- When understanding context after a compaction event
- When preparing for `/compound` (to see what decisions are worth capturing)

## Procedure

### Step 1: Read Session Summary

Read `.claude/memory/session-summary.md`:
- Extract key decisions, files modified, pending work
- Note the session start context

If the file does not exist or is empty, note "No session summary available."

### Step 2: Read Recent Checkpoints

List files in `.claude/memory/checkpoints/`, sorted by modification time (most recent first). Read the most recent 5 checkpoints:
- For each checkpoint, extract: timestamp, trigger, key decisions, files affected
- Note the checkpoint type (manual, auto-compact, approve, etc.)

If no checkpoints exist, note "No checkpoints recorded."

### Step 3: Read Git History

Run `git log --oneline -10`:
- Extract recent commits with their messages
- These represent completed decision outcomes

### Step 4: Synthesize Timeline

Combine all sources into a single chronological timeline:

```
## Decision Timeline

### [Timestamp or Sequence]
- **What:** Description of the decision or action
- **Context:** Why it was made (from checkpoint or summary)
- **Source:** [checkpoint | session-summary | git commit]

### [Earlier timestamp]
- ...
```

Order from most recent to oldest. Group related decisions when they form a logical sequence.

### Step 5: Highlight Key Moments

Call out significant decision points:
- Quality gate transitions (approve, review pass/fail)
- Architectural decisions
- Error recovery actions
- Compaction events (context was compressed -- some history may be lost)

## Output Format

```
## Decision Trace

Session: [summary of current session context]
Checkpoints available: N
Recent commits: N

### Timeline

[Chronological entries as above]

### Key Decision Points
- [List of significant moments]

### Gaps
- [Any periods where no data exists, e.g., between compactions]
```

## L1 Integration

This command has low-medium context impact:
- Reads session-summary (~500-1,000 tokens)
- Reads up to 5 checkpoint files (~500-1,000 tokens each)
- Git log output (~200 tokens)
- Total estimate: ~2-4K tokens
- Safe at utilization below 85%

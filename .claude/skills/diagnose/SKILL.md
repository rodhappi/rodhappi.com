---
name: diagnose
description: >
  Analyze why something failed and suggest recovery actions. Reads checkpoints,
  session state, and knowledge base for anti-patterns. Retrospective analysis
  complementing the error-recovery skill's active mitigation.
---

# /diagnose -- Failure Analysis

Investigate what went wrong and recommend recovery actions.

## When to Activate

- User says "diagnose", "why did this fail", "what went wrong"
- After a workflow step fails and the user wants to understand why
- After a compaction event to check if context loss caused issues
- When the same error keeps recurring

## Key Distinction

| | `/diagnose` | `error-recovery` skill |
|---|---|---|
| **Purpose** | Retrospective analysis | Active mitigation |
| **Timing** | After the failure | During the failure |
| **Question** | "Why did it fail?" | "How do I recover now?" |
| **Output** | Root cause + recommendations | Recovery strategy + steps |

`/diagnose` investigates the past. `error-recovery` handles the present.

## Procedure

### Step 1: Gather Failure Signals

Read recent checkpoints from `.claude/memory/checkpoints/`:
- Focus on checkpoints with error states or `"auto-compact"` triggers
- Extract: what was in progress, what the error was, what was attempted

Read `.claude/memory/session-summary.md`:
- Look for error signals, failed operations, blocked work

Check `.claude/memory/learnings/` for recent staging files:
- These may contain breadcrumbs from sessions that ended due to failures

### Step 2: Check Knowledge Base

Search `knowledge/` for relevant documented knowledge:
- Check `knowledge/anti-patterns/` for known failure modes matching the current situation
- Check `knowledge/fixes/` for previously solved similar problems
- If matches are found, reference them in the analysis

### Step 3: Analyze Root Cause

Categorize the failure:

| Category | Indicators | Typical Causes |
|----------|-----------|----------------|
| **Context exhaustion** | Auto-compact checkpoint, degraded responses | Too many MCPs, large file reads, long session |
| **Workflow violation** | Quality gate failure, missing prerequisite | Skipped step, wrong order |
| **Tool/command failure** | Error in tool output, non-zero exit | Bad arguments, missing dependency, permissions |
| **Agent failure** | Agent returned error or empty result | Bad prompt, scope too large, model limitations |
| **State corruption** | Inconsistent files, missing expected data | Interrupted write, concurrent edits |

### Step 4: Suggest Recovery

Based on the root cause category, recommend actions using `error-recovery` skill strategies:

| Category | Primary Strategy | Secondary Strategy |
|----------|-----------------|-------------------|
| Context exhaustion | Save state + compact | Decompose remaining work |
| Workflow violation | Return to correct step | Checkpoint restore |
| Tool/command failure | Retry with corrected args | Partial rollback |
| Agent failure | Re-run with better prompt | Escalate model tier |
| State corruption | Checkpoint restore | Graceful abort |

### Step 5: Present Analysis

```
## Failure Diagnosis

### What Failed
[Description of the failure]

### Root Cause
- **Category:** [from Step 3]
- **Analysis:** [explanation of why it happened]
- **Evidence:** [checkpoints, errors, signals that support the analysis]

### Prior Art
[Any matching anti-patterns or fixes from knowledge base, or "No matching entries found"]

### Recommended Recovery
1. **Immediate:** [first action to take]
2. **Follow-up:** [next steps after immediate recovery]
3. **Prevention:** [how to avoid this in the future]

### Related Resources
- Error recovery strategies: `.claude/skills/error-recovery/SKILL.md`
- [Relevant knowledge entry if found]
```

## L1 Integration

This command has medium context impact:
- Reads checkpoint files (~500-1,000 tokens each, up to 5)
- Reads session-summary (~500-1,000 tokens)
- May read knowledge entries (~500-1,000 tokens each)
- Total estimate: ~3-6K tokens
- Safe at utilization below 75%; use caution above 75%

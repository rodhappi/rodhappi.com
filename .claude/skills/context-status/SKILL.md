---
name: context-status
description: >
  Show current context window utilization and loaded components. Quick
  diagnostic snapshot. Does not optimize -- use context-manager skill for
  optimization strategies.
---

# /context-status -- Context Snapshot

Report current context utilization and loaded components.

## When to Activate

- User says "context status", "how much context", "token budget"
- Before deciding whether to load a large skill or enable an MCP
- Before spawning a large agent fan-out
- Quick check during long sessions

## Key Distinction

| | `/context-status` | `context-manager` skill |
|---|---|---|
| **Purpose** | Report state | Optimize state |
| **Trigger** | User-invoked command | Pressure-detected or pre-operation |
| **Output** | Snapshot display | Optimization recommendations |
| **Action** | Read-only | Suggests unloading, compaction, decomposition |

`/context-status` answers "where am I?" -- `context-manager` answers "what should I do about it?"

## Procedure

### Step 1: Estimate Utilization

Apply the `context-manager` estimation heuristic:

1. **System overhead:** CLAUDE.md + all rule files (~2,000-5,000 tokens)
2. **Loaded skills:** Count each currently loaded skill (~500-2,000 tokens each)
3. **Enabled MCPs:** Count each MCP using overhead reference from `context-manager`
4. **Conversation length:** Estimate messages x average tokens per message
5. **Pending file contents:** Files recently read into context

Produce an estimated utilization percentage.

### Step 2: List Loaded Components

Report currently active components:

- **Rules:** List files in `.claude/rules/`
- **Skills loaded this session:** List skills that have been invoked
- **MCPs enabled:** List from `.claude/settings.json` (if any)
- **Files in context:** Note any large files recently read

### Step 3: Report Status

Present a compact snapshot:

```
## Context Status

Estimated utilization: ~XX%
Status: [OK | Warning | Critical]

### Loaded Components
- Rules: N files (~X tokens)
- Skills loaded: [list]
- MCPs enabled: [list or "none"]

### Budget Remaining
Estimated tokens available: ~XX,000
Safe for: [what operations fit in remaining budget]
```

### Step 4: Advisory (Conditional)

- **If OK (<75%):** "Context is healthy. No action needed."
- **If Warning (75-85%):** "Approaching pressure zone. Consider checkpointing before large operations. The `context-manager` skill can suggest optimizations."
- **If Critical (>85%):** "Context pressure is high. Save state and compact before continuing. Use the `context-manager` skill for optimization strategies."

## L1 Integration

This command has very low context impact:
- Estimation is arithmetic, not file-heavy (~1-2K tokens)
- Safe to run at any utilization level, including >85%
- Does not load additional files or skills to produce its report

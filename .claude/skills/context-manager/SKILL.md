---
name: context-manager
description: >
  Monitor and optimize context window utilization. Activates when context
  pressure is detected, when the user asks about context usage or token
  budget, or before large operations that may impact available context.
---

# Context Manager

Diagnose context utilization and recommend optimization strategies.

## When to Activate

- Context pressure detected (approaching 75% or 85% thresholds from `.claude/rules/context-budget.md`)
- User asks about context usage, token budget, or memory
- Before large operations (loading new skills, enabling MCPs, reading large file sets)
- When compaction is about to occur
- When spawning multiple agents simultaneously

## Estimating Context Utilization

Claude Code does not expose an exact token counter. Estimate utilization using this heuristic:

1. **System overhead:** CLAUDE.md + all rule files (~2,000-5,000 tokens)
2. **Loaded skills:** Count each loaded skill (~500-2,000 tokens each)
3. **Enabled MCPs:** Count each MCP (see overhead table below)
4. **Conversation length:** Estimate messages x average tokens per message
5. **Pending file contents:** Any files read into context

When in doubt, assume higher utilization rather than lower. It is safer to optimize early than to exhaust context mid-task.

## Component Overhead Reference

| Component Type | Approximate Token Cost | Notes |
|----------------|----------------------|-------|
| CLAUDE.md | ~1,000-3,000 | Loaded at session start, always present |
| Each rule file | ~200-800 | Always active, loaded automatically |
| Each skill (when invoked) | ~500-2,000 | On-demand only |
| Skill descriptions (all) | ~50-200 each | Always in context for auto-discovery |
| Large skill with references | ~2,000-5,000 | Heavier skills with embedded data |

## MCP Overhead Reference

| MCP Server | Approximate Overhead | When to Enable |
|------------|---------------------|----------------|
| GitHub | ~26K tokens | Only during PR/issue work |
| Playwright | ~8K tokens | Only during UI testing/development |
| Database MCPs | ~8-15K tokens | Only during database work |
| Shell (built-in) | Minimal | Always available |

## Optimization Strategies

When context pressure is detected, apply these strategies in order:

### 1. Audit Loaded Components

- List all currently loaded skills and enabled MCPs
- Identify components not needed for the current task
- Recommend unloading unnecessary components
- Each unloaded MCP recovers 8K-26K tokens

### 2. Suggest Compaction

- Identify conversation segments that can be safely compacted
- Recommend saving key decisions and context before compaction
- Suggest creating a checkpoint first (`/checkpoint` when available)
- Summarize what will be preserved vs. what will be compacted

### 3. Recommend Task Decomposition

- If remaining work is large, suggest breaking it into smaller pieces
- Each piece can run in a fresh context or as a spawned agent
- Provide guidance on what context to pass to each sub-task
- Use haiku-tier agents for decomposed exploration tasks

### 4. Knowledge-First Search

- Before web search, check local `knowledge/` directory
- Before web search, check if a domain expertise skill exists
- Web search costs ~5,000-15,000 tokens per query
- Domain expertise skills cost ~500-2,000 tokens (and are reusable)

### 5. File Read Optimization

- Use targeted reads with line offsets instead of full file reads
- Use grep/glob to find relevant sections before reading
- Avoid reading files that are not directly relevant to the current task
- Prefer reading specific functions over entire files

## Model Tier Quick Reference

See `.claude/rules/model-selection.md` for the full policy.

| Task Type | Recommended Tier |
|-----------|-----------------|
| File exploration, search | Haiku |
| Standard implementation | Sonnet |
| Architectural decisions | Opus |
| Context optimization tasks | Haiku |
| Spawned sub-agents (default) | Haiku |

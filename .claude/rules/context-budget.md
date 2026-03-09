# Context Budget Rule

Enforce context-aware behavior in all operations. This rule is always active.

## Always

- Check context utilization before large operations (file reads, skill loads, MCP calls)
- Prefer domain expertise skills over web search for stable knowledge
- Use targeted file reads (specific files, line ranges) instead of reading entire directories
- Track which skills and MCPs are currently loaded
- Prefer smaller models (haiku) for exploration and pattern search
- Prefer larger models (opus) for complex architectural reasoning

## At 75% Utilization

1. Warn the user about context pressure
2. Suggest a checkpoint before continuing
3. Audit currently loaded skills and MCPs -- unload any not actively needed
4. Consider whether remaining work can be decomposed into smaller units

## At 85% Utilization

1. Save state immediately -- create a checkpoint with current progress
2. Summarize key decisions and pending work before compaction
3. Compact conversation after saving state
4. Do NOT start new large operations

## Never

- Load entire codebases into context
- Enable all MCPs simultaneously (each MCP costs 8K-26K tokens for tool definitions)
- Ignore context utilization warnings
- Start large file reads without checking available context budget
- Load skills that are not needed for the current task

## Token Overhead Reference

| Component Type | Approximate Cost |
|----------------|-----------------|
| Each MCP (GitHub) | ~26K tokens |
| Each MCP (Playwright) | ~8K tokens |
| Each MCP (Database) | ~8-15K tokens |
| Each skill (when loaded) | ~500-2,000 tokens |
| Large skill with references | ~2,000-5,000 tokens |
| CLAUDE.md | ~1,000-3,000 tokens |
| Each rule file | ~200-800 tokens |

---
name: debug
description: >
  Show the full system inventory -- plugin version, registered hooks, active
  rules, available skills, agents, knowledge base state, and memory state.
  Answers "what is active right now?"
---

# /debug -- System Inventory

Display the current state of all framework components.

## When to Activate

- User says "debug", "system state", "show inventory", "what's loaded"
- When troubleshooting unexpected behavior
- When verifying a layer implementation is complete
- When onboarding to understand what the framework provides

## Procedure

### Step 1: Plugin Info

Read `.claude-plugin/plugin.json`:
- Report **name** and **version**

### Step 2: Registered Hooks

Read `.claude/settings.json`:
- List all hooks by event type (SessionStart, PreCompact, Stop, etc.)
- For each hook, report: event, command path, enabled status

### Step 3: Active Rules

List files in `.claude/rules/`:
- Report each rule file name
- Count total rules

### Step 4: Available Skills

List directories in `.claude/skills/`:
- Categorize as **Command-Skill** (user-invokable via `/name`) or **Utility Skill** (invoked by other components)
- Command-Skills: `compound`, `context-status`, `debug`, `diagnose`, `logs`, `metrics`, `trace`, and L4 workflow commands
- Utility Skills: `context-manager`, `error-recovery`, `eval-harness`, `orchestrator`, `reflection-loop`, `compound-docs`, `session-memory`, `human-checkpoint`
- Count total skills

### Step 5: Available Agents

List directories in `agents/` by category:
- **Research:** list agents in `agents/research/`
- **Orchestration:** list agents in `agents/orchestration/`
- **Specification:** list agents in `agents/specification/`
- **Review:** list agents in `agents/review/`
- Count total agents

### Step 6: Knowledge Base

Read `knowledge/index.md`:
- Count total entries (exclude placeholders like "_No entries yet._")
- Count entries per category
- Count entries in "Needs Expansion" section

### Step 7: Memory State

Check `.claude/memory/`:
- **Session summary:** Does `.claude/memory/session-summary.md` exist? Is it non-empty?
- **Checkpoints:** Count files in `.claude/memory/checkpoints/`
- **Staged learnings:** Count files in `.claude/memory/learnings/`

## Output Format

```
## System Inventory

### Plugin
- Name: ai-dev-framework
- Version: X.Y.Z

### Hooks (N registered)
| Event | Command | Enabled |
|-------|---------|---------|
| ...   | ...     | ...     |

### Rules (N active)
- rule-name-1.md
- rule-name-2.md

### Skills (N total: M command-skills, K utility skills)

**Command-Skills:**
- /command-1, /command-2, ...

**Utility Skills:**
- skill-1, skill-2, ...

### Agents (N total)
| Category | Count | Agents |
|----------|-------|--------|
| Research  | N    | list   |
| ...       | N    | list   |

### Knowledge Base
- Total entries: N
- By category: Patterns (N), Fixes (N), Decisions (N), Anti-Patterns (N), Expertise (N)
- Needs expansion: N

### Memory State
- Session summary: [exists / empty / missing]
- Checkpoints: N
- Staged learnings: N
```

## L1 Integration

This command has low context impact:
- File listing and counting, not full file reads (~1-2K tokens)
- Only reads `plugin.json`, `settings.json`, and `knowledge/index.md` in full
- Safe at any utilization level

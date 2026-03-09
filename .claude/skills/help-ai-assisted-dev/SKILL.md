---
name: help-ai-assisted-dev
description: >
  Quick-reference command guide for the AI-Assisted Development Framework.
  Lists all available commands grouped by purpose, shows workflow sequences,
  and provides a decision tree for what to do next.
---

# /help-ai-assisted-dev -- Framework Command Reference

Display an organized guide to all available commands and how to use them.

## When to Activate

- User types `/help-ai-assisted-dev` or asks "what commands are available?"
- User seems unsure what to do next
- First interaction in a new session

## Output

Present the following sections directly to the user:

### Section 1: Command Overview

```
## Available Commands

### Workflow
| Command | What it does |
|---------|-------------|
| /specify | Create a new feature specification (greenfield entry point) |
| /clarify | Resolve ambiguities in a spec |
| /plan | Create an implementation plan from a spec |
| /approve | Human approval checkpoint before proceeding |
| /work | Execute the implementation |
| /review | Multi-agent code review |
| /propose | Create a change proposal for existing code (brownfield entry point) |
| /archive | Merge brownfield changes back to source specs |

### Session Management
| Command | What it does |
|---------|-------------|
| /checkpoint | Save current progress as a named restore point |
| /rewind | Go back to a previous checkpoint |
| /abort | Stop the current workflow gracefully |

### Learning
| Command | What it does |
|---------|-------------|
| /compound | Capture what you learned this session for future sessions |

### Diagnostics
| Command | What it does |
|---------|-------------|
| /metrics | Full measurement dashboard |
| /context-status | How much context window is being used |
| /debug | List all framework components and their status |
| /trace | Decision history for this session |
| /logs | Execution history across recent sessions |
| /diagnose | Analyze what went wrong and suggest fixes |

### Help
| Command | What it does |
|---------|-------------|
| /help-ai-assisted-dev | This guide |
| /start-development | Guided walkthrough for first-time users |
| /update-me | See where you left off and what to do next |
```

### Section 2: Workflow Quick Reference

```
## Workflows

### Building something new (greenfield)
/specify → /clarify → /plan → /approve → /work → /review → /compound

### Changing existing code (brownfield)
/propose → /clarify → /plan → /approve → /work → /review → /archive → /compound
```

### Section 3: What Should I Do?

```
## Quick Decision Guide

- **Starting a new feature?** → /specify
- **Changing existing code?** → /propose
- **Something broke?** → /diagnose
- **End of session?** → /compound
- **Want to see system state?** → /debug
- **Context getting full?** → /context-status
- **Returning to a project?** → /update-me
- **First time using this?** → /start-development
- **Want to save progress?** → /checkpoint
```

### Section 4: Learn More

```
## Learn More

- Layer deep-dives: docs/layer1-context-management.md through docs/layer7-measurement.md
- Constitutional articles: appendix/constitutional-articles.md
- Metrics catalog: appendix/metrics-catalog.md
- Knowledge base: knowledge/index.md
- Integration guide (for MCPs): appendix/integration-guide.md
```

## L1 Integration

This command has minimal context impact:
- ~1,000 tokens to load
- Output is static text, no file reads or agent spawns
- Safe to run at any context utilization level

---
name: orchestrator
description: >
  Route complex tasks to multi-agent orchestration patterns. Activate when a
  task requires parallel investigation, sequential phase execution, or iterative
  refinement. Helps decompose work, select agents, and synthesize results.
---

# Orchestrator

Route tasks to the appropriate multi-agent coordination pattern and manage result synthesis.

## When to Activate

- Task requires multiple independent perspectives (e.g., analyze from different angles)
- Task exceeds single-context capacity and needs decomposition
- Task has sequential phase dependencies (e.g., research before implementation)
- Task needs iterative refinement with validation cycles
- User explicitly requests multi-agent coordination

## Pattern Selection Guide

Choose the pattern based on task characteristics:

### Fan-Out (Parallel)

```
Primary ──┬──► Agent A ──┐
          ├──► Agent B ──┼──► Synthesize
          └──► Agent C ──┘
```

**Use when:** Tasks are independent and can run simultaneously.
**Examples:** Review code from 3 perspectives, research codebase + docs + git history in parallel, check clarity + completeness of a spec simultaneously.
**Key constraint:** All tasks must be independent -- no task depends on another's output.

### Pipeline (Sequential)

```
Agent A ───► Agent B ───► Agent C
(Research)   (Analyze)    (Apply)
```

**Use when:** Each step depends on the previous step's output.
**Examples:** Research patterns → summarize findings → apply to implementation plan. Analyze codebase → identify gaps → draft spec for gaps.
**Key constraint:** Each agent receives the previous agent's output as part of its input.

### Iterative Refinement

```
Agent A ◄──► Agent B  (loop until satisfactory)
(Draft)      (Validate)
```

**Use when:** Output needs validation and improvement cycles.
**Examples:** Draft spec → check completeness → revise → re-check. Research → assess sufficiency → research more if gaps remain.
**Key constraint:** Define a maximum iteration count (default: 3) and clear exit criteria.

## Agent Directory

Available agents by category. Use this directory to select agents for orchestration patterns.

### Research Agents (haiku)

| Agent | Purpose | Spawns From |
|-------|---------|-------------|
| `repo-analyst` | Analyze codebase structure, patterns, conventions | `agents/research/repo-analyst/` |
| `best-practices-researcher` | Find implementation patterns in existing code | `agents/research/best-practices-researcher/` |
| `framework-docs-researcher` | Look up framework and library documentation | `agents/research/framework-docs-researcher/` |
| `git-history-analyzer` | Understand how code evolved over time | `agents/research/git-history-analyzer/` |
| `knowledge-searcher` | Search knowledge base for past learnings | `agents/research/knowledge-searcher/` |

### Orchestration Agents (haiku)

| Agent | Purpose | Spawns From |
|-------|---------|-------------|
| `fan-out-coordinator` | Run independent tasks in parallel, synthesize | `agents/orchestration/fan-out-coordinator/` |
| `pipeline-orchestrator` | Chain sequential phases with pass-through | `agents/orchestration/pipeline-orchestrator/` |
| `iterative-retriever` | Refine output through validation loops | `agents/orchestration/iterative-retriever/` |

### Specification Agents (haiku)

| Agent | Purpose | Spawns From |
|-------|---------|-------------|
| `clarity-checker` | Flag ambiguous or vague language | `agents/specification/clarity-checker/` |
| `completeness-auditor` | Check document coverage and missing elements | `agents/specification/completeness-auditor/` |
| `consistency-validator` | Find contradictions within or between documents | `agents/specification/consistency-validator/` |
| `testability-reviewer` | Verify requirements are testable | `agents/specification/testability-reviewer/` |

### Review Agents

Run in fan-out during `/review`. Agents marked with (sonnet) use sonnet; all others use haiku.

| Agent | Focus | Blocker? | Spawns From |
|-------|-------|----------|-------------|
| `security-sentinel` (sonnet) | OWASP, auth, injection | P1 | `agents/review/security-sentinel/` |
| `performance-oracle` | Core Web Vitals, bundle size | No | `agents/review/performance-oracle/` |
| `accessibility-guardian` | WCAG 2.1 AA | P1 (UI) | `agents/review/accessibility-guardian/` |
| `constitutional-checker` (sonnet) | Article compliance | P1 | `agents/review/constitutional-checker/` |
| `spec-compliance-reviewer` | Spec requirements coverage | P1 | `agents/review/spec-compliance-reviewer/` |
| `code-simplicity-reviewer` | Over-engineering, complexity | No | `agents/review/code-simplicity-reviewer/` |
| `architecture-strategist` | Design patterns, structure | No | `agents/review/architecture-strategist/` |
| `data-integrity-guardian` (sonnet) | Validation, type safety | P1 | `agents/review/data-integrity-guardian/` |
| `pattern-recognition-specialist` | Anti-pattern detection | No | `agents/review/pattern-recognition-specialist/` |

## Context Passing Protocol

When spawning agents, follow these guidelines to manage context effectively:

### What to Include in the Agent Prompt

- **Task description:** Clear, specific statement of what to do
- **Scope boundaries:** What to look at and what to ignore
- **File paths:** Specific paths relevant to the task (not entire directories)
- **Output format:** Reference the agent's Output Contract

### What Agents Read Themselves

- Codebase files (agents have their own context and can read files directly)
- Git history (agents can run git commands)
- Framework documentation (agents can search and read docs)

### What NOT to Include

- Entire file contents (let agents read what they need)
- Conversation history from the parent context
- Output from unrelated agents (only pass what is relevant)
- Redundant context that the agent can discover itself

## Result Synthesis

How to combine outputs from multiple agents:

### Concatenation

Simple combination when results are complementary and non-overlapping.
**Use for:** Fan-out patterns where each agent covers a different area.

### Judgment Synthesis

Weigh and reconcile when agents may have conflicting findings.
**Use for:** Review patterns where agents assess the same code from different angles.
**Approach:** List agreements, list conflicts, provide resolution rationale.

### Conflict Resolution

When agents disagree, resolve based on priority:
1. Security findings take precedence over performance findings
2. Spec compliance takes precedence over style preferences
3. Constitutional article violations are non-negotiable
4. When priorities are equal, present both views to the user

## L1 Integration

### Pre-Spawn Context Check

Before spawning agents, consider context budget:
- Spawned agents run in **isolated contexts** -- they do not consume the parent's token budget
- Agent **results re-enter the parent context** -- each result costs tokens in the parent
- A fan-out of 5 agents returning ~2,000 tokens each = ~10,000 tokens added to parent
- If parent context is above 60%, warn before large fan-outs
- Prefer concise, structured agent outputs over verbose narratives

### Model Selection

Follow `.claude/rules/model-selection.md`:
- **Default:** haiku for all spawned agents
- **Escalate to sonnet:** if haiku output quality is insufficient for the task
- **Reserve opus:** for security analysis or architecturally complex reasoning
- Never use opus for simple research or exploration tasks

### L3 Integration

- **Error recovery:** When an orchestration pattern encounters a failure, the `error-recovery` skill provides recovery strategies. See `.claude/skills/error-recovery/SKILL.md` for fan-out, pipeline, and iterative failure handling guidance.
- **Knowledge search:** The `knowledge-searcher` agent can be included in fan-out research patterns alongside other research agents to check for prior art before starting new work.

### L6 Integration

- **Knowledge search before work:** Always include `knowledge-searcher` in research fan-outs to check for prior art before starting new work. This surfaces previously captured patterns, fixes, and decisions that may be relevant.
- **Compound after work:** After `/review` completes, prompt the user to run `/compound` to capture any patterns, fixes, or decisions discovered during implementation. This closes the compounding loop.

### L7 Integration

- **Measurement commands are low-cost:** All L7 commands (`/metrics`, `/context-status`, `/debug`, `/trace`, `/logs`, `/diagnose`) are safe to run alongside other work. They read existing artifacts without spawning agents.
- **Pre-fan-out context check:** Run `/context-status` before large agent fan-outs when utilization is unknown. This costs ~1-2K tokens and prevents launching agents when context is already pressured.

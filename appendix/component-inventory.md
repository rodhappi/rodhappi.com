# Component Inventory

This document provides a complete inventory of component types for building an AI-assisted development environment.

---

## Component Types Overview

| Component Type | Purpose | When Loaded | Primary Layers |
|----------------|---------|-------------|----------------|
| Context Files | Project-wide knowledge | Session start | L1 |
| Rules | Always-active constraints | Always | L1, L4 |
| Skills | On-demand expertise | When invoked | All |
| Agents | Specialized sub-processes | When spawned | L2 |
| Commands | User-invoked workflows | When called | L4 |
| Hooks | Event-triggered actions | On events | L3, L5, L6 |
| MCPs/Integrations | External tool connections | When enabled | L5 |
| Templates | Output structures | When generating | L4 |

---

## Commands Inventory

### Workflow Commands

| Command | Purpose | Quality Gate In | Quality Gate Out |
|---------|---------|-----------------|------------------|
| `/specify` | Create feature specification | None (entry point) | No ambiguity markers |
| `/clarify` | Resolve ambiguities | Has ambiguity markers | All resolved |
| `/plan` | Create implementation plan | Spec approved | Constitutional compliance |
| `/work` | Execute implementation | Plan approved | Tests passing |
| `/review` | Multi-agent code review | Work complete | No critical findings |
| `/compound` | Capture learnings | Problem solved | Knowledge indexed |

### Brownfield Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/propose` | Create change proposal | Modifying existing system |
| `/archive` | Merge changes to source specs | After change approved |

### Memory Commands

| Command | Purpose | Usage |
|---------|---------|-------|
| `/checkpoint` | Create named save point | Before risky operations |
| `/rewind` | Restore previous state | To recover from issues |
| `/abort` | Graceful workflow termination | When work cannot continue |

### HITL Commands

| Command | Purpose | Usage |
|---------|---------|-------|
| `/approve` | Approve pending checkpoint | At quality gates |

### Measurement Commands

| Command | Purpose | Usage |
|---------|---------|-------|
| `/metrics` | View metrics dashboard | Track effectiveness |
| `/context-status` | Show context utilization | Monitor token usage |
| `/debug` | Show system state | Troubleshooting |
| `/trace` | Show decision history | Understanding flow |
| `/diagnose` | Analyze failures | When commands fail |
| `/logs` | View execution history | Audit and debugging |

---

## Skills Inventory

### Context Skills

| Skill | Purpose | Triggers |
|-------|---------|----------|
| `context-manager` | Monitor/optimize context | Automatic at thresholds |

### Orchestration Skills

| Skill | Purpose | Triggers |
|-------|---------|----------|
| `orchestrator` | Route to orchestration patterns | Complex multi-agent tasks |

### Memory Skills

| Skill | Purpose | Triggers |
|-------|---------|----------|
| `session-memory` | Checkpoints, save/load | Commands, hooks |
| `error-recovery` | Failure handling, rollback | On errors |

### Execution Skills

| Skill | Purpose | Triggers |
|-------|---------|----------|
| `constitutional-check` | Validate against constitution | Quality gates |
| `cross-validate` | Ensure artifact consistency | Phase transitions |
| `human-checkpoint` | Define HITL approval points | Risky operations |

### Compounding Skills

| Skill | Purpose | Triggers |
|-------|---------|----------|
| `reflection-loop` | Extract patterns from sessions | Session end |
| `compound-docs` | Create knowledge entries | /compound command |
| `knowledge-search` | Find relevant past learnings | Research phases |

### Measurement Skills

| Skill | Purpose | Triggers |
|-------|---------|----------|
| `eval-harness` | Run evaluations | Measurement commands |

### Domain Expertise Skills (Build Your Own)

| Category | Examples | Purpose |
|----------|----------|---------|
| Languages | python, typescript, go, rust | Language idioms, patterns |
| Frameworks | react, nextjs, django, rails | Framework-specific knowledge |
| Databases | postgresql, mongodb, redis | Database optimization |
| Practices | tdd, api-design, security | Methodology guidance |
| Infrastructure | docker, kubernetes, aws | Deployment patterns |

---

## Agents Inventory

### Research Agents

| Agent | Purpose | Model | When Used |
|-------|---------|-------|-----------|
| `repo-analyst` | Analyze codebase patterns | haiku | /specify, /plan |
| `best-practices-researcher` | Find external patterns | haiku | /plan |
| `framework-docs-researcher` | Get framework docs | haiku | /plan, /work |
| `git-history-analyzer` | Understand evolution | haiku | /plan, /review |
| `knowledge-searcher` | Search knowledge base | haiku | All commands |

### Orchestration Agents

| Agent | Pattern | When Used |
|-------|---------|-----------|
| `fan-out-coordinator` | Parallel tasks | /review |
| `pipeline-orchestrator` | Sequential phases | Workflow transitions |
| `iterative-retriever` | Refinement loops | Incomplete results |

### Specification Agents

| Agent | Purpose | Model | When Used |
|-------|---------|-------|-----------|
| `clarity-checker` | Flag ambiguity | haiku | /specify |
| `consistency-validator` | Find contradictions | haiku | /specify |
| `completeness-auditor` | Check coverage | haiku | /specify |
| `testability-reviewer` | Verify testability | haiku | /specify |

### Review Agents

| Agent | Focus Area | Blocker? |
|-------|------------|----------|
| `security-sentinel` | OWASP, auth, injection | Yes (P1) |
| `performance-oracle` | Core Web Vitals, bundle size | No |
| `accessibility-guardian` | WCAG compliance | Depends |
| `constitutional-checker` | Article compliance | Yes |
| `spec-compliance-reviewer` | Requirements coverage | Yes |
| `code-simplicity-reviewer` | Complexity reduction | No |
| `architecture-strategist` | Design patterns | No |
| `data-integrity-guardian` | Validation, type safety | Yes (P1) |
| `pattern-recognition-specialist` | Anti-patterns | No |

---

## Rules Inventory

| Rule | Layer | Purpose | Always Active |
|------|-------|---------|---------------|
| `context-budget` | L1 | Enforce context awareness | Yes |
| `spec-first` | L1 | No implementation without spec | Yes |
| `constitutional-compliance` | L4 | Enforce articles | Yes |
| `quality-gates` | L4 | Phase transition requirements | Yes |

---

## Hooks Inventory

| Hook | Event | Layer | Purpose |
|------|-------|-------|---------|
| `session-start-memory` | SessionStart | L3 | Load previous context |
| `pre-compact-save` | PreCompact | L3 | Save before compaction |
| `session-end-persist` | Stop | L6 | Extract learnings |
| `lint-on-edit` | PostToolUse | L5 | Auto-lint files |

---

## MCPs/Integrations Inventory

| Integration | Purpose | Token Cost | When to Enable |
|-------------|---------|------------|----------------|
| Playwright | Browser automation | Medium | UI development |
| GitHub | PR, issues, repos | High (~26K) | GitHub projects |
| Database (varies) | Queries, migrations | Medium | DB projects |
| Shell | Command execution | Low | Always |

---

## Templates Inventory

| Template | Purpose | Used By |
|----------|---------|---------|
| `spec-template.md` | Feature specification | /specify |
| `plan-template.md` | Implementation plan | /plan |
| `tasks-template.md` | Task breakdown | /plan |
| `constitution-template.md` | Project constitution | Setup |
| `knowledge-template.md` | Knowledge entry | /compound |
| `proposal-template.md` | Change proposal | /propose |

---

## Building Your Own Components

### When to Build a New Component

| If you need... | Build a... |
|----------------|------------|
| Always-active behavior | Rule |
| On-demand expertise | Skill |
| Specialized sub-process | Agent |
| User-invoked workflow | Command |
| Event-triggered action | Hook |
| External tool access | MCP/Integration |
| Consistent output structure | Template |

### Component Design Checklist

- [ ] Clear single responsibility
- [ ] Documented triggers/usage
- [ ] Defined output format
- [ ] Appropriate model selection (if agent)
- [ ] Token cost considered
- [ ] Error handling defined
- [ ] Testing approach defined

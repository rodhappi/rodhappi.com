---
name: eval-harness
description: >
  Collect and evaluate system metrics from existing artifacts. Foundation for
  /metrics and available to other measurement commands. Computes on-demand
  from git history, knowledge base, checkpoints, and session state.
---

# Eval Harness

Measurement foundation. Collect metrics from existing artifacts without a persistent metrics store.

## When to Activate

- Invoked by the `/metrics` command for a full dashboard
- When the user asks to measure system effectiveness
- When other measurement commands need metric data for a specific category

## Design Philosophy

Three principles govern measurement in this framework:

1. **Compute on-demand.** Every metric derives from artifacts that already exist (git log, knowledge/index.md, checkpoints, session-summary). No metrics database. No persistent store.
2. **Point-in-time snapshots.** Report current state, not trends. Trend metrics require time-series data that does not exist -- report them as "N/A" rather than fabricate numbers.
3. **Honest fidelity labeling.** Each metric is tagged with its fidelity level so the user knows what to trust.

## Measurement Fidelity Levels

| Level | Definition | Examples |
|-------|-----------|----------|
| **Available** | Computable from current artifacts with confidence | Knowledge entry count, token utilization estimate |
| **Estimable** | Approximated from artifacts with caveats | Quality gate pass rate (from checkpoint history) |
| **Unavailable** | Requires time-series data or external instrumentation | Rework rate, task velocity trends, approval latency |

Always report the fidelity level alongside each metric value. Never present an Unavailable metric as if it has a real value.

## Metric Collection Protocols

### 1. Context Metrics

**Sources:** `context-manager` skill heuristic, `.claude/settings.json`

| Metric | How to Collect | Fidelity |
|--------|---------------|----------|
| Token Utilization | Apply `context-manager` estimation heuristic (system overhead + loaded skills + MCPs + conversation length) | Estimable |
| MCP Overhead | Count enabled MCPs in `.claude/settings.json`, multiply by reference costs | Available |
| Compaction Frequency | Count compaction checkpoints in `.claude/memory/checkpoints/` with trigger `"auto-compact"` | Available |
| Context Efficiency Ratio | N/A -- requires instrumentation | Unavailable |

### 2. Quality Metrics

**Sources:** `git log`, `knowledge/index.md`, `.claude/memory/checkpoints/`

| Metric | How to Collect | Fidelity |
|--------|---------------|----------|
| Test Pass Rate | Run `git log --oneline -10` and check for test-related commits; cannot determine actual rate without running tests | Unavailable |
| Spec-Code Traceability | Count spec files in `specs/` and check for requirement ID references in code | Estimable |
| Constitutional Compliance | Count review checkpoints with P1 findings vs. total review checkpoints | Estimable |
| Review Finding Density | N/A -- requires per-review structured data | Unavailable |
| P1 Finding Rate | Count checkpoints with P1 flags vs. total review checkpoints | Estimable |

### 3. Compounding Metrics

**Sources:** `knowledge/index.md`, `knowledge/` subdirectories, `git log`

| Metric | How to Collect | Fidelity |
|--------|---------------|----------|
| Knowledge Entry Count | Count entries listed in `knowledge/index.md` (exclude placeholders) | Available |
| Knowledge by Category | Count entries per category section in `knowledge/index.md` | Available |
| Knowledge Growth Rate | Count knowledge commits in `git log --all --oneline -- knowledge/` | Estimable |
| Quick Captures Pending | Count entries in "Needs Expansion" section of `knowledge/index.md` | Available |
| Mistake Recurrence Rate | N/A -- requires tracking over time | Unavailable |
| Knowledge Reuse Rate | N/A -- requires session instrumentation | Unavailable |

### 4. Efficiency Metrics

**Sources:** `.claude/memory/checkpoints/`, `git log`

| Metric | How to Collect | Fidelity |
|--------|---------------|----------|
| Quality Gate Pass Rate | Read checkpoint files, count transitions with pass vs. fail | Estimable |
| Rework Rate | N/A -- requires task tracking over time | Unavailable |
| Task Velocity | N/A -- requires time-series data | Unavailable |
| Time to First Code | N/A -- requires session timing instrumentation | Unavailable |

### 5. Human-AI Collaboration Metrics

**Sources:** `.claude/memory/session-summary.md`, `.claude/memory/checkpoints/`

| Metric | How to Collect | Fidelity |
|--------|---------------|----------|
| HITL Intervention Count | Count checkpoints with trigger `"human"` or `"approve"` | Estimable |
| Approval Events | Search session-summary for `/approve` invocations | Estimable |
| Human Override Rate | N/A -- requires structured decision logging | Unavailable |
| Confidence Calibration | N/A -- requires outcome tracking | Unavailable |

## Evaluation Patterns

From `appendix/metrics-catalog.md`:

### pass@k (At Least One Success)

```
pass@k = 1 - (1 - p)^k
```

Use when any successful path is acceptable (e.g., "did the feature work after k attempts?").

### pass^k (All Must Succeed)

```
pass^k = p^k
```

Use when consistency is critical (e.g., "does the feature work every time?").

## Status Thresholds

Each metric receives a status based on its value relative to targets defined in `appendix/metrics-catalog.md`:

| Status | Meaning |
|--------|---------|
| OK | Within target range |
| Warning | Approaching threshold, attention needed |
| Critical | Outside acceptable range, action required |
| N/A | Unavailable -- requires data that does not exist |

## Output Format

When invoked, produce a structured report organized by category:

```
## [Category Name]

| Metric | Value | Target | Status | Fidelity |
|--------|-------|--------|--------|----------|
| ...    | ...   | ...    | ...    | ...      |
```

Include a summary section listing any Warning or Critical metrics with suggested actions from `appendix/metrics-catalog.md` "Red Flags and Actions" table.

## Integration

- The `/metrics` command invokes this skill for all 5 categories
- Other commands (`/context-status`, `/diagnose`) may invoke specific category protocols
- Full metric definitions and targets: `appendix/metrics-catalog.md`
- Context estimation heuristic: `.claude/skills/context-manager/SKILL.md`

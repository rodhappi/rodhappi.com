---
name: metrics
description: >
  Display the full metrics dashboard. Invokes eval-harness for all 5 metric
  categories and renders results with status indicators. Answers "how is the
  system performing?"
---

# /metrics -- Metrics Dashboard

Display a comprehensive view of system performance across all metric categories.

## When to Activate

- User says "metrics", "dashboard", "show metrics", "how are we doing"
- At the end of a work session to assess system health
- Before starting a new phase to check baseline
- During retrospectives or planning

## Procedure

### Step 1: Invoke Eval Harness

Activate the `eval-harness` skill to collect metrics across all 5 categories:
1. Context Metrics
2. Quality Metrics
3. Compounding Metrics
4. Efficiency Metrics
5. Human-AI Collaboration Metrics

The eval-harness returns structured data with values, targets, statuses, and fidelity levels for each metric.

### Step 2: Render Dashboard

Present results as a structured dashboard:

```
## Metrics Dashboard

Plugin: ai-dev-framework vX.Y.Z
Collected: [current date/time]

### Context Metrics
| Metric | Value | Target | Status | Fidelity |
|--------|-------|--------|--------|----------|
| Token Utilization | ~XX% | <75% | [OK/Warning/Critical] | Estimable |
| MCP Overhead | X tokens | -- | [OK/Warning] | Available |
| Compaction Frequency | N | <3/session | [OK/Warning] | Available |
| Context Efficiency | N/A | >60% | N/A | Unavailable |

### Quality Metrics
| Metric | Value | Target | Status | Fidelity |
|--------|-------|--------|--------|----------|
| ... | ... | ... | ... | ... |

### Compounding Metrics
| Metric | Value | Target | Status | Fidelity |
|--------|-------|--------|--------|----------|
| Knowledge Entries | N | -- | [OK] | Available |
| ... | ... | ... | ... | ... |

### Efficiency Metrics
| Metric | Value | Target | Status | Fidelity |
|--------|-------|--------|--------|----------|
| ... | ... | ... | ... | ... |

### Human-AI Collaboration
| Metric | Value | Target | Status | Fidelity |
|--------|-------|--------|--------|----------|
| ... | ... | ... | ... | ... |
```

### Step 3: Highlight Alerts

After the dashboard, list any metrics with Warning or Critical status:

```
### Alerts

- **[Warning]** Token Utilization at ~82% -- consider checkpointing
- **[Critical]** ... -- [suggested action]

No alerts: "All metrics within acceptable ranges."
```

### Step 4: Suggest Actions

For each alert, provide a suggested action from the "Red Flags and Actions" table in `appendix/metrics-catalog.md`:

| Red Flag | Action |
|----------|--------|
| High token utilization | Audit context, disable unused MCPs |
| Zero knowledge reuse | Improve knowledge indexing |
| High rework rate | Improve /specify phase |
| Mistake recurrence >0% | Audit knowledge capture |
| High P1 finding rate | Enforce gates strictly |

### Step 5: Fidelity Summary

End with a note on data quality:

```
### Data Quality
- Available metrics: N (computed from artifacts)
- Estimable metrics: N (approximated)
- Unavailable metrics: N (require instrumentation not yet in place)

Note: Unavailable metrics will show real values when time-series data
collection is implemented. See appendix/metrics-catalog.md for full
metric definitions and collection methods.
```

## L1 Integration

This command has medium context impact:
- Eval-harness reads multiple artifact files (~3-6K tokens total)
- Dashboard rendering adds ~1-2K tokens
- Total estimate: ~4-8K tokens
- Safe at utilization below 75%; warn the user if above 75%
- If context is above 85%, suggest running `/context-status` instead (lighter)

## Integration

- Invokes `eval-harness` skill for all metric collection
- Full metric definitions and targets: `appendix/metrics-catalog.md`
- Dashboard template reference: `appendix/metrics-catalog.md` "Metrics Dashboard Template"
- Context-specific metrics also available via `/context-status` (lighter command)

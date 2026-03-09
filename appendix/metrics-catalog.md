# Metrics Catalog

This document provides a comprehensive catalog of metrics for measuring AI-assisted development effectiveness.

---

## Metrics Categories

| Category | Purpose | Layer |
|----------|---------|-------|
| Context Metrics | Monitor token usage and efficiency | L1, L7 |
| Quality Metrics | Track code and artifact quality | L4, L7 |
| Compounding Metrics | Measure learning effectiveness | L6, L7 |
| Efficiency Metrics | Track productivity and throughput | L7 |
| Human-AI Collaboration | Measure collaboration quality | L4, L7 |

---

## Context Metrics

### Token Utilization

**Definition:** Percentage of context window currently in use.

| Threshold | Status | Action |
|-----------|--------|--------|
| <75% | OK | Continue normally |
| 75-85% | Warning | Suggest checkpoint, review MCPs |
| >85% | Critical | Save state, compact |

**Calculation:**
```
Token Utilization = (Current Tokens / Max Tokens) × 100
```

**Why It Matters:** High utilization degrades AI performance and risks information loss during compaction.

---

### MCP Overhead

**Definition:** Tokens consumed by MCP tool definitions.

**Typical Values:**
| MCP | Estimated Tokens |
|-----|------------------|
| GitHub | ~26,000 |
| Playwright | ~8,000 |
| Database | ~5,000 |
| Shell | ~2,000 |

**Why It Matters:** MCPs consume context even when not actively used. Disable unused MCPs.

---

### Compaction Frequency

**Definition:** How often context compaction is triggered per session.

| Frequency | Interpretation |
|-----------|----------------|
| 0 per session | Excellent context efficiency |
| 1-2 per session | Normal for complex work |
| 3+ per session | Investigate context waste |

**Why It Matters:** Frequent compaction suggests inefficient context usage or overly large operations.

---

### Context Efficiency Ratio

**Definition:** Useful tokens vs. total tokens consumed.

**Calculation:**
```
Efficiency = (Tokens contributing to output / Total tokens used) × 100
```

**Target:** >60%

**Why It Matters:** Low efficiency means wasted context on irrelevant information.

---

## Quality Metrics

### Test Pass Rate

**Definition:** Percentage of tests passing.

**Target:** 100%

**Calculation:**
```
Test Pass Rate = (Passing Tests / Total Tests) × 100
```

---

### Spec→Code Traceability

**Definition:** Percentage of spec requirements with corresponding code.

**Target:** >90%

**Calculation:**
```
Traceability = (Requirements with code / Total requirements) × 100
```

**How to Measure:**
- Tag code with requirement IDs (e.g., `// FR-001`)
- Count requirements with at least one code reference

---

### Spec→Test Traceability

**Definition:** Percentage of spec requirements with corresponding tests.

**Target:** >90%

**Calculation:**
```
Traceability = (Requirements with tests / Total requirements) × 100
```

---

### Constitutional Compliance Rate

**Definition:** Percentage of artifacts passing constitutional checks.

**Target:** 100% before merge

**Calculation:**
```
Compliance = (Passing artifacts / Total artifacts checked) × 100
```

---

### Review Finding Density

**Definition:** Number of review findings per 100 lines of code.

| Density | Interpretation |
|---------|----------------|
| <1 per 100 LOC | Excellent |
| 1-3 per 100 LOC | Normal |
| >3 per 100 LOC | Quality concern |

**Calculation:**
```
Density = (Total findings / Lines of code) × 100
```

---

### P1 Finding Rate

**Definition:** Percentage of reviews with critical (blocking) findings.

**Target:** <10%

**Why It Matters:** High P1 rate suggests quality issues earlier in pipeline.

---

## Compounding Metrics

### Knowledge Reuse Rate

**Definition:** How often existing knowledge is surfaced and applied.

**Target:** >50% of sessions should use prior knowledge

**Calculation:**
```
Reuse Rate = (Sessions using knowledge / Total sessions) × 100
```

**Why It Matters:** Low reuse means knowledge capture isn't working or knowledge isn't searchable.

---

### Mistake Recurrence Rate

**Definition:** How often a documented mistake happens again.

**Target:** 0% for documented mistakes

**Calculation:**
```
Recurrence = (Repeated mistakes / Documented mistakes) × 100
```

**Why It Matters:** Any recurrence >0% means compounding loop is broken.

---

### Knowledge Growth Rate

**Definition:** New knowledge entries added per time period.

**Healthy Range:** 2-5 entries per week per active developer

**Why It Matters:**
- Zero growth = not capturing learnings
- Too high = possibly capturing noise

---

### Knowledge Quality Score

**Definition:** Percentage of knowledge entries meeting quality criteria.

**Quality Criteria:**
- [ ] Has searchable tags
- [ ] Includes error message (if applicable)
- [ ] Shows wrong AND right approach
- [ ] Explains why solution works
- [ ] Includes prevention strategy

**Target:** >80%

---

### Skill Trigger Accuracy

**Definition:** How often skills are invoked when they should be.

**Target:** >90%

**Why It Matters:** Low accuracy means skill descriptions or triggers need improvement.

---

## Efficiency Metrics

### Time to First Working Code

**Definition:** Time from starting work to first passing tests.

**Track Trend:** Should decrease over time as compounding takes effect.

---

### Rework Rate

**Definition:** Percentage of work that needs to be redone after review.

**Target:** <10%

**Calculation:**
```
Rework Rate = (Tasks requiring rework / Total tasks) × 100
```

**Why It Matters:** High rework wastes effort and indicates quality issues.

---

### Task Completion Velocity

**Definition:** Tasks completed per time period.

**Track Trend:** Should stabilize or increase (after learning curve).

---

### Quality Gate Pass Rate (First Try)

**Definition:** Percentage of phase transitions passing on first attempt.

**Target:** >80%

**Calculation:**
```
First Try Pass = (Passed first try / Total transitions) × 100
```

**Why It Matters:** Low first-try pass rate suggests issues in earlier phases.

---

### Context-to-Output Ratio

**Definition:** Tokens of output produced per token of context used.

**Calculation:**
```
Ratio = Output tokens / Input tokens
```

**Why It Matters:** Very low ratio suggests inefficient prompting or unnecessary context.

---

## Human-AI Collaboration Metrics

### HITL Intervention Rate

**Definition:** How often human intervention is needed.

**Healthy Range:** 10-30% of operations

**Why It Matters:**
- Too low = AI may be making decisions that should involve humans
- Too high = AI not autonomous enough

---

### Approval Latency

**Definition:** Time between AI requesting approval and human responding.

**Target:** <1 hour for non-blocking, <4 hours for blocking

**Why It Matters:** Long latency creates bottlenecks.

---

### Human Override Rate

**Definition:** How often humans reject AI suggestions.

**Healthy Range:** 5-20%

**Why It Matters:**
- Too low = possible rubber-stamping
- Too high = AI quality issues

---

### Confidence Calibration

**Definition:** Correlation between AI confidence and actual correctness.

**Target:** >80% correlation

**How to Measure:**
- Track AI-stated confidence
- Track actual outcome (correct/incorrect)
- Calculate correlation

---

## Evaluation Patterns

### pass@k

**Definition:** At least ONE of k attempts succeeds.

**Formula:**
```
pass@k = 1 - (1 - p)^k

where p = single-attempt success probability
```

**Example:**
| k | p=70% |
|---|-------|
| 1 | 70% |
| 3 | 91% |
| 5 | 97% |

**When to Use:** You need the feature to work (any successful path acceptable).

---

### pass^k

**Definition:** ALL k attempts must succeed.

**Formula:**
```
pass^k = p^k

where p = single-attempt success probability
```

**Example:**
| k | p=70% |
|---|-------|
| 1 | 70% |
| 3 | 34% |
| 5 | 17% |

**When to Use:** Consistency is critical (every attempt must work the same).

---

## Metrics Dashboard Template

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           METRICS DASHBOARD                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  CONTEXT                          │  QUALITY                                │
│  ─────────────────────────────────│──────────────────────────────────────   │
│  Token Utilization:  [████████░░] 78%  │  Test Pass Rate:     100% ✓       │
│  MCP Overhead:       12,000 tokens│  Traceability:       92% ✓            │
│  Compaction Today:   1            │  Constitutional:     100% ✓           │
│                                   │  P1 Findings:        0 ✓              │
│                                   │                                        │
│  COMPOUNDING                      │  EFFICIENCY                            │
│  ─────────────────────────────────│──────────────────────────────────────   │
│  Knowledge Reuse:    67% ✓        │  Rework Rate:        8% ✓             │
│  Mistake Recurrence: 0% ✓         │  First-Try Pass:     85% ✓            │
│  New Knowledge:      3 this week  │  Task Velocity:      ↑ 12%            │
│                                   │                                        │
│  HUMAN-AI                         │  TRENDS                                │
│  ─────────────────────────────────│──────────────────────────────────────   │
│  HITL Rate:          22%          │  Quality:            ↑ Improving      │
│  Approval Latency:   45 min avg   │  Efficiency:         → Stable         │
│  Override Rate:      12%          │  Compounding:        ↑ Improving      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Setting Up Metrics Collection

### Automatic Collection

| Metric | Collection Method |
|--------|-------------------|
| Token utilization | Tool/API instrumentation |
| Test pass rate | CI/CD integration |
| Task completion | Task tracking system |
| Compaction events | Session hooks |

### Manual Collection

| Metric | Collection Method |
|--------|-------------------|
| Knowledge quality | Periodic review |
| Traceability | Audit script |
| Confidence calibration | Sample review |

### Collection Cadence

| Cadence | Metrics |
|---------|---------|
| Real-time | Token utilization, test pass |
| Per-session | Compaction, HITL interventions |
| Daily | Task velocity, knowledge growth |
| Weekly | Quality trends, compounding effectiveness |
| Monthly | Strategic metrics, ROI |

---

## Using Metrics for Improvement

### Red Flags and Actions

| Red Flag | Possible Cause | Action |
|----------|----------------|--------|
| High token utilization | Too many MCPs, large files | Audit context, disable unused MCPs |
| Low test pass rate | Quality issues | Review earlier phases |
| Zero knowledge reuse | Poor search, bad tagging | Improve knowledge indexing |
| High rework rate | Spec quality issues | Improve /specify phase |
| Mistake recurrence >0% | Broken compounding loop | Audit knowledge capture |
| High P1 finding rate | Skipping quality gates | Enforce gates strictly |

### Success Indicators

| Indicator | Meaning |
|-----------|---------|
| Decreasing time to first code | System is learning |
| Increasing knowledge reuse | Compounding working |
| Stable/decreasing rework | Quality improving |
| Zero mistake recurrence | Lessons being applied |

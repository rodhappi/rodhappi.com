# Honest Fidelity Labeling for Metrics

## Category
Pattern

## Summary
Tag every metric with its data quality level (Available, Estimable, Unavailable) so users know what to trust.

## Context
When building a measurement system where not all data sources exist yet, there is a temptation to either skip unavailable metrics entirely or estimate them without disclosure. Both approaches mislead: the first hides gaps, the second creates false confidence.

## Solution

### Structure
Three fidelity levels classify each metric:

| Level | Definition | User Action |
|-------|-----------|-------------|
| **Available** | Computable from current artifacts with confidence | Trust the number |
| **Estimable** | Approximated from artifacts with known caveats | Use with awareness of limitations |
| **Unavailable** | Requires data that does not exist | Do not rely on; shown as "N/A" |

### Key Points
- Always display the fidelity level alongside the metric value in dashboards and reports
- Never present an Unavailable metric as if it has a real value -- use "N/A" explicitly
- Estimable metrics should note their caveats (e.g., "from checkpoint history, may be incomplete")
- This builds user trust: when they see "Available", they know it is reliable

## Variations
- **Progressive fidelity:** A metric starts as Unavailable, becomes Estimable when partial data exists, and becomes Available when full instrumentation is in place
- **Confidence intervals:** Instead of three discrete levels, report a confidence percentage

## Trade-offs
| Pros | Cons |
|------|------|
| Users know exactly what to trust | Dashboard has many "N/A" entries initially |
| Prevents decisions based on bad data | Requires discipline to label honestly |
| Builds long-term credibility | More complex display than simple numbers |
| Makes data gaps visible and actionable | Users may feel the system is incomplete |

## Related Patterns
- [On-Demand Computation Over Persistent Storage](../architecture/on-demand-computation.md)

## Tags
metrics, measurement, honesty, data-quality, fidelity, trust, dashboards

## Metadata
- Created: 2026-02-18
- Source: ai-assisted-development-framework (L7 eval-harness design)
- Verified: Yes

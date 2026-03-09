# On-Demand Computation Over Persistent Storage

## Category
Pattern

## Summary
Derive metrics and state from existing artifacts at query time rather than maintaining a separate data store.

## Context
When building measurement, reporting, or diagnostic features, the instinct is to create a database or persistent store for the data. But if the data already exists in other forms (git log, index files, checkpoints, config files), computing on-demand eliminates an entire class of infrastructure and consistency problems.

## Solution

### Structure
1. Identify what artifacts already exist (git history, index files, config files, staging directories)
2. Define collection protocols that derive metrics from those artifacts
3. Compute at query time -- no caching, no persistence, no sync
4. Tag each derived value with its fidelity level (Available, Estimable, Unavailable)

### Key Points
- Every new data store creates a consistency problem: it must stay in sync with the source of truth
- Git log, file counts, and directory listings are always up to date by definition
- If a metric cannot be derived from existing artifacts, report it as "N/A" rather than building infrastructure to collect it
- This follows the Simplicity principle: the simplest solution that works

## Variations
- **Hybrid:** Compute on-demand for current values, but allow optional caching for expensive computations with a TTL
- **Progressive:** Start with on-demand, add persistent storage only when a specific metric proves too expensive to recompute

## Trade-offs
| Pros | Cons |
|------|------|
| Zero infrastructure overhead | Cannot compute historical trends |
| Always consistent with source data | Recomputation cost on every query |
| No migration or schema concerns | Some metrics are simply unavailable |
| Follows Simplicity principle | Slower for large datasets |

## Related Patterns
- [Skills Not Agents for Context-Dependent Logic](skills-not-agents-for-context-logic.md)
- [Honest Fidelity Labeling](../measurement/honest-fidelity-labeling.md)

## Tags
simplicity, metrics, architecture, storage, measurement, on-demand, computation

## Metadata
- Created: 2026-02-18
- Source: ai-assisted-development-framework (L7 Measurement layer design)
- Verified: Yes

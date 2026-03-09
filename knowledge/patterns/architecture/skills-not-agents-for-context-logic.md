# Skills Not Agents for Context-Dependent Logic

## Category
Pattern

## Summary
Use skills (in-context) instead of agents (isolated) when the component needs access to current session state.

## Context
When building Claude Code components that need to analyze, reflect on, or measure what happened in the current session, you must choose between a skill (runs in the parent context) and an agent (runs in an isolated subprocess). The wrong choice means the component cannot access the information it needs.

## Solution

### Structure
- **Skills** operate in the parent context. They can read session-summary, see what files were discussed, access conversation state, and reference loaded components.
- **Agents** run in isolated contexts. They can read files from disk and run commands, but they cannot see the parent's conversation history or session state.

### Key Points
- If the component needs to know what happened in the current session (decisions made, files discussed, errors encountered), it must be a skill
- If the component only needs to read files from disk and run commands, it can be an agent
- Agents are better for parallel execution; skills are better for context-dependent reasoning

## Variations
- **Hybrid:** A command-skill orchestrates the flow and invokes agents for disk-only tasks. Example: `/compound` (skill) could invoke `knowledge-searcher` (agent) for duplicate checking.

## Trade-offs
| Pros | Cons |
|------|------|
| Skills access full session context | Skills consume parent context tokens |
| Skills can reference loaded components | Skills cannot run in parallel with each other |
| No context serialization needed | Skills increase parent context pressure |

## Related Patterns
- [Thin Hooks + Rich Skills](../event-processing/thin-hooks-rich-skills.md)
- [On-Demand Computation Over Persistent Storage](../architecture/on-demand-computation.md)

## Tags
claude-code, skills, agents, architecture, context, component-selection

## Metadata
- Created: 2026-02-18
- Source: ai-assisted-development-framework (L6 reflection-loop, L7 eval-harness decisions)
- Verified: Yes

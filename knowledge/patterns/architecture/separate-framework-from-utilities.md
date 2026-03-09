# Separate Framework Skills from Project Utilities

## Category
Pattern

## Summary
Distinguish between skills that are part of the framework's layered architecture and project-level utilities that exist as workarounds for missing infrastructure.

## Context
When building a framework that isn't yet a formal distributable plugin, you need utilities to fill gaps (e.g., copying the framework to new projects). These utilities live alongside framework skills but serve a fundamentally different purpose. Without clear separation, users confuse infrastructure workarounds with framework capabilities.

## Solution

### Structure
Categorize every skill into one of two groups:

| Type | Purpose | Lifecycle | Example |
|------|---------|-----------|---------|
| **Framework skill** | Core layer functionality (L1-L7) | Permanent — part of the architecture | `/compound`, `/metrics`, `/specify` |
| **Project utility** | Workaround for missing infrastructure | Temporary — removed when infrastructure exists | `/bootstrap` |

### Key Points
- Framework skills map to a specific layer and have a defined role in the architecture
- Project utilities exist because of a current limitation (e.g., no formal plugin system)
- Document utilities with explicit "remove when" criteria so they don't become permanent
- In CLAUDE.md, list utilities in a separate section from framework commands
- Utilities should reference the future replacement (e.g., `/bootstrap` references `/setup` in the plugin conversion guide)

## Variations
- **Deprecation markers:** Add `## Deprecation` section to utility SKILL.md files noting what replaces them
- **Naming convention:** Prefix utilities with a namespace (e.g., `_bootstrap`) to visually distinguish them

## Trade-offs
| Pros | Cons |
|------|------|
| Users understand what's core vs. temporary | Extra documentation overhead |
| Clear migration path when infrastructure improves | Must maintain two sections in CLAUDE.md |
| Prevents utilities from becoming permanent | Requires discipline to actually remove them |

## Related Patterns
- [Skills Not Agents for Context-Dependent Logic](skills-not-agents-for-context-logic.md)

## Tags
architecture, skills, utilities, separation-of-concerns, framework, plugin, workaround

## Metadata
- Created: 2026-02-19
- Source: ai-assisted-development-framework (/bootstrap creation session)
- Verified: Yes

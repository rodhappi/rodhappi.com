# Knowledge Base Index

> Entries are added through the `/compound` workflow (Layer 6). This index is the entry point for the `knowledge-searcher` agent.

## Patterns
- [Skills Not Agents for Context-Dependent Logic](patterns/architecture/skills-not-agents-for-context-logic.md) -- Use skills when the component needs current session state
- [On-Demand Computation Over Persistent Storage](patterns/architecture/on-demand-computation.md) -- Derive metrics from existing artifacts instead of maintaining a data store
- [Thin Hooks + Rich Skills for Event Processing](patterns/event-processing/thin-hooks-rich-skills.md) -- Shell hooks capture metadata; AI skills do the analysis
- [Honest Fidelity Labeling for Metrics](patterns/measurement/honest-fidelity-labeling.md) -- Tag every metric with its data quality level
- [Separate Framework Skills from Project Utilities](patterns/architecture/separate-framework-from-utilities.md) -- Distinguish core skills from temporary workarounds
- [Pre/Post Validation for Destructive Sync Operations](patterns/safety/pre-post-validation-for-sync.md) -- Diff before and after overwrites for transparency and verification
- [Short-Circuit When Already In Sync](patterns/architecture/short-circuit-when-in-sync.md) -- Compare before writing; skip if source and destination already match
- [Self-Guiding Workflow Skills](patterns/architecture/self-guiding-workflow-skills.md) -- Standardized next-step sections make every command tell you what to do next
- [Multi-Signal Session State Detection](patterns/architecture/multi-signal-session-state-detection.md) -- Check file system, checkpoints, git log, and knowledge index in priority order
- [Convention-Based Consistency Over Per-Skill Logic](patterns/architecture/convention-based-consistency.md) -- Define a standard section convention instead of building infrastructure for cross-cutting concerns
- [Scope CSS Changes with Body Classes](patterns/css/scope-css-with-body-classes.md) -- Add a class to `<body>` to scope page-specific CSS without affecting other pages
- [Mobile-First CSS Restructure Strategy](patterns/css/mobile-first-restructure-strategy.md) -- Flip defaults: mobile overrides become base, desktop rules move into min-width blocks
- [Remove Dead CSS During Restructure](patterns/css/remove-dead-css-during-restructure.md) -- Audit CSS for orphaned classes when templates change significantly
- [Audit Literal Values When Introducing CSS Variables](patterns/css/audit-literals-when-introducing-variables.md) -- Grep for the literal value to find all instances that should use the new variable
- [Font Inheritance for Content Isolation](patterns/css/font-inheritance-for-content-isolation.md) -- Set font-family on the container; children inherit without per-element overrides
- [Validate URL Schemes on User-Provided Paths](patterns/security/validate-url-schemes-on-frontmatter-paths.md) -- HTML-escaping alone doesn't block dangerous URL schemes; apply a safe-URL allowlist
- [Dismiss False P1s with Contextual Analysis](patterns/review-process/dismiss-false-p1s-with-context.md) -- Verify agent P1 findings against actual code paths before treating as blockers
- [Preserve Raw Values Before HTML Escaping](patterns/build-pipeline/preserve-raw-values-before-escaping.md) -- Store unescaped copies for JSON-LD, RSS, and other non-HTML formats
- [Add Generated Build Artifacts to .gitignore](patterns/build-pipeline/gitignore-generated-build-artifacts.md) -- Root-anchor generated files; verify CI copies them to deploy staging
- [Consistent URL Encoding Across Formats](patterns/seo/consistent-url-encoding-across-formats.md) -- Use encodeURIComponent() everywhere URLs appear to avoid fragmented link equity

## Fixes
- [Skills Must Live in .claude/skills/ for Slash Command Discovery](fixes/claude-code/skills-directory-location.md) -- Skills at project root are not discovered as slash commands

## Decisions
- [ADR-001: Skip Layer 5 (Integration) as Project-Specific](decisions/adr-001-skip-l5-integration.md) -- L5 components depend on project-specific tool choices
- [ADR-002: Granola MCP Integration Approach](decisions/adr-002-granola-mcp-integration-approach.md) -- Evaluate official MCP vs. custom wrapper for CoS
- [ADR-003: Plan-as-Spec for Informal Changes](decisions/adr-003-plan-as-spec-for-informal-changes.md) -- A structured plan can substitute for a formal spec when requirements are well-understood

## Anti-Patterns
_No entries yet._

## Domain Expertise
- [Dotted Leader Lines with CSS repeating-linear-gradient](expertise/frontend/dotted-leader-lines-css.md) -- Flex spacer with gradient for editorial-style title-to-date dot leaders
- [Tap Target Size Calculation](expertise/frontend/tap-target-calculation.md) -- Formula and quick reference for WCAG 2.5.5 44px minimum tap targets

---

## Recently Added
- 2026-02-18: [Skills Not Agents for Context-Dependent Logic](patterns/architecture/skills-not-agents-for-context-logic.md)
- 2026-02-18: [On-Demand Computation Over Persistent Storage](patterns/architecture/on-demand-computation.md)
- 2026-02-18: [Thin Hooks + Rich Skills for Event Processing](patterns/event-processing/thin-hooks-rich-skills.md)
- 2026-02-18: [Honest Fidelity Labeling for Metrics](patterns/measurement/honest-fidelity-labeling.md)
- 2026-02-18: [ADR-001: Skip Layer 5 (Integration)](decisions/adr-001-skip-l5-integration.md)
- 2026-02-19: [Skills Must Live in .claude/skills/](fixes/claude-code/skills-directory-location.md)
- 2026-02-19: [Separate Framework Skills from Project Utilities](patterns/architecture/separate-framework-from-utilities.md)
- 2026-02-19: [ADR-002: Granola MCP Integration Approach](decisions/adr-002-granola-mcp-integration-approach.md)
- 2026-02-23: [Pre/Post Validation for Destructive Sync Operations](patterns/safety/pre-post-validation-for-sync.md)
- 2026-02-23: [Short-Circuit When Already In Sync](patterns/architecture/short-circuit-when-in-sync.md)
- 2026-02-23: [Self-Guiding Workflow Skills](patterns/architecture/self-guiding-workflow-skills.md)
- 2026-02-23: [Multi-Signal Session State Detection](patterns/architecture/multi-signal-session-state-detection.md)
- 2026-02-23: [Convention-Based Consistency](patterns/architecture/convention-based-consistency.md)
- 2026-02-27: [Scope CSS Changes with Body Classes](patterns/css/scope-css-with-body-classes.md)
- 2026-02-27: [ADR-003: Plan-as-Spec for Informal Changes](decisions/adr-003-plan-as-spec-for-informal-changes.md)
- 2026-02-27: [Dotted Leader Lines with CSS repeating-linear-gradient](expertise/frontend/dotted-leader-lines-css.md)
- 2026-03-01: [Mobile-First CSS Restructure Strategy](patterns/css/mobile-first-restructure-strategy.md)
- 2026-03-01: [Remove Dead CSS During Restructure](patterns/css/remove-dead-css-during-restructure.md)
- 2026-03-01: [Tap Target Size Calculation](expertise/frontend/tap-target-calculation.md)
- 2026-03-02: [Validate URL Schemes on User-Provided Paths](patterns/security/validate-url-schemes-on-frontmatter-paths.md)
- 2026-03-02: [Dismiss False P1s with Contextual Analysis](patterns/review-process/dismiss-false-p1s-with-context.md)
- 2026-03-11: [Audit Literal Values When Introducing CSS Variables](patterns/css/audit-literals-when-introducing-variables.md)
- 2026-03-11: [Font Inheritance for Content Isolation](patterns/css/font-inheritance-for-content-isolation.md)
- 2026-04-01: [Preserve Raw Values Before HTML Escaping](patterns/build-pipeline/preserve-raw-values-before-escaping.md)
- 2026-04-01: [Add Generated Build Artifacts to .gitignore](patterns/build-pipeline/gitignore-generated-build-artifacts.md)
- 2026-04-01: [Consistent URL Encoding Across Formats](patterns/seo/consistent-url-encoding-across-formats.md)

## Needs Expansion
_No entries yet._

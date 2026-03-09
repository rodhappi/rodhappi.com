# Granola MCP Integration Approach

## Category
Decision

## Status
Proposed

## Summary
Evaluate whether to use Granola's official remote MCP directly or build a custom MCP wrapping the Enterprise API for CoS-specific meeting intelligence tools.

## Context

### Problem Statement
The Chief of Staff (CoS) project needs access to Granola meeting data (notes, transcripts, action items, attendees). Granola offers two integration paths, and we need to decide which to use.

### Constraints
- Granola is a third-party service — we depend on their API stability
- Enterprise API requires an Enterprise plan and workspace admin privileges
- Official MCP is remote (hosted at `https://mcp.granola.ai/mcp`) — adds latency and dependency
- Rate limits: 5 req/sec sustained, 25 req burst (Enterprise API)

### Requirements
- Access meeting notes and action items from within Claude Code
- Feed meeting data into CoS task management workflows
- Minimize maintenance burden
- Respect Granola's rate limits and terms

## Options Considered

### Option 1: Use Official Granola MCP Directly
**Description:** Connect to `https://mcp.granola.ai/mcp` as a remote MCP server. No custom code.

| Pros | Cons |
|------|------|
| Zero development effort | No control over exposed tools |
| Maintained by Granola team | Remote dependency — latency and availability |
| Always up to date with Granola features | Can't add CoS-specific tools |
| Standard MCP protocol | Token cost unknown until connected |

### Option 2: Build Custom MCP Wrapping Enterprise API
**Description:** Build a local TypeScript MCP server (like Slack-MCP) that calls Granola's Enterprise API and exposes CoS-tailored tools.

| Pros | Cons |
|------|------|
| Full control over tool design | Development and maintenance effort |
| CoS-specific tools (e.g., extract action items → tasks) | Must track Enterprise API changes |
| Runs locally — no remote dependency | Requires Enterprise plan |
| Can optimize token cost by limiting tools | Duplicates work Granola already did |

### Option 3: Hybrid — Start with Official MCP, Extend Later
**Description:** Use the official MCP for immediate access. If CoS needs custom tools, build a complementary local MCP later.

| Pros | Cons |
|------|------|
| Fast start, no development needed | May end up maintaining two integrations |
| Custom tools only if proven necessary | Complexity grows over time |
| Validates what's actually needed before building | -- |

## Decision
Pending — to be decided when Granola MCP integration work begins.

## Rationale
Option 3 is the recommended approach based on Article III (Simplicity): start with the simplest solution that works, and only build custom tools when a real gap is identified.

## Consequences

### If Option 3 (Recommended)
**Positive:**
- Immediate access to meeting data with zero code
- Real usage reveals actual needs before investing in custom development

**Negative:**
- May need to rework integration if official MCP is insufficient
- Two MCPs if custom tools are later needed

### Risks
- Official MCP may not expose the specific tools CoS needs: Mitigated by having Enterprise API as fallback
- Rate limits may be hit during heavy meeting days: Monitor and add rate limiting if custom MCP is built

## Implementation Notes
- Official MCP endpoint: `https://mcp.granola.ai/mcp`
- Enterprise API docs: `https://docs.granola.ai/`
- Follow `appendix/integration-guide.md` 7-step structure for implementation
- Granola CLAUDE.md already prepared at `/Users/rodhappi/Documents/alt_FWD/lab/CoS/MCP/Granola-MCP/CLAUDE.md`

## Related Decisions
- [ADR-001: Skip Layer 5 as Project-Specific](adr-001-skip-l5-integration.md) — L5 is implemented per-project, this is the Granola instance

## Tags
granola, mcp, integration, meeting-notes, cos, chief-of-staff, api, l5

## Metadata
- Created: 2026-02-19
- Decided: Pending
- Deciders: Framework developer
- Source: ai-assisted-development-framework (Granola-MCP setup session)

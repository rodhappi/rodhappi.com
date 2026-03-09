# Skip Layer 5 (Integration) as Project-Specific

## Category
Decision

## Status
Accepted

## Summary
Layer 5 (Integration) was intentionally skipped because its components are project-specific and cannot be meaningfully implemented in a generic framework plugin.

## Context

### Problem Statement
The 7-Layer Framework defines Layer 5 as the Integration layer: MCP server configurations, lint/format hooks, CI/CD pipeline integration, and external tool connections. During implementation, we needed to decide whether to build L5 or skip it.

### Constraints
- This is a generic framework plugin, not a concrete application
- L5 components depend on specific project choices (which MCP servers, which linter, which CI system)
- The framework document itself notes L5 is project-specific

### Requirements
- The framework should be complete and usable without L5
- The skip should be clearly documented so users understand the gap is intentional
- Version numbering should remain sequential (not skip from 0.4.0 to 0.6.0)

## Options Considered

### Option 1: Build L5 with placeholder/example configs
**Description:** Create example MCP configs, sample lint hooks, and template CI pipelines

| Pros | Cons |
|------|------|
| All 7 layers would have code | Examples would be misleading -- they suggest specific tool choices |
| Feels "complete" | Users would need to delete/replace everything |

### Option 2: Skip L5 entirely
**Description:** Document the skip, proceed to L6, note L5 as project-specific in all status references

| Pros | Cons |
|------|------|
| Honest about what the framework provides | One layer has no implementation |
| No misleading examples | Might confuse users expecting 7 layers |
| Less maintenance burden | -- |

### Option 3: Build L5 as documentation only
**Description:** Write guides for how to implement L5 for common stacks (React, Node, Python, etc.)

| Pros | Cons |
|------|------|
| Provides guidance without imposing choices | Significant documentation effort |
| Useful reference material | Documentation may become outdated |

## Decision
Option 2: Skip L5 entirely. Document the skip in CLAUDE.md, plugin.json, implementation-log, and all layer status references.

## Rationale
The framework's value is in its structure and patterns, not in specific tool configurations. Building placeholder L5 components would violate Article III (Simplicity) by adding code that every user would need to replace. The skip is clearly documented everywhere so users understand it is intentional and know to implement L5 for their specific project.

## Consequences

### Positive
- Framework stays generic and reusable
- No misleading example configurations
- Simpler maintenance
- Version numbering (0.5.0 for L6) tracks implementation progress, not layer numbers

### Negative
- Users must implement their own L5 from scratch
- The "7-Layer" name implies 7 implementations, but only 6 exist

### Risks
- Users confused by missing layer: Mitigated by clear documentation in CLAUDE.md architecture table ("skipped -- project-specific")

## Implementation Notes
- CLAUDE.md architecture table marks L5 as "skipped -- project-specific"
- Version 0.5.0 is assigned to L6 (Compounding), not L5
- The implementation-log records the skip decision

## Tags
architecture, layers, scope, integration, l5, skip, project-specific

## Metadata
- Created: 2026-02-18
- Decided: 2026-02-18
- Deciders: Framework developer
- Source: ai-assisted-development-framework

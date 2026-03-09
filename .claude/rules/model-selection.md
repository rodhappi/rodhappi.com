# Model Selection Rule

Guide model selection for all operations. This rule is always active.

## Model Tiers

### Haiku (Fast, Low Cost)

Use for:
- File exploration and pattern search
- Simple code reads and navigation
- Knowledge base lookups
- Grep and glob operations
- Initial research and discovery
- Spawned sub-agents (default tier)

### Sonnet (Balanced)

Use for:
- Standard code implementation
- Code review (non-security)
- Test writing
- Documentation generation
- Balanced reasoning tasks
- Refactoring within established patterns

### Opus (Deep Reasoning, High Cost)

Use for:
- Complex architectural reasoning and design
- Security analysis and vulnerability assessment
- Ambiguous or underspecified requirements
- Cross-system impact analysis
- Constitutional compliance validation on complex changes
- Resolving contradictory requirements

## Default for Spawned Agents

- Use **haiku** unless the task explicitly requires deeper reasoning
- Escalate to sonnet if haiku produces inadequate results
- Reserve opus for tasks flagged as architecturally complex or security-sensitive

## Selection Heuristic

1. Start with the lowest-cost model that could succeed
2. If output quality is insufficient, escalate one tier
3. Never use opus for tasks haiku can handle
4. When in doubt, use sonnet as the safe middle ground

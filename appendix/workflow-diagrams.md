# Workflow Diagrams

This document provides visual representations of workflows in the AI-assisted development framework.

---

## The 7-Layer Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         7-LAYER ARCHITECTURE                                 │
│                                                                              │
│   All layers operate SIMULTANEOUSLY as infrastructure, not sequentially.    │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │   L7: MEASUREMENT                                                      │ │
│  │   ┌──────────────────────────────────────────────────────────────┐    │ │
│  │   │ Track metrics, evaluate effectiveness, enable optimization    │    │ │
│  │   └──────────────────────────────────────────────────────────────┘    │ │
│  │                                                                        │ │
│  │   L6: COMPOUNDING                                                      │ │
│  │   ┌──────────────────────────────────────────────────────────────┐    │ │
│  │   │ Learn from work, capture patterns, build knowledge base       │    │ │
│  │   └──────────────────────────────────────────────────────────────┘    │ │
│  │                                                                        │ │
│  │   L5: INTEGRATION                                                      │ │
│  │   ┌──────────────────────────────────────────────────────────────┐    │ │
│  │   │ Connect to external tools: git, browsers, databases, APIs     │    │ │
│  │   └──────────────────────────────────────────────────────────────┘    │ │
│  │                                                                        │ │
│  │   L4: EXECUTION                                                        │ │
│  │   ┌──────────────────────────────────────────────────────────────┐    │ │
│  │   │ Workflows, quality gates, constitutional governance           │    │ │
│  │   └──────────────────────────────────────────────────────────────┘    │ │
│  │                                                                        │ │
│  │   L3: MEMORY                                                           │ │
│  │   ┌──────────────────────────────────────────────────────────────┐    │ │
│  │   │ Persist state, checkpoints, cross-session continuity          │    │ │
│  │   └──────────────────────────────────────────────────────────────┘    │ │
│  │                                                                        │ │
│  │   L2: ORCHESTRATION                                                    │ │
│  │   ┌──────────────────────────────────────────────────────────────┐    │ │
│  │   │ Coordinate agents, parallelize tasks, synthesize results      │    │ │
│  │   └──────────────────────────────────────────────────────────────┘    │ │
│  │                                                                        │ │
│  │   L1: CONTEXT                                                          │ │
│  │   ┌──────────────────────────────────────────────────────────────┐    │ │
│  │   │ Manage token budget, inject knowledge, optimize context       │    │ │
│  │   └──────────────────────────────────────────────────────────────┘    │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Greenfield Project Workflow

```
                    ┌─────────────────────────────────────────────┐
                    │              GREENFIELD WORKFLOW             │
                    │           (New Project from Scratch)         │
                    └─────────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  /specify                                                                    │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Research Phase (Parallel Agents)                                      │   │
│  │ • Codebase analyzer → existing patterns                               │   │
│  │ • Best practices researcher → industry standards                      │   │
│  │ • Knowledge searcher → previous learnings                             │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Specification Agents                                                  │   │
│  │ • Clarity checker → flag ambiguity                                    │   │
│  │ • Consistency validator → find contradictions                         │   │
│  │ • Completeness auditor → ensure coverage                              │   │
│  │ • Testability reviewer → verify testable                              │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  Output: specs/{feature}/spec.md                                             │
│  Quality Gate: No [NEEDS CLARIFICATION] markers                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                         │
                              ┌──────────┴──────────┐
                              │ Ambiguities found?  │
                              └──────────┬──────────┘
                                    Yes  │  No
                         ┌───────────────┴───────────────┐
                         ▼                               ▼
┌─────────────────────────────────────┐                  │
│  /clarify                           │                  │
│  Resolve [NEEDS CLARIFICATION]      │                  │
│  with stakeholder input             │                  │
│                                     │                  │
│  • Present options with rationale   │                  │
│  • Get decision                     │                  │
│  • Update spec                      │                  │
│  • Log decision to knowledge        │                  │
└─────────────────────────────────────┘                  │
                         │                               │
                         └───────────────┬───────────────┘
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  /plan                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Research Phase (Parallel Agents)                                      │   │
│  │ • Framework docs researcher → tech stack documentation                │   │
│  │ • Codebase analyzer → implementation patterns to follow               │   │
│  │ • Git history analyzer → how similar features evolved                 │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Constitutional Gates:                                                 │   │
│  │ ☐ Spec-First: References approved spec                               │   │
│  │ ☐ Simplicity: ≤3 projects/modules                                    │   │
│  │ ☐ No premature abstraction                                           │   │
│  │ ☐ Test strategy defined                                              │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  Output: specs/{feature}/plan.md, tasks.md                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
                         ┌───────────────────────────────┐
                         │  /approve (HITL Checkpoint)   │
                         │  Human reviews and approves   │
                         │  plan before implementation   │
                         └───────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  /work                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Task Loop (WIP = 1):                                                  │   │
│  │                                                                       │   │
│  │  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐           │   │
│  │  │  Pick   │───►│Implement│───►│  Test   │───►│Complete │───► Next  │   │
│  │  │  Task   │    │         │    │         │    │         │           │   │
│  │  └─────────┘    └─────────┘    └─────────┘    └─────────┘           │   │
│  │                      │                                               │   │
│  │                      ▼                                               │   │
│  │            [Continuous validation after every change]                │   │
│  │                                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│  Quality Gate: All tasks complete, all tests passing                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  /review                                                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Fan-Out Pattern (Parallel Review Agents):                             │   │
│  │                                                                       │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐       │   │
│  │  │ Security        │  │ Performance     │  │ Accessibility   │       │   │
│  │  │ Sentinel        │  │ Oracle          │  │ Guardian        │       │   │
│  │  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘       │   │
│  │           │                    │                    │                │   │
│  │  ┌────────┴────────┐  ┌────────┴────────┐  ┌────────┴────────┐       │   │
│  │  │ Constitutional  │  │ Spec Compliance │  │ Code Simplicity │       │   │
│  │  │ Checker (BLOCK) │  │ Reviewer        │  │ Reviewer        │       │   │
│  │  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘       │   │
│  │           │                    │                    │                │   │
│  │           └────────────────────┼────────────────────┘                │   │
│  │                                ▼                                     │   │
│  │                         ┌───────────┐                                │   │
│  │                         │ Synthesize│                                │   │
│  │                         │ & Triage  │                                │   │
│  │                         └───────────┘                                │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│  Severity: P1 (Critical/Blocks) | P2 (High) | P3 (Medium) | P4 (Low)        │
│  Quality Gate: No P1 findings, all findings triaged                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  /compound                                                                   │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Knowledge Capture Loop:                                               │   │
│  │                                                                       │   │
│  │  Detect → Gather → Extract → Categorize → Document → Index → Verify  │   │
│  │                                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│  Output: knowledge/{patterns,fixes,decisions}/                               │
│  Quality Gate: Knowledge indexed and searchable                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Brownfield Project Workflow

```
                    ┌─────────────────────────────────────────────┐
                    │             BROWNFIELD WORKFLOW              │
                    │          (Changes to Existing System)        │
                    └─────────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  /propose                                                                    │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Analysis Phase:                                                       │   │
│  │ • Codebase analyzer → map affected areas                              │   │
│  │ • Git history → recent changes to affected areas                      │   │
│  │ • Knowledge search → past issues in this area                         │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Create Change Folder:                                                 │   │
│  │                                                                       │   │
│  │  changes/{feature}/                                                   │   │
│  │  ├── proposal.md      # Why and what                                  │   │
│  │  ├── impact.md        # Affected specs, files, dependencies           │   │
│  │  └── specs/           # Delta specs (ADDED/MODIFIED/REMOVED)          │   │
│  │                                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│  Output: changes/{feature}/ folder structure                                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
                    ┌─────────────────────────────────────────────┐
                    │                                             │
                    │   Same flow as Greenfield:                  │
                    │   /clarify → /plan → /work → /review        │
                    │                                             │
                    └─────────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  /archive                                                                    │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Merge Process:                                                        │   │
│  │                                                                       │   │
│  │  For each delta spec:                                                 │   │
│  │  • ADDED → Append to source spec                                      │   │
│  │  • MODIFIED → Replace in source spec (keep history comment)           │   │
│  │  • REMOVED → Move to Deprecated section                               │   │
│  │                                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Archive:                                                              │   │
│  │ • Move changes/{feature}/ to specs/_archive/{date}-{feature}/         │   │
│  │ • Update specs/index.md                                               │   │
│  │ • Bump spec version numbers                                           │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│  Output: Updated source specs, archived change folder                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
                              ┌──────────────────┐
                              │    /compound     │
                              │  Capture learnings│
                              └──────────────────┘
```

---

## Orchestration Patterns

### Fan-Out Pattern (Parallel)

```
                    ┌─────────────────────────────────────┐
                    │           PRIMARY AGENT              │
                    │                                      │
                    │  "I need multiple perspectives on    │
                    │   this code review"                  │
                    └──────────────────┬──────────────────┘
                                       │
              ┌────────────────────────┼────────────────────────┐
              │                        │                        │
              ▼                        ▼                        ▼
     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
     │   Agent A       │     │   Agent B       │     │   Agent C       │
     │   (Security)    │     │   (Performance) │     │   (Accessibility)│
     └────────┬────────┘     └────────┬────────┘     └────────┬────────┘
              │                        │                        │
              │    [Run in parallel]   │                        │
              │                        │                        │
              ▼                        ▼                        ▼
     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
     │   2 findings    │     │   0 findings    │     │   1 finding     │
     └────────┬────────┘     └────────┬────────┘     └────────┬────────┘
              │                        │                        │
              └────────────────────────┼────────────────────────┘
                                       │
                                       ▼
                    ┌─────────────────────────────────────┐
                    │           SYNTHESIZE                 │
                    │                                      │
                    │  Combine results:                    │
                    │  • 2 security (1 P1, 1 P3)          │
                    │  • 0 performance                     │
                    │  • 1 accessibility (P2)             │
                    │                                      │
                    │  Total: 3 findings                   │
                    └─────────────────────────────────────┘
```

### Pipeline Pattern (Sequential)

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Agent A       │         │   Agent B       │         │   Agent C       │
│   (Specify)     │────────►│   (Plan)        │────────►│   (Work)        │
│                 │         │                 │         │                 │
│  Input: Req     │         │  Input: Spec    │         │  Input: Plan    │
│  Output: Spec   │         │  Output: Plan   │         │  Output: Code   │
└─────────────────┘         └─────────────────┘         └─────────────────┘
        │                           │                           │
        │                           │                           │
        ▼                           ▼                           ▼
   [Gate: No                  [Gate: Const.              [Gate: Tests
    ambiguity]                 compliance]                 pass]
```

### Iterative Refinement Pattern

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ITERATIVE REFINEMENT                                  │
│                                                                              │
│      ┌─────────────────┐          ┌─────────────────┐                       │
│      │   Primary       │          │   Research      │                       │
│      │   Agent         │◄────────►│   Agent         │                       │
│      └────────┬────────┘          └─────────────────┘                       │
│               │                                                              │
│               │                                                              │
│       ┌───────┴───────┐                                                      │
│       │               │                                                      │
│       ▼               │                                                      │
│  ┌─────────┐         │                                                      │
│  │ Query 1 │         │                                                      │
│  │"Find X" │         │                                                      │
│  └────┬────┘         │                                                      │
│       │              │                                                      │
│       ▼              │                                                      │
│  ┌─────────┐         │                                                      │
│  │Result 1 │         │                                                      │
│  │(partial)│         │                                                      │
│  └────┬────┘         │                                                      │
│       │              │                                                      │
│       ▼              │                                                      │
│  ┌─────────┐         │   ┌──────────────────────────────────────────┐       │
│  │Evaluate │─────────┼──►│ Sufficient?                              │       │
│  │         │         │   │ • Yes → Done                             │       │
│  └─────────┘         │   │ • No → Refine query                      │       │
│       │              │   │ • Max 3 cycles → Escalate to human       │       │
│       │ No           │   └──────────────────────────────────────────┘       │
│       ▼              │                                                      │
│  ┌─────────┐         │                                                      │
│  │ Query 2 │         │                                                      │
│  │"Find X  │         │                                                      │
│  │ + Y"    │─────────┘                                                      │
│  └─────────┘                                                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Self-Reinforcing Loops

### Research → Knowledge → Research Loop

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RESEARCH → KNOWLEDGE → RESEARCH                           │
│                                                                              │
│     ┌──────────────────┐                                                    │
│     │                  │                                                    │
│     │  Research Agent  │──────┐                                             │
│     │  discovers       │      │                                             │
│     │  pattern         │      │                                             │
│     │                  │      │                                             │
│     └──────────────────┘      │                                             │
│              ▲                │                                             │
│              │                ▼                                             │
│     ┌────────┴────────┐ ┌────────────────┐                                  │
│     │                 │ │                │                                  │
│     │ Knowledge       │ │  /compound     │                                  │
│     │ Search surfaces │ │  captures      │                                  │
│     │ pattern in      │ │  pattern       │                                  │
│     │ future research │ │                │                                  │
│     │                 │ │                │                                  │
│     └─────────────────┘ └───────┬────────┘                                  │
│              ▲                  │                                           │
│              │                  ▼                                           │
│              │         ┌────────────────┐                                   │
│              │         │                │                                   │
│              └─────────│ Knowledge Base │                                   │
│                        │                │                                   │
│                        └────────────────┘                                   │
│                                                                              │
│     Result: Research becomes more efficient over time                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Mistakes → Reflection → Prevention Loop

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MISTAKES → REFLECTION → PREVENTION                        │
│                                                                              │
│     ┌──────────────────┐                                                    │
│     │                  │                                                    │
│     │  Error occurs    │                                                    │
│     │  during work     │                                                    │
│     │                  │                                                    │
│     └────────┬─────────┘                                                    │
│              │                                                              │
│              ▼                                                              │
│     ┌──────────────────┐                                                    │
│     │                  │                                                    │
│     │  Session-end     │                                                    │
│     │  reflection      │                                                    │
│     │  extracts lesson │                                                    │
│     │                  │                                                    │
│     └────────┬─────────┘                                                    │
│              │                                                              │
│              ▼                                                              │
│     ┌──────────────────┐       ┌──────────────────┐                         │
│     │                  │       │                  │                         │
│     │  Knowledge base  │──────►│ Constitutional   │                         │
│     │  stores the fix  │       │ check prevents   │                         │
│     │                  │       │ recurrence       │                         │
│     └──────────────────┘       └──────────────────┘                         │
│                                                                              │
│     Result: Same mistake never happens again                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Quality Gate Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         QUALITY GATE FLOW                                    │
│                                                                              │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐       │
│  │ SPECIFY │──►│ CLARIFY │──►│  PLAN   │──►│  WORK   │──►│ REVIEW  │       │
│  └────┬────┘   └────┬────┘   └────┬────┘   └────┬────┘   └────┬────┘       │
│       │             │             │             │             │             │
│       ▼             ▼             ▼             ▼             ▼             │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐       │
│  │ Gate 1  │   │ Gate 2  │   │ Gate 3  │   │ Gate 4  │   │ Gate 5  │       │
│  │         │   │         │   │         │   │         │   │         │       │
│  │ No      │   │ All     │   │ Const.  │   │ Tests   │   │ No P1   │       │
│  │ambiguity│   │resolved │   │compliant│   │ pass    │   │findings │       │
│  │markers  │   │         │   │         │   │         │   │         │       │
│  └─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘       │
│       │             │             │             │             │             │
│       │    FAIL     │    FAIL     │    FAIL     │    FAIL     │             │
│       │      │      │      │      │      │      │      │      │             │
│       │      ▼      │      ▼      │      ▼      │      ▼      │             │
│       │   ┌─────┐   │   ┌─────┐   │   ┌─────┐   │   ┌─────┐   │             │
│       │   │BLOCK│   │   │BLOCK│   │   │BLOCK│   │   │BLOCK│   │             │
│       │   │until│   │   │until│   │   │until│   │   │until│   │             │
│       │   │fixed│   │   │fixed│   │   │fixed│   │   │fixed│   │             │
│       │   └─────┘   │   └─────┘   │   └─────┘   │   └─────┘   │             │
│       │             │             │             │             │             │
│       └─────────────┴─────────────┴─────────────┴─────────────┘             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

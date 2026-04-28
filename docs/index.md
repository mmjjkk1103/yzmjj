# Repository Knowledge Index

This index points agents to the smallest reliable document set for a task.

## Current Project Defaults

| Field | Value |
| --- | --- |
| Project | Family Encouragement Message Recommender |
| Domain | Static web app for warm family encouragement messages |
| Stack | HTML, CSS, inline browser JavaScript |
| Repository state | Existing small static app |
| Deployment | To be confirmed; assume static hosting |
| Security posture | No accounts, no server, no persistent storage |
| Team size | To be confirmed; assume 1 human plus agents |

## Read Order

1. Start with `AGENTS.md`.
2. Open the task-specific document below.
3. Open the active exec plan only when the work spans more than one step.
4. Update this index when adding durable docs.

## Documents

| Path | Purpose | Owner | Update trigger |
| --- | --- | --- | --- |
| `docs/product-specs/message-recommender.md` | Product behavior, UX scope, content rules | Product owner | User-facing behavior changes |
| `docs/design-docs/static-web-app.md` | App architecture, module boundaries, data flow | Harness engineer | Structure or dependency changes |
| `docs/exec-plans/active/first-plan.md` | Current implementation plan and evidence ledger | Acting agent | Each active multi-step task |
| `docs/exec-plans/completed/` | Completed plans and decision history | Acting agent | Move active plan after merge |
| `docs/quality/policies.md` | Mechanical quality gates and CI policy | Harness engineer | Check or policy changes |
| `docs/reliability/observability-harness.md` | Logs, metrics, trace, screenshot evidence | Harness engineer | Verification workflow changes |
| `docs/security/security-baseline.md` | Static app security constraints | Security owner | Input, dependency, or external data changes |
| `docs/references/` | External or imported source references | Acting agent | New reference material appears |

## Anti-Drift Rules

- If a rule must be followed by every agent, put it in a check or `docs/quality/policies.md`.
- If a rule is only navigation, keep it in `AGENTS.md`.
- If a decision explains why the app changed, put it in a design doc or completed exec plan.
- If a document is stale, update or delete it in the same PR that reveals the drift.

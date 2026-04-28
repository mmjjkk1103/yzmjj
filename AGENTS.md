# AGENTS.md

This file is the routing map for agent work in this repository. Keep it short.
Detailed rules live in `docs/`.

## Project

- Name: Family Encouragement Message Recommender
- Product: Korean-first static web app for composing and copying warm family encouragement messages.
- Runtime: Browser-only HTML/CSS/JavaScript.
- Entry points: `index.html`, inline browser script, `style.css`, `news.json`.
- Local check command: `node scripts/harness-check.mjs`.

## Human And Agent Roles

- Humans own intent, priority, approval, security exceptions, and release decisions.
- Agents own implementation, local verification, evidence collection, doc updates, and PR preparation.
- Escalate instead of guessing when product intent, legal/security posture, or deployment target is unclear.

## Required Work Loop

1. Read the task and identify the smallest safe change.
2. Read only the relevant docs from the routing table below.
3. Capture current state with `node scripts/harness-check.mjs`.
4. Reproduce the issue or define the expected behavior before editing.
5. Make the smallest coherent code/doc change.
6. Run `node scripts/harness-check.mjs` again.
7. Record evidence in the active exec plan or PR body.
8. Update docs when behavior, workflow, or policy changes.

## Document Routing

| Task type | Read first | Update when |
| --- | --- | --- |
| Product behavior | `docs/product-specs/message-recommender.md` | User-visible flow or copy changes |
| Architecture | `docs/design-docs/static-web-app.md` | Module boundaries, script placement, or data flow changes |
| Active implementation | `docs/exec-plans/active/first-plan.md` | Any multi-step task starts or completes |
| Quality rules | `docs/quality/policies.md` | Lint/test/structure policy changes |
| Observability | `docs/reliability/observability-harness.md` | Evidence format or check command changes |
| Security | `docs/security/security-baseline.md` | Input, dependency, clipboard, or external data changes |
| External references | `docs/references/` | New source material is introduced |

## Repository Boundaries

- Keep app code framework-free unless a plan explicitly approves a dependency.
- Browser script in `index.html` currently owns behavior, event handling, news loading, and clipboard fallback.
- `main.js` is legacy/unused unless `index.html` is changed to load it.
- `style.css` owns shared page styling.
- `index.html` owns document structure, metadata, and script/style wiring.
- `docs/` owns operating knowledge; do not bury durable rules in PR comments only.
- `scripts/` owns repeatable local/CI checks.

## Verification Requirements

Every PR must include:

- Command: `node scripts/harness-check.mjs`
- Result: pass/fail
- Evidence: changed files, relevant logs, and UI notes
- Risk level: low, medium, or high
- Rollback plan: revert PR or disable specific feature path

For UI changes, include desktop and mobile observations. If Playwright is added later, attach screenshots and DOM snapshots.

## Policy Defaults

- Prefer mechanical checks over prose rules.
- Keep PRs under 300 changed lines unless approved.
- Keep `AGENTS.md` under 150 lines.
- Move detailed explanations to `docs/`.
- Do not add generated build artifacts to source control.
- Do not add network calls without updating security and reliability docs.

## Escalation Triggers

Escalate to a human when:

- The task changes the product promise or target audience.
- A security exception is needed.
- A dependency or deployment platform must be added.
- A check fails twice after a targeted fix.
- The PR exceeds the size or risk limit.
- The agent cannot reproduce the issue.

## PR Expectations

- One user-visible behavior or operational improvement per PR.
- Short-lived branches: target merge within one working day.
- Include reproduction, fix summary, verification output, and residual risk.
- If a flaky check is suspected, rerun once, then quarantine with an issue and owner.

# Active Execution Plan: Minimum Viable Harness

## Intent

Create the minimum operating harness that lets agents modify this static web app with repeatable checks, routed knowledge, and PR-ready evidence.

## Scope

- Add repository knowledge map.
- Add structured docs.
- Add local harness check.
- Define verification evidence and PR policy.

## Out Of Scope

- Adding a frontend framework.
- Adding a backend service.
- Adding deployment automation before deployment target is confirmed.
- Adding third-party monitoring before hosting target is confirmed.

## Current Assumptions

| Topic | Assumption | Needs confirmation |
| --- | --- | --- |
| Deployment | Static hosting | Yes |
| Team | 1 human plus coding agents | Yes |
| Risk tolerance | Low for broken UI, medium for copy changes | Yes |
| Security | No PII storage, no auth | Yes |

## Work Breakdown

| Step | Status | Evidence |
| --- | --- | --- |
| Create docs structure | Done | `docs/` folders exist |
| Add short `AGENTS.md` router | Done | `AGENTS.md` |
| Add docs index | Done | `docs/index.md` |
| Add quality policy | Done | `docs/quality/policies.md` |
| Add reliability harness doc | Done | `docs/reliability/observability-harness.md` |
| Add security baseline | Done | `docs/security/security-baseline.md` |
| Add local check script | Done | `scripts/harness-check.mjs` |
| Add GitHub Pages deployment workflow | Done | `.github/workflows/deploy-pages.yml` |

## Verification Commands

```bash
node scripts/harness-check.mjs
```

Deployment runs automatically on pushes to `main` through GitHub Actions.

## Evidence Format

```md
### Reproduction
- Expected:
- Actual:
- Command:

### Fix
- Files changed:
- Behavior changed:

### Verification
- Command:
- Result:
- Logs:
- UI evidence:

### Risk
- Level:
- Rollback:
```

## Completion Rule

Move this file to `docs/exec-plans/completed/` after the first PR containing the harness is merged.

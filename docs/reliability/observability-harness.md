# Observability Harness

This static app has no backend today. Observability starts with deterministic local checks and PR evidence, then expands to browser automation and hosting metrics when deployment is confirmed.

## Local Evidence

Agents must capture:

- Check command: `node scripts/harness-check.mjs`
- Changed files
- Reproduction notes
- Console warnings or errors observed during manual UI use
- Desktop and mobile viewport notes for UI changes

## Deployment Evidence

GitHub Pages deployment is handled by `.github/workflows/deploy-pages.yml`.

Required evidence after deployment:

- Workflow: `Deploy Pages`
- Verify job: passed
- Deploy job: passed
- URL: GitHub Pages environment URL from the deploy job
- Rollback: revert the deployment commit and push to `main`

## Log Query Rules

Current local rules:

- Browser console errors are release blockers.
- Expected warnings must be named in the PR.
- Clipboard fallback warnings are acceptable only when copy still succeeds through fallback.

Future hosted rules:

- Query JavaScript errors by release SHA.
- Group by route, browser, and viewport.
- Link every production incident to a completed exec plan.

## Core Metrics And SLOs

| Metric | SLO | Source |
| --- | --- | --- |
| Harness check pass rate | 99% on default branch | CI |
| PR median lifetime | < 24 hours | GitHub |
| Revert rate | < 5% of merged PRs | GitHub |
| Console error rate | 0 known release-blocking errors | Browser test/monitoring |
| Mobile layout regression count | 0 per release | Screenshot check |
| Copy action success | >= 99% on supported browsers | Future browser telemetry |

## Trace And Bottleneck Detection

No distributed tracing is needed until a backend or external API is added.

For browser performance:

- Capture Lighthouse or Playwright trace after dependency or rendering changes.
- Flag long tasks over 100 ms.
- Flag layout shifts that move primary controls.
- Compare before/after screenshots for UI PRs.

## UI Snapshot Standard

When Playwright is introduced, capture:

- Desktop: 1280x800 screenshot.
- Mobile: 390x844 screenshot.
- DOM snapshot containing header, form, and at least one `message-card`.
- Console log export.

## Issue To Verification Evidence

```md
## Evidence

### Reproduction
- Environment:
- Steps:
- Expected:
- Actual:

### Change
- Files:
- Summary:

### Verification
- Command: node scripts/harness-check.mjs
- Result:
- Browser console:
- Screenshots:

### Decision
- Risk:
- Rollback:
- Escalation needed:
```

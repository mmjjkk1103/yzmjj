# Design Doc: Static Web App Architecture

## Architecture

```text
index.html
  -> owns document structure
  -> owns inline app styling
  -> owns inline browser behavior
  -> renders the AI schedule analysis demo
  -> parses numbered goals, builds deterministic analysis cards, and handles clipboard copy
style.css
  -> legacy/shared page styling, not currently the primary loaded style source
main.js
  -> legacy/unused script unless wired from index.html
```

## Boundaries

- Keep rendering deterministic and local.
- Keep user-provided goal text rendered as plain text through DOM text APIs.
- Keep global behavior small; split inline script/style only when file thresholds are crossed.
- Keep the AI integration boundary isolated in `requestAiAnalysis` so a future API connection can replace demo logic without rewriting rendering.

## Extension Points

- Message source may move from inline array to a local JSON file after schema validation is added.
- Browser tests may be added with Playwright after the first deployment target is confirmed.
- CI may run `node scripts/harness-check.mjs` as the first merge gate.

## Added MVP Architecture: Financial Research Engine

```text
frontend/
  -> React/Vite dashboard for watchlist, manual update, analysis cards, alerts, and disclaimer
backend/
  -> FastAPI API for companies, watchlist, updates, disclosures, news, financials, and analysis
  -> SQLite persistence through `backend/app/database.py`
  -> Service modules for DART, SEC placeholder, price provider placeholder, RSS/sample news, scoring, and AI-safe analysis text
```

The financial research MVP is intentionally separate from the original static message app. External data access must use public APIs, official RSS feeds, or licensed providers only. Provider credentials live in `.env`, never in code.

## Deployment Boundary

The financial research MVP deploys as two services:

- Render runs `backend.app.main:app` through `render.yaml`.
- Vercel builds the React dashboard from `frontend/` through `frontend/vercel.json`.

Production CORS is configured by `CORS_ORIGINS`, and the browser API base URL is configured by `VITE_API_BASE`.

# Design Doc: Static Web App Architecture

## Architecture

```text
index.html
  -> owns document structure
  -> owns inline app styling
  -> owns inline browser behavior
  -> renders curated messages
  -> handles recipient names, theme selection, news loading, partnership form, and clipboard copy
style.css
  -> legacy/shared page styling, not currently the primary loaded style source
main.js
  -> legacy/unused script unless wired from index.html
```

## Boundaries

- Keep rendering deterministic and local.
- Keep message text as plain text.
- Keep global behavior small; split inline script/style only when file thresholds are crossed.

## Extension Points

- Message source may move from inline array to a local JSON file after schema validation is added.
- Browser tests may be added with Playwright after the first deployment target is confirmed.
- CI may run `node scripts/harness-check.mjs` as the first merge gate.

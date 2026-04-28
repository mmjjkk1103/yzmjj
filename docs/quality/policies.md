# Quality Policies

These policies are meant to be enforced mechanically by `scripts/harness-check.mjs` and CI.

## Policy Matrix

| Policy | Why | Detection | Autofix | CI gate |
| --- | --- | --- | --- | --- |
| `AGENTS.md` stays short | Agents need a routing map, not a manual | Line count <= 150 | No | Strong |
| Required docs exist | Prevent hidden operating knowledge | File existence check | Yes | Strong |
| HTML has app anchors | Avoid broken boot paths | DOM string checks for app roots and controls | No | Strong |
| Browser script has expected handlers | Prevent silent UI breakage | Static checks for required functions and listeners | No | Strong |
| Unused legacy JS is syntactically valid | Keep future migration safe | `node --check main.js` when present | No | Medium |
| CSS avoids layout-breaking overflow | Keep mobile UI usable | Static checks plus future screenshot checks | Partial | Medium |
| No external network dependency | Keep static app deterministic | Search for remote script/link/fetch | No | Strong |
| No giant source files | Preserve agent editability | Line count threshold | No | Medium |
| Clipboard failures handled | Copy feature must degrade safely | Search for fallback and warning path | No | Strong |
| Active plan updated | Preserve reproducibility | Check active plan exists | No | Medium |

## Current Thresholds

- `AGENTS.md`: max 150 lines.
- `index.html`: max 1200 lines before script/style extraction plan is required.
- `main.js`: max 300 lines before refactor plan is required.
- `style.css`: max 500 lines before design-system split is required.
- PR size: target under 300 changed lines.
- Check retries: one automatic rerun for suspected flake, then investigate.

## Architecture Boundaries

- `index.html`: structure, metadata, inline app behavior, and initial app containers.
- `main.js`: legacy/unused until explicitly wired from `index.html`.
- `style.css`: page-level layout and visual system.
- `docs/`: durable operating knowledge.
- `scripts/`: repeatable checks used by humans and agents.

## Naming Rules

- DOM ids use kebab-case.
- CSS classes use kebab-case.
- JavaScript functions use camelCase.
- Custom elements use kebab-case and must be registered once.
- Docs use lowercase kebab-case filenames.

## Logging And Error Handling

- Recoverable browser API failures must log `console.warn` with a clear fallback path.
- User-facing failures should keep the UI usable.
- Do not log message contents if future inputs may contain private text.

## Type And Schema Boundaries

- User-entered message text must be trimmed before rendering.
- Text must be inserted with `textContent`, not `innerHTML`.
- Future JSON data must be validated before rendering.

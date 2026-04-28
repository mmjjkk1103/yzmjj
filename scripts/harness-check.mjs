import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';

const requiredFiles = [
  'AGENTS.md',
  'docs/index.md',
  'docs/exec-plans/active/first-plan.md',
  'docs/quality/policies.md',
  'docs/reliability/observability-harness.md',
  'docs/security/security-baseline.md',
  'index.html',
  'main.js',
  'style.css',
];

const failures = [];

function fail(message) {
  failures.push(message);
}

function read(path) {
  return readFileSync(path, 'utf8');
}

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    fail(`Missing required file: ${file}`);
  }
}

if (existsSync('AGENTS.md')) {
  const lines = read('AGENTS.md').trimEnd().split('\n').length;
  if (lines > 150) {
    fail(`AGENTS.md is too long: ${lines} lines (max 150)`);
  }
}

if (existsSync('index.html')) {
  const html = read('index.html');
  const requiredAnchors = [
    'id="message"',
    'id="recipient-name"',
    'id="recommend-button"',
    'id="copy-button"',
    'id="news-list"',
    'id="partnership-form"',
  ];
  for (const anchor of requiredAnchors) {
    if (!html.includes(anchor)) {
      fail(`index.html must include ${anchor}`);
    }
  }
  const requiredScriptHooks = [
    'function recommendMessage',
    'function copyText',
    'function fallbackCopyText',
    'function loadNews',
    'addEventListener("click", recommendMessage)',
    'addEventListener("click", copyMessage)',
  ];
  for (const hook of requiredScriptHooks) {
    if (!html.includes(hook)) {
      fail(`index.html script is missing expected hook: ${hook}`);
    }
  }
  if (/https?:\/\/.+<script|<script[^>]+https?:\/\//i.test(html)) {
    fail('Remote scripts require security approval');
  }
  const htmlLines = html.trimEnd().split('\n').length;
  if (htmlLines > 1200) {
    fail(`index.html is large: ${htmlLines} lines; create an extraction plan`);
  }
}

if (existsSync('main.js')) {
  try {
    execFileSync(process.execPath, ['--check', 'main.js'], { stdio: 'pipe' });
  } catch (error) {
    fail(`main.js syntax check failed: ${String(error.stderr || error.message).trim()}`);
  }

  const js = read('main.js');
  if (!js.includes('textContent')) {
    fail('Message rendering must use textContent');
  }
  if (!js.includes('fallbackCopyText')) {
    fail('Clipboard copy must include a fallback path');
  }
  if (/\binnerHTML\b/.test(js)) {
    fail('Do not render user-controlled message content with innerHTML');
  }
}

if (existsSync('style.css')) {
  const cssLines = read('style.css').trimEnd().split('\n').length;
  if (cssLines > 500) {
    fail(`style.css is large: ${cssLines} lines; create a refactor plan`);
  }
}

if (failures.length > 0) {
  console.error('Harness check failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Harness check passed.');

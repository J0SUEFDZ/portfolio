// Verifies that every local href/src in the built HTML points at a file in dist/.
// Catches assets that forget the `base` path (the site is served from /portfolio).
import { readFile, readdir, access } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const BASE = '/portfolio';

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? htmlFiles(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : [])),
  );
  return files.flat();
}

const exists = (p) => access(p).then(() => true, () => false);
const errors = [];

for (const file of await htmlFiles(DIST)) {
  const html = await readFile(file, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

  for (const [, url] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;

    if (url.startsWith('#')) {
      if (url.length > 1 && !ids.has(url.slice(1))) errors.push(`${file}: anchor ${url} has no matching id`);
      continue;
    }

    const path = url.split(/[?#]/)[0];
    if (!path.startsWith(`${BASE}/`) && path !== BASE) {
      errors.push(`${file}: ${url} is missing the ${BASE} base path`);
      continue;
    }

    const target = join(DIST, path.slice(BASE.length));
    if (!(await exists(target)) && !(await exists(join(target, 'index.html')))) {
      errors.push(`${file}: ${url} does not exist in dist/`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('All internal links and assets resolve.');

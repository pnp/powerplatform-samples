import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sanitizeHtml from 'sanitize-html';
import { SITE_BASE } from './gallery-model.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
async function htmlFiles(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory()
    ? htmlFiles(path.join(folder, entry.name))
    : entry.name.endsWith('.html') ? [path.join(folder, entry.name)] : []))).flat();
}
const files = await htmlFiles(root);
const documents = new Map();
for (const file of files) {
  const targets = new Set();
  const ids = new Set();
  sanitizeHtml(await readFile(file, 'utf8'), {
    transformTags: {
      '*': (tagName, attribs) => {
        if (attribs.id) ids.add(attribs.id);
        if (attribs.href) targets.add(attribs.href);
        if (attribs.src) targets.add(attribs.src);
        return { tagName, attribs };
      },
    },
  });
  documents.set(file, { ids, targets });
}
const checked = new Set();
for (const [file, { targets }] of documents) {
  const relative = path.relative(root, file).replaceAll('\\', '/').replace(/index\.html$/, '');
  const currentUrl = new URL(`${SITE_BASE}/${relative}`, 'https://gallery.invalid');
  for (const target of targets) {
    const url = new URL(target, currentUrl);
    if (url.origin !== currentUrl.origin) continue;
    if (!url.pathname.startsWith(`${SITE_BASE}/`)) throw new Error(`${relative}: internal URL is outside site base: ${target}`);
    const targetFile = path.resolve(root, decodeURIComponent(url.pathname.slice(SITE_BASE.length + 1)));
    if (targetFile !== root && !targetFile.startsWith(`${root}${path.sep}`)) throw new Error(`Unsafe internal URL: ${target}`);
    let info;
    try {
      info = await stat(targetFile);
    } catch (error) {
      throw new Error(`${relative}: missing internal target ${target}`, { cause: error });
    }
    const resolved = info.isDirectory() ? path.join(targetFile, 'index.html') : targetFile;
    if (info.isDirectory()) await stat(resolved);
    if (url.hash && documents.has(resolved) && !documents.get(resolved).ids.has(decodeURIComponent(url.hash.slice(1)))) {
      throw new Error(`${relative}: missing anchor ${target}`);
    }
    checked.add(`${url.pathname}${url.hash}`);
  }
}
console.log(`[links] ${files.length} HTML pages; ${checked.size} unique internal pages, anchors, and assets verified`);

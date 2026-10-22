import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateReadmeTracker } from './gallery-model.mjs';

const samplesRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'samples');
const entries = (await readdir(samplesRoot, { withFileTypes: true })).filter((entry) => entry.isDirectory());
for (const entry of entries) {
  validateReadmeTracker(entry.name, await readFile(path.join(samplesRoot, entry.name, 'README.md'), 'utf8'));
}
console.log(`[trackers] ${entries.length} README trackers validated`);

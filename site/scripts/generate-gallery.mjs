import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateGallery } from './gallery-model.mjs';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalog = await generateGallery({ repositoryRoot: path.resolve(siteRoot, '..'), siteRoot });
console.log(`[gallery] ${catalog.samples.length}/${catalog.sampleFolderCount} samples; ${catalog.contributors.length} contributors; no excluded folders`);

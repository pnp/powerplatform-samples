import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LEGACY_REPOSITORIES, mergePublicationCatalog, verifyPublication } from './publication-model.mjs';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const action = process.argv[2];
if (action === 'prepare') {
  if (!process.env.LEGACY_CATALOG_PATH) throw new Error('LEGACY_CATALOG_PATH must identify the preserved gh-pages samples.json');
  const preserved = await readJson(process.env.LEGACY_CATALOG_PATH);
  const local = await readJson(path.join(siteRoot, 'src', 'generated', 'catalog.json'));
  const sources = [];
  for (const source of LEGACY_REPOSITORIES) {
    const url = `https://raw.githubusercontent.com/${source.repository}/main/.metadata/samples.json`;
    const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
    if (!response.ok) throw new Error(`${source.repository} metadata: HTTP ${response.status}`);
    sources.push({ ...source, records: await response.json() });
  }
  const result = mergePublicationCatalog(preserved, sources, local.samples);
  for (const entry of result.excludedEntries) console.warn(`[legacy] ${entry.source}[${entry.index}]: ${entry.reason}; see legacy-catalog-report.json and the retained original snapshot`);
  await Promise.all([
    writeFile(path.join(siteRoot, 'public', 'samples.json'), `${JSON.stringify(result.catalog)}\n`),
    writeFile(path.join(siteRoot, 'public', 'legacy-catalog-original.json'), `${JSON.stringify(preserved)}\n`),
    writeFile(path.join(siteRoot, 'public', 'legacy-catalog-report.json'), `${JSON.stringify({ excludedEntries: result.excludedEntries, sources: sources.map((source) => ({ repository: source.repository, records: source.records.length })) })}\n`),
    writeFile(path.join(siteRoot, 'src', 'generated', 'legacy.json'), `${JSON.stringify({ samples: result.samples, excludedEntries: result.excludedEntries })}\n`),
  ]);
  console.log(`[publication] ${local.samples.length} local samples; ${result.samples.length} legacy links; ${result.catalog.length} compatibility records`);
} else if (action === 'mark') {
  const catalog = await readJson(path.join(siteRoot, 'dist', 'catalog.json'));
  const legacy = await readJson(path.join(siteRoot, 'dist', 'samples.json'));
  await writeFile(path.join(siteRoot, 'dist', 'deployment.json'), `${JSON.stringify({
    commit: process.env.GITHUB_SHA ?? 'local',
    sampleCount: catalog.samples.length,
    legacyCount: legacy.length,
    builtAt: new Date().toISOString(),
  })}\n`);
} else if (action === 'verify') {
  console.log(await verifyPublication({
    siteUrl: process.env.SITE_URL ?? 'https://pnp.github.io/powerplatform-samples/',
    expectedCommit: process.env.EXPECTED_COMMIT_SHA,
  }));
} else {
  throw new Error('Expected publication action: prepare, mark, or verify');
}

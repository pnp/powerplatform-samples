export const LEGACY_REPOSITORIES = [
  { repository: 'pnp/powerfx-samples', title: 'Power Fx', slug: 'power-fx' },
  { repository: 'pnp/powerapps-samples', title: 'Power Apps', slug: 'power-apps' },
  { repository: 'pnp/powerautomate-samples', title: 'Power Automate', slug: 'power-automate' },
  { repository: 'pnp/powerva-samples', title: 'Power Virtual Agents', slug: 'power-virtual-agents' },
];

export function mergePublicationCatalog(preserved, sources, localSamples) {
  const entries = new Map();
  const excludedEntries = [];
  function add(records, source, allowHistoricalDebris = false) {
    if (!Array.isArray(records)) throw new Error(`${source}: expected a sample metadata array`);
    records.forEach((record, index) => {
      if (!record || typeof record !== 'object' || !['name', 'title', 'url'].every((key) => typeof record[key] === 'string' && record[key].trim())) {
        const knownArtifact = typeof record === 'string' && /^\d+\.\d+$/.test(record)
          || record?.type === 'Microsoft.PowerApps/apps'
          || Number.isInteger(record?.ID) && typeof record?.Image === 'string';
        if (!allowHistoricalDebris || !knownArtifact) throw new Error(`${source}[${index}]: not a valid sample metadata record`);
        excludedEntries.push({ source, index, reason: 'Historical export item is not sample metadata' });
        return;
      }
      const url = new URL(record.url);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error(`${source}[${index}]: unsafe sample URL`);
      const key = JSON.stringify([record.name, url.href.replace(/\/$/, '')]);
      entries.set(key, { ...entries.get(key), ...record });
    });
  }
  add(preserved, 'preserved gh-pages catalog', true);
  for (const source of sources) add(source.records, source.repository, true);
  add(localSamples.map((sample) => ({ ...sample.rawMetadata, downloadUrl: sample.downloadUrl })), 'current repository');
  const catalog = [...entries.values()];
  const samples = catalog.flatMap((record) => {
    const repository = LEGACY_REPOSITORIES.find((source) => record.url.toLowerCase().includes(`github.com/${source.repository.toLowerCase()}/`));
    if (!repository) return [];
    return [{ title: record.title, description: record.shortDescription ?? '', sourceUrl: record.url, repository: repository.repository }];
  }).sort((a, b) => a.title.localeCompare(b.title, 'en'));
  return { catalog, samples, excludedEntries };
}

export async function verifyPublication({ siteUrl, expectedCommit, fetcher = fetch }) {
  const base = new URL(siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`);
  if (!expectedCommit) throw new Error('EXPECTED_COMMIT_SHA is required');
  async function get(relative) {
    const url = new URL(relative, base);
    url.searchParams.set('revision', expectedCommit);
    const response = await fetcher(url, { cache: 'no-store', signal: AbortSignal.timeout(30_000) });
    if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
    return response;
  }
  const manifest = await (await get('deployment.json')).json();
  if (manifest.commit !== expectedCommit) throw new Error(`Deployed revision ${manifest.commit} does not match ${expectedCommit}`);
  const catalog = await (await get('catalog.json')).json();
  if (catalog.samples.length !== manifest.sampleCount || catalog.samples.length !== catalog.sampleFolderCount || !catalog.samples.length) {
    throw new Error('Live sample count does not match the verified build');
  }
  const legacy = await (await get('samples.json')).json();
  if (!Array.isArray(legacy) || legacy.length !== manifest.legacyCount) throw new Error('Live compatibility catalog does not match the verified build');
  for (const route of ['', 'getting-started/', 'contributing/', 'contributors/', 'whats-new/', 'community/', 'legacy-samples/']) await get(route);
  for (const sample of catalog.samples) {
    await get(`samples/${sample.slug}/`);
    await get(sample.preview.src640);
  }
  return { commit: manifest.commit, samples: catalog.samples.length, legacyRecords: legacy.length };
}

import { describe, expect, it } from 'vitest';
import { mergePublicationCatalog, verifyPublication } from '../../scripts/publication-model.mjs';

const sample = (name, url, title = name) => ({ name, title, url, shortDescription: 'A community sample' });

describe('preserved publication catalogs', () => {
  it('preserves distinct source URLs even when historical metadata reused an ID', () => {
    const first = sample('duplicate-id', 'https://github.com/pnp/powerapps-samples/tree/main/samples/one');
    const second = sample('duplicate-id', 'https://github.com/pnp/powerapps-samples/tree/main/samples/two');
    const result = mergePublicationCatalog([first, second], [], []);
    expect(result.catalog).toHaveLength(2);
    expect(result.samples).toHaveLength(2);
  });
  it('updates matching URLs from refreshed feeds and prefers current local metadata', () => {
    const url = 'https://github.com/pnp/powerplatform-samples/tree/main/samples/example';
    const result = mergePublicationCatalog([sample('current', url, 'Old title')], [], [{
      rawMetadata: sample('current', url, 'Current title'), downloadUrl: 'https://example.com/download',
    }]);
    expect(result.catalog).toEqual([{ ...sample('current', url, 'Current title'), downloadUrl: 'https://example.com/download' }]);
  });
  it('preserves separately named formula examples that share a documentation URL', () => {
    const url = 'https://github.com/pnp/powerfx-samples/tree/main/samples/date-functions';
    expect(mergePublicationCatalog([sample('first-formula', url), sample('second-formula', url)], [], []).catalog).toHaveLength(2);
  });
  it('keeps formula anchors distinct and accepts an empty archived feed', () => {
    const base = 'https://github.com/pnp/powerfx-samples/tree/main/samples/date-functions';
    const result = mergePublicationCatalog([sample('first', `${base}#first`), sample('second', `${base}#second`)], [{ repository: 'pnp/powerva-samples', records: [] }], []);
    expect(result.catalog).toHaveLength(2);
  });
  it('reports historical non-sample debris without modifying the original snapshot', () => {
    const original = ['1.0', { ID: 1, Image: 'https://example.com/image.png' }, sample('valid', 'https://github.com/pnp/powerfx-samples/tree/main/samples/example')];
    const result = mergePublicationCatalog(original, [], []);
    expect(result.excludedEntries).toHaveLength(2);
    expect(result.catalog).toHaveLength(1);
    expect(original).toHaveLength(3);
  });
  it('rejects malformed current feeds and unsafe source URLs explicitly', () => {
    expect(() => mergePublicationCatalog([], [{ repository: 'example', records: {} }], [])).toThrow('expected a sample metadata array');
    expect(() => mergePublicationCatalog([], [{ repository: 'example', records: ['bad'] }], [])).toThrow('not a valid sample');
    expect(() => mergePublicationCatalog([sample('bad', 'javascript:alert(1)')], [], [])).toThrow('unsafe');
  });
});

describe('live deployment verification', () => {
  const catalog = { sampleFolderCount: 1, samples: [{ slug: 'example', preview: { src640: 'generated/previews/example-640.webp' } }] };
  const manifest = { commit: 'expected', sampleCount: 1, legacyCount: 1 };
  function fetcher(overrides = {}) {
    return async (url) => {
      const key = new URL(url).pathname.split('/').at(-1);
      const body = { 'deployment.json': manifest, 'catalog.json': catalog, 'samples.json': [sample('example', 'https://example.com')] };
      return new Response(JSON.stringify(key in overrides ? overrides[key] : body[key] ?? {}), { status: 200 });
    };
  }
  it('verifies revision, both catalogs, page routes, and sample previews', async () => {
    expect(await verifyPublication({ siteUrl: 'https://example.com/gallery/', expectedCommit: 'expected', fetcher: fetcher() }))
      .toEqual({ commit: 'expected', samples: 1, legacyRecords: 1 });
  });
  it('rejects the wrong live revision and incomplete catalogs', async () => {
    await expect(verifyPublication({ siteUrl: 'https://example.com/', expectedCommit: 'wrong', fetcher: fetcher() })).rejects.toThrow('does not match');
    await expect(verifyPublication({ siteUrl: 'https://example.com/', expectedCommit: 'expected', fetcher: fetcher({ 'samples.json': [] }) })).rejects.toThrow('compatibility catalog');
  });
  it('does not turn HTTP failures into a successful deployment', async () => {
    await expect(verifyPublication({ siteUrl: 'https://example.com/', expectedCommit: 'expected', fetcher: async () => new Response('', { status: 503 }) })).rejects.toThrow('HTTP 503');
  });
});

import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import sharp from 'sharp';

export const REPOSITORY_URL = 'https://github.com/pnp/powerplatform-samples';
export const SITE_BASE = '/powerplatform-samples';
export const TRACKER_BASE = 'https://m365-visitor-stats.azurewebsites.net/powerplatform-samples';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function optionalStat(file) {
  try {
    return await stat(file);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

export function normalizeProduct(value) {
  return ({ 'Power Virtual Agents': 'Copilot Studio', 'PowerPlatform-samples': 'Power Platform' })[value] ?? value;
}

export function normalizeDate(value) {
  assert(typeof value === 'string', `Expected an ISO date, received ${String(value)}`);
  const date = value.slice(0, 10);
  assert(/^\d{4}-\d{2}-\d{2}(?:$|T)/.test(value), `Invalid date: ${value}`);
  const parsed = new Date(`${date}T00:00:00Z`);
  assert(!Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === date, `Invalid calendar date: ${value}`);
  if (value.length > 10) assert(!Number.isNaN(Date.parse(value)), `Invalid timestamp: ${value}`);
  return date;
}

export function visitorStatsUrl(pathname, base = SITE_BASE) {
  const route = new URL(pathname, 'https://gallery.invalid').pathname;
  const prefix = base.replace(/\/$/, '');
  assert(route === prefix || route.startsWith(`${prefix}/`), `Route is outside the site base: ${pathname}`);
  const relative = route.slice(prefix.length).replace(/^\/+|\/+$/g, '');
  return `${TRACKER_BASE}/${relative}`;
}

export function validateReadmeTracker(slug, markdown) {
  const expected = `${TRACKER_BASE}/samples/${slug}`;
  const urls = markdown.match(/https:\/\/m365-visitor-stats\.azurewebsites\.net\/[^"\s<>]+/g) ?? [];
  assert(urls.length === 1 && urls[0] === expected, `${slug}: README must contain exactly one tracker at ${expected}`);
  const lastLine = markdown.trimEnd().split(/\r?\n/).at(-1);
  assert(/<img\b/i.test(lastLine) && lastLine.includes(`"${expected}"`), `${slug}: tracker image must be the final nonblank README line`);
}

export function selectPrimaryImage(thumbnails) {
  return [...thumbnails].filter((item) => item.type === 'image').sort((a, b) => a.order - b.order)[0];
}

export function repositoryPath(target, slug) {
  if (target.startsWith('#')) return null;
  if (/^[a-z][a-z\d+.-]*:/i.test(target) || target.startsWith('//')) {
    const url = new URL(target, 'https://github.com');
    let match;
    if (url.hostname === 'github.com') {
      match = url.pathname.match(/^\/[^/]+\/(?:powerplatform|powerapps|powerautomate|powerfx|powerva)-samples\/(?:blob|raw|tree)\/[^/]+\/(.+)$/);
    } else if (url.hostname === 'raw.githubusercontent.com') {
      match = url.pathname.match(/^\/[^/]+\/(?:powerplatform|powerapps|powerautomate|powerfx|powerva)-samples\/[^/]+\/(.+)$/);
    }
    return match ? decodeURIComponent(match[1]) : null;
  }
  const local = new URL(target.replaceAll('\\', '/'), `https://gallery.invalid/samples/${slug}/`);
  return decodeURIComponent(local.pathname.slice(1));
}

export function resolveLocalFile(repositoryRoot, relative) {
  assert(!relative.split(/[\\/]/).includes('..'), `Unsafe repository asset path: ${relative}`);
  const root = path.resolve(repositoryRoot);
  const file = path.resolve(root, relative);
  assert(file.startsWith(`${root}${path.sep}`), `Asset escapes repository: ${relative}`);
  return file;
}

export function resolveThumbnailPath(repositoryRoot, slug, thumbnail) {
  assert(thumbnail?.url, `${slug}: no primary thumbnail URL`);
  const relative = repositoryPath(thumbnail.url, slug);
  assert(relative?.startsWith(`samples/${slug}/assets/`), `${slug}: preview must reference its own assets folder: ${thumbnail.url}`);
  return resolveLocalFile(repositoryRoot, relative);
}

function safeUrl(value, label) {
  const url = new URL(value);
  assert(['https:', 'http:'].includes(url.protocol), `${label}: expected an HTTP(S) URL`);
  return url.href;
}

export function normalizeSample(slug, raw) {
  assert(/^[a-z0-9][a-z0-9_-]*$/.test(slug), `${slug}: sample folders must be lowercase without spaces or dots`);
  const sourceUrl = `${REPOSITORY_URL}/tree/main/samples/${encodeURIComponent(slug)}`;
  assert(raw.url.replace(/\/$/, '') === sourceUrl, `${slug}: source URL must point to the current sample folder (${sourceUrl})`);
  const createdAt = normalizeDate(raw.creationDateTime);
  const updatedAt = normalizeDate(raw.updateDateTime);
  assert(updatedAt >= createdAt, `${slug}: update date precedes creation date`);
  const value = (key) => raw.metadata.find((item) => item.key === key)?.value;
  const categoryNames = {
    CANVAS: 'Canvas apps', 'MODEL-DRIVEN': 'Model-driven apps', 'CLOUD-FLOW': 'Cloud flows',
    'DESKTOP-FLOW': 'Desktop flows', 'COMPONENT-LIBRARY': 'Component libraries', WEBSITE: 'Websites',
    CHATBOT: 'Agents & chatbots', POWERAPPS: 'Power Apps', POWERAUTOMATE: 'Power Automate',
  };
  const categories = [...new Set((raw.categories ?? []).map((item) => categoryNames[item] ?? item))];
  if (value('POWERAPPS-TYPE') === 'Canvas' && !categories.includes('Canvas apps')) categories.push('Canvas apps');
  const authors = raw.authors.map((author) => {
    assert(/^[a-z\d]+(?:-[a-z\d]+)*$/i.test(author.gitHubAccount), `${slug}: invalid GitHub account: ${author.gitHubAccount}`);
    return { gitHubAccount: author.gitHubAccount, name: author.name?.trim() || author.gitHubAccount };
  });
  assert(authors.length > 0, `${slug}: at least one author is required`);
  const products = [...new Set(raw.products.map(normalizeProduct))];
  assert(products.length > 0, `${slug}: at least one product is required`);
  const longDescription = raw.longDescription ?? [];
  const tags = raw.tags ?? [];
  const references = (raw.references ?? []).map((item) => ({ ...item, url: safeUrl(item.url, `${slug} reference`) }));
  return {
    slug, title: raw.title, name: raw.name, shortDescription: raw.shortDescription.trim(),
    longDescription, sourceUrl, downloadUrl: raw.downloadUrl
      ? safeUrl(raw.downloadUrl, `${slug} download`)
      : `https://pnp.github.io/download-partial/?url=${sourceUrl}`,
    createdAt, updatedAt, products, categories, tags, authors, references,
    premium: value('POWERAPPS-PREMIUM') === 'Yes' ? 'Required' : value('POWERAPPS-PREMIUM') === 'No' ? 'Not required' : null,
    experimental: value('POWERAPPS-EXPERIMENTAL') === 'Yes' ? 'Yes' : value('POWERAPPS-EXPERIMENTAL') === 'No' ? 'No' : null,
    searchText: [slug, raw.title, raw.shortDescription, ...longDescription, ...raw.products, ...products,
      ...categories, ...tags, ...authors.flatMap((author) => [author.name, author.gitHubAccount])].join(' ').toLocaleLowerCase('en-US'),
    rawMetadata: raw,
  };
}

export function aggregateContributors(samples) {
  const contributors = new Map();
  for (const sample of samples) {
    for (const author of sample.authors) {
      const key = author.gitHubAccount.toLowerCase();
      const contributor = contributors.get(key) ?? { ...author, sampleSlugs: [] };
      if (!contributor.sampleSlugs.includes(sample.slug)) contributor.sampleSlugs.push(sample.slug);
      contributors.set(key, contributor);
    }
  }
  return [...contributors.values()].sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

function escapeAttribute(text) {
  return text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

export async function renderReadme(slug, markdown, resolveImage = async (target) => target) {
  const headings = new Map();
  const parser = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth, text }) {
        const base = text.toLowerCase().replace(/<[^>]*>/g, '').replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
        const count = headings.get(base) ?? 0;
        headings.set(base, count + 1);
        return `<h${depth} id="${escapeAttribute(base + (count ? `-${count}` : ''))}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
    },
  });
  const withoutTracker = markdown.replace(/<img\b[^>]*m365-visitor-stats\.azurewebsites\.net[^>]*>/gi, '')
    .replace(/^# .+\r?\n/, '');
  const html = await parser.parse(withoutTracker);
  const imageTargets = new Set();
  sanitizeHtml(html, {
    transformTags: {
      img: (tagName, attribs) => {
        if (attribs.src) imageTargets.add(attribs.src);
        return { tagName, attribs };
      },
    },
  });
  const images = new Map(await Promise.all([...imageTargets].map(async (src) => [src, await resolveImage(src)])));
  const linkTarget = (target) => {
    if (/^[a-z][a-z\d+.-]*:/i.test(target) || target.startsWith('//')) return target;
    const relative = repositoryPath(target, slug);
    if (!relative) return target;
    const hash = new URL(target, 'https://gallery.invalid').hash;
    const encoded = relative.split('/').map(encodeURIComponent).join('/');
    return `${REPOSITORY_URL}/blob/main/${encoded}${hash}`;
  };
  return sanitizeHtml(html, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'details', 'summary'],
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'], img: ['src', 'alt', 'width', 'height', 'loading', 'decoding'],
      code: ['class'], pre: ['tabindex', 'aria-label'], table: ['tabindex', 'aria-label'], '*': ['id'],
    },
    allowedSchemes: ['https', 'http', 'mailto'],
    transformTags: {
      pre: (_tag, attrs) => ({ tagName: 'pre', attribs: { ...attrs, tabindex: '0', 'aria-label': 'Code example' } }),
      table: (_tag, attrs) => ({ tagName: 'table', attribs: { ...attrs, tabindex: '0', 'aria-label': 'Sample documentation table' } }),
      a: (_tag, attrs) => ({
        tagName: 'a',
        attribs: { ...attrs, href: attrs.href ? linkTarget(attrs.href) : '',
          ...(attrs.href?.startsWith('#') ? {} : { target: '_blank', rel: 'noopener noreferrer' }) },
      }),
      img: (_tag, attrs) => ({
        tagName: 'img',
        attribs: { ...attrs, src: images.get(attrs.src) ?? attrs.src, alt: attrs.alt ?? '', loading: 'lazy', decoding: 'async' },
      }),
    },
  });
}

export async function generateGallery({ repositoryRoot, siteRoot }) {
  const publicRoot = path.join(siteRoot, 'public');
  const generatedRoot = path.join(siteRoot, 'src', 'generated');
  await rm(path.join(publicRoot, 'generated'), { recursive: true, force: true });
  await mkdir(generatedRoot, { recursive: true });
  const imageCache = new Map();
  const mediaCache = new Map();
  const optimize = async (source, output, width, quality = 80) => {
    const target = path.join(publicRoot, output);
    await mkdir(path.dirname(target), { recursive: true });
    await sharp(source).resize({ width, withoutEnlargement: true }).toFormat(path.extname(target) === '.png' ? 'png' : 'webp', { quality }).toFile(target);
    return output.replaceAll('\\', '/');
  };
  const localMedia = async (source) => {
    if (!mediaCache.has(source)) {
      mediaCache.set(source, (async () => {
        const key = createHash('sha256').update(path.relative(repositoryRoot, source).replaceAll('\\', '/')).digest('hex').slice(0, 16);
        const metadata = await sharp(source).metadata();
        if (metadata.pages > 1) {
          const output = `generated/media/${key}${path.extname(source).toLowerCase()}`;
          const target = path.join(publicRoot, output);
          await mkdir(path.dirname(target), { recursive: true });
          await copyFile(source, target);
          return output;
        }
        return optimize(source, `generated/media/${key}.webp`, 1600);
      })());
    }
    return mediaCache.get(source);
  };
  const schema = JSON.parse(await readFile(path.join(repositoryRoot, 'templates', 'metadata-schema.json'), 'utf8'));
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  const folders = (await readdir(path.join(repositoryRoot, 'samples'), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  const samples = [];
  for (const slug of folders) {
    const root = path.join(repositoryRoot, 'samples', slug);
    const file = path.join(root, 'assets', 'sample.json');
    let document;
    try {
      document = JSON.parse(await readFile(file, 'utf8'));
    } catch (error) {
      throw new Error(`${slug}: cannot read valid assets/sample.json`, { cause: error });
    }
    assert(validate(document), `${slug}: metadata failed validation: ${ajv.errorsText(validate.errors)}`);
    assert(document.length === 1, `${slug}: metadata must contain exactly one sample`);
    const raw = document[0];
    const sample = normalizeSample(slug, raw);
    const markdown = await readFile(path.join(root, 'README.md'), 'utf8');
    validateReadmeTracker(slug, markdown);
    const primary = selectPrimaryImage(raw.thumbnails);
    const source = resolveThumbnailPath(repositoryRoot, slug, primary);
    const metadata = await sharp(source).metadata();
    assert(metadata.width && metadata.height, `${slug}: preview has no image dimensions`);
    const [small, large] = await Promise.all([
      optimize(source, `generated/previews/${slug}-640.webp`, 640, 78),
      optimize(source, `generated/previews/${slug}-960.webp`, 960, 82),
    ]);
    sample.preview = { src640: small, src960: large, width: metadata.width, height: metadata.height, alt: primary.alt };
    sample.gallery = [];
    for (const thumbnail of [...raw.thumbnails].sort((a, b) => a.order - b.order)) {
      if (thumbnail.type === 'image' || thumbnail.type === 'slideshow') {
        const images = thumbnail.type === 'image' ? [thumbnail] : [...thumbnail.slides].sort((a, b) => a.order - b.order);
        for (const image of images) {
          const local = resolveThumbnailPath(repositoryRoot, slug, image);
          sample.gallery.push({ src: await localMedia(local), alt: image.alt });
        }
      } else if (thumbnail.url) {
        sample.references.push({ name: thumbnail.alt || 'Sample demonstration', url: safeUrl(thumbnail.url, `${slug} media`) });
      }
    }
    sample.readmeHtml = await renderReadme(slug, markdown, async (target) => {
      if (imageCache.has(`${slug}:${target}`)) return imageCache.get(`${slug}:${target}`);
      const relative = repositoryPath(target, slug);
      if (!relative) return safeUrl(target, `${slug} image`);
      const filePath = resolveLocalFile(repositoryRoot, relative);
      assert(await optionalStat(filePath), `${slug}: README image does not exist: ${relative}`);
      const output = `${SITE_BASE}/${await localMedia(filePath)}`;
      imageCache.set(`${slug}:${target}`, output);
      return output;
    });
    samples.push(sample);
  }
  assert(new Set(samples.map((sample) => sample.name)).size === samples.length, 'Duplicate metadata sample names');
  samples.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.title.localeCompare(b.title, 'en'));
  const definitions = JSON.parse(await readFile(path.join(siteRoot, 'src', 'lib', 'products.json'), 'utf8'));
  const products = definitions.map((product) => ({ ...product, count: samples.filter((sample) => sample.products.includes(product.name)).length }));
  for (const product of definitions) {
    if (product.logo) await optimize(path.join(repositoryRoot, 'assets', 'logos', product.logo), `generated/brand/${product.logo}`, 128);
  }
  for (let index = 1; index <= 5; index++) {
    const source = path.join(repositoryRoot, 'assets', 'graphics', `FY26AE-PowerPlatform-Composite-Portrait-00${index}.png`);
    await Promise.all([480, 800].map((width) => optimize(source, `generated/brand/portrait-${index}-${width}.webp`, width, 84)));
  }
  await optimize(path.join(repositoryRoot, 'assets', 'badge-contributor.png'), 'generated/brand/badge-contributor.webp', 480, 88);
  for (const [name, folder, original] of [
    ['ribbon-teal', 'StandardPath', 'StandardPath_01_Teal'],
    ['ribbon-blue', 'StandardPath', 'StandardPath_02_Blue'],
    ['ribbon-magenta', 'StandardPath', 'StandardPath_02_Magenta'],
    ['ribbon-red', 'StandardPath', 'StandardPath_01_Red'],
    ...['Light', 'Dark'].flatMap((theme) => ['Teal', 'Blue'].map((color) => [`mesh-${theme.toLowerCase()}-${color.toLowerCase()}`, 'GradientMesh', `${theme}GradientMesh_${color}`])),
  ]) {
    await optimize(path.join(repositoryRoot, 'assets', 'graphics', folder, `Microsoft_Power_Platform_RGB_${original}.png`), `generated/brand/${name}.webp`, 1000, 78);
  }
  const catalog = {
    version: 1, generatedAt: `${samples.reduce((latest, sample) => sample.updatedAt > latest ? sample.updatedAt : latest, '1970-01-01')}T00:00:00Z`,
    sampleFolderCount: folders.length, samples, contributors: aggregateContributors(samples), products,
    categories: [...new Set(samples.flatMap((sample) => sample.categories))].sort(),
  };
  const publicCatalog = {
    ...catalog,
    samples: samples.map(({ readmeHtml: _html, searchText: _search, rawMetadata: _raw, ...sample }) => sample),
  };
  await Promise.all([
    writeFile(path.join(generatedRoot, 'catalog.json'), `${JSON.stringify(catalog)}\n`),
    writeFile(path.join(publicRoot, 'catalog.json'), `${JSON.stringify(publicCatalog)}\n`),
    writeFile(path.join(publicRoot, 'samples.json'), `${JSON.stringify(samples.map((sample) => ({ ...sample.rawMetadata, downloadUrl: sample.downloadUrl })))}\n`),
    writeFile(path.join(generatedRoot, 'legacy.json'), `${JSON.stringify({ samples: [], excludedEntries: [] })}\n`),
  ]);
  return catalog;
}

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import type { Catalog } from '../../src/lib/catalog';

test.beforeEach(async ({ page }) => {
  await page.route('https://m365-visitor-stats.azurewebsites.net/**', (route) => route.abort());
});

test('shows all samples, working logo filters, composable facets, URL state, and reset', async ({ page, request }) => {
  const catalog: Catalog = await (await request.get('./catalog.json')).json();
  expect(catalog.samples.length).toBe(catalog.sampleFolderCount);
  expect(catalog.samples.length).toBeGreaterThan(0);
  expect(catalog.products.some((product) => product.name === 'Power BI')).toBe(false);
  await page.goto('./');
  await expect(page.locator('button[data-product-filter="Power BI"]')).toHaveCount(0);
  await expect(page.locator('[data-sample-card]')).toHaveCount(catalog.samples.length);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Build something powerful');
  const powerApps = catalog.samples.filter((sample) => sample.products.includes('Power Apps'));
  await page.locator('button[data-product-filter="Power Apps"]').click();
  await expect(page.locator('[data-sample-card]:visible')).toHaveCount(powerApps.length);
  await expect(page).toHaveURL(/product=Power(?:\+|%20)Apps/);
  const author = powerApps[0].authors[0].gitHubAccount.toLowerCase();
  await page.getByRole('combobox', { name: 'Contributor', exact: true }).selectOption(author);
  await expect(page.locator('[data-sample-card]:visible')).toHaveCount(powerApps.filter((sample) => sample.authors.some((item) => item.gitHubAccount.toLowerCase() === author)).length);
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Contributor', exact: true })).toHaveValue(author);
  await page.goBack();
  await expect(page.getByRole('combobox', { name: 'Contributor', exact: true })).toHaveValue('');
  await page.goForward();
  await expect(page.getByRole('combobox', { name: 'Contributor', exact: true })).toHaveValue(author);
  await page.locator('#reset-filters').click();
  await expect(page.locator('[data-sample-card]:visible')).toHaveCount(catalog.samples.length);
  await page.locator('button[data-product-filter="Power Pages"]').click();
  const pages = catalog.samples.filter((sample) => sample.products.includes('Power Pages'));
  await expect(page.locator('[data-sample-card]:visible')).toHaveCount(pages.length);
  if (pages.length === 0) await expect(page.locator('#empty-state')).toBeVisible();
  await page.locator('#reset-filters').click();
  await page.getByRole('searchbox', { name: 'Search samples', exact: true }).fill('zzzz-no-such-sample');
  await expect(page.locator('#empty-state')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
  await expect(page.locator('#empty-state')).toBeHidden();
});

test('search, category, sort, and contributor counts agree with metadata', async ({ page, request }) => {
  const catalog: Catalog = await (await request.get('./catalog.json')).json();
  await page.goto('./?q=expense');
  await expect(page.getByRole('searchbox', { name: 'Search samples', exact: true })).toHaveValue('expense');
  expect(await page.locator('[data-sample-card]:visible').count()).toBeGreaterThan(0);
  await page.locator('#reset-filters').click();
  const category = catalog.categories[0];
  await page.getByRole('combobox', { name: 'Category', exact: true }).selectOption(category);
  await expect(page.locator('[data-sample-card]:visible')).toHaveCount(catalog.samples.filter((sample) => sample.categories.includes(category)).length);
  await page.locator('#reset-filters').click();
  await page.getByRole('combobox', { name: 'Sort samples' }).selectOption('name');
  const titles = await page.locator('[data-sample-card]:visible').evaluateAll((cards) => cards.map((card) => (card as HTMLElement).dataset.title));
  expect(titles).toEqual([...catalog.samples].sort((a, b) => a.title.localeCompare(b.title, 'en') || a.slug.localeCompare(b.slug, 'en')).map((sample) => sample.title));
  await page.goto('./contributors/');
  await expect(page.locator('.contributor-card')).toHaveCount(catalog.contributors.length);
  const contributor = catalog.contributors.find((item) => item.gitHubAccount.toLowerCase() === 'solanki-manish')!;
  await expect(page.locator('.contributor-card').filter({ hasText: '@Solanki-Manish' })).toContainText(`${contributor.sampleSlugs.length} samples`);
});

test('sample details have valid actions, localized images, and exactly one route tracker', async ({ page, request }) => {
  const catalog: Catalog = await (await request.get('./catalog.json')).json();
  const sample = catalog.samples.find((item) => item.slug === 'relocation-app')!;
  let trackerRequests = 0;
  page.on('request', (req) => { if (req.url().includes('m365-visitor-stats')) trackerRequests++; });
  await page.goto(`./samples/${sample.slug}/`);
  await expect(page.getByRole('heading', { level: 1, name: sample.title, exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download sample', exact: true })).toHaveAttribute('href', sample.downloadUrl);
  await expect(page.getByRole('link', { name: 'View source', exact: true })).toHaveAttribute('href', sample.sourceUrl);
  await expect(page.locator('img[data-visitor-stats]')).toHaveCount(1);
  await expect(page.locator('img[data-visitor-stats]')).toHaveAttribute('data-src', 'https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/samples/relocation-app');
  await expect(page.locator('.readme-content img[src*="m365-visitor-stats"]')).toHaveCount(0);
  expect(trackerRequests).toBe(0);
  await expect(page.locator('.detail-preview img')).toHaveJSProperty('naturalWidth', sample.preview.width > 960 ? 960 : sample.preview.width);
  await page.goto('./community/');
  await expect(page.locator('img[data-visitor-stats]')).toHaveAttribute('data-src', 'https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/community');
  await expect(page.getByRole('link', { name: 'Call schedule & invites' })).toHaveAttribute('href', 'https://aka.ms/community/calls');
});

test('theme defaults to light, persists dark mode, and navigation is keyboard accessible', async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('switch', { name: 'Switch to dark mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('switch', { name: 'Switch to light mode' })).toHaveAttribute('aria-checked', 'true');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  if (testInfo.project.name === 'mobile') {
    await page.locator('.mobile-menu summary').click();
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Community', exact: true })).toBeVisible();
  } else {
    await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Community', exact: true })).toBeVisible();
  }
});

test('contributor recognition appears immediately below the contributing hero', async ({ page }) => {
  await page.goto('./contributing/');
  const badge = page.locator('.page-hero + .container .badge-panel');
  await expect(page.locator('.badge-panel')).toHaveCount(1);
  await expect(badge).toBeVisible();
  await expect(badge.getByRole('img', { name: /community contributor badge/i })).toBeVisible();
  await expect(badge.getByText('The community contributor badge celebrates people who share their knowledge.')).toBeVisible();
  await expect(badge.getByRole('link', { name: 'About community recognition' })).toHaveAttribute('href', 'https://aka.ms/community/recognition');
  await badge.getByRole('link', { name: 'See how to contribute' }).click();
  await expect(page).toHaveURL(/contributing\/#contribution-steps$/);
  await expect(page.locator('#contribution-steps')).toBeInViewport();
});

test('key pages have no serious accessibility violations in either theme', async ({ page }) => {
  test.setTimeout(180_000);
  for (const theme of ['light', 'dark']) {
    await page.addInitScript((value) => localStorage.setItem('power-platform-gallery-theme', value), theme);
    for (const route of ['', 'getting-started/', 'contributing/', 'contributors/', 'whats-new/', 'community/', 'legacy-samples/', 'samples/a-puzzle-a-day/']) {
      await page.goto(`./${route}`);
      const results = await new AxeBuilder({ page }).analyze();
      const violations = results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''));
      expect(violations.map((item) => ({
        id: item.id, impact: item.impact, count: item.nodes.length,
        examples: item.nodes.slice(0, 3).map((node) => ({ target: node.target, reason: node.failureSummary })),
      })), `${theme}: ${route}`).toEqual([]);
    }
  }
});

test('all catalog preview URLs and generated pages are available under the repository base', async ({ request }) => {
  const catalog: Catalog = await (await request.get('./catalog.json')).json();
  for (const sample of catalog.samples) {
    expect((await request.get(`./samples/${sample.slug}/`)).ok(), sample.slug).toBeTruthy();
    expect((await request.get(`./${sample.preview.src640}`)).ok(), sample.preview.src640).toBeTruthy();
  }
  for (const path of ['getting-started/', 'contributors/', 'contributing/', 'whats-new/', 'community/', 'legacy-samples/', 'samples.json', 'deployment.json', '404.html', 'robots.txt', 'sitemap-index.xml']) {
    expect((await request.get(`./${path}`)).ok(), path).toBeTruthy();
  }
});

test('legacy navigation and compatibility exports remain reachable', async ({ page, request }) => {
  await page.goto('./samples/powerfx/');
  await expect(page).toHaveURL(/\/legacy-samples\/#power-fx$/);
  await expect(page.getByRole('heading', { level: 2, name: 'Power Fx', exact: true })).toBeVisible();
  await page.goto('./gettingstarted/');
  await expect(page).toHaveURL(/\/getting-started\/$/);
  const local: Catalog = await (await request.get('./catalog.json')).json();
  const legacy = await (await request.get('./samples.json')).json();
  expect(Array.isArray(legacy)).toBe(true);
  for (const sample of local.samples) expect(legacy.some((record: { url: string }) => record.url === sample.sourceUrl)).toBe(true);
});

test('layouts fit 320, 375, 768, and 1440 pixel widths without overflow', async ({ page }) => {
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['', 'contributors/', 'samples/a-puzzle-a-day/']) {
      await page.goto(`./${route}`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${width}px: ${route}`).toBe(true);
    }
  }
});

test('baseline sample navigation works without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.route('https://m365-visitor-stats.azurewebsites.net/**', (route) => route.abort());
  await page.goto(baseURL!);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Build something powerful');
  await page.locator('.sample-card h3 a').first().click();
  await expect(page.locator('.readme-content')).toBeVisible();
  await context.close();
});

test('a non-local production host activates exactly one correct sample-view request', async ({ page, request }) => {
  await page.route('https://gallery.test/**', async (route) => {
    const url = new URL(route.request().url());
    const response = await request.get(`http://127.0.0.1:4399${url.pathname}${url.search}`);
    await route.fulfill({ response });
  });
  const expected = 'https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/samples/relocation-app';
  const requests: string[] = [];
  page.on('request', (req) => { if (req.url().includes('m365-visitor-stats')) requests.push(req.url()); });
  await Promise.all([
    page.waitForRequest(expected),
    page.goto('https://gallery.test/powerplatform-samples/samples/relocation-app/?q=ignored#setup'),
  ]);
  await expect(page.locator('img[data-visitor-stats]')).toHaveAttribute('src', expected);
  expect(requests).toEqual([expected]);
});

test('the first home view has no runtime errors or non-home portrait downloads', async ({ page }) => {
  const errors: string[] = [];
  const images: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (req) => { if (req.resourceType() === 'image') images.push(req.url()); });
  await page.goto('./');
  await expect(page.locator('.hero-portrait')).toHaveJSProperty('complete', true);
  expect(images.filter((url) => /portrait-[2-5]-|mesh-dark|badge-contributor\.png/.test(url))).toEqual([]);
  expect(errors).toEqual([]);
});

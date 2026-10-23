# Power Platform sample gallery

A local-first, statically generated Astro website for the samples in this repository. It uses the supplied Power Platform artwork, product logos, five portraits, and community contributor badge.

## Requirements and local development

- Node.js 22.12 or later (validated with Node.js 22.23.2).
- npm and the committed lockfile.
- The full repository, including [source branding](../assets/) and [sample assets](../samples/).

From this directory:

```shell
npm ci
npm run dev
```

Open the URL printed by Astro, normally <http://127.0.0.1:4321/powerplatform-samples/>. Website source changes reload automatically. After editing sample metadata, sample README content, or root artwork, run `npm run generate` or restart the development command.

To inspect the production version:

```shell
npm run build
npm run validate:links
npm run preview
```

This application uses the `/powerplatform-samples/` base path locally and in production. Test nested URLs directly, not only navigation from the homepage.

## Validation

```shell
npm run validate:readme-trackers
npm test
npm run check
npm run build
```

For browser tests, install the matching Chromium binary once, then run:

```shell
npx playwright install chromium
npm run test:e2e
```

Playwright starts and stops its own production preview on port 4399. Tests cover desktop/mobile discovery, URL and history state, contributor counts, details, navigation, themes, no-JavaScript navigation, base-path routes, previews, tracking, accessibility, and overflow at 320/375/768/1440 pixels. Do not run another service on that port during tests.

The unit suite covers metadata normalization, real dates, product/category aliases, contributor aggregation, schema arrays, image ordering, paths, Markdown/sanitization, filters, and tracking. After a build, `npm run validate:links` checks all generated HTML pages for local page, image, asset, and anchor targets. Browser checks use axe for serious/critical accessibility findings; also review keyboard use, readability, screenshots, and the actual content.

## Content and generated files

- Each folder under [samples](../samples/) must contain `assets/sample.json` with exactly one record, a `README.md`, and a locally stored preview image.
- The [existing schema](../templates/metadata-schema.json) is shared with sample guidance. Date-only values and ISO timestamps are supported; use date-only values for new contributions.
- Generation validates every folder. It fails with a sample-specific error for missing metadata, invalid author accounts, invalid dates, stale source paths, absent images, or an incorrect README tracker.
- Detail pages use the folder name as their slug. Relative README links resolve against the sample's repository location; external references retain their original destinations.
- Markdown is sanitized, headings receive anchor IDs, relative/known repository images are served locally, and animated documentation images retain their original animation.
- Power Virtual Agents is displayed as Copilot Studio while the original term stays searchable. The legacy `PowerPlatform-samples` product label is normalized for display. Original metadata remains in the internal catalog.
- Power BI is outside this repository's sample scope and is not listed in the gallery. Its supplied source icon is preserved but is not generated into website assets.
- All products is genuinely unfiltered, not an alias for the generic Power Platform tag. Product counts count matching samples; their sum can exceed the total for multi-product samples.
- Missing optional download URLs produce the standard partial-download URL for the verified current folder. Unknown licensing facts are not shown as false or free.
- Contributor identities and counts come from metadata. Each contributor photo uses the corresponding GitHub account image and links to that profile; image loading is lazy and requires no authenticated GitHub API call. If an image is unavailable, the page logs a warning, shows initials, and retains the accessible profile link.

The generator writes ignored data to `src/generated/`, ignored public `catalog.json` and `samples.json` exports, and optimized media/branding under `public/generated/`. Do not edit or commit generated files. The public catalog has versioned `samples`, `products`, `contributors`, categories, folder coverage, and a deterministic metadata-derived generation date; it does not contain rendered README HTML.

## Artwork and performance

The originals in [assets](../assets/) are the source of truth. Keep them intact and include them with any implementation contribution; a clean clone must be able to reproduce the generated website.

- Five responsive portrait pairs preserve transparency; only portrait 001 is used on the homepage.
- Selected StandardPath ribbons and light/dark GradientMesh backgrounds form decorative page/section treatments.
- Product logos retain their original appearance and are always accompanied by accessible product names.
- The contributor badge has a 480 px optimized derivative rather than serving the original 2048 px PNG to small panels.
- Card previews have 640/960 px variants, use explicit dimensions, and preserve screenshot content. Additional documentation images are optimized and lazy-loaded. Animated images are copied intact to avoid flattening them or decoding all frames during the build.
- Shared documentation images are processed once per generation pass. Each build regenerates derivatives so changing a thumbnail source cannot retain a stale preview. System fonts avoid external font requests and additional licensing requirements.

Keep artwork decorative where appropriate; portraits are not contributor identities. Badge wording links to [community recognition](https://aka.ms/community/recognition) without promising automatic issuance.

The Contributing page places its contributor-badge callout immediately below the hero, before the contribution steps. Its primary action jumps to those steps; the home and Contributors pages retain their links to Contributing.

## Visitor-statistics images

Each sample README ends with one tracker:

```html
<img src="https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/samples/your-sample-name" />
```

The production layout contains one decorative image with a route-specific `data-src`. A small script activates its `src` only on non-local hosts; development output and localhost production previews do not send visitor events. Automated tests intercept the endpoint as an additional safeguard.

Sample detail pages use the exact README sample key. Home uses the namespace root, and other pages use their route without a trailing slash. The site base, query strings, and fragments are excluded from the route key. The README's image is removed only from rendered website documentation, preventing double counts. Cards, previews, filters, and builds do not count as sample views.

Without JavaScript, sample content/navigation remains usable; the website tracker is not activated. GitHub-rendered README tracking remains unchanged.

## Community and contribution guidance

- [Power Platform Community forums](https://community.powerplatform.com/) are the primary destination for questions and discussion. GitHub issues are for reproducible sample bugs and repository improvements.
- [Repository contribution guidance](../CONTRIBUTING.md).
- [Sample template](../templates/sample-template/).
- [Community call schedule and recurring invites](https://aka.ms/community/calls).
- [Present a community demo](https://aka.ms/community/request/demo).
- [Community home](https://aka.ms/community/home).
- [Microsoft Community Learning](https://www.youtube.com/@MicrosoftCommunityLearning) hosts community call recordings and demos.
- [Microsoft Power Platform](https://www.youtube.com/@mspowerplatform) provides Power Platform product videos and tutorials.

Shared website destinations are maintained in [community.ts](src/lib/community.ts) and promoted on the Community page, shared footer, and relevant getting-started/sample guidance. Calls and presenting a live demo remain complementary ways to participate.

## GitHub validation and publication

Every pull request to `main` runs the read-only [gallery validation workflow](../.github/workflows/validate-gallery.yml): locked dependency installation, README tracking, unit tests, the collectible-card sample's dependency-free Python reference/source checks, metadata/type checks, a production build, internal link/image checks, and desktop/mobile browser/accessibility tests. It tests the PR merge tree and has no deployment or write credentials. Reference checks do not execute Power Fx or import a solution into a tenant.

The [Pages workflow](../.github/workflows/deploy-gallery.yml) builds and verifies relevant `main` changes, supports manual dispatch, and refreshes external metadata daily. Only the deployment job has Pages/OIDC write permissions. Actions are pinned to reviewed release commit SHAs.

The workflow replaces the old metadata branch-writer, not the historical branches themselves. Before building, it reads the previous `gh-pages` catalog, refreshes the four legacy feeds, and runs `npm run build:publication` with `LEGACY_CATALOG_PATH` set to that snapshot. Ordinary `npm run build` remains network-independent.

- `catalog.json` remains the typed repository-local gallery export.
- `samples.json` preserves compatible historical metadata and adds current records. Identity uses both metadata name and source URL: duplicate historical IDs must not drop unrelated samples, and separate Power Fx examples can share one documentation URL.
- The legacy collection page links to older repository samples. Old product/getting-started/contribution routes have static redirects.
- Known non-sample export artifacts (an app manifest, a version string, and sample-image data) are explicitly reported rather than treated as samples. The original snapshot and cleanup report remain downloadable; unexpected malformed records fail publication.
- `deployment.json` records the built commit and catalog counts. After publishing, `npm run deployment:verify` checks the expected live revision, both catalogs, key pages, every current sample route, and every primary preview. Set `SITE_URL` and `EXPECTED_COMMIT_SHA` to verify a particular deployment.

GitHub Pages must use **GitHub Actions** as its build source. Do not re-enable the old branch publisher alongside this workflow. The `Docs` and `gh-pages` branches remain historical sources, not competing publishers. See the [legacy repository assessment](../legacy-repositories-assessment.md) before making archive or migration decisions.

## Troubleshooting

- **Generation fails:** fix the named sample's metadata, source URL, local image, or README tracker; do not hide it from the catalog.
- **Missing branding:** ensure the original root assets are present; rerun `npm run generate`.
- **Missing test executable:** run `npx playwright install chromium` after installing/updating dependencies.
- **Port in use:** stop only the service you own or choose a different preview port with `npm run preview -- --port 4322`.
- **Theme not persisted:** restricted browser storage is reported in the console; the current page can still change theme.
- **Old published site remains visible:** a local build does not publish. Check the Deploy gallery workflow and `deployment.json` before concluding that a new revision is live.

# Power Platform sample gallery: plan and implementation checklist

## Implementation status

**Status: gallery implemented and validated; GitHub publication approved on 2026-10-22.**

The plan was approved and implemented as an isolated Astro site in [site](./site/). Following the reviewed merge of [#198](https://github.com/pnp/powerplatform-samples/pull/198), all 75 sample folders are represented, with 36 contributors. Metadata/media blockers and additional invalid contributor IDs/case-sensitive source paths discovered during validation were repaired.

**Local preview:** <http://127.0.0.1:4321/powerplatform-samples/>

Publication now uses the [GitHub Pages workflow](./.github/workflows/deploy-gallery.yml), with [read-only PR validation](./.github/workflows/validate-gallery.yml). The `Docs`/`gh-pages` branches are retained as historical sources rather than competing publishers. The live deployment's verified revision is recorded in its `deployment.json`; archival decisions remain with the maintainers.

### Initial local-version validation evidence

| Command or check | Result |
| --- | --- |
| `npm run validate:readme-trackers` | Passed: all 74 source README trackers. |
| `npm test` | Passed: 17 unit tests. |
| `npm run check` and final `npx astro check` | Passed: zero errors, warnings, or hints. |
| `npm run build` | Passed: 74/74 samples, 35 contributors, 81 generated pages. |
| `npm run validate:links` | Passed: 81 HTML pages and 586 unique internal page, anchor, and asset targets. |
| `npm run test:e2e` | Passed: all 20 desktop/mobile tests, including both themes, serious/critical accessibility checks, 320/375/768/1440 px overflow checks, filters/history, no-JavaScript navigation, and local/production tracking behavior. |
| Community and representative source/download URLs | HTTP 200 after redirects. |
| Visual review | Desktop light/dark at 1440 px and mobile light/dark at 375 px inspected; four screenshots saved for handoff. |
| Initial branding payload | Responsive home portrait approximately 24 KB / 49 KB; optimized contributor badge approximately 70 KB rather than the original 2048 px PNG. Other portraits and alternate-theme meshes are not requested on the initial home view. |
| Local production preview | Verified HTTP 200; running on the local URL above. |

See the [site development guide](./site/README.md) for reproduction commands, generated-file ownership, tracking behavior, and the publication boundary.

### Follow-up refinements (2026-10-22)

- Removed Power BI from the gallery product registry, generated catalog/assets, product-color strip, and new-sample templates. The supplied original icon remains untouched.
- Moved the Contributing page's existing contributor-badge callout directly below its hero, before the steps. It appears once, retains the recognition link, and now links directly to the contribution steps instead of linking back to the same page.
- Revalidated with `npm test` (17 passed), `npx astro check` (zero errors/warnings/hints), `npm run build` (81 pages), and `npm run validate:links` (586 internal targets).
- Ran `npm run test:e2e -- --grep 'shows all samples|contributor recognition|key pages|layouts fit'`: all 8 targeted desktop/mobile tests passed, including badge placement, product removal, accessibility in both themes, and responsive overflow checks.

### Publication and backlog follow-up

- Reviewed all 36 initially open PRs. Merged [#198](https://github.com/pnp/powerplatform-samples/pull/198), invited its contributor to request a community demo, and posted concrete change requests on the other 35 PRs.
- Added the [archive-readiness assessment](./legacy-repositories-assessment.md), without changing any legacy repository's archive setting.
- Added the actual gallery promo screenshot to [root assets](./assets/power-platform-sample-gallery-preview.png) and the repository README.
- Added daily legacy metadata refresh, the compatible `samples.json` export, 116 legacy sample links, the original catalog snapshot/cleanup report, and 12 old-navigation redirects.
- Local publication validation passed: 26 gallery/publication unit tests, 22 sample reference tests, zero Astro diagnostics, 24 browser tests, 95 HTML pages/601 internal targets, and the live-verification script against the local production preview. The publication artifact contains 75 local samples and 191 compatibility records.
- GitHub CI and the post-deployment revision verifier are the release gates. See the [validation workflow](https://github.com/pnp/powerplatform-samples/actions/workflows/validate-gallery.yml) and [deployment workflow](https://github.com/pnp/powerplatform-samples/actions/workflows/deploy-gallery.yml) for authoritative run results.

## 1. Original repository and reference analysis

The following findings record the pre-implementation audit. The content blockers listed here have now been addressed.

| Area | Findings and implications |
| --- | --- |
| Current repository | [Samples](./samples/) contains 74 sample folders. The main branch has no website application or root package manifest. Keep the gallery isolated in a new `site/` directory. |
| Reference gallery | The neighboring checkout is named `spfx-copilot-components-vesa`. Its `site/` application uses Astro, static sample detail pages, generated catalog data, optimized previews, lightweight filtering, light/dark themes, contributor recognition, unit tests, and Playwright accessibility/browser tests. Its [published gallery](https://pnp.github.io/spfx-copilot-components/) was also inspected visually. |
| Existing metadata | There are 70 sample metadata files: 69 parse successfully and one contains invalid JSON. Four folders lack the expected metadata filename. Do not build a convincing-looking gallery that silently omits these samples. |
| Missing metadata | [contoso-school](./samples/contoso-school/), [create-notes-from-canvas](./samples/create-notes-from-canvas/), [patch-tuesday](./samples/patch-tuesday/), and [relocation-app](./samples/relocation-app/) lack the expected metadata file. The middle two already contain an alternative `sample-template.json` file to inspect before authoring new metadata. All four have local screenshots. |
| Invalid metadata | [Modern Canvas Template metadata](./samples/modern-canvas-template/assets/sample.json) contains unescaped quotation marks in its description. Repair this narrowly during implementation. |
| Preview problems | [Prompt Library metadata](./samples/prompt-library/assets/sample.json) and [Prompt Wagon metadata](./samples/prompt-wagon/assets/sample.json) reference the old `prompt-manager` folder. Both samples have their own local images; Prompt Wagon has a dedicated screenshot. Correct the references rather than showing unrelated or missing previews. |
| Compatibility needs | Among the 69 parseable records, 27 lack a download URL, 27 use timestamp-style creation dates rather than date-only values, and three source URLs still reference the Power Apps repository. Support intentional legacy formats and verify migrated links. |
| Product taxonomy | Metadata includes Power Apps, Power Automate, Power Fx, Power Virtual Agents, Copilot Studio, Dataverse, AI Builder, generic Power Platform values, and secondary technologies. The legacy value `PowerPlatform-samples` also occurs. Normalize display/filter values without losing original metadata. |
| Existing view tracking | All 74 sample READMEs passed the planning audit for one correctly addressed tracker on the final nonblank line. Preserve this working behavior, including valid existing attributes such as `aria-hidden`. |
| Publishing history | The existing [metadata merge workflow](./.github/workflows/merge-sample-json.yml) writes to the `Docs` and `gh-pages` branches. `Docs` contains an older MkDocs gallery and a 138-entry cross-repository catalog. The two checked-in [legacy metadata feeds](./.metadata/) are currently empty arrays. A local build must not depend on those feeds or replace the published gallery. |
| Supplied artwork | [Assets](./assets/) contains 30 PNGs: five human portraits, eight StandardPath ribbons, eight light/dark GradientMesh backgrounds, eight product/platform logos, and one contributor badge. Approximately 12.4 MB of original artwork should not be downloaded by every visitor. |
| Worktree safety | The supplied [assets](./assets/) are currently untracked. Preserve the originals and include required source assets explicitly in the eventual implementation changes so a clean clone can reproduce the site. Do not overwrite or discard them. |

### Existing guidance to retain

- [Repository README](./README.md): sample usage, contribution guidance, community calls, and community ownership.
- [Contribution guidance](./CONTRIBUTING.md): solution/source structure, Power Platform CLI workflow, CLA, screenshots, metadata, and sample tracker requirements.
- [Sample README template](./templates/sample-template/README.md), [metadata template](./templates/sample-template/assets/sample.json), and [metadata schema](./templates/metadata-schema.json): the existing contribution contract, not a new parallel content system.
- [MIT license](./LICENSE) and existing community/code-of-conduct references.

## 2. Creative direction: made by makers, shared with everyone

### Identity and visual language

- Name the site **Power Platform sample gallery**. Use the supplied [Power Platform logo](./assets/logos/powerplatform_256x256.png) in the header and favicon; make the platform identity unmistakable.
- Use the community eyebrow **Microsoft 365 & Power Platform Community**, with Power Platform-specific page titles, descriptions, navigation, and calls to action.
- Proposed hero headline: **Build something powerful. Start with a sample.**
- Supporting message: practical, community-built apps, automations, agents, and solutions to learn from, adapt, and share.
- Retain the reference gallery's clear navigation, preview-led cards, community ribbon, filtering, contributor recognition, and generous spacing. Do not carry over SPFx requirements, Copilot canvas terminology, product-specific videos, or deployment instructions.
- Create a more human-led, editorial introduction: copy and actions on the left, one supplied portrait on the right, with a restrained teal mesh and ribbon composition. Keep the hero compact enough that sample discovery is not buried.
- Use an off-white canvas, crisp white cards, deep readable text, modest corner radii, and subtle shadows in light mode. Use deep charcoal/teal surfaces and adjusted contrast in dark mode.
- Use system typography such as Segoe UI, Aptos, and sans-serif. Do not copy the neighboring repository's custom fonts without verified redistribution rights.
- Add a thin multicolor strip above the header using product-inspired accents: Power Platform teal/green, Power Apps magenta, Power Automate blue, Power Pages violet, and Copilot Studio's multicolor identity.
- Derive the supporting palette from the supplied logos and artwork. Treat accent values as site design tokens, not claims of official brand specifications. Never recolor product logos or rely on color alone to identify a product.

### Deliberate asset placement

| Surface | Supplied artwork | Treatment |
| --- | --- | --- |
| Home hero | [Portrait 001](./assets/graphics/FY26AE-PowerPlatform-Composite-Portrait-001.png) | Primary human image, paired with the teal Power Platform identity. Preserve the person and integrated graphic composition. |
| Contributing | [Portrait 002](./assets/graphics/FY26AE-PowerPlatform-Composite-Portrait-002.png) | Magenta-accented invitation to share knowledge and contribute a sample. |
| Getting started | [Portrait 003](./assets/graphics/FY26AE-PowerPlatform-Composite-Portrait-003.png) | Blue-accented learning and building introduction. |
| What's new | [Portrait 004](./assets/graphics/FY26AE-PowerPlatform-Composite-Portrait-004.png) | Warm accent for recent community activity. |
| Contributors | [Portrait 005](./assets/graphics/FY26AE-PowerPlatform-Composite-Portrait-005.png) | Community-focused editorial banner; actual contributor identities still come from sample metadata. |
| Catalog edges and section transitions | [StandardPath ribbons](./assets/graphics/StandardPath/) | Teal near the introduction; blue/magenta ribbons at catalog edges; a restrained warm ribbon on the updates page. Keep artwork outside reading surfaces and away from controls. |
| Theme-aware background atmosphere | [GradientMesh artwork](./assets/graphics/GradientMesh/) | Light teal/blue meshes in light mode and selected dark variants in dark mode, with overlays where required for readability. Do not load every variant. |
| Product navigation and sample facts | [Product logos](./assets/logos/) | Clearly labeled platform/product selectors and compact product marks on cards and detail pages. |
| Contributor recognition | [Contributor badge](./assets/badge-contributor.png) | Prominent recognition panel on Contributors and Contributing, plus a smaller home-page invitation. Identify it explicitly as the community contributor badge. |

Use all five portraits across the site, but only one as the home hero. Do not imply that the pictured people authored particular samples or are named community contributors. Use the supplied artwork rather than unrelated stock imagery.

### Home-page composition

1. Product-color strip and shared header: platform logo, navigation, GitHub, theme control.
2. Compact split hero: headline, short introduction, **Explore samples** and **Contribute a sample** actions, portrait 001, and generated sample/contributor counts.
3. Community-call ribbon linked directly to the call schedule.
4. Logo-led product selector with visible labels, counts, and a distinct **All products** option.
5. Search/filter toolbar, result count, and responsive screenshot-led sample grid.
6. Contributor/badge invitation and concise learning/community links.
7. Shared community footer, contribution links, license, and issue reporting.

## 3. Pages and navigation

Proposed paths are relative to the future `/powerplatform-samples/` site base.

| Page | Proposed route | Required content |
| --- | --- | --- |
| Sample gallery | `/` | Human-led introduction, community calls, product filtering, search, sample cards, real counts, contribution/badge invitation. |
| Sample details | `/samples/{folder}/` | Title, screenshots, product logos, summary, authors, dates, source/download links, available license/capability facts, and rendered sample README. |
| Getting started | `/getting-started/` | Choose a sample, check prerequisites/licensing/environment permissions, download/import a solution or work from source, and follow the sample-specific README. Cover Power Platform CLI where applicable; do not imply every sample is packaged identically. |
| Contributors | `/contributors/` | Deduplicated contributor profiles, sample counts, links back to their filtered samples, supplied badge, and recognition/community links. |
| Contributing | `/contributing/` | Fork/branch, sample structure, metadata and screenshot requirements, validation commands, tracker contract, CLA, PR guidance, badge reference, and demo invitation. Link to authoritative repository guidance. |
| What's new | `/whats-new/` | Recently added/updated samples using metadata dates; distinguish created from updated without inventing release information. |
| Community | `/community/` | Calls, recurring invites, presenting a demo, community home, recognition, and ways to participate. |
| Not found | `/404.html` | Branded error page with a clear return to sample discovery. |

Primary navigation: **Samples, Getting started, Contributors, Contributing, What's new, Community**, plus GitHub and light/dark mode. Adapt this to a usable mobile menu rather than compressing links.

### Community destinations

- [Community home](https://aka.ms/community/home).
- [Community call schedule and recurring invites](https://aka.ms/community/calls).
- [Request a community demo](https://aka.ms/community/request/demo).
- [Community recognition](https://aka.ms/community/recognition).
- [Power Platform documentation](https://learn.microsoft.com/power-platform/).
- Existing repository issue and contribution destinations, verified before use.

Keep calls visible on the home page and accessible from every page through shared navigation/footer links. Do not hard-code meeting dates or promise automatic badge issuance, Credly certification, or eligibility rules that have not been confirmed.

## 4. Catalog and discovery behavior

### Scope and source of truth

- **Recommended first-version scope: samples physically present in this repository.** This gives a reproducible local gallery without fetching other repositories or using the GitHub API at runtime.
- Generate records from each sample's metadata and README; use actual folder names as stable detail-page slugs. Do not hard-code sample lists, totals, author lists, or product counts in the UI.
- Account for all 74 folders. Repair the identified content blockers using existing READMEs, source files, screenshots, metadata variants, and verifiable history. Do not invent authors, dates, capabilities, or licensing.
- If an essential field cannot be established, surface the exact blocker for review. Any temporary exclusion requires explicit approval and a visible generation report; never silently drop a sample or substitute a generic success-shaped record.
- Preserve contributor attribution and legitimate external references. Verify migrated source links against the current sample folder before changing them.
- Build independently of the older 138-entry federated catalog. Preserving or refreshing external-only samples is a publication decision, not an implicit removal from the existing live site.

### Normalization and validation

- Retain raw metadata while deriving typed, normalized gallery fields.
- Present **Power Virtual Agents** samples under **Copilot Studio**, while retaining the original product term in searchable text and relevant sample documentation.
- Normalize the legacy generic `PowerPlatform-samples` label to Power Platform for display/filtering.
- Keep **All products** separate from the generic **Power Platform** metadata label; choosing All must include every sample, not just records carrying that tag.
- Provide logo-led selectors for Power Apps, Power Automate, Power Pages, Copilot Studio, Dataverse, and AI Builder. Use the platform logo for the all-products identity. Power BI is excluded from this repository's sample scope; preserve its original icon without publishing it.
- Keep Power Fx and Custom Connectors discoverable as labeled capabilities without inventing product logos. Preserve secondary technologies such as Microsoft Teams in searchable metadata.
- Show honest zero-result states for supported products with no local samples; do not manufacture Power Pages content to fill the navigation.
- Normalize category labels for readability while preserving meaningful distinctions. A broad legacy `POWERAPPS` category is not proof that a sample is a canvas app; use verified metadata for subtypes.
- Accept documented date-only and ISO timestamp formats, normalize deterministically, and validate real calendar dates and date ordering. Update the existing schema compatibly where needed rather than rewriting every historical record solely for formatting.
- Validate IDs/slugs, required data, safe paths, URLs, author fields used by the UI, and local preview files. Report actionable errors with sample names and filenames.
- Where download URLs are legitimately absent, derive the repository's standard partial-download link from a verified source path. Do not emit empty or misleading download buttons.

### Filtering and cards

- Begin with a single active product selector, combined with text search, category, contributor, and sorting. This is simpler than an unexplained multi-select model.
- Apply different facets together; search titles, descriptions, products, tags, capabilities, and author names.
- Support recently updated, newest, and alphabetical sorting with stable tie-breaking.
- Reflect filters in URL query parameters; support direct links, reload, and browser back/forward behavior.
- Provide visible selected states, result counts, clear/reset actions, and an accessible no-results state.
- Use a responsive three/two/one-column card grid. Preserve screenshot content rather than indiscriminately cropping app UIs.
- Show title, concise description, product logos with labels, author attribution, update date, and a detail link. Display premium/experimental facts only when metadata establishes them.
- Keep the unfiltered catalog and ordinary detail navigation usable without client-side JavaScript.

## 5. Proposed technical foundation

- Create an isolated **Astro + TypeScript static site** in `site/`, matching the reference's architectural approach without copying unrelated functionality or its dependency versions blindly.
- Select supported stable dependency versions and document the matching Node.js requirement. Commit the lockfile when implementation begins.
- Use static HTML and small client-side scripts for filters, theme, and navigation; no React application, backend, database, account system, or runtime API dependency is needed.
- Generate an internal typed catalog and a public `catalog.json` containing sample records, contributors, product facets, and a schema version.
- Render sanitized Markdown from sample READMEs. Resolve relative image, download, source, and anchor links correctly, including spaces, uppercase extensions, GitHub blob/raw forms, and repository-relative paths.
- Process the first image thumbnail by ascending `order` as the card preview. Validate its local file, generate responsive WebP/appropriate optimized variants, and support animated or additional media intentionally.
- Keep root artwork as the source of truth. Generate/copy selected site-ready assets under a bounded `site/public/generated/` area; ignore generated output and do not hand-maintain duplicate originals.
- Preserve portrait transparency and logos; generate appropriately sized badge and background derivatives. Reserve image dimensions, lazy-load below-the-fold media, and prioritize only the actual hero/visible previews.
- Add shared layout, navigation, footer, product selector, cards, badge panel, and community-call panel only where reuse is real.
- Use a central base-path helper. Verify both local serving and `/powerplatform-samples/` subpath builds, direct detail-page loads, canonical URLs, and image paths.
- Add meaningful titles/descriptions, social-preview metadata using supplied branding, favicon, sitemap, robots guidance, and a useful 404.
- Default to light mode like the reference, persist an explicit light/dark preference, and initialize the theme before paint. Make the control accessible and keep navigation working when storage is unavailable.

## 6. Sample-view image tracking

Use the existing visitor-statistics service and repository namespace. Do not introduce a new analytics provider.

**README contract:** keep one tracker as the final nonblank line of each sample README. For a folder named `example-sample`, the expected URL is:

```text
https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/samples/example-sample
```

**Gallery contract:**

- Emit exactly one noninteractive, decorative 1-by-1 tracking image per production page.
- Home uses `https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/`.
- Sample details use the exact sample URL above, so repository README and website views use the same sample key.
- Other pages use their site-relative route, for example `https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/contributing`.
- Remove the website base path before forming the tracker route. Exclude query parameters and fragments so filtering does not create new sample-view identifiers.
- Strip the existing tracker from rendered README HTML before inserting the page-level image. Do not strip or rewrite the actual source README.
- Do not track sample views from cards, thumbnail loads, filter changes, or the build process.
- Suppress outgoing tracking during local development and intercept requests in browser tests to avoid polluting production counts. Test production markup and expected request URLs without sending live visitor events.
- Validate URLs and tracker counts semantically, accepting harmless attribute/whitespace differences already present in the repository.

## 7. Ordered implementation checklist

### Phase 0 - review and approval

- [x] Inspect repository structure, guidance, metadata, trackers, asset inventory, reference source, and published reference design.
- [x] Record findings, visual direction, page structure, data strategy, and acceptance criteria in this plan.
- [x] Approve or revise the proposed design, Astro foundation, initial catalog scope, and content-repair scope before any implementation.

### Phase 1 - sample-content readiness

Depends on Phase 0 approval.

- [x] Repair the malformed Modern Canvas Template JSON.
- [x] Complete or migrate metadata for the four identified folders using verified existing content.
- [x] Correct Prompt Library and Prompt Wagon thumbnail references and audit remaining migrated source/media links.
- [x] Validate the full catalog, optional download-link derivation, date normalization, required author data, and readable local images.
- [x] Define and test product/category aliases; preserve source metadata semantics and attribution.
- [x] Confirm every folder is accounted for and document any owner decisions still needed.

### Phase 2 - site foundation and branding

Depends on Phase 0 approval. Can proceed alongside Phase 1 once the metadata contract is agreed.

- [x] Scaffold `site/`, stable dependencies, lockfile, TypeScript, scripts, and generated-output ignores.
- [x] Implement shared layout, base-path handling, navigation/mobile menu, footer, and accessible theme persistence.
- [x] Create theme-aware design tokens and the Power Platform product-color strip.
- [x] Wire supplied platform/product logos and optimize the selected portraits, ribbons, meshes, and contributor badge.
- [x] Build the compact human-led hero and ensure artwork stays legible in both themes.

### Phase 3 - catalog generation and sample discovery

Depends on validated Phase 1 content and the Phase 2 foundation.

- [x] Implement deterministic catalog/preview generation with explicit failures and coverage reporting.
- [x] Build product selectors, sample cards, search, category/contributor filters, sorting, URL state, result counts, and reset/empty states.
- [x] Implement static detail pages with sanitized README rendering, resolved links, screenshots, authors, and verified download/source actions.
- [x] Add single-count route tracking and preserve the existing README tracker contract.
- [x] Verify no-JavaScript baseline navigation and all direct/base-path routes.

### Phase 4 - guidance, contributors, and community

Depends on the shared foundation; contributor/update counts also depend on the generated catalog.

- [x] Build Getting started with Power Platform-specific prerequisites and sample-led import/source instructions.
- [x] Build Contributing with the existing contribution workflow, metadata/screenshot/tracker contract, CLA, and validation guidance. Surface the contributor-badge callout directly below its hero, with a link to the contribution steps.
- [x] Build Contributors with metadata-derived identities/counts and the supplied contributor badge.
- [x] Build What's new from real catalog dates.
- [x] Build Community with call schedule/invites, presenting a demo, recognition, and community-home links.
- [x] Place portraits 002-005 on their assigned pages and connect shared call/badge invitations.
- [x] Add metadata, social previews, sitemap/robots behavior, and the branded 404.

### Phase 5 - repository guidance and local handoff

Depends on verified site behavior and the commands actually implemented.

- [x] Update the [root README](./README.md) with the gallery's purpose, local setup, community calls, contributor badge, and actual validation commands. Do not advertise an unlaunched replacement as already live.
- [x] Update [CONTRIBUTING](./CONTRIBUTING.md) and [sample templates](./templates/sample-template/) only where needed to explain discovery metadata, images, aliases, tracking, and preview validation.
- [x] Update the [metadata schema](./templates/metadata-schema.json) compatibly for requirements actually consumed by the gallery.
- [x] Add a concise site development guide with Node.js requirements, generation/build/preview commands, asset ownership, tracking behavior, and troubleshooting.
- [x] Document the distinction between the new local catalog and the existing cross-repository publishing pipeline.

### Phase 6 - validation and local review

Depends on the relevant implementation phases; use focused checks during development, then run the combined acceptance pass.

- [x] Unit-test normalization, date parsing, aliases, thumbnail selection, path safety, missing optional download URLs, author aggregation, Markdown links/sanitization, and tracker deduplication.
- [x] Run the planned commands from `site/`: `npm run validate:readme-trackers`, `npm test`, `npm run check`, and `npm run build`. Record actual commands and results in the handoff.
- [x] Run `npm run test:e2e` for product/facet combinations, URL restoration/back-forward navigation, sorting, clear/no-results states, detail/download/source links, mobile navigation, and theme persistence.
- [x] Test exact production tracking URLs and exactly one tracker per page, with network interception.
- [x] Check desktop and mobile pages in both themes, including 375 px, 768 px, and 1440 px viewports. Require no horizontal page overflow at 320 px.
- [x] Require zero serious/critical automated accessibility findings on all key page types in both themes; manually inspect keyboard order, visible focus, navigation, labels, and contrast.
- [x] Honor reduced-motion preferences and avoid decorative movement that interferes with reading or filtering.
- [x] Verify every published sample preview resolves and no internal page/image links are broken; verify important external calls, recognition, source, and download destinations.
- [x] Measure image/network payloads: serve optimized derivatives, never the original 2048 px badge for a small panel, and keep non-hero portraits and alternate-theme meshes out of the initial home-page request set.
- [x] Inspect browser console/runtime failures, verify the production build under its repository subpath, and provide desktop/mobile light/dark screenshots for review.
- [x] Start the local preview only when requested/approved for the implementation handoff, verify it responds, and provide its actual URL.

### Publication work (approved 2026-10-22)

Implemented after approval; deployment success is verified by the workflow's live revision/catalog/route checks.

- [x] Retain and refresh external-only samples without deciding to archive the source repositories.
- [x] Map existing product, getting-started, contribution, and sample URLs to the replacement; retain compatible catalog exports.
- [x] Replace the failing metadata branch-writer with a single scheduled Actions publisher while retaining historical branches.
- [x] Add read-only PR validation and a separately gated Pages deployment.
- [x] Configure publication only from approved `main` changes and automatic verification of the deployed revision, routes, assets, and catalogs.

## 8. Definition of done for the first local version

- A reproducible local, production-buildable Power Platform sample gallery with the agreed key pages, not a mockup populated with invented samples.
- Unmistakable platform branding, all supplied key product logos, all five portraits placed deliberately, StandardPath/GradientMesh artwork used tastefully, and the contributor badge explicitly recognized.
- Every existing sample folder accounted for; accurate generated sample, product, result, and contributor counts.
- Working product-led discovery, composable filters, direct-linkable URLs, readable detail documentation, and valid source/download links.
- Accessible light/dark experiences and responsive desktop/mobile layouts.
- Correct, single-count production image tracking without counting builds, cards, filters, or local browser testing as sample views.
- Updated contribution/local-development guidance and recorded validation evidence.
- Existing sample functionality, supplied originals, attribution, and the current live publishing system remain intact.
- Local review completed before deployment or any replacement of the published gallery.

## 9. Approved decisions

1. **Architecture:** Astro static site in `site/`, with TypeScript and lightweight progressive enhancement.
2. **Visual direction:** human-led teal Power Platform identity, product-color accents, supplied ribbons/meshes, and light mode by default with persistent dark mode.
3. **Local catalog:** repository-local samples first; legacy external-only samples and publishing migration remain a separate decision.
4. **Content readiness:** include narrow repairs for the identified metadata/media blockers rather than silently omitting those samples.
5. **Scope:** all key pages above, including a dedicated Community page; no backend, authentication, new analytics service, or deployment in the initial local build.

**The gallery and publication automation are implemented. Repository archival remains a separate maintainer decision; see the assessment before changing archive settings.**

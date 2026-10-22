# Legacy Power Platform sample repositories: activity and archive readiness

**Assessment date:** 2026-10-22. **Decision owner:** repository maintainers. **No archive settings were changed during this assessment.**

## Recommendation

- **Power Apps and Power Automate: do not archive yet without a deliberate backlog/migration handoff.** Both retain substantial source collections, unresolved contribution PRs, and open support issues.
- **Power Fx: a conditional archive candidate, not ready for an unattended switch.** Recent activity is maintenance rather than new examples, but its formula collection is not physically migrated here, two PRs remain open, and one issue remains unresolved.
- **Power Virtual Agents: already archived.** Its migration/deprecation PRs merged in July 2025, its remaining sample has a counterpart here, and it has no open PRs or issues. There is no additional archive action to take.

Archiving preserves public source, releases, issues, and existing links but prevents normal contribution and issue activity. It is not the same as deleting a repository or proving that migration is complete.

## Method and limits

This assessment checked GitHub repository/default-branch metadata, open PRs and issues separately, recent merged PRs, default-branch commit history, physical sample folders, and published metadata feeds.

- **Recent window:** 2026-07-24 through 2026-10-22 (90 days). A second window covers the preceding 12 months.
- GitHub's repository `open_issues_count` includes pull requests; the table below uses separate issue and PR queries.
- `updated_at` and `pushed_at` are not proof of a new sample contribution. The recent merges were inspected to distinguish tracking/documentation maintenance from sample work.
- Folder-name overlap is only a migration indicator. Renames, deprecated stubs, differing packages, source parity, permissions, and README completeness need individual verification before a sample is declared migrated.
- Metadata entry counts are not physical sample counts. Power Fx exposes many formula examples per folder. The Power Apps feed also includes six non-sample export artifacts.
- This is a public-source/static assessment, not a fresh tenant import or runtime certification of every legacy solution.

## Activity and backlog summary

| Repository | Current state | PRs created / merged in 90 days | Merged PRs in 12 months | Open PRs | Open issues | Physical sample folders | Metadata entries (raw / valid sample records) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [pnp/powerfx-samples](https://github.com/pnp/powerfx-samples) | Not archived | 1 / 1 | 1 | 2 | 1 | 9 | 61 / 61 |
| [pnp/powerapps-samples](https://github.com/pnp/powerapps-samples) | Not archived | 1 / 1 | 1 | 6 | 33 | 53 | 41 / 35 |
| [pnp/powerautomate-samples](https://github.com/pnp/powerautomate-samples) | Not archived | 1 / 1 | 4 | 9 | 5 | 28 | 19 / 19 |
| [pnp/powerva-samples](https://github.com/pnp/powerva-samples) | **Already archived** | 0 / 0 | 0 | 0 | 0 | 1 | 0 / 0 |

The three recent PRs were opened and merged by a maintainer for visitor tracking and contribution/community guidance. **No new community sample additions were found in the 90-day merged-PR window.** That does not mean that existing content or unresolved contributions can be discarded.

### Power Fx

- Latest default-branch change: **2026-09-28**, [pnp/powerfx-samples#21](https://github.com/pnp/powerfx-samples/pull/21), updating sample tracking, contribution guidance, and community links.
- Open contributions:
  - [pnp/powerfx-samples#20](https://github.com/pnp/powerfx-samples/pull/20): Added KPI Sample; opened 2023-04-03.
  - [pnp/powerfx-samples#19](https://github.com/pnp/powerfx-samples/pull/19): Power Fx tagging; opened 2023-01-09.
- Open issue: [pnp/powerfx-samples#18](https://github.com/pnp/powerfx-samples/issues/18), geolocation heading behavior.
- Its nine folders cover collision detection, color, base conversion, dates, finance, geolocation, lists, regex, and tables. None has an exact folder-name counterpart in this repository.
- The 61 valid metadata records reference 56 distinct source URLs; some separately named formula examples intentionally share a documentation page. URL-only deduplication would lose entries.

**Archive prerequisite:** decide whether this stays an explicitly read-only formula reference or whether the examples will be migrated. Resolve/retarget the two PRs, preserve the formula index and attribution, and route future questions/contributions before archiving.

The current gallery expects one metadata record per sample folder. A formula-rich collection with many entries per folder needs an explicit mapping/index strategy, not an unreviewed copy of its federated metadata.

### Power Apps

- Latest default-branch change: **2026-09-28**, [pnp/powerapps-samples#295](https://github.com/pnp/powerapps-samples/pull/295), visitor tracking and guidance maintenance.
- Earlier migration activity includes [pnp/powerapps-samples#289](https://github.com/pnp/powerapps-samples/pull/289), [pnp/powerapps-samples#290](https://github.com/pnp/powerapps-samples/pull/290), and [pnp/powerapps-samples#291](https://github.com/pnp/powerapps-samples/pull/291), merged in August 2025. Those are outside the latest 12-month window.
- Open PRs requiring disposition:
  - [pnp/powerapps-samples#282](https://github.com/pnp/powerapps-samples/pull/282): lowercase folder renames.
  - [pnp/powerapps-samples#241](https://github.com/pnp/powerapps-samples/pull/241): Power365CRM.
  - [pnp/powerapps-samples#235](https://github.com/pnp/powerapps-samples/pull/235): OpenAI GPT Quiz App.
  - [pnp/powerapps-samples#233](https://github.com/pnp/powerapps-samples/pull/233): OpenAI custom connector tutorial.
  - [pnp/powerapps-samples#232](https://github.com/pnp/powerapps-samples/pull/232): SharePoint mytools.
  - [pnp/powerapps-samples#193](https://github.com/pnp/powerapps-samples/pull/193): Health Expense sample.
- Some contributions overlap the central backlog, notably [#78](https://github.com/pnp/powerplatform-samples/pull/78), [#82](https://github.com/pnp/powerplatform-samples/pull/82), and [#65](https://github.com/pnp/powerplatform-samples/pull/65). Retarget or consolidate them; do not count both PRs as two migrated samples.
- Exact folder matches here are accessibility-color-contrast-checker, app-login, calendar-component, and cascading-dropdown-component. Obvious rename candidates include ChuckNorrisIO/chucknorrisio, ClockTimePickerComponent/clock-time-picker-component, and bodypartgallery/bodypart-gallery. These name comparisons are not a package/source equivalence proof.
- Examples of outstanding support obligations include [pnp/powerapps-samples#265](https://github.com/pnp/powerapps-samples/issues/265) (import permissions, updated January 2026), [pnp/powerapps-samples#294](https://github.com/pnp/powerapps-samples/issues/294), and [pnp/powerapps-samples#287](https://github.com/pnp/powerapps-samples/issues/287) (broken download).

**Archive prerequisite:** inventory all 53 folders independently of the incomplete metadata feed; validate migration aliases, packages, source, screenshots, attribution, and setup; give the six PR authors a clear destination; and decide how the 33 open issues will be handled.

### Power Automate

- Latest default-branch change: **2026-09-28**, [pnp/powerautomate-samples#76](https://github.com/pnp/powerautomate-samples/pull/76), visitor tracking and guidance maintenance.
- The other three merged PRs within 12 months are migrations: [pnp/powerautomate-samples#72](https://github.com/pnp/powerautomate-samples/pull/72), [pnp/powerautomate-samples#73](https://github.com/pnp/powerautomate-samples/pull/73), and [pnp/powerautomate-samples#74](https://github.com/pnp/powerautomate-samples/pull/74), merged in January 2026.
- **Two migration pairs are not complete in the destination:** central [#170](https://github.com/pnp/powerplatform-samples/pull/170) and [#171](https://github.com/pnp/powerplatform-samples/pull/171) are still open. Review found authorization/setup concerns in the former and unresolved hardcoded tenant configuration in the latter. A merged migration PR in the source repository is not proof that its destination PR was merged.
- Exact folder matches here are always-reply-to-request and create-folder-with-link-back-to-list. Twenty-six folders lack an exact-name counterpart; treat this as a review queue, not a definitive missing-sample count.
- Open PRs: [pnp/powerautomate-samples#71](https://github.com/pnp/powerautomate-samples/pull/71), [pnp/powerautomate-samples#61](https://github.com/pnp/powerautomate-samples/pull/61), [pnp/powerautomate-samples#58](https://github.com/pnp/powerautomate-samples/pull/58), [pnp/powerautomate-samples#52](https://github.com/pnp/powerautomate-samples/pull/52), [pnp/powerautomate-samples#50](https://github.com/pnp/powerautomate-samples/pull/50), [pnp/powerautomate-samples#48](https://github.com/pnp/powerautomate-samples/pull/48), [pnp/powerautomate-samples#47](https://github.com/pnp/powerautomate-samples/pull/47), [pnp/powerautomate-samples#46](https://github.com/pnp/powerautomate-samples/pull/46), and [pnp/powerautomate-samples#29](https://github.com/pnp/powerautomate-samples/pull/29).
- Open issues include [pnp/powerautomate-samples#75](https://github.com/pnp/powerautomate-samples/issues/75), updated February 2026, and several missing-package/naming questions.

**Archive prerequisite:** finish the incomplete migration pairs, reconcile all 28 folders against the 19-entry feed, verify reusable/import-configurable unmanaged solutions, and route the nine pending contributions and five issues.

### Power Virtual Agents

- GitHub already reports `archived: true`.
- [pnp/powerva-samples#4](https://github.com/pnp/powerva-samples/pull/4) migrated the sample and [pnp/powerva-samples#5](https://github.com/pnp/powerva-samples/pull/5) added the deprecation note; both merged on **2025-07-12**.
- The remaining sharepoint-site-creation-bot folder has a counterpart in this repository. The legacy metadata feed is an empty array.
- No open PRs or issues, and no PR activity in the assessed recent windows.

**Recommendation:** leave it archived, preserve its links and deprecation notice, and direct new agent contributions to this repository under Copilot Studio.

## Catalog quality and publishing implications

The previous live federated export had **138 entries**, including **six non-sample items**: an application manifest, a version string, and four image-data objects. Those same artifacts are also present in the Power Apps feed. Several genuine sample records reuse identifiers, and some formula records share source URLs.

The new publisher therefore:

1. Retains the previous catalog snapshot instead of assuming that current feeds cover every older example.
2. Refreshes all four legacy feeds during publication, without adding a network requirement to normal local builds.
3. Preserves identity using **metadata name plus source URL**, not either field alone.
4. Reports recognized non-sample artifacts explicitly and retains the original snapshot; unexpected malformed records fail the build.
5. Keeps a compatible `samples.json` export, a legacy collection page, and redirects for earlier gallery navigation.

These protections make a future archive decision safer, but they do not migrate editable source or resolve outstanding contributions.

## Suggested decision sequence

1. Agree whether each legacy repository will be a migrated collection or an explicitly read-only historical reference.
2. Produce a sample-by-sample migration manifest, including aliases, exact source/package locations, attribution, license, screenshots, compatibility, and deprecation status.
3. Resolve, migrate, or explicitly close each open PR with a contributor-facing explanation. Do not silently abandon the 17 open legacy PRs.
4. Route the 39 open legacy issues and update README, contribution, issue-template, and community links.
5. Verify that old gallery URLs and raw sample/download links still work, and that automation does not require writes to a repository about to be archived.
6. Announce the destination and archive only after the owner approves the plan. Keep the public source and historical gallery references available.

## Reproducible evidence

Useful GitHub queries (read-only):

```shell
gh repo view pnp/powerapps-samples --json isArchived,defaultBranchRef,pushedAt,updatedAt
gh pr list --repo pnp/powerapps-samples --state open --limit 100
gh issue list --repo pnp/powerapps-samples --state open --limit 100
gh api --method GET search/issues -f "q=repo:pnp/powerapps-samples is:pr created:>=2026-07-24"
gh api --method GET search/issues -f "q=repo:pnp/powerapps-samples is:pr is:merged merged:>=2026-07-24"
gh api repos/pnp/powerapps-samples/contents/samples
gh api repos/pnp/powerapps-samples/contents/.metadata/samples.json
```

Repeat for each repository. The activity and backlog numbers above are a point-in-time snapshot, not an ongoing synchronization guarantee.

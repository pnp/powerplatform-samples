# Pack update validation — 2026-10-12

## Local reference checks

Run `python3 -m unittest discover -s tests -v` from the sample directory. Exact output is in `local-tests.txt`. All 22 checks passed. These checks model catalogue/filter/storage and pack behavior in Python and inspect exported source; they do not execute Power Fx. Boundary fixtures cover 0, 0.599999, 0.60, 0.849999, 0.85, 0.969999, 0.97 and 0.999999. They also check uniform pool reachability, duplicates, repeated awards and preservation of awarded IDs across a simulated interrupted reveal.

## Real Power Apps tests

Executed in Studio Preview and the published private player in Microsoft Edge on macOS. The same existing app/environment was updated. The final published production formula uses Rand/RandBetween; deterministic fixture substitutions were restored before final save, publish and export.

| Test | Actual observation |
| --- | --- |
| Studio natural random pack | Coral Compass, Lantern Fox, Lantern Fox; New, New, Already owned; 2/12 |
| Studio lower boundary fixture: 0, .60, .85 | Common MF-001, Uncommon MF-005, Rare MF-008; all New; 3/12 |
| Studio upper boundary fixture: .599999, .849999, .969999 | Same three rarities/cards; all Already owned; still 3/12 |
| Studio Legendary fixture: .97, .999999, .85 | MF-011 New, MF-011 Already owned, MF-008 Already owned; 4/12 |
| Studio repeated open/reveal clicks | One active pack; next-pack button disabled until all reveals; repeated reveal counted once |
| Studio storage failure | Explicit NOT SAVED / Session only warning and Retry saving action appeared; session remained usable |
| Published final bulk-award formula, double-click Open | One pack, 0/3 revealed, 3/12 collected; next pack disabled; Saved on this device before reveal |
| Navigate away before reveal | Binder Owned filter contained exactly Moss Courier, Aurora Stag, Tidekeeper; return retained 0/3 reveal state |
| Double-click reveal then reload | Only 1/3 revealed; reload retained the exact same three owned IDs and 25% completion |
| Reopen pack screen after reload | Fresh Open free pack state; no extra award or restoration of transient reveal state |
| Next published random pack | Coral Compass New, Lantern Fox New, Moss Courier Already owned; 5/12; save confirmed |
| Acquisition navigation | Binder Open packs and detail Open free packs reach pack screen; no manual add/remove actions |
| Reset cancel | Keep collection retained 5/12 |
| Reset confirm | 0/12; active pack cleared; pack screen offered Open free pack |
| Reload after reset | 0/12 persisted; Saved on this device; collection left empty |

The deterministic Studio tests preceded a refactor from per-ID mutation to a single distinct-ID bulk award. The final bulk formula was separately exercised in the published-player rows. Rarity selection and New-status snapshot formulas were unchanged. No temporary deterministic rolls remain in the delivered source.

Original manual-binder/filter/full-completion test evidence is retained separately in `validation-manual-baseline.md`; its manual acquisition actions describe the historical baseline, not the current UI. Full completion was not repeated through random packs.

## Export and checker

Final Studio-downloaded app: ParserErrorCount 0, BindingErrorCount 0; zero accessibility warnings; one intentional `app-CollectingReadOnlyTable` advisory for the twelve-row static catalogue. The saved export SARIF is `app-checker.sarif`. Pack gallery has an explicit keyboard tab stop and visible focus border; decorative elements have no actions. The earlier ForAll mutation advisory is absent after bulk-award refactoring. Full screen-reader conformance is not claimed.

`binder.jpeg`, `packs.jpeg` and `details.jpeg` are real final published-player screenshots. Only the browser/tenant header and outer margins were cropped; no mockups or retouching.

The updated app was edited, saved and privately published in place. The original candidate `.msapp` import is historical. On 2026-10-18, the unchanged final solution was imported into a newly created, approved Developer environment in a separate tenant. Microsoft solution history recorded Import / New / Success for version 1.0.0.3 and Overwrite customizations: No. No existing app was overwritten. `solution-validation.txt` records export/unpack/repack and parity results; the new import and player checks are below.

## Remaining limits

Clean-target solution import passed. Public release and the proposed author credit are subject to submitter approval. No mobile, Teams, other-browser, concurrent-tab, full screen-reader or production test is claimed. Save-failure UI was exercised in Preview; recovery after an actual browser storage outage was not simulated. No automated Test Studio suite is claimed. The client RNG is not certified; local reference tests are not empirical proof of long-run odds.

## Clean-target import and runtime — 2026-10-18 UTC

The approved temporary target reached Ready with Dataverse enabled. The maker portal imported `MoonfieldArchive_1_0_0_3.zip` without connection setup, role changes, or additional credentials. The imported app opened directly through Apps > Play. The test used the exported production formulas, with no fixture substitutions or app edits.

Package SHA256: `185d4201037c378825ad89668c85854731b3d0eceb250e9d30b65e10e5b0848e`.

| Check | Actual result |
| --- | --- |
| Solution import | Version 1.0.0.3, Import / New / Success; no error code; Overwrite customizations No |
| Initial observation | 2/12 already saved (Pebble Dreamer and Coral Compass). Origin of that local state was not established; pristine first-launch empty state is not claimed. Approved reset established the test baseline. |
| Reset cancellation and baseline | Keep collection retained 2/12; confirmed reset showed 0/12 |
| Double-click pack opening | One active pack, 0/3 revealed, 2/12 collected, next-pack disabled, Saved on this device |
| Double-click first reveal | Only 1/3 revealed; Lantern Fox New; completion stayed 2/12 |
| Mid-reveal navigation | Owned filter showed exactly Lantern Fox and Pebble Dreamer; returning retained 1/3 reveal state |
| Second reveal and reload | Pebble Dreamer New; reload at 2/3 retained both owned cards and 17% completion; transient pack cleared |
| Second natural pack | Rainbell Finch New, Rainbell Finch Already owned, Lantern Fox Already owned; 3/12 throughout reveals; next-pack enabled at 3/3 |
| Details/navigation | Lantern Fox illustration, Common/Emberwood and lore displayed; Open free packs returned to existing completed pack |
| Combined filters | Owned + Lantern search returned one card; adding Rare showed explicit empty-state text; Missing + Rare with search cleared returned Velvet Comet, Aurora Stag, Tidekeeper |
| Final reset/reload | Confirmed reset and reload retained 0/12 and Saved on this device; pack screen returned to Open free pack with no items |

A real full-page screenshot of the imported second pack was captured and visually inspected; private tenant branding is retained only in private evidence. The sample's existing three screenshots remain the previously captured app-only images. No new Studio editing/checker run, deterministic boundary test, full-completion run, mobile or screen-reader test was performed in this target. The original 22 local checks and earlier Studio boundary tests remain distinct evidence.

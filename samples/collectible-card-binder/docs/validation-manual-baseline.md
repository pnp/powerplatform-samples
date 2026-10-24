> Historical 1.0.0.2 manual-binder evidence only. Current pack-version results and files are described in validation.md. Manual add/remove controls no longer exist.

# Validation — 2026-10-12

## Local reference tests

Command: `python3 -m unittest discover -s tests -v`. Eleven tests pass; exact output is in `local-tests.txt`. They check catalogue IDs, rarity distribution, SVG validity and embedding, storage size, empty/full reference states, combined filters, no-match handling and source error handling. An exact catalogue/source parity assertion prevents JSON and embedded Power Fx records from drifting. The Python filter model does not execute Power Fx. The same full-completion scenario was also exercised independently in the real player below.

## Actual Studio and player tests

Tested in Microsoft Edge on macOS, in the owner's existing private developer environment. No new CLI sign-in or software installation was used.

| Test | Actual observation |
| --- | --- |
| Import candidate `.msapp` into Studio | Passed after correcting two unsupported Classic/Button AccessibleLabel properties |
| Final Studio export integrity | ParserErrorCount 0; BindingErrorCount 0 |
| Catalogue | Twelve original cards loaded, with labels and artwork |
| Own first card | 1/12 and 8% displayed |
| Reload published player | First card remained owned; device storage confirmed |
| Rare filter | Velvet Comet, Aurora Stag and Tidekeeper returned |
| Own second card | 2/12 and 17% displayed |
| Combined Owned + Rare + `  emberwood  ` | Only Aurora Stag returned |
| No matching search | Explicit empty state appeared |
| Details | Aurora Stag and Lantern Fox names, artwork and lore matched catalogue |
| Reset cancel | Tab/Return activated Keep collection; 2/12 remained |
| Reset confirm | 0/12; Owned filter showed empty state |
| Reload after reset | 0/12 persisted; default filters restored |
| Storage-unavailable fallback in Studio Preview | Warning appeared; session collection still worked |
| Detail ownership add/remove | Ownership text changed in both directions; return to binder showed 0/12 |
| Missing + Legendary | Exactly Sunseed Phoenix and The Last Observatory returned |
| Own every missing card | All twelve transitions passed; 12/12 and 100%, Missing empty state |
| Reload full collection | 12/12 and 100% persisted; reset afterward |
| Final frame refinement | Published player showed common, uncommon and rare border colors |

Static screenshots were captured from the actual published Power Apps player after the visual frame refinement (the later accessibility edits preserve this appearance). Only browser/tenant header pixels were cropped; no generated screen mockups or retouching were used.

## App Checker warnings

Final Studio export: ParserErrorCount **0**, BindingErrorCount **0**, accessibility warnings **0**, performance advisories **1**. The original 40 warnings were reviewed by category:

| Category | Before | Final | Resolution |
| --- | ---: | ---: | --- |
| acc-TabIndexShouldBeDefinedForInteractiveControl | 20 | 0 | Empty OnSelect actions on decorative labels, artwork and shapes. CardFrame is disabled and uses its default TabIndex; it cannot receive keyboard focus while disabled. |
| acc-FocusBorderShouldBeVisible | 15 | 0 | Removed misleading actions from static labels; actionable inputs also received explicit gold focus borders. |
| acc-AccessibleLabelNeeded | 3 | 0 | Progress shapes and reset shade are noninteractive decorations; the live completion text conveys progress. |
| app-CountRowsGalleryAllItems | 1 | 0 | Empty state uses the same underlying Filter as the gallery, with IsEmpty, and is hidden during confirmation. |
| app-CollectingReadOnlyTable | 1 | 1 | Intentional one-time twelve-row catalogue collection; no network or delegation cost. Retained as a documented small-sample tradeoff. |

The SARIF from the final Studio export is included as `app-checker.sarif`. Screen-reader conformance is not claimed. After the edits, real-player regression checks confirmed card rendering, own/remove from details, correct lore, empty state, reset overlay hiding the empty state, and Tab/Return cancellation. The collection was left reset to 0/12. Earlier full-collection/persistence tests remain documented above.

## Import/export boundaries

The candidate app was actually imported, opened, saved and run in Studio. The final file is Studio's downloaded `.msapp`. The unmanaged solution ZIP was exported successfully after the author's own Studio lock expired normally; no force unlock was used. Installed PAC 2.12.2 unpacked and repacked the solution successfully. Archive entries and embedded app bytes were checked. A separate suitable target was not approved, so no final solution import or clean-environment import is claimed. No existing app was overwritten through import.

Not tested: mobile player, Teams, Safari/Firefox, cross-user isolation, screen-reader traversal, production deployment. No automated Test Studio test suite is claimed.

## Packaging checks

All delivered ZIP-format files passed archive integrity checks. A scan of their expanded entries found none of the known author account, tenant, environment or app identifiers. Metadata required fields, top-level patterns, date formats and author syntax passed standard-library checks; full JSON Schema validation was not run because the validator was unavailable. The author placeholder remains deliberately unresolved. Exported YAML comment-line trailing whitespace was normalized without changing formulas.

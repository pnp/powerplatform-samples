# Architecture and authoring

The app has three screens: `BinderScreen` holds the catalogue, completion meter, filters and reset confirmation; `DetailScreen` displays `varCard`; `PackScreen` generates and reveals packs. `colCards` is a twelve-row in-memory collection initialized in `App.OnStart`. SVG strings become image data URIs with `EncodeUrl`. No remote artwork is fetched.

`colOwned` contains only stable `Id` values. `LoadData` and `SaveData` use `MoonfieldOwnedV1`; unknown IDs are discarded on load and progress counts distinct IDs. `IfError` exposes a storage warning and allows session-only use. The twelve IDs serialize to less than 1 KB. Browser/Teams SaveData has a 1 MB limit and browser storage is not suitable for secrets. This intentionally avoids tenant lists, premium connectors and per-user server provisioning. It does not provide cross-device sync, collaborative ownership, backup or confidential storage.

The gallery applies ownership, rarity and trimmed case-insensitive search together. Rarity appears as text as well as border color. The reset overlay hides background interactive controls. Buttons have meaningful text/tooltips, and artwork has accessible labels. Keyboard cancellation was exercised. Decorative controls have empty OnSelect actions and do not create spurious keyboard stops. The disabled card-frame button retains its default TabIndex 0, but DisplayMode.Disabled excludes it from interaction. Inputs have explicit gold focus borders. Zero accessibility checker warnings remain; this is not a WCAG conformance claim. Full screen-reader testing is still needed. The fixed tablet design scales down on smaller screens; it does not reflow for phones. The fade transition has no user-selectable reduced-motion setting.

## Pack state and award ordering

`GeneratePack.OnSelect` guards against busy state and an unfinished pack. It samples exactly three records with `Rand()` for rarity and `RandBetween(1, CountRows(choices))` for the uniform within-rarity choice. Cutoffs are 0.60, 0.85 and 0.97. `colPackDraws` records explicit slot numbers; the UI sorts by slot rather than relying on ForAll execution order.

Before mutating ownership, `colPack` snapshots each slot’s `IsNew`: its ID must be absent from the prior binder and all lower-numbered slots. One bulk `Collect` adds the distinct missing IDs. One `SaveData` call follows immediately, before any reveal. Reveal buttons only patch `Revealed`; they never mutate ownership or save again. Retry saving also does not award. This avoids ordering-sensitive collection mutation inside ForAll.

A busy flag plus unfinished-pack guard blocks repeat opening. Each reveal is idempotent. No counts, currency, purchase data, dates or limits are stored. Reset clears ownership and both pack collections, then saves the empty ownership table. The unchanged `MoonfieldOwnedV1` key and Id-only schema preserve existing data when updating the same app.

Pack reveal state is intentionally session-only. Navigating away and back retains it; a full reload starts with no active pack but loads all successfully saved awards. SaveData is device-local, not a server transaction: a storage failure leaves in-memory awards with a conspicuous warning and retry action. Concurrent app tabs are not coordinated; use one session to avoid last-writer-wins saves. Randomness is for a free fictional demonstration, not a certified or auditable reward service.

## Supported editing route and limits

The deliverable app was opened, corrected, saved, published privately and downloaded through actual Power Apps Studio. Use the final `.msapp` as the import/edit entry point. PAC 2.12.2 extracted `sourcecode/studio` with `canvas unpack --layout SourceCode` after the final Studio save. Microsoft describes generated YAML as review/minor-edit Preview source, and PAC canvas pack/unpack as deprecated. Do not promise arbitrary YAML round-tripping as a stable production build interface. Prefer Studio and supported Power Platform Git integration where available.

A local scaffold was initially packed with the installed PAC and then validated and normalized by Studio. Studio caught an unsupported Classic/Button property; this was fixed before the delivered export. Studio also exposed the percentage formatting and decorative frame display-mode issues, both corrected and verified in the real player. The delivered source is the final Studio export, not the initial scaffold.

Optional extraction command:

```sh
pac canvas unpack --msapp solution/MoonfieldArchive.msapp --sources extracted --layout SourceCode
```

Original asset regeneration (does not overwrite Studio source):

```sh
python3 sourcecode/generate.py
```

## References checked 2026-10-12

- [Canvas app YAML source](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/power-apps-yaml)
- [PAC canvas commands](https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/canvas)
- [SaveData and LoadData](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-savedata-loaddata)
- [PnP contribution guide](https://github.com/pnp/powerplatform-samples/blob/main/CONTRIBUTING.md)

Contribution template, metadata schema and PR template were rechecked against current upstream main on 2026-10-18 (unchanged commit). Related `dynamic-tag-gallery` and `responsive-canvas-template` samples were reviewed at repository commit `46cdaee574ba1a08c1eb4613709d75e544b2bb90`. No external dependencies were installed.

The one remaining App Checker advisory is `app-CollectingReadOnlyTable` at App.OnStart. The static catalogue is intentionally initialized once as a twelve-row collection so this small sample stays easy to inspect and extend in Studio. It has no network fetch, delegation, repeated reload or large-data cost. A named formula is a reasonable future refactor but not required for this sample. Empty-state visibility now evaluates the same source filter as the gallery, rather than counting virtualized Gallery.AllItems; it is hidden during reset confirmation.

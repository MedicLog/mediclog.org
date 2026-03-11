# mediclog.org — Claude Code Project Instructions

**Version:** 2026-03-09-v1

This is the mediclog.org static website — marketing site, agency tools, settings creator, documentation. It is a separate project from the MedicLog iOS/Android app.

## Related App Projects

| Project | Path | Language |
|---------|------|----------|
| MedicLog iOS + watchOS | `/Users/joel/git/MedicLog` | Swift/SwiftUI |
| MedicLog Android | `/Users/joel/git/MedicLog-Android` | Kotlin/Compose |

These projects have their own CLAUDE.md, agent pipeline (CODEWORK/Judge/Ninja), and TODO.md. If you need to verify the QR payload format matches the app's parser, read `/Users/joel/git/MedicLog/Shared/Sources/MedicLogShared/Services/ConfigImporter.swift`.

---

## Stack

- Pure HTML/CSS/JS — no build step, no bundler, no framework
- Hosted as static site (Cloudflare, based on `_headers` file)
- `nav-loader.js` populates the `<nav>` element on every page
- External dependency: `qrcode@1.5.3` CDN (settings-creator.html only)
- No backend, no auth, no database — everything runs client-side

---

## Workflow

This project uses a **lightweight workflow** — no agent pipeline, no worktrees, no CODEWORK/Judge/Ninja overhead. The site has no patient safety implications and no clinical logic.

**Standard approach:**
1. Read the relevant HTML/CSS/JS files before editing
2. Edit directly — no worktree needed
3. Test by opening the file in a browser (or noting what to check)
4. Commit with a clear message, push to origin

**When to stop and ask:**
- Any change that affects `nav-loader.js` (touches every page)
- Any change to `styles.css` global variables/layout (touches every page)
- Any change to the QR payload format in `settings-creator.html` (must stay in sync with MedicLog app's config parser)
- Any new page or major structural change

---

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Marketing homepage |
| `agency.html` | Agency Tools hub — links to all agency admin tools |
| `settings-creator.html` | Visual settings configurator + QR generator (~1400 lines, 70+ settings) |
| `presets.html` | Pre-built role configs (EMT, Paramedic, Supervisor) |
| `dispatch-setup.html` | CAD/dispatch integration guide |
| `protocol-finder.html` | iOS URL scheme / Android package lookup tool |
| `nav-loader.js` | Shared nav — loaded by every page |
| `styles.css` | Global styles and CSS variables |
| `screenshots/` | App screenshots (see README.md inside) |
| `assets/presets/*.mlconfig` | Static preset config files for presets.html QR codes (one per cert level) |

---

## Settings Creator — Architecture

`settings-creator.html` is the most complex file. Key internal structure:

- `SettingsRegistry.settings` — single source of truth for all 70+ settings (type, default, qrPath, which screens it applies to)
- `SettingsState` — holds current values, fires `onChange()` on every change
- `SettingsFilter` — filters settings list by active tab
- `PreviewRenderer` — renders the 7 live preview screens (Active Call, Vitals, Radio Report, Hospital Handoff, History, Export, Global)
- `generateQR()` — builds the payload JSON, splits to 2 QR codes if >5596 bytes

**QR payload format** must stay in sync with the MedicLog app's `ConfigImporter.swift`. The root structure is `{ type: 'quick_config', configVersion: 1, payload: { agency: {}, display: {}, vitals: {}, timers: [] } }`. Do not change field names or nesting without coordinating with the iOS/Android app.

---

## Context from MedicLog Project

- **T2085 (Agency Config Package):** The settings-creator IS the web side of T2085. The `.mlagency` format and profile templates are blocked on a planning decision — the settings taxonomy (global vs. profile-level vs. agency-lockable) and the profiles dimension (users have Work, First Responder, personal profiles) must be defined before the settings-creator can be restructured. See MedicLog `TODO.md` T2085 for full planning notes.
- **T95 (Screenshots):** Website screenshot mapping is tracked here. See `screenshots/README.md` for required filenames. The AT## series in `screenshots/android/` and `screenshots/ios-raw/` are the current source material.
- **QR format changes:** Any change to the QR payload structure must be coordinated with the iOS app's `ConfigImporter.swift` and Android equivalent. Never change unilaterally.
- **Presets page (.mlconfig):** `presets.html` QR codes point to `https://mediclog.org/assets/presets/<role>.mlconfig`. The app downloads and imports these as `.mlconfig` files — iOS handles the import natively, no URL scheme needed. `_headers` serves them as `application/octet-stream` with `Content-Disposition: attachment`. Do not change the hosting path without updating both the QR URLs and the `_headers` entries.

---

## TODO Reference

Tasks tracked in `TODO.md` in this repo. MedicLog app tasks are in `/Users/joel/git/MedicLog/TODO.md`.

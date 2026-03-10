# mediclog.org TODO List

**Workflow:** Edit → commit → push. No pipeline overhead for this project.

**Naming Convention:**
- **W#** = Web task (feature, fix, or content)
- **WB#** = Web bug

**Next IDs:** WB1, W10

---

## OPEN BUGS

*(none)*

---

## OPEN TASKS

### W1. SCREENSHOT MAPPING — ACTIVE CALL SERIES [LOW] [Content]
**Status:** IN PROGRESS
Map AT## source screenshots to required site filenames. Required filenames defined in `screenshots/README.md`. Source material in `screenshots/ios-raw/` (iOS) and `screenshots/android/` (labeled android but actually iOS). The `screenshots/framed/` folder has device-framed outputs.
**Known mismatches:** Site has `05-med-picker.png` but README expects `05-iv-paperdoll.png`; `07-timer-redose.png` vs `07-destinations.png` — audit all 01-16 series.
**Work:** Map AT## → required filename, copy/rename, verify site picks up. Drop correctly named files and site auto-uses them.

### W2. SETTINGS CREATOR — PERSISTENCE [LOW] [settings-creator.html]
**Status:** Ready to implement
Add `localStorage` save/restore so settings survive page reload. Settings reset on every reload currently — breaks the "sit at your desk and configure" workflow.
**Scope:** On every `SettingsState.onChange()`, serialize current state to `localStorage.setItem('mediclog-settings-creator', JSON.stringify(state))`. On page load, check for saved state and restore. Add "Reset to defaults" button.
**Estimate:** ~15-30 min

### W3. SETTINGS CREATOR — DRAG-AND-DROP FIELD REORDER [LOW] [settings-creator.html]
**Status:** Stubbed — HTML has `draggable="true"` and drag handles (⋮⋮) but no event handlers wired
Arrow buttons work as workaround. Proper drag-and-drop would make it feel finished.
**Scope:** Add `ondragstart`, `ondragover`, `ondrop` handlers to the vitals field order list. Up/down arrows can remain as fallback.
**Estimate:** ~30 min

### W4. SETTINGS CREATOR — DESTINATION EDITOR [MEDIUM] [settings-creator.html]
**Status:** Gap — destinations toggle exists but no way to add/edit hospital entries
Agency admin needs to configure the hospital list (name, address, optional lat/lon, contact). Without this, the tool can't produce a complete agency config.
**Scope:** Add a destinations editor section in the Active Call or Global tab. Each entry: hospital name (required), address (optional), maps-app-compatible coordinate or address string. Add/remove rows. Entries serialize into the QR payload as `payload.agency.destinations[]`.
**QR payload coordination:** Confirm field names match `ConfigImporter.swift` destinations array format before implementing.
**Estimate:** 1-2 hrs

### W5. SETTINGS CREATOR — INPUT VALIDATION [LOW] [settings-creator.html]
**Status:** Missing
No validation on number inputs (min/max not enforced in UI, only in registry metadata). No conflict detection (e.g., enabling features that require other features).
**Scope:** Wire min/max from `SettingsRegistry` to input validation. Add visible error state on out-of-range values. Block QR generation if any field is invalid.
**Estimate:** ~1 hr

### W6. SETTINGS CREATOR — PREVIEW FIDELITY [LOW] [settings-creator.html]
**Status:** Functional text-mockup — not pixel-accurate iOS UI
Preview updates live but uses simplified text representation. Agency admins looking at it won't get a realistic sense of the actual iOS UI.
**Scope:** Improve the Active Call and Vitals Entry preview screens to more closely match actual iOS layout (card styling, proper color use, timer pill styling). Full pixel-accuracy is out of scope — target "recognizably similar."
**Estimate:** 2-4 hrs depending on fidelity target

### W7. SETTINGS CREATOR — FORMULARY/MEDICATION EDITOR [HIGH] [settings-creator.html]
**Status:** Gap — medication timers exist but no drug formulary configuration
The formulary (approved medications, doses, routes) is core agency config. Currently only timer labels/durations are configurable.
**Scope:** ⚠️ BLOCKED on T2085 profile taxonomy planning. The formulary belongs at the profile level (Paramedic profile has different access than EMT profile), not the global agency level. Cannot properly implement until the profile/agency settings taxonomy is defined. See MedicLog TODO.md T2085 for planning notes.

### W8. SETTINGS CREATOR — .mlagency EXPORT FORMAT [HIGH] [settings-creator.html]
**Status:** ⚠️ BLOCKED on T2085 planning
The settings-creator currently exports `quick_config` QR format. The `.mlagency` package format (for T2085) includes profile templates and agency-level settings. Cannot implement until:
(a) Profile taxonomy defined (global vs. profile-level vs. agency-lockable)
(b) Profile templates scoped (Paramedic, EMT, First Responder role templates)
(c) Coordination with iOS/Android app on new file format and import flow
See MedicLog TODO.md T2085 for full planning notes.

### W9. PRESETS PAGE — VERIFY QR PAYLOAD CURRENT [LOW] [presets.html]
**Status:** Unknown — not audited since settings-creator was updated
The presets page has hardcoded QR payloads for EMT/Paramedic/Supervisor roles. These may be stale relative to the current `configVersion` and field structure in settings-creator.
**Scope:** Compare preset payloads against current SettingsRegistry defaults. Update any stale field names or missing fields.
**Estimate:** ~30 min

---

## PARKED / FUTURE

- **W20. AGENCY PORTAL AUTH** — If the settings-creator ever becomes a managed service (agencies save/share configs), needs auth. Currently static/no-backend by design. Parked until business model decision.
- **W21. SETTINGS CREATOR PROFILE TAB RESTRUCTURE** — Restructure tabs from screen-based (Active Call / Vitals / etc.) to role-based (Agency Defaults / Paramedic Profile / EMT Profile). Blocked on T2085 profile taxonomy planning.

---

## NOTES

*(none)*

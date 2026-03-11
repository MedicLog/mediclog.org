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

### W4. SETTINGS CREATOR — DESTINATION EDITOR [MEDIUM] [settings-creator.html]
**Status:** ⚠️ BLOCKED — destinations explicitly excluded from QR export
QuickConfigManager.swift comment: "Excludes: user identity, agency logo, destinations, formulary structure." Destinations are stored in per-profile JSON files (`<profileID>_destinations.json`), not in UserDefaults/QR payload.
**Path forward:** Destinations need a separate export mechanism — either a standalone `.mldestinations` JSON file, or bundled into the future `.mlagency` package (W8/T2085). Cannot add to the QR payload without iOS app changes.
**Blocked on:** T2085 or a separate destinations import feature in the iOS app.

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


---

## PARKED / FUTURE

- **W20. AGENCY PORTAL AUTH** — If the settings-creator ever becomes a managed service (agencies save/share configs), needs auth. Currently static/no-backend by design. Parked until business model decision.
- **W21. SETTINGS CREATOR PROFILE TAB RESTRUCTURE** — Restructure tabs from screen-based (Active Call / Vitals / etc.) to role-based (Agency Defaults / Paramedic Profile / EMT Profile). Blocked on T2085 profile taxonomy planning.

---

## NOTES

*(none)*

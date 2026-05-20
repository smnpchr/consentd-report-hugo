# Front-Matter-Konvention: consentd Md-Builder → Hugo

Schnittstelle zwischen dem consentd `Md`-Builder (Java) und dem Hugo-Theme.
Der Builder erzeugt Markdown-Dateien mit diesem Front Matter. Das Theme
nutzt ausschließlich die hier dokumentierten Felder für Navigation und
visuelle Darstellung. Alle fachlichen Details (Evaluation, Consent-Vergleich,
Regelbeschreibung) stehen im Markdown-Body.

## Verzeichnisstruktur

```
content/reports/
├── _index.md                  # Reports-Übersicht (statisch, nicht generiert)
└── 2026-05-19/                # Ein Sync-Lauf pro Tag
    ├── _index.md              # Tages-Summary
    ├── int-affirmed.md        # Detail pro Patient
    ├── int-declined.md
    └── ...
```

## Summary (`_index.md` pro Sync-Lauf)

```yaml
---
title: "19.05.2026"
date: 2026-05-19T18:30:00+02:00
weight: 20260519
bookCollapseSection: true
patient_count: 5
severity_info: 2
severity_warning: 2
severity_error: 1
severity_critical: 0
---
```

| Feld | Typ | Pflicht | Verwendet in |
|------|-----|---------|--------------|
| `title` | String | ja | Sidebar, Seitentitel |
| `date` | ISO 8601 | ja | Hugo-Sortierung |
| `weight` | Integer | ja | Sidebar-Reihenfolge (neueste zuerst) |
| `bookCollapseSection` | Boolean | ja | Sidebar-Collapse (Hugo Book) |
| `patient_count` | Integer | ja | `list.html` — Übersicht + Tages-Summary |
| `severity_info` | Integer | ja | `list.html` — Badge-Anzeige |
| `severity_warning` | Integer | ja | `list.html` — Badge-Anzeige |
| `severity_error` | Integer | ja | `list.html` — Badge-Anzeige |
| `severity_critical` | Integer | ja | `list.html` — Badge-Anzeige |

Body: Freitext-Zusammenfassung des Sync-Laufs.

## Detail (pro Patient)

```yaml
---
title: "INT-AFFIRMED"
date: 2026-05-19T18:30:01+02:00
severity: info
rule: NEW_AFFIRMED_THS
actions: [IMPORT, REPORT]
---
```

Bei fehlgeschlagener Action zusätzlich:

```yaml
failure_action: IMPORT
failure_reason: "LIMS REST API returned 503: Service Unavailable"
```

| Feld | Typ | Pflicht | Verwendet in |
|------|-----|---------|--------------|
| `title` | String | ja | Sidebar, Seitentitel |
| `date` | ISO 8601 | ja | Hugo-Sortierung |
| `severity` | String | ja | Sidebar-Dot, Banner, Badge (`info`/`warning`/`error`/`critical`) |
| `rule` | String | ja | Banner, Patienten-Tabelle |
| `actions` | Liste | ja | Patienten-Tabelle |
| `failure_action` | String | nein | Fehler-Banner (nur bei `critical`) |
| `failure_reason` | String | nein | Fehler-Banner (nur bei `critical`) |

Body: Vollständiger Markdown-Report (Regel, Evaluation, Consent-Tabelle, Aktionen).

## Severity-Mapping

| Severity | Farbe | Bedeutung |
|----------|-------|-----------|
| `info` | Blau | Normaler Import |
| `warning` | Orange | Auffälligkeit |
| `error` | Rot | Datenproblem |
| `critical` | Dunkelrot | Action fehlgeschlagen |

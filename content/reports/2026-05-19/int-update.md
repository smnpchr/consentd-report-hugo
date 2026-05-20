---
title: "INT-UPDATE"
date: 2026-05-19T18:30:04+02:00
severity: warning
rule: UPDATED_AFFIRMED_THS
actions: [IMPORT, REPORT]
---

## Regel

**UPDATED_AFFIRMED_THS** — Aktualisierter bestätigter Consent, LIMS veraltet

Neuerer THS-Consent ersetzt bestehenden LIMS-Import.

## Evaluation

| Dimension | THS | LIMS |
|-----------|-----|-----|
| Aggregiert | Bestätigt | Importiert |
| Gültigkeit | Gültig | Gültig |
| Aktualität | Neuer | Älter |
| Gleichheit | Ungleich | — |

## Consent-Vergleich

| Modul | THS | LIMS | Diff |
|-------|-----|-----|------|
| Gewinnung/Lagerung/Nutzung | ✅ accepted | ✅ accepted | = |
| Zusatzentnahme | ✅ accepted | ❌ declined | ≠ |
| Retrospektive Nutzung | ✅ accepted | ✅ accepted | = |
| Nicht-EU-Weitergabe | ❌ declined | ❌ declined | = |

**Gültigkeit THS**: 2026-03-01 → 2027-03-01 (gültig)

## Aktionen

Import (Update) + Bericht

---
title: "INT-IMPORT-FAIL"
date: 2026-05-19T18:30:05+02:00
severity: critical
rule: NEW_AFFIRMED_THS
actions: [IMPORT, REPORT]
failure_action: IMPORT
failure_reason: "LIMS REST API returned 503: Service Unavailable"
---

## Regel

**NEW_AFFIRMED_THS** — Neuer gültiger bestätigter Consent, LIMS leer

## Fehler

**IMPORT fehlgeschlagen**: LIMS REST API returned 503: Service Unavailable

Details siehe Log-Analyse.

## Evaluation

| Dimension | THS | LIMS |
|-----------|-----|-----|
| Aggregiert | Bestätigt | Leer |
| Gültigkeit | Gültig | — |
| Aktualität | Beliebig | — |
| Gleichheit | Beliebig | — |

## Consent-Vergleich

| Modul | THS | LIMS | Diff |
|-------|-----|-----|------|
| Gewinnung/Lagerung/Nutzung | ✅ accepted | — | ≠ |
| Zusatzentnahme | ✅ accepted | — | ≠ |
| Retrospektive Nutzung | ✅ accepted | — | ≠ |
| Nicht-EU-Weitergabe | ✅ accepted | — | ≠ |

**Gültigkeit THS**: 2026-04-19 → 2027-05-19 (gültig)

## Aktionen

Import + Bericht (Import fehlgeschlagen)

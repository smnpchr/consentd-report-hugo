---
title: "INT-AFFIRMED"
date: 2026-05-19T18:30:01+02:00
severity: info
rule: NEW_AFFIRMED_THS
actions: [IMPORT, REPORT]
---

## Regel

**NEW_AFFIRMED_THS** — Neuer gültiger bestätigter Consent, LIMS leer

Gültiger und bestätigter Consent vom THS wird in LIMS importiert.

## Evaluation

| Dimension | THS | LIMS |
|-----------|-----|-----|
| Aggregiert | Bestätigt | Leer |
| Gültigkeit | Gültig | — |
| Aktualität | — | — |
| Gleichheit | — | — |

## Consent-Vergleich

| Modul | THS | LIMS | Diff |
|-------|-----|-----|------|
| Gewinnung/Lagerung/Nutzung | ✅ accepted | — | ≠ |
| Zusatzentnahme | ✅ accepted | — | ≠ |
| Retrospektive Nutzung | ✅ accepted | — | ≠ |
| Nicht-EU-Weitergabe | ✅ accepted | — | ≠ |

**Gültigkeit THS**: 2026-04-19 → 2027-05-19 (gültig)

## Aktionen

Import + Bericht

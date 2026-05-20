---
title: "INT-DECLINED"
date: 2026-05-19T18:30:02+02:00
severity: warning
rule: DECLINED_THS_EXISTING_LIMS
actions: [INVALIDATE, REPORT]
---

## Regel

**DECLINED_THS_EXISTING_LIMS** — Abgelehnter THS-Consent, LIMS hat bestehenden Import

Patient hat Consent widerrufen. Bestehender LIMS-Eintrag wird invalidiert.

## Evaluation

| Dimension | THS | LIMS |
|-----------|-----|-----|
| Aggregiert | Abgelehnt | Importiert |
| Gültigkeit | Gültig | Gültig |
| Aktualität | Neuer | Älter |
| Gleichheit | — | — |

## Consent-Vergleich

| Modul | THS | LIMS | Diff |
|-------|-----|-----|------|
| Gewinnung/Lagerung/Nutzung | ❌ declined | ✅ accepted | ≠ |
| Zusatzentnahme | ❌ declined | ✅ accepted | ≠ |
| Retrospektive Nutzung | ❌ declined | ✅ accepted | ≠ |
| Nicht-EU-Weitergabe | ❌ declined | ✅ accepted | ≠ |

## Aktionen

Invalidierung + Bericht

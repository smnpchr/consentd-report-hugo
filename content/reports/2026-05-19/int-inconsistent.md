---
title: "INT-INCONSISTENT"
date: 2026-05-19T18:30:03+02:00
severity: error
rule: INCONSISTENT_THS
actions: [REPORT]
---

## Regel

**INCONSISTENT_THS** — Inkonsistenter THS-Consent

Die Consent-Module sind logisch widersprüchlich: Basis-Consent abgelehnt, aber Erweiterungsmodule bestätigt.

## Evaluation

| Dimension | THS | LIMS |
|-----------|-----|-----|
| Aggregiert | Inkonsistent | Leer |
| Gültigkeit | Gültig | — |
| Aktualität | — | — |
| Gleichheit | — | — |

## Consent-Vergleich

| Modul | THS | LIMS | Diff |
|-------|-----|-----|------|
| Gewinnung/Lagerung/Nutzung | ❌ declined | — | ≠ |
| Zusatzentnahme | ✅ accepted | — | ≠ |
| Retrospektive Nutzung | ✅ accepted | — | ≠ |
| Nicht-EU-Weitergabe | ❌ declined | — | ≠ |

**Inkonsistenz**: Zusatzentnahme und retrospektive Nutzung bestätigt, obwohl Basis-Consent abgelehnt.

## Aktionen

Nur Bericht (kein Import wegen Inkonsistenz)

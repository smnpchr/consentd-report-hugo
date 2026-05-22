# Frontmatter-Konvention — consentd-report-hugo

Diese Konvention definiert das Schema der YAML-Frontmatter, die von
`HugoBookGenerator` (consentd Java) erzeugt und vom Hugo-Book-Theme
gerendert werden.

## Designprinzipien

- **Alle strukturierten Daten leben im Frontmatter.** Der Markdown-Body
  ist minimal (ggf. nur ein H1) und nicht für Datentransport vorgesehen.
- **Feldnamen sind camelCase**, wie sie aus den Java-Record-Komponenten
  exportiert werden. Ausnahmen: Hugo-Built-in-Felder (`title`, `date`,
  `weight`) folgen Hugo-Konvention; das deckt sich aber mit camelCase.
- **Optionale Felder werden weggelassen** (nicht als `null` geschrieben).
  Ein fehlendes Feld bedeutet „nicht zutreffend" oder „kein Wert".
- **Enum-Werte werden als Strings ausgegeben**, in ihrer Java-Form
  (`INCONSISTENT`, `EMPTY`, `UNKNOWN`). Menschen-lesbare Labels werden
  vom Theme über i18n übersetzt.
- **Bewusste Doppelung auf Top-Level**: `severity`, `rule`, `actions`
  stehen sowohl als Top-Level-Felder als auch in den verschachtelten
  Sektionen. Top-Level dient als schneller Filter/Sortier-Schlüssel für
  Hugo-Range-Operationen.

## Zwei Dokumenttypen

### 1. Section Index — `_index.md`

Wird einmal pro Sync-Run geschrieben (pro `EvaluationStage`). Enthält
Aggregate über alle Patienten des Laufs.

```yaml
---
title: "20.05.2026"
date: 2026-05-20T17:07:43+02:00
weight: 20260520
bookCollapseSection: true
patientCount: 5
severityInfo: 1
severityWarning: 2
severityError: 1
severityCritical: 1
---
```

**Felder:**

| Feld | Typ | Quelle | Beschreibung |
|---|---|---|---|
| `title` | String | Collector | Vom `ActionCollector.init(title)` gesetzt |
| `date` | DateTime | Run-Time | ISO mit Offset |
| `weight` | int | Run-Time | `yyyyMMdd`, für Hugo-Sortierung |
| `bookCollapseSection` | boolean | konstant `true` | Hugo-Book-Theme-Konvention |
| `patientCount` | int | `entries.size()` | Anzahl ausgewerteter Patienten |
| `severityInfo`<br>`severityWarning`<br>`severityError`<br>`severityCritical` | long | Aggregate | Anzahl Entries pro Severity-Stufe |

### 2. Detail — `<patientId>.md`

Wird einmal pro Patient pro Sync-Run geschrieben. Enthält die vollständigen
strukturierten Daten der Auswertung.

```yaml
---
title: "INT-AFFIRMED-001"
date: 2026-05-20T17:07:43+02:00
severity: error
rule: THS_INCONSISTENT
actions: [REPORT]
ruleSpec:
  description: "Inkonsistenter THS-Consent"
  ths:
    aggregated: [INCONSISTENT]
  lims:
    aggregated: [ANY]
  recency: ANY
  equality: ANY
evaluation:
  ths:
    aggregated: INCONSISTENT
    validity: VALID
  lims:
    aggregated: EMPTY
    validity: NONE
  recency: THS
  equality: NOT_EQUAL
consent:
  ths:
    acquireUseStock: UNKNOWN
    additionalAcquisition: UNKNOWN
    retrospectiveUsage: NOT_PRESENT
    nonEuTransfer: UNKNOWN
    validFrom: 2026-04-13
    validUntil: 2031-04-13
    expired: false
  lims:
    acquireUseStock: EMPTY
    additionalAcquisition: EMPTY
    retrospectiveUsage: EMPTY
    nonEuTransfer: EMPTY
---
```

**Top-Level-Felder:**

| Feld | Typ | Quelle | Beschreibung |
|---|---|---|---|
| `title` | String | `entry.patientId()` | Patient-Identifier |
| `date` | DateTime | Run-Time | ISO mit Offset |
| `severity` | String (lowercase) | `entry.severity()` | `info`, `warning`, `error`, `critical` |
| `rule` | String | `entry.rule().getName()` | Name der getroffenen Regel |
| `actions` | List<String> | `entry.rule().getActions()` | Enum-Namen der Aktionen |

**Optional auf Top-Level (nur bei Action-Handler-Fehler):**

| Feld | Typ | Bedingung |
|---|---|---|
| `failureAction` | String | `entry.exception() != null` |
| `failureReason` | String | `entry.exception() != null` |

**`ruleSpec`** — Spezifikation der Regel (was geprüft wurde):

| Pfad | Typ | Beschreibung |
|---|---|---|
| `ruleSpec.description` | String | Optionale Beschreibung |
| `ruleSpec.ths.aggregated` | List<String> | Erwartete THS-Consent-Werte |
| `ruleSpec.ths.timeValidity` | String | Optional, nur wenn != `ANY` |
| `ruleSpec.lims.aggregated` | List<String> | Erwartete LIMS-Consent-Werte |
| `ruleSpec.lims.timeValidity` | String | Optional, nur wenn != `ANY` |
| `ruleSpec.recency` | String | Erwartete Aktualitäts-Bedingung |
| `ruleSpec.equality` | String | Erwartete Gleichheits-Bedingung |

**`evaluation`** — Ergebnis der Auswertung (was tatsächlich vorlag):

| Pfad | Typ | Beschreibung |
|---|---|---|
| `evaluation.ths.aggregated` | String | Aggregierter THS-Consent-Wert |
| `evaluation.ths.validity` | String | THS-Validity (`VALID`, `NONE`, etc.) |
| `evaluation.lims.aggregated` | String | Aggregierter LIMS-Consent-Wert |
| `evaluation.lims.validity` | String | LIMS-Validity |
| `evaluation.recency` | String | Tatsächliche Aktualitäts-Bewertung |
| `evaluation.equality` | String | Tatsächliche Gleichheits-Bewertung |

**`consent`** — Modulvergleich (THS- und LIMS-Werte pro Modul):

| Pfad | Typ | Beschreibung |
|---|---|---|
| `consent.ths.acquireUseStock` | String | Modul „Gewinnung & Nutzung" (THS) |
| `consent.ths.additionalAcquisition` | String | Modul „Zusätzliche Entnahme" (THS) |
| `consent.ths.retrospectiveUsage` | String | Modul „Retrospektive Nutzung" (THS) |
| `consent.ths.nonEuTransfer` | String | Modul „Nicht-EU-Weitergabe" (THS) |
| `consent.ths.validFrom` | Date | Gültig von (optional, falls Consent vorhanden) |
| `consent.ths.validUntil` | Date | Gültig bis (optional) |
| `consent.ths.expired` | boolean | Abgelaufen? (optional) |
| `consent.lims.*` | – | Identische Struktur wie `consent.ths.*` |

Falls THS oder LIMS für einen Patienten gar nicht vorliegt, wird die
gesamte Sub-Sektion (`consent.ths` bzw. `consent.lims`) weggelassen.
Falls einzelne Module fehlen, sind die jeweiligen Felder weggelassen.

## Statuswerte

Konsent-Modul-Werte (`acquireUseStock` etc.):

| Wert | Bedeutung |
|---|---|
| `GRANTED` | Zustimmung erteilt |
| `REFUSED` | Verweigert |
| `UNKNOWN` | Unbekannt |
| `NOT_PRESENT` | Modul nicht im Consent enthalten |
| `EMPTY` | Kein Wert vorliegend |

Aggregations-Werte (`evaluation.ths.aggregated` etc.):

| Wert | Bedeutung |
|---|---|
| `AFFIRMED` | Bejaht |
| `DECLINED` | Verneint |
| `REVOKED` | Widerrufen |
| `INCONSISTENT` | Inkonsistent |
| `EMPTY` | Kein Eintrag |
| `ANY` | Wildcard (nur in `ruleSpec`) |

Validity-Werte:

| Wert | Bedeutung |
|---|---|
| `VALID` | Gültig |
| `EXPIRED` | Abgelaufen |
| `NONE` | Nicht vorhanden |

## Body-Konvention

Der Markdown-Body ist minimal:

```markdown
# {patientId}
```

Mehr nicht. Alle Darstellung erfolgt im Theme aus dem Frontmatter.
Falls ein zweiter, plattform-unabhängiger Markdown-Output benötigt
wird, ist ein eigener `ActionCollector` zu implementieren (nicht
diesen Body anreichern).

## Java-Korrespondenz

Die Frontmatter-Records leben als nested Records in
`HugoBookGenerator`:

- `DetailFrontmatter`
- `SummaryFrontmatter`

Plus die Sub-Records für die verschachtelten Strukturen
(`RuleSpec`, `EvalDef`, `Evaluation`, `EvalResult`, `ConsentSnapshot`).

Die Sub-Records sind entweder eigenständig in `HugoBookGenerator`
definiert oder — falls sie 1:1 zu Domain-Records aus
`de.ukdd.bbd.consentd.entity.common` passen und keine
serialisierungsfremden Felder enthalten — direkt wiederverwendet.
Entscheidung pro Sub-Record beim Refactor.

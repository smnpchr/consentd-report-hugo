# Frontmatter-Konvention — consentd-report-hugo

Diese Konvention beschreibt das YAML-Frontmatter der Markdown-Dateien,
die vom Java-Generator (`HugoBookGenerator` im consentd-Projekt) erzeugt
und vom Hugo-Book-Theme dieses Repos gerendert werden.

## Designprinzipien

- **Alle strukturierten Daten leben im Frontmatter.** Der Markdown-Body
  ist minimal (nur `# {title}`) und nicht für Datentransport vorgesehen.
- **Direkte Serialisierung der Domain-Klassen.** Das Frontmatter ist
  weitgehend die 1:1-Jackson-Serialisierung der Java-Domain-Records
  und -Klassen (`BioBankConsent`, `ConsentEvaluation`, `DecisionRule`).
  Es gibt keine separate DTO-Schicht; die Feldnamen entsprechen den
  Java-Komponenten- bzw. Property-Namen.
- **Feldnamen sind camelCase**, wie die Java-Komponenten — mit Ausnahme
  der Map-Keys, die ALL_CAPS_SNAKE_CASE sind (Enum-Namen aus
  `ConsentModule`).
- **Hugo-Built-in-Felder** (`title`, `date`, `weight`,
  `bookCollapseSection`) folgen Hugo-Konvention — passt zufällig zu
  camelCase.
- **Optionale Felder werden weggelassen** (Jackson `NON_EMPTY`
  Serialization-Inclusion). Ein fehlendes Feld bedeutet „nicht
  zutreffend" oder „leer". Insbesondere fehlen leere Maps und leere
  Listen komplett aus dem YAML.
- **Enum-Werte werden als Strings ausgegeben**, in ihrer Java-Form
  (`AFFIRMED`, `INCONSISTENT`, `GRANTED`, `UNANSWERED` etc.).
  Menschen-lesbare Labels werden vom Theme über i18n übersetzt.

## Zwei Dokumenttypen

### 1. Section Index — `_index.md`

Wird einmal pro Sync-Run pro `EvaluationStage` geschrieben. Enthält
Aggregate über alle Patienten des Laufs.

```yaml
---
title: "19.05.2026"
date: 2026-05-19T18:30:00+02:00
weight: 20260519
bookCollapseSection: true
patientCount: 5
severityInfo: 1
severityWarning: 2
severityError: 1
severityCritical: 1
---
```

**Felder:**

| Feld | Typ | Quelle / Beschreibung |
|---|---|---|
| `title` | String | Vom `ActionCollector.init(title)` gesetzt |
| `date` | DateTime mit Offset | Zeitpunkt des Sync-Runs |
| `weight` | int | `yyyyMMdd`-Format, für Hugo-Sortierung |
| `bookCollapseSection` | boolean | Hugo-Book-Theme-Konvention, immer `true` |
| `patientCount` | int | Anzahl ausgewerteter Patienten |
| `severityInfo` / `severityWarning` / `severityError` / `severityCritical` | long | Aggregate-Counter pro Severity |

### 2. Detail — `<patientId>.md`

Wird einmal pro Patient pro Sync-Run geschrieben. Enthält die
vollständigen strukturierten Daten der Auswertung.

Vollständiges Beispiel (kanonisches Test-Fixture):

```yaml
---
title: XXX
date: 2026-05-26T16:28:15+02:00
severity: critical
rule:
  name: NEW_AFFIRMED_THS
  stage: IMPORT
  ths:
    timeValidity: VALID
    aggregated:
    - AFFIRMED
  lims:
    timeValidity: ANY
    aggregated:
    - EMPTY
  recency: ANY
  equality: ANY
  severity: INFO
  actions:
  - IMPORT
  - REPORT
  onFail:
    severity: CRITICAL
    actions:
    - REPORT
  stopEvaluation: false
  description: "Neuer bestätigter THS-Consent, LIMS leer"
failureInfo:
  failureAction: IMPORT
  failureReason: "de.acme.common.exceptions.FailedImportException: 400 - Bad Request"
evaluation:
  thsEvaluation:
    timeValidity: VALID
    aggregated: AFFIRMED
    affirmations:
      NON_EU_TRANSFER: true
      ACQUIRE_USE_STOCK: true
      ADDITIONAL_ACQUISITION: true
      RETROSPECTIVE_USAGE: false
    content:
      NON_EU_TRANSFER: GRANTED
      ACQUIRE_USE_STOCK: GRANTED
      ADDITIONAL_ACQUISITION: GRANTED
      RETROSPECTIVE_USAGE: UNANSWERED
  limsEvaluation:
    timeValidity: NONE
    aggregated: EMPTY
  recency: THS
  equality: NOT_EQUAL
consent:
  ths:
    patientId: XXX
    validFrom: 2025-08-11
    validUntil: 2055-08-11
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: UNANSWERED
    nonEuTransfer: GRANTED
    expired: false
---

# XXX
```

#### Top-Level-Felder

| Feld | Typ | Beschreibung |
|---|---|---|
| `title` | String | Patient-Identifier |
| `date` | DateTime | Zeitpunkt der Auswertung, ISO mit Offset |
| `severity` | String (lowercase) | Effektive Severity nach OnFail: `info`, `warning`, `error`, `critical` |
| `rule` | Objekt | Die getroffene Regel (siehe unten) |
| `failureInfo` | Objekt, optional | Nur vorhanden, wenn eine Action fehlgeschlagen ist |
| `evaluation` | Objekt | Auswertungsergebnis pro Quelle |
| `consent` | Objekt | Aktueller Consent-Stand pro Quelle |

#### `rule` — getroffene Regel

Direkte Serialisierung von `DecisionRule`. Enthält sowohl Spezifikation
(was die Regel prüft) als auch Metadaten (Severity, Actions etc.).

| Feld | Typ | Beschreibung |
|---|---|---|
| `name` | String | Regel-Identifier (z.B. `THS_INCONSISTENT`) |
| `description` | String | Aus `RuleName.description()` |
| `stage` | String | `IMPORT` oder `OPERATIONAL` |
| `severity` | String (UPPERCASE) | Severity der Regel — kann von Top-Level abweichen bei OnFail |
| `actions` | List<String> | Auszuführende Aktionen (`IMPORT`, `REPORT`, `INVALIDATE`, ...) |
| `recency` | String | Erwartete Aktualitäts-Bedingung (`ANY`, `THS`, `LIMS`, `EQUAL`, `NONE`) |
| `equality` | String | Erwartete Gleichheits-Bedingung (`ANY`, `EQUAL`, `AFFIRMATIONS_EQUAL`, `NOT_EQUAL`, `NONE`) |
| `ths` | Objekt | `ConsentEvalDef` für THS-Seite |
| `lims` | Objekt | `ConsentEvalDef` für LIMS-Seite |
| `onFail` | Objekt | Fallback-Konfiguration bei Action-Failure |
| `stopEvaluation` | boolean | Engine-internes Flag |

#### `rule.ths` / `rule.lims` — Eval-Def pro Quelle

Direkte Serialisierung von `ConsentEvalDef`. Beschreibt, welche
Bedingungen die Regel an die jeweilige Quelle stellt.

| Feld | Typ | Beschreibung |
|---|---|---|
| `timeValidity` | String | Erwartete Gültigkeit (`ANY`, `VALID`, `EXPIRED`, `NONE`) |
| `aggregated` | List<String> | Erlaubte Aggregations-Werte. Wildcard: `[ANY]` |
| `affirmed` | Map<String, Boolean>, optional | Bei Affirmations-Rules: Soll-Werte pro Modul |
| `content` | Map<String, String>, optional | Bei Content-Rules: Soll-Werte pro Modul (`ModuleStatus`-Enum) |

`affirmed` und `content` werden bei leeren Maps weggelassen.

#### `failureInfo` — optionaler Fehler-Block

Direkte Serialisierung des `FailureInfo`-Records. Wird nur erzeugt, wenn
eine Action während des Sync-Runs eine Exception geworfen hat.

| Feld | Typ | Beschreibung |
|---|---|---|
| `failureAction` | String | Welche Action fehlgeschlagen ist |
| `failureReason` | String | Aus `ActionHandlerException.displayableReason()` |

#### `evaluation` — Auswertungsergebnis

Direkte Serialisierung von `RuleEvaluation`. Die Per-Quelle-Auswertungen
heißen wegen Java-Naming `thsEvaluation` und `limsEvaluation`, nicht
`ths`/`lims`.

| Feld | Typ | Beschreibung |
|---|---|---|
| `thsEvaluation` | Objekt | `ConsentEvaluation` für THS |
| `limsEvaluation` | Objekt | `ConsentEvaluation` für LIMS |
| `recency` | String | Tatsächlich ermittelte Aktualitäts-Beziehung |
| `equality` | String | Tatsächlich ermittelte Gleichheits-Beziehung |

#### `evaluation.thsEvaluation` / `evaluation.limsEvaluation`

Direkte Serialisierung von `ConsentEvaluation`.

| Feld | Typ | Beschreibung |
|---|---|---|
| `timeValidity` | String | `VALID`, `EXPIRED`, `NONE` |
| `aggregated` | String | Aggregierter Auswertungs-Wert |
| `affirmations` | Map<String, Boolean>, optional | Pro-Modul-Bejahung |
| `content` | Map<String, String>, optional | Pro-Modul-Status |

`affirmations` und `content` sind bei leerem Consent (kein Datenpunkt)
nicht vorhanden — `NON_EMPTY`-Strategy lässt sie weg.

#### `consent` — Aktueller Consent-Stand

Wrapper-Record, gruppiert die zwei unabhängigen Per-Quellen-Consents
zur Theme-Convenience.

| Pfad | Typ | Beschreibung |
|---|---|---|
| `consent.ths` | `BioBankConsent`, optional | THS-Consent, falls vorhanden |
| `consent.lims` | `BioBankConsent`, optional | LIMS-Consent, falls vorhanden |

#### `consent.ths` / `consent.lims`

Direkte Serialisierung von `BioBankConsent` (Lombok `@Data`-POJO).
Wird komplett weggelassen, wenn die jeweilige Quelle keinen Consent hat.

| Feld | Typ | Beschreibung |
|---|---|---|
| `patientId` | String | Patient-Identifier (redundant zu Top-Level `title`) |
| `validFrom` | Date | Gültigkeits-Beginn |
| `validUntil` | Date | Gültigkeits-Ende |
| `acquireUseStock` | String | `ModuleStatus`-Enum-Wert |
| `additionalAcquisition` | String | `ModuleStatus`-Enum-Wert |
| `retrospectiveUsage` | String | `ModuleStatus`-Enum-Wert |
| `nonEuTransfer` | String | `ModuleStatus`-Enum-Wert |
| `expired` | boolean | Berechnet zum Erstellungszeitpunkt des Reports |

## Statuswerte

### `ModuleStatus` (Modul-Werte)

| Wert | Bedeutung | Quelle |
|---|---|---|
| `GRANTED` | Zustimmung erteilt | THS + LIMS |
| `DECLINED` | Aktiv verweigert | THS + LIMS |
| `UNANSWERED` | Nicht angekreuzt | THS-only (LIMS kann's nicht repräsentieren) |
| `REVOKED` | Widerrufen | LIMS-only (THS kann's nicht repräsentieren) |
| `UNAVAILABLE` | Kein Datenpunkt vorliegend | THS + LIMS |

Zusätzlich kann der String `EMPTY` als Frontmatter-Marker auftauchen —
das ist kein `ModuleStatus`-Wert, sondern signalisiert „Quelle hat
diesen Datenpunkt gar nicht geliefert".

### `ContentAggregation` (Aggregations-Werte in `aggregated`-Feldern)

| Wert | Bedeutung |
|---|---|
| `ANY` | Wildcard, nur in `rule.*.aggregated` |
| `EMPTY` | Quelle ist leer / hat keinen Consent |
| `INCONSISTENT` | Consent ist in sich widersprüchlich |
| `DECLINED` | Vollständig abgelehnt (`fullyDeclined`) |
| `REVOKED` | Wirksam widerrufen (`effectivelyRevoked`) |
| `AFFIRMED` | Trag-Punkt bejaht (MII-Broad-Consent-Semantik) |
| `CONSISTENT` | Wildcard-artiger Match für jede konsistente Variante |

### `TimeValidity`

| Wert | Bedeutung |
|---|---|
| `ANY` | Wildcard, nur in `rule.*.timeValidity` |
| `NONE` | Keine zeitliche Information / kein Consent |
| `VALID` | Aktuell gültig |
| `EXPIRED` | Abgelaufen |

### `Recency` (Aktualitäts-Beziehung)

| Wert | Bedeutung |
|---|---|
| `ANY` | Wildcard |
| `NONE` | Keine Quelle vorhanden |
| `EQUAL` | THS und LIMS gleich aktuell |
| `THS` | THS ist aktueller |
| `LIMS` | LIMS ist aktueller |

### `Equality` (Gleichheits-Beziehung)

| Wert | Bedeutung |
|---|---|
| `ANY` | Wildcard |
| `NONE` | Keine Quelle vorhanden |
| `EQUAL` | Inhaltlich identisch |
| `AFFIRMATIONS_EQUAL` | Gleich auf Affirmations-Ebene, nicht auf Modul-Status |
| `NOT_EQUAL` | Inhaltlich unterschiedlich |

## Modul-Namen (Map-Keys in `affirmations` / `content`)

Die Map-Keys in `affirmations` und `content` sind ALL_CAPS-Enum-Namen
aus `ConsentModule`:

- `ACQUIRE_USE_STOCK` — Gewinnung, Lagerung, Nutzung
- `ADDITIONAL_ACQUISITION` — Zusätzliche Entnahme
- `RETROSPECTIVE_USAGE` — Retrospektive Nutzung
- `NON_EU_TRANSFER` — Nicht-EU-Weitergabe

Auf POJO-Ebene (`consent.ths` / `consent.lims`) sind die Feldnamen
hingegen camelCase: `acquireUseStock`, `additionalAcquisition`,
`retrospectiveUsage`, `nonEuTransfer`. Das ist die Folge der
Java-Konvention (Map-Keys via `ConsentModule.name()` vs.
POJO-Properties via Lombok-Getter).

Die i18n-Keys im Theme decken beide Schreibweisen ab.

## Body-Konvention

Der Markdown-Body ist minimal:

```markdown
# {title}
```

Mehr nicht. Alle Darstellung erfolgt im Theme aus dem Frontmatter.

Falls ein zweiter, plattform-unabhängiger Markdown-Output benötigt wird
(z.B. für externe Auditoren ohne Hugo-Stack), ist ein eigener
`ActionCollector` mit eigenem Generator zu implementieren — nicht
diesen Body anreichern.

## Verhältnis zu den Java-Domain-Klassen

| Frontmatter-Pfad | Java-Quelle |
|---|---|
| `rule` | `de.ukdd.bbd.consentd.rules.DecisionRule` |
| `rule.ths` / `rule.lims` | `de.ukdd.bbd.consentd.entity.common.ConsentEvalDef` |
| `failureInfo` | `HugoBookGenerator.FailureInfo` (DTO-Record) |
| `evaluation` | `de.ukdd.bbd.consentd.rules.RuleEvaluation` |
| `evaluation.thsEvaluation` / `evaluation.limsEvaluation` | `de.ukdd.bbd.consentd.entity.common.ConsentEvaluation` |
| `consent` | `HugoBookGenerator.Consent` (Wrapper-Record) |
| `consent.ths` / `consent.lims` | `de.ukdd.bbd.consentd.entity.common.BioBankConsent` |

Änderungen an diesen Klassen propagieren ohne Mapping-Schicht direkt
ins Frontmatter. Wenn Felder hinzukommen, die *nicht* ins Frontmatter
sollen, müssen sie per `@JsonIgnore` auf der Quellklasse markiert
werden.

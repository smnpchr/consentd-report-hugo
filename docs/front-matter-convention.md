# Frontmatter-Konvention — consentd-report-hugo

Diese Konvention beschreibt das YAML-Frontmatter der Markdown-Dateien,
die vom Java-Generator (`HugoBookGenerator` im consentd-Projekt) erzeugt
und vom Hugo-Book-Theme dieses Repos gerendert werden.

> **Stand:** generalisierter Sync (Source → Target statt fest THS → LIMS),
> einzelne Hugo-Site mit Sync-Run → Stage → Patient-Hierarchie.

## Designprinzipien

- **Alle strukturierten Daten leben im Frontmatter.** Der Markdown-Body
  ist minimal (nur `# {title}`) und nicht für Datentransport vorgesehen.
- **Direkte Serialisierung der Domain-Klassen.** Das Frontmatter ist
  weitgehend die 1:1-Jackson-Serialisierung der Java-Domain-Records
  und -Klassen (`BioBankConsent`, `ConsentEvaluation`, `DecisionRule`).
  Es gibt keine separate DTO-Schicht; die Feldnamen entsprechen den
  Java-Komponenten- bzw. Property-Namen.
- **Richtungsneutral: Source / Target statt THS / LIMS.** Der Sync legt
  Quelle und Ziel fest; das Frontmatter spricht durchgängig von `source`
  und `target`. THS/LIMS sind nur noch konkrete *Instanzen* (siehe
  Instanznamen).
- **Feldnamen sind camelCase**, wie die Java-Komponenten — mit Ausnahme
  der Map-Keys, die ALL_CAPS_SNAKE_CASE sind (Enum-Namen aus
  `ConsentModule`).
- **Hugo-Built-in-Felder** (`title`, `date`, `weight`,
  `bookCollapseSection`, `bookIcon`) folgen Hugo- bzw.
  Book-Theme-Konvention.
- **Optionale Felder werden weggelassen** (Jackson `NON_EMPTY`
  Serialization-Inclusion). Ein fehlendes Feld bedeutet „nicht
  zutreffend" oder „leer". Insbesondere fehlen leere Maps und leere
  Listen komplett aus dem YAML.
- **Enum-Werte werden als Strings ausgegeben**, in ihrer Java-Form
  (`AFFIRMED`, `INCONSISTENT`, `GRANTED`, `UNANSWERED`, `CXX_PROD` etc.).
  Menschen-lesbare Labels werden vom Theme über i18n übersetzt — niemals
  als aufgelöster String ins Frontmatter geschrieben (Ausnahme:
  `rule.description`, das aus historischen Gründen Java-aufgelöst ist).

## Verzeichnisstruktur

Eine einzelne Hugo-Site, drei Section-Ebenen unter `content/reports/`:

```
content/reports/
  _index.md                    # Top: listet die Sync-Runs (statisch/minimal)
  <sync-run>/                  # z.B. "19.05.2026" oder "Week 21 comparison"
    _index.md                  # Sync-Run-Index  (SynchIndex)
    import/
      _index.md                # Stage-Index     (EvalStageIndex)
      <patientId>.md           # Detail          (EvalReport)
    operational/
      _index.md
      <patientId>.md
    compare/
      _index.md
      <patientId>.md
```

Jeder Sync-Run erzeugt **gewollt** eine neue Top-Section (benannt nach
`sync.title()`, z.B. dem Datum). Die Section-Identität ist also
lauf-spezifisch, nicht sync-stabil — das ist Absicht (Historie als
nebeneinanderliegende Runs).

## Drei Dokumenttypen

### 1. Sync-Run-Index — `<sync-run>/_index.md`

Wird einmal pro Sync-Run geschrieben (in `finish()`, nach allen Stages).
Reiner Strukturknoten; aggregierte Zahlen liefern die untergeordneten
Stage-Indizes.

```yaml
---
title: "19.05.2026"
date: 2026-05-19T18:30:00+02:00
weight: 20260519
bookCollapseSection: true
---
```

| Feld | Typ | Quelle / Beschreibung |
|---|---|---|
| `title` | String | `sync.title()` — Lauf-Label (Datum / Woche) |
| `date` | DateTime mit Offset | Zeitpunkt des Sync-Runs |
| `weight` | int | `yyyyMMdd`-Format, für Hugo-Sortierung |
| `bookCollapseSection` | boolean | Hugo-Book-Konvention, immer `true` |

### 2. Stage-Index — `<sync-run>/<stage>/_index.md`

Wird einmal pro Sync-Run pro `EvaluationStage` geschrieben. Enthält
Aggregate über alle Patienten der Stage und ist gleichzeitig die
Blatt-Summary (Patiententabelle im Theme).

```yaml
---
date: 2026-05-19T18:30:00+02:00
weight: 20260519
bookCollapseSection: true
bookIcon: import
patientCount: 5
severityInfo: 1
severityWarning: 2
severityError: 1
severityCritical: 1
---
```

| Feld | Typ | Quelle / Beschreibung |
|---|---|---|
| `date` | DateTime mit Offset | Zeitpunkt des Sync-Runs |
| `weight` | int | `yyyyMMdd`-Format, für Hugo-Sortierung |
| `bookCollapseSection` | boolean | Hugo-Book-Konvention, immer `true` |
| `bookIcon` | String | Icon-Name = `stage.name().toLowerCase()` (`import` / `operational` / `compare`), aufgelöst über das `docs/icon`-Partial |
| `patientCount` | int | Anzahl ausgewerteter Patienten |
| `severityInfo` / `severityWarning` / `severityError` / `severityCritical` | long | Aggregate-Counter pro Severity |

**Label:** Kein `title` aus Java — Hugo leitet `.Title` aus dem
Ordnernamen ab (`import` → „Import"). Das Symbol kommt über `bookIcon`
aus dem vorhandenen `docs/icon`-Partial; die passenden SVGs (`import`,
`operational`, `compare`) müssen im Icon-Verzeichnis des Themes liegen.

### 3. Detail — `<patientId>.md`

Wird einmal pro Patient pro Stage geschrieben. Enthält die
vollständigen strukturierten Daten der Auswertung.

Vollständiges Beispiel (kanonisches Test-Fixture, Daily-Sync THS → CXX_TEST):

```yaml
---
title: XXX
date: 2026-05-26T16:28:15+02:00
severity: critical
sourceName: THS
targetName: CXX_TEST
rule:
  name: NEW_AFFIRMED_THS
  stage: IMPORT
  source:
    timeValidity: VALID
    aggregated:
    - AFFIRMED
  target:
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
  description: "Neuer bestätigter Quell-Consent, Ziel leer"
failureInfo:
  failureAction: IMPORT
  failureReason: "de.acme.common.exceptions.FailedImportException: 400 - Bad Request"
evaluation:
  sourceEvaluation:
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
  targetEvaluation:
    timeValidity: NONE
    aggregated: EMPTY
  recency: SOURCE
  equality: NOT_EQUAL
consent:
  source:
    patientId: XXX
    origin: THS
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
| `sourceName` | String | Instanz der Quelle (`InstanceName`-Name, z.B. `THS`, `CXX_PROD`) — vom Sync-Endpunkt, **nicht** vom Consent |
| `targetName` | String | Instanz des Ziels (`InstanceName`-Name, z.B. `CXX_TEST`) |
| `rule` | Objekt | Die getroffene Regel (siehe unten) |
| `failureInfo` | Objekt, optional | Nur vorhanden, wenn eine Action fehlgeschlagen ist |
| `evaluation` | Objekt | Auswertungsergebnis pro Quelle |
| `consent` | Objekt | Aktueller Consent-Stand pro Quelle |

#### `rule` — getroffene Regel

Direkte Serialisierung von `DecisionRule`. Enthält sowohl Spezifikation
(was die Regel prüft) als auch Metadaten (Severity, Actions etc.).

| Feld | Typ | Beschreibung |
|---|---|---|
| `name` | String | Regel-Identifier (z.B. `THS_INCONSISTENT`). **Hinweis:** Regel-Namen können weiterhin THS/LIMS im Bezeichner tragen — das ist die Regel-*Identität*, nicht die Richtungs-Semantik. Nicht „korrigieren". |
| `description` | String | Aus `RuleName.description()` (Java-aufgelöst, locale-fix) |
| `stage` | String | `IMPORT`, `OPERATIONAL` oder `COMPARE` |
| `severity` | String (UPPERCASE) | Severity der Regel — kann von Top-Level abweichen bei OnFail |
| `actions` | List<String> | Auszuführende Aktionen (`IMPORT`, `REPORT`, `INVALIDATE`, ...) |
| `recency` | String | Erwartete Aktualitäts-Bedingung (`ANY`, `SOURCE`, `TARGET`, `EQUAL`, `NONE`) |
| `equality` | String | Erwartete Gleichheits-Bedingung (`ANY`, `EQUAL`, `AFFIRMATIONS_EQUAL`, `NOT_EQUAL`, `NONE`) |
| `source` | Objekt | `ConsentEvalDef` für die Quell-Seite |
| `target` | Objekt | `ConsentEvalDef` für die Ziel-Seite |
| `sourceName` | String, optional | Instanz-Filter der Regel (aus `source-name` der Regel-YAML); nur gesetzt, wenn die Regel auf eine Instanz eingeschränkt ist |
| `targetName` | String, optional | Instanz-Filter der Regel (aus `target-name`) |
| `onFail` | Objekt | Fallback-Konfiguration bei Action-Failure |
| `stopEvaluation` | boolean | Engine-internes Flag |

#### `rule.source` / `rule.target` — Eval-Def pro Quelle

Direkte Serialisierung von `ConsentEvalDef`. Beschreibt, welche
Bedingungen die Regel an die jeweilige Seite stellt.

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

Direkte Serialisierung von `RuleEvaluation`. Die Per-Seite-Auswertungen
heißen wegen Java-Naming `sourceEvaluation` und `targetEvaluation`.

| Feld | Typ | Beschreibung |
|---|---|---|
| `sourceEvaluation` | Objekt | `ConsentEvaluation` für die Quelle |
| `targetEvaluation` | Objekt | `ConsentEvaluation` für das Ziel |
| `recency` | String | Tatsächlich ermittelte Aktualitäts-Beziehung |
| `equality` | String | Tatsächlich ermittelte Gleichheits-Beziehung |

#### `evaluation.sourceEvaluation` / `evaluation.targetEvaluation`

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

Wrapper-Record, gruppiert die zwei unabhängigen Per-Seiten-Consents
zur Theme-Convenience.

| Pfad | Typ | Beschreibung |
|---|---|---|
| `consent.source` | `BioBankConsent`, optional | Quell-Consent, falls vorhanden |
| `consent.target` | `BioBankConsent`, optional | Ziel-Consent, falls vorhanden |

#### `consent.source` / `consent.target`

Direkte Serialisierung von `BioBankConsent` (Lombok `@Data`-POJO).
Wird komplett weggelassen, wenn die jeweilige Seite keinen Consent hat.

| Feld | Typ | Beschreibung |
|---|---|---|
| `patientId` | String | Patient-Identifier (redundant zu Top-Level `title`) |
| `origin` | String | Instanz, die *diesen* Consent geliefert hat (`InstanceName`-Name). Per-Consent-Provenienz — orthogonal zu `sourceName`/`targetName` (Endpunkt-Identität). |
| `validFrom` | Date | Gültigkeits-Beginn |
| `validUntil` | Date | Gültigkeits-Ende |
| `acquireUseStock` | String | `ModuleStatus`-Enum-Wert |
| `additionalAcquisition` | String | `ModuleStatus`-Enum-Wert |
| `retrospectiveUsage` | String | `ModuleStatus`-Enum-Wert |
| `nonEuTransfer` | String | `ModuleStatus`-Enum-Wert |
| `expired` | boolean | Berechnet zum Erstellungszeitpunkt des Reports |

> **Kein `originDescription`:** Früher wurde die menschenlesbare
> Instanz-Beschreibung mit ins Frontmatter geschrieben. Das ist
> entfallen — nur der Enum-Key `origin` wird ausgegeben, die
> Beschreibung löst das Theme über `instance_*` (i18n) auf.

## Statuswerte

### `ModuleStatus` (Modul-Werte)

| Wert | Bedeutung | Quelle |
|---|---|---|
| `GRANTED` | Zustimmung erteilt | THS + LIMS |
| `DECLINED` | Aktiv verweigert | THS + LIMS |
| `UNANSWERED` | Nicht angekreuzt | von THS geliefert (LIMS kann's nicht repräsentieren) |
| `REVOKED` | Widerrufen | von LIMS/CentraXX geliefert (THS kann's nicht repräsentieren) |
| `UNAVAILABLE` | Kein Datenpunkt vorliegend | THS + LIMS |

Zusätzlich kann der String `EMPTY` als Frontmatter-Marker auftauchen —
das ist kein `ModuleStatus`-Wert, sondern signalisiert „Seite hat
diesen Datenpunkt gar nicht geliefert".

### `ContentAggregation` (Aggregations-Werte in `aggregated`-Feldern)

| Wert | Bedeutung |
|---|---|
| `ANY` | Wildcard, nur in `rule.*.aggregated` |
| `EMPTY` | Seite ist leer / hat keinen Consent |
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
| `NONE` | Keine Seite vorhanden |
| `EQUAL` | Quelle und Ziel gleich aktuell |
| `SOURCE` | Quelle ist aktueller |
| `TARGET` | Ziel ist aktueller |

### `Equality` (Gleichheits-Beziehung)

| Wert | Bedeutung |
|---|---|
| `ANY` | Wildcard |
| `NONE` | Keine Seite vorhanden |
| `EQUAL` | Inhaltlich identisch |
| `AFFIRMATIONS_EQUAL` | Gleich auf Affirmations-Ebene, nicht auf Modul-Status |
| `NOT_EQUAL` | Inhaltlich unterschiedlich |

## Instanznamen

`sourceName`, `targetName` (Top-Level) und `consent.*.origin` sind alle
`InstanceName`-Enum-Namen:

- `THS`, `CXX_PROD`, `CXX_TEST`, ...

Zwei Rollen, dasselbe Enum:

- **`sourceName` / `targetName`** — Identität des Sync-*Endpunkts*. Steht
  fest, auch wenn die Seite keinen Consent hat (z.B. leeres Target).
- **`consent.*.origin`** — Provenienz *dieses konkreten* Consents.

Die menschenlesbaren Beschreibungen kommen im Theme aus der i18n-YAML
über `instance_<NAME>` (z.B. `instance_CXX_PROD: "CentraXX"`); der
Java-`InstanceName.description` ist für die Anzeige nicht mehr maßgeblich.

## Modul-Namen (Map-Keys in `affirmations` / `content`)

Die Map-Keys in `affirmations` und `content` sind ALL_CAPS-Enum-Namen
aus `ConsentModule`:

- `ACQUIRE_USE_STOCK` — Gewinnung, Lagerung, Nutzung
- `ADDITIONAL_ACQUISITION` — Zusätzliche Entnahme
- `RETROSPECTIVE_USAGE` — Retrospektive Nutzung
- `NON_EU_TRANSFER` — Nicht-EU-Weitergabe

Auf POJO-Ebene (`consent.source` / `consent.target`) sind die Feldnamen
hingegen camelCase: `acquireUseStock`, `additionalAcquisition`,
`retrospectiveUsage`, `nonEuTransfer`. Das ist die Folge der
Java-Konvention (Map-Keys via `ConsentModule.name()` vs.
POJO-Properties via Lombok-Getter).

Die i18n-Keys im Theme decken beide Schreibweisen ab.

## Body-Konvention

Der Markdown-Body ist minimal — bei Detail-Seiten `# {title}`, bei den
Index-Seiten leer bzw. minimal. Alle Darstellung erfolgt im Theme aus
dem Frontmatter; Überschrift und Stage-Icon liefert das Theme
(`.Title` + `bookIcon`), nicht der Body.

Falls ein zweiter, plattform-unabhängiger Markdown-Output benötigt wird
(z.B. für externe Auditoren ohne Hugo-Stack), ist ein eigener
`ActionCollector` mit eigenem Generator zu implementieren — nicht
diesen Body anreichern.

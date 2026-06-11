---
title: "INT-PARTIAL-AFFIRMED"
date: 2026-05-19T18:30:06+02:00
severity: info
sourceName: THS
targetName: CXX_PROD
rule:
  name: PARTIAL_AFFIRMED_THS
  stage: IMPORT
  source:
    timeValidity: VALID
    aggregated:
    - AFFIRMED
    affirmed:
      ACQUIRE_USE_STOCK: true
      ADDITIONAL_ACQUISITION: true
      RETROSPECTIVE_USAGE: false
      NON_EU_TRANSFER: false
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
  description: "Partiell bestätigter Quell-Consent (nur Basis und Zusatzentnahme), Ziel leer"
evaluation:
  sourceEvaluation:
    timeValidity: VALID
    aggregated: AFFIRMED
    affirmations:
      ACQUIRE_USE_STOCK: true
      ADDITIONAL_ACQUISITION: true
      RETROSPECTIVE_USAGE: false
      NON_EU_TRANSFER: false
    content:
      ACQUIRE_USE_STOCK: GRANTED
      ADDITIONAL_ACQUISITION: GRANTED
      RETROSPECTIVE_USAGE: DECLINED
      NON_EU_TRANSFER: UNANSWERED
  targetEvaluation:
    timeValidity: NONE
    aggregated: EMPTY
  recency: ANY
  equality: ANY
consent:
  source:
    patientId: INT-PARTIAL-AFFIRMED
    origin: THS
    validFrom: 2026-05-01
    validUntil: 2031-05-01
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: DECLINED
    nonEuTransfer: UNANSWERED
    expired: false
---

# INT-PARTIAL-AFFIRMED

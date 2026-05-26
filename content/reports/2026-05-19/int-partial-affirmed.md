---
title: "INT-PARTIAL-AFFIRMED"
date: 2026-05-19T18:30:06+02:00
severity: info
rule:
  name: PARTIAL_AFFIRMED_THS
  stage: IMPORT
  ths:
    timeValidity: VALID
    aggregated:
    - AFFIRMED
    affirmed:
      ACQUIRE_USE_STOCK: true
      ADDITIONAL_ACQUISITION: true
      RETROSPECTIVE_USAGE: false
      NON_EU_TRANSFER: false
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
  description: "Partiell bestätigter THS-Consent (nur Basis und Zusatzentnahme), LIMS leer"
evaluation:
  thsEvaluation:
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
  limsEvaluation:
    timeValidity: NONE
    aggregated: EMPTY
  recency: ANY
  equality: ANY
consent:
  ths:
    patientId: INT-PARTIAL-AFFIRMED
    validFrom: 2026-05-01
    validUntil: 2031-05-01
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: DECLINED
    nonEuTransfer: UNANSWERED
    expired: false
---

# INT-PARTIAL-AFFIRMED

---
title: "INT-AFFIRMED"
date: 2026-05-19T18:30:01+02:00
severity: info
sourceName: THS
targetName: CXX_PROD
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
evaluation:
  sourceEvaluation:
    timeValidity: VALID
    aggregated: AFFIRMED
    affirmations:
      ACQUIRE_USE_STOCK: true
      ADDITIONAL_ACQUISITION: true
      RETROSPECTIVE_USAGE: true
      NON_EU_TRANSFER: true
    content:
      ACQUIRE_USE_STOCK: GRANTED
      ADDITIONAL_ACQUISITION: GRANTED
      RETROSPECTIVE_USAGE: GRANTED
      NON_EU_TRANSFER: GRANTED
  targetEvaluation:
    timeValidity: NONE
    aggregated: EMPTY
  recency: ANY
  equality: ANY
consent:
  source:
    patientId: INT-AFFIRMED
    origin: THS
    validFrom: 2026-04-19
    validUntil: 2027-05-19
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: GRANTED
    nonEuTransfer: GRANTED
    expired: false
---

# INT-AFFIRMED

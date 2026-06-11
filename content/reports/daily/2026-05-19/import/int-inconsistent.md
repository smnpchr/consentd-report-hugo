---
title: "INT-INCONSISTENT"
date: 2026-05-19T18:30:03+02:00
severity: error
sourceName: THS
targetName: CXX_PROD
rule:
  name: INCONSISTENT_THS
  stage: IMPORT
  source:
    timeValidity: VALID
    aggregated:
    - INCONSISTENT
  target:
    timeValidity: ANY
    aggregated:
    - ANY
  recency: ANY
  equality: ANY
  severity: ERROR
  actions:
  - REPORT
  onFail:
    severity: CRITICAL
    actions:
    - REPORT
  stopEvaluation: true
  description: "Inkonsistenter Quell-Consent"
evaluation:
  sourceEvaluation:
    timeValidity: VALID
    aggregated: INCONSISTENT
    affirmations:
      ACQUIRE_USE_STOCK: false
      ADDITIONAL_ACQUISITION: true
      RETROSPECTIVE_USAGE: true
      NON_EU_TRANSFER: false
    content:
      ACQUIRE_USE_STOCK: DECLINED
      ADDITIONAL_ACQUISITION: GRANTED
      RETROSPECTIVE_USAGE: GRANTED
      NON_EU_TRANSFER: DECLINED
  targetEvaluation:
    timeValidity: NONE
    aggregated: EMPTY
  recency: ANY
  equality: ANY
consent:
  source:
    patientId: INT-INCONSISTENT
    origin: THS
    validFrom: 2026-04-13
    validUntil: 2031-04-13
    acquireUseStock: DECLINED
    additionalAcquisition: GRANTED
    retrospectiveUsage: GRANTED
    nonEuTransfer: DECLINED
    expired: false
---

# INT-INCONSISTENT

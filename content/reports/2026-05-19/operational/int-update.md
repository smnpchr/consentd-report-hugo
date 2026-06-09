---
title: "INT-UPDATE"
date: 2026-05-19T18:30:04+02:00
severity: warning
sourceName: THS
targetName: CXX_PROD
rule:
  name: UPDATED_AFFIRMED_THS
  stage: OPERATIONAL
  source:
    timeValidity: VALID
    aggregated:
    - AFFIRMED
  target:
    timeValidity: VALID
    aggregated:
    - AFFIRMED
  recency: SOURCE
  equality: NOT_EQUAL
  severity: WARNING
  actions:
  - IMPORT
  - REPORT
  onFail:
    severity: CRITICAL
    actions:
    - REPORT
  stopEvaluation: false
  description: "Aktualisierter bestätigter Consent, Ziel veraltet"
evaluation:
  sourceEvaluation:
    timeValidity: VALID
    aggregated: AFFIRMED
    affirmations:
      ACQUIRE_USE_STOCK: true
      ADDITIONAL_ACQUISITION: true
      RETROSPECTIVE_USAGE: true
      NON_EU_TRANSFER: false
    content:
      ACQUIRE_USE_STOCK: GRANTED
      ADDITIONAL_ACQUISITION: GRANTED
      RETROSPECTIVE_USAGE: GRANTED
      NON_EU_TRANSFER: DECLINED
  targetEvaluation:
    timeValidity: VALID
    aggregated: AFFIRMED
    affirmations:
      ACQUIRE_USE_STOCK: true
      ADDITIONAL_ACQUISITION: false
      RETROSPECTIVE_USAGE: true
      NON_EU_TRANSFER: false
    content:
      ACQUIRE_USE_STOCK: GRANTED
      ADDITIONAL_ACQUISITION: DECLINED
      RETROSPECTIVE_USAGE: GRANTED
      NON_EU_TRANSFER: DECLINED
  recency: SOURCE
  equality: NOT_EQUAL
consent:
  source:
    patientId: INT-UPDATE
    origin: THS
    validFrom: 2026-03-01
    validUntil: 2027-03-01
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: GRANTED
    nonEuTransfer: DECLINED
    expired: false
  target:
    patientId: INT-UPDATE
    origin: CXX_PROD
    validFrom: 2025-08-01
    validUntil: 2026-08-01
    acquireUseStock: GRANTED
    additionalAcquisition: DECLINED
    retrospectiveUsage: GRANTED
    nonEuTransfer: DECLINED
    expired: false
---

# INT-UPDATE

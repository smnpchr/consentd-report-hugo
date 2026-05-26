---
title: "INT-CONTENT-MISMATCH"
date: 2026-05-19T18:30:07+02:00
severity: warning
rule:
  name: CONTENT_DRIFT_LIMS
  stage: OPERATIONAL
  ths:
    timeValidity: VALID
    aggregated:
    - AFFIRMED
    content:
      ACQUIRE_USE_STOCK: GRANTED
      ADDITIONAL_ACQUISITION: GRANTED
      RETROSPECTIVE_USAGE: GRANTED
      NON_EU_TRANSFER: DECLINED
  lims:
    timeValidity: VALID
    aggregated:
    - AFFIRMED
    content:
      ACQUIRE_USE_STOCK: GRANTED
      ADDITIONAL_ACQUISITION: GRANTED
      RETROSPECTIVE_USAGE: GRANTED
      NON_EU_TRANSFER: DECLINED
  recency: THS
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
  description: "Modul-Drift zwischen THS und LIMS bei sonst gleicher Affirmation"
evaluation:
  thsEvaluation:
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
  limsEvaluation:
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
      RETROSPECTIVE_USAGE: REVOKED
      NON_EU_TRANSFER: DECLINED
  recency: THS
  equality: NOT_EQUAL
consent:
  ths:
    patientId: INT-CONTENT-MISMATCH
    validFrom: 2026-04-01
    validUntil: 2027-04-01
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: GRANTED
    nonEuTransfer: DECLINED
    expired: false
  lims:
    patientId: INT-CONTENT-MISMATCH
    validFrom: 2025-10-15
    validUntil: 2026-10-15
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: REVOKED
    nonEuTransfer: DECLINED
    expired: false
---

# INT-CONTENT-MISMATCH

---
title: "INT-COMPARE-DRIFT"
patients: ["INT-COMPARE-DRIFT"]
date: 2026-05-24T20:00:02+02:00
severity: warning
sourceName: CXX_PROD
targetName: CXX_TEST
rule:
  name: COMPARE_DRIFT
  stage: COMPARE
  source:
    timeValidity: VALID
    aggregated:
    - AFFIRMED
  target:
    timeValidity: ANY
    aggregated:
    - ANY
  recency: ANY
  equality: NOT_EQUAL
  severity: WARNING
  actions:
  - REPORT
  onFail:
    severity: CRITICAL
    actions:
    - REPORT
  stopEvaluation: false
  description: "Inhaltliche Abweichung zwischen Quelle und Ziel"
evaluation:
  sourceEvaluation:
    timeValidity: VALID
    validityPeriod: DEVIATING
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
    timeValidity: VALID
    validityPeriod: DEVIATING
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
    patientId: INT-COMPARE-DRIFT
    origin: CXX_PROD
    validFrom: 2026-03-20
    validUntil: 2027-03-20
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: GRANTED
    nonEuTransfer: GRANTED
    expired: false
  target:
    patientId: INT-COMPARE-DRIFT
    origin: CXX_TEST
    validFrom: 2026-01-08
    validUntil: 2027-01-08
    acquireUseStock: GRANTED
    additionalAcquisition: DECLINED
    retrospectiveUsage: GRANTED
    nonEuTransfer: DECLINED
    expired: false
---

# INT-COMPARE-DRIFT

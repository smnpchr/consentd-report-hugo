---
title: "INT-COMPARE-EQUAL"
date: 2026-05-24T20:00:01+02:00
severity: success
sourceName: CXX_PROD
targetName: CXX_TEST
rule:
  name: COMPARE_EQUAL
  stage: COMPARE
  source:
    timeValidity: VALID
    aggregated:
    - AFFIRMED
  target:
    timeValidity: VALID
    aggregated:
    - AFFIRMED
  recency: EQUAL
  equality: EQUAL
  severity: SUCCESS
  actions:
  - REPORT
  onFail:
    severity: CRITICAL
    actions:
    - REPORT
  stopEvaluation: false
  description: "Quelle und Ziel inhaltlich identisch"
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
      ADDITIONAL_ACQUISITION: true
      RETROSPECTIVE_USAGE: true
      NON_EU_TRANSFER: false
    content:
      ACQUIRE_USE_STOCK: GRANTED
      ADDITIONAL_ACQUISITION: GRANTED
      RETROSPECTIVE_USAGE: GRANTED
      NON_EU_TRANSFER: DECLINED
  recency: EQUAL
  equality: EQUAL
consent:
  source:
    patientId: INT-COMPARE-EQUAL
    origin: CXX_PROD
    validFrom: 2026-02-12
    validUntil: 2027-02-12
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: GRANTED
    nonEuTransfer: DECLINED
    expired: false
  target:
    patientId: INT-COMPARE-EQUAL
    origin: CXX_TEST
    validFrom: 2026-02-12
    validUntil: 2027-02-12
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: GRANTED
    nonEuTransfer: DECLINED
    expired: false
---

# INT-COMPARE-EQUAL

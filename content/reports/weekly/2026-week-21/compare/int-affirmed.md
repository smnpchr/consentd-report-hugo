---
title: "INT-AFFIRMED"
patients: ["INT-AFFIRMED"]
date: 2026-05-24T20:00:02+02:00
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
      NON_EU_TRANSFER: true
    content:
      ACQUIRE_USE_STOCK: GRANTED
      ADDITIONAL_ACQUISITION: GRANTED
      RETROSPECTIVE_USAGE: GRANTED
      NON_EU_TRANSFER: GRANTED
  targetEvaluation:
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
  recency: EQUAL
  equality: EQUAL
consent:
  source:
    patientId: INT-AFFIRMED
    origin: CXX_PROD
    validFrom: 2026-04-19
    validUntil: 2031-04-19
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: GRANTED
    nonEuTransfer: GRANTED
    expired: false
  target:
    patientId: INT-AFFIRMED
    origin: CXX_TEST
    validFrom: 2026-04-19
    validUntil: 2031-04-19
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: GRANTED
    nonEuTransfer: GRANTED
    expired: false
---

# INT-AFFIRMED

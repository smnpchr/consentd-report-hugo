---
title: "INT-DECLINED"
patients: ["INT-DECLINED"]
date: 2026-05-19T18:30:02+02:00
severity: warning
sourceName: THS
targetName: CXX_PROD
rule:
  name: DECLINED_THS_EXISTING_LIMS
  stage: OPERATIONAL
  source:
    timeValidity: VALID
    aggregated:
    - DECLINED
    - REVOKED
  target:
    timeValidity: ANY
    aggregated:
    - AFFIRMED
  recency: SOURCE
  equality: ANY
  severity: WARNING
  actions:
  - INVALIDATE
  - REPORT
  onFail:
    severity: CRITICAL
    actions:
    - REPORT
  stopEvaluation: false
  description: "Abgelehnter Quell-Consent, Ziel hat bestehenden Import"
evaluation:
  sourceEvaluation:
    timeValidity: VALID
    aggregated: DECLINED
    affirmations:
      ACQUIRE_USE_STOCK: false
      ADDITIONAL_ACQUISITION: false
      RETROSPECTIVE_USAGE: false
      NON_EU_TRANSFER: false
    content:
      ACQUIRE_USE_STOCK: DECLINED
      ADDITIONAL_ACQUISITION: DECLINED
      RETROSPECTIVE_USAGE: DECLINED
      NON_EU_TRANSFER: DECLINED
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
  recency: SOURCE
  equality: NOT_EQUAL
consent:
  source:
    patientId: INT-DECLINED
    origin: THS
    validFrom: 2026-05-10
    validUntil: 2027-05-10
    acquireUseStock: DECLINED
    additionalAcquisition: DECLINED
    retrospectiveUsage: DECLINED
    nonEuTransfer: DECLINED
    expired: false
  target:
    patientId: INT-DECLINED
    origin: CXX_PROD
    validFrom: 2025-09-01
    validUntil: 2026-09-01
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: GRANTED
    nonEuTransfer: GRANTED
    expired: false
---

# INT-DECLINED

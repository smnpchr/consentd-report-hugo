---
title: "INT-INCONSISTENT"
date: 2026-05-19T18:30:03+02:00
severity: error
rule: INCONSISTENT_THS
actions: [REPORT]
ruleSpec:
  description: "Inkonsistenter THS-Consent"
  ths:
    aggregated: [INCONSISTENT]
  lims:
    aggregated: [ANY]
  recency: ANY
  equality: ANY
evaluation:
  ths:
    aggregated: INCONSISTENT
    validity: VALID
  lims:
    aggregated: EMPTY
    validity: NONE
  recency: ANY
  equality: ANY
consent:
  ths:
    acquireUseStock: REFUSED
    additionalAcquisition: GRANTED
    retrospectiveUsage: GRANTED
    nonEuTransfer: REFUSED
    validFrom: 2026-04-13
    validUntil: 2031-04-13
    expired: false
  lims:
    acquireUseStock: EMPTY
    additionalAcquisition: EMPTY
    retrospectiveUsage: EMPTY
    nonEuTransfer: EMPTY
---

# INT-INCONSISTENT

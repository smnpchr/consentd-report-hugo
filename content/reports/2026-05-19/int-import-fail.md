---
title: "INT-IMPORT-FAIL"
date: 2026-05-19T18:30:05+02:00
severity: critical
rule: NEW_AFFIRMED_THS
actions: [IMPORT, REPORT]
failureAction: IMPORT
failureReason: "LIMS REST API returned 503: Service Unavailable"
ruleSpec:
  description: "Neuer gültiger bestätigter Consent, LIMS leer"
  ths:
    aggregated: [AFFIRMED]
  lims:
    aggregated: [EMPTY]
  recency: ANY
  equality: ANY
evaluation:
  ths:
    aggregated: AFFIRMED
    validity: VALID
  lims:
    aggregated: EMPTY
    validity: NONE
  recency: ANY
  equality: ANY
consent:
  ths:
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: GRANTED
    nonEuTransfer: GRANTED
    validFrom: 2026-04-19
    validUntil: 2027-05-19
    expired: false
  lims:
    acquireUseStock: EMPTY
    additionalAcquisition: EMPTY
    retrospectiveUsage: EMPTY
    nonEuTransfer: EMPTY
---

# INT-IMPORT-FAIL

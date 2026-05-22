---
title: "INT-AFFIRMED"
date: 2026-05-19T18:30:01+02:00
severity: info
rule: NEW_AFFIRMED_THS
actions: [IMPORT, REPORT]
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

# INT-AFFIRMED

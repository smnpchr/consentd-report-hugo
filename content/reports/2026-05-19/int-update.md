---
title: "INT-UPDATE"
date: 2026-05-19T18:30:04+02:00
severity: warning
rule: UPDATED_AFFIRMED_THS
actions: [IMPORT, REPORT]
ruleSpec:
  description: "Aktualisierter bestätigter Consent, LIMS veraltet"
  ths:
    aggregated: [AFFIRMED]
  lims:
    aggregated: [AFFIRMED]
  recency: THS
  equality: NOT_EQUAL
evaluation:
  ths:
    aggregated: AFFIRMED
    validity: VALID
  lims:
    aggregated: AFFIRMED
    validity: VALID
  recency: THS
  equality: NOT_EQUAL
consent:
  ths:
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: GRANTED
    nonEuTransfer: REFUSED
    validFrom: 2026-03-01
    validUntil: 2027-03-01
    expired: false
  lims:
    acquireUseStock: GRANTED
    additionalAcquisition: REFUSED
    retrospectiveUsage: GRANTED
    nonEuTransfer: REFUSED
---

# INT-UPDATE

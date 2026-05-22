---
title: "INT-DECLINED"
date: 2026-05-19T18:30:02+02:00
severity: warning
rule: DECLINED_THS_EXISTING_LIMS
actions: [INVALIDATE, REPORT]
ruleSpec:
  description: "Abgelehnter THS-Consent, LIMS hat bestehenden Import"
  ths:
    aggregated: [DECLINED, REVOKED]
  lims:
    aggregated: [AFFIRMED]
  recency: THS
  equality: ANY
evaluation:
  ths:
    aggregated: DECLINED
    validity: VALID
  lims:
    aggregated: AFFIRMED
    validity: VALID
  recency: THS
  equality: ANY
consent:
  ths:
    acquireUseStock: REFUSED
    additionalAcquisition: REFUSED
    retrospectiveUsage: REFUSED
    nonEuTransfer: REFUSED
    validFrom: 2026-05-10
    validUntil: 2027-05-10
    expired: false
  lims:
    acquireUseStock: GRANTED
    additionalAcquisition: GRANTED
    retrospectiveUsage: GRANTED
    nonEuTransfer: GRANTED
---

# INT-DECLINED

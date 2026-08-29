# PHASE 26 & 27 — EVIDENCE CANDIDATE PROMOTION

## Overview
Meridian Intelligence acts as a sandbox for Green Corridors. However, once a corridor scenario is executed in reality, the calculations need to be locked and sent to the authoritative MeridianMRV Core.

## The Promotion Workflow
1. A `CalculationRun` is generated in Meridian Intelligence (Status: `CALCULATED`).
2. An Analyst reviews the results in the Control Tower.
3. The Analyst clicks "Promote to Evidence".
4. An `EvidenceCandidate` record is created.
5. The Intelligence API hashes the candidate (inputs, results, S-AIS data, Sentinel SAR validations).
6. The candidate is dispatched via Webhook to the MeridianMRV Core.
7. If accepted, the Core returns a blockchain/immutable hash and the local status becomes `PROMOTED`.

## API Endpoint
The endpoint `/evidence/promote` (built in Phase 27) handles this logic.

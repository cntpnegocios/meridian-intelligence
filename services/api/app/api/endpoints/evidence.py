"""Evidence Vault endpoint — Phase 8: SHA-256 provenance + cryptographic verification chain."""
import hashlib
import json
from datetime import datetime, timezone
from typing import List, Any, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.domain import Evidence

router = APIRouter()


# ---------------------------------------------------------------------------
# Pydantic schemas
# ---------------------------------------------------------------------------

class EvidenceCreate(BaseModel):
    authority: str
    source_url: Optional[str] = None
    captured_at: Optional[str] = None       # ISO-8601 string; defaults to now()
    parser_name: Optional[str] = None
    parser_version: Optional[str] = None
    extraction_method: Optional[str] = None
    observation_type: Optional[str] = None
    confidence: Optional[str] = "HIGH"
    raw_object_key: Optional[str] = None
    data_type: Optional[str] = None
    payload: Optional[dict] = None          # arbitrary JSON for SHA-256 hashing


class ValidationResponse(BaseModel):
    ais_latitude: float
    ais_longitude: float
    sar_detected: bool
    time_difference_minutes: int
    spatial_difference_meters: int
    position_confidence: float
    status: str
    sentinel_product_id: str


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _compute_sha256(data: dict) -> str:
    """Compute SHA-256 of a canonical JSON representation (sorted keys)."""
    canonical = json.dumps(data, sort_keys=True, default=str)
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.get("/", response_model=List[Any])
def list_evidence(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List evidence records from the database."""
    rows = db.execute(
        text("""
            SELECT id, authority, source_url, captured_at, sha256, sha256_hash,
                   parser_name, parser_version, extraction_method,
                   observation_type, confidence, raw_object_key,
                   human_validation_status, data_type, created_at
            FROM evidence
            ORDER BY created_at DESC
            OFFSET :skip LIMIT :limit
        """),
        {"skip": skip, "limit": limit},
    ).fetchall()
    return [dict(r._mapping) for r in rows]


@router.get("/{evidence_id}")
def get_evidence_by_id(evidence_id: UUID, db: Session = Depends(get_db)):
    """Get a single evidence record by UUID."""
    row = db.execute(
        text("""
            SELECT id, authority, source_url, captured_at, sha256, sha256_hash,
                   parser_name, parser_version, extraction_method,
                   observation_type, confidence, raw_object_key,
                   human_validation_status, data_type, created_at
            FROM evidence
            WHERE id = :eid
        """),
        {"eid": str(evidence_id)},
    ).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Evidence not found")
    return dict(row._mapping)


@router.get("/{evidence_id}/verify")
def verify_evidence(evidence_id: UUID, db: Session = Depends(get_db)):
    """
    Verify the cryptographic integrity of an evidence record.
    Re-computes SHA-256 from stored fields and compares with stored hash.
    """
    row = db.execute(
        text("""
            SELECT id, authority, source_url, captured_at, sha256, sha256_hash,
                   parser_name, parser_version, observation_type,
                   confidence, data_type, created_at
            FROM evidence
            WHERE id = :eid
        """),
        {"eid": str(evidence_id)},
    ).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Evidence not found")

    record = dict(row._mapping)
    # Re-compute hash from canonical representation
    payload_for_hash = {k: str(v) for k, v in record.items() if k not in ("sha256_hash", "created_at")}
    computed = _compute_sha256(payload_for_hash)
    stored = record.get("sha256_hash")

    verified = stored is not None and computed == stored

    # Log verification attempt in evidence_proofs
    try:
        db.execute(
            text("""
                INSERT INTO evidence_proofs (evidence_id, proof_type, proof_value, verifier)
                VALUES (:eid, 'SHA256', :pv, 'meridian_engine')
            """),
            {"eid": str(evidence_id), "pv": computed},
        )
        db.commit()
    except Exception:
        db.rollback()

    return {
        "evidence_id": str(evidence_id),
        "verified": verified,
        "stored_hash": stored,
        "computed_hash": computed,
        "match": verified,
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
        "verifier": "meridian_engine",
    }


@router.post("/", status_code=201)
def create_evidence(payload: EvidenceCreate, db: Session = Depends(get_db)):
    """
    Create a new evidence record with automatic SHA-256 hash.
    Hash is computed over the canonical JSON of the submitted payload.
    """
    data_for_hash = {
        "authority": payload.authority,
        "source_url": payload.source_url,
        "captured_at": payload.captured_at or datetime.now(timezone.utc).isoformat(),
        "parser_name": payload.parser_name,
        "parser_version": payload.parser_version,
        "observation_type": payload.observation_type,
        "confidence": payload.confidence,
        "data_type": payload.data_type,
        **(payload.payload or {}),
    }
    sha256_hash = _compute_sha256(data_for_hash)

    try:
        result = db.execute(
            text("""
                INSERT INTO evidence
                  (authority, source_url, captured_at, sha256, sha256_hash,
                   parser_name, parser_version, extraction_method,
                   observation_type, confidence, raw_object_key,
                   data_type, human_validation_status)
                VALUES
                  (:authority, :source_url,
                   COALESCE(:captured_at::timestamptz, now()),
                   :sha256_hash, :sha256_hash,
                   :parser_name, :parser_version, :extraction_method,
                   :observation_type, :confidence, :raw_object_key,
                   :data_type, 'PENDING')
                RETURNING id, sha256_hash, created_at
            """),
            {
                "authority": payload.authority,
                "source_url": payload.source_url,
                "captured_at": payload.captured_at,
                "sha256_hash": sha256_hash,
                "parser_name": payload.parser_name,
                "parser_version": payload.parser_version,
                "extraction_method": payload.extraction_method,
                "observation_type": payload.observation_type,
                "confidence": payload.confidence,
                "raw_object_key": payload.raw_object_key,
                "data_type": payload.data_type,
            },
        )
        row = result.fetchone()
        db.commit()
    except Exception as exc:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to create evidence: {exc}")

    return {
        "id": str(row.id),
        "sha256_hash": row.sha256_hash,
        "created_at": str(row.created_at),
        "message": "Evidence created with SHA-256 integrity hash",
    }


@router.post("/validate-position", response_model=ValidationResponse)
async def validate_ais_position_with_sar(
    latitude: float,
    longitude: float,
    timestamp_utc: str,
):
    """
    Validates a given AIS position against Sentinel-1 SAR imagery.
    This fulfills the Meridian Intelligence 'AIS Position Validation' capability.
    """
    from app.adapters.copernicus_provider import CopernicusProvider

    copernicus = CopernicusProvider()
    match = await copernicus.find_nearest_sar_detection(latitude, longitude, None)

    if not match:
        raise HTTPException(
            status_code=404,
            detail="No SAR imagery available for this temporal/spatial window.",
        )

    return ValidationResponse(
        ais_latitude=latitude,
        ais_longitude=longitude,
        sar_detected=True,
        time_difference_minutes=match["time_difference_minutes"],
        spatial_difference_meters=match["spatial_difference_meters"],
        position_confidence=match["confidence_score"],
        status=match["status"],
        sentinel_product_id=match["sentinel_product_id"],
    )

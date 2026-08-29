from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Any
from uuid import UUID

from app.db.session import get_db
from app.models.domain import Evidence

router = APIRouter()

@router.get("/", response_model=List[Any])
def read_evidence(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    evidence = db.query(Evidence).offset(skip).limit(limit).all()
    return evidence

@router.get("/{evidence_id}")
def read_evidence_by_id(evidence_id: UUID, db: Session = Depends(get_db)):
    evidence = db.query(Evidence).filter(Evidence.id == evidence_id).first()
    if not evidence:
        raise HTTPException(status_code=404, detail="Evidence not found")
    return evidence

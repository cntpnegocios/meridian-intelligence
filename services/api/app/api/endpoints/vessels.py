from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.db.session import get_db
from app.models.domain import Vessel
from app.schemas.api_models import VesselResponse, VesselBase

router = APIRouter()

@router.get("/", response_model=List[VesselResponse])
def read_vessels(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    vessels = db.query(Vessel).offset(skip).limit(limit).all()
    return vessels

@router.get("/{vessel_id}", response_model=VesselResponse)
def read_vessel(vessel_id: UUID, db: Session = Depends(get_db)):
    vessel = db.query(Vessel).filter(Vessel.id == vessel_id).first()
    if not vessel:
        raise HTTPException(status_code=404, detail="Vessel not found")
    return vessel

@router.post("/", response_model=VesselResponse, status_code=201)
def create_vessel(vessel_in: VesselBase, db: Session = Depends(get_db)):
    vessel = Vessel(**vessel_in.model_dump())
    db.add(vessel)
    db.commit()
    db.refresh(vessel)
    return vessel

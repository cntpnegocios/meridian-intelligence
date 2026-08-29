from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Any
from uuid import UUID

from app.db.session import get_db
from app.models.domain import Voyage
from app.adapters.ais_provider import AISProviderAdapter

router = APIRouter()

# Dependency injection for AIS Provider (mock for now)
def get_ais_provider() -> AISProviderAdapter:
    # In production, this would return SpireAdapter() or KplerAdapter() based on config
    from app.adapters.demo_ais_provider import DemoAISProvider
    return DemoAISProvider()

@router.get("/", response_model=List[Any])
def read_voyages(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    voyages = db.query(Voyage).offset(skip).limit(limit).all()
    return voyages

@router.get("/{voyage_id}/latest-position")
async def get_voyage_latest_position(
    voyage_id: UUID, 
    db: Session = Depends(get_db),
    ais_provider: AISProviderAdapter = Depends(get_ais_provider)
):
    voyage = db.query(Voyage).filter(Voyage.id == voyage_id).first()
    if not voyage:
        raise HTTPException(status_code=404, detail="Voyage not found")
        
    # Find vessel IMO
    # For now, just return a position from the provider
    # assuming we have a method to get IMO from vessel_id
    imo = "DEMO_IMO" 
    position = await ais_provider.get_latest_position(imo)
    return position

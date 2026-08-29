from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import Column, String, Float, Integer
from typing import List
from pydantic import BaseModel

from app.db.session import get_db, Base

router = APIRouter()

# SQLAlchemy Port Model (mirroring the DB schema)
class Port(Base):
    __tablename__ = "ports"
    unlocode = Column(String(5), primary_key=True)
    name = Column(String)
    country_code = Column(String(2))
    latitude = Column(Float)
    longitude = Column(Float)
    geofence_radius_meters = Column(Integer)

# Pydantic Port Schema
class PortResponse(BaseModel):
    unlocode: str
    name: str
    country_code: str
    latitude: float
    longitude: float
    geofence_radius_meters: int
    data_source: str = "OFFICIAL (UN/LOCODE)"
    
    class Config:
        from_attributes = True

@router.get("/search", response_model=List[PortResponse])
def search_ports(query: str = "", db: Session = Depends(get_db)):
    """Search port intelligence database by name or UN/LOCODE."""
    if not query:
        return db.query(Port).limit(50).all()
        
    search_term = f"%{query}%"
    ports = db.query(Port).filter(
        (Port.name.ilike(search_term)) | (Port.unlocode.ilike(search_term))
    ).limit(50).all()
    
    return ports

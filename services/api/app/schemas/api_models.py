from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from uuid import UUID
from app.models.domain import DataGovernanceStatus, ConfidenceLevel

class VesselBase(BaseModel):
    imo_number: str
    name: str
    flag: str
    vessel_type: str

class VesselResponse(VesselBase):
    id: UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class AISObservationBase(BaseModel):
    vessel_id: UUID
    observed_at: datetime
    latitude: float
    longitude: float
    sog_knots: Optional[float] = None
    cog_degrees: Optional[float] = None
    provider: str
    confidence: ConfidenceLevel
    data_status: DataGovernanceStatus

class AISObservationResponse(AISObservationBase):
    id: UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from uuid import UUID
from app.models.domain import DataGovernanceStatus, ConfidenceLevel, AISCollectionType

class VesselBase(BaseModel):
    imo_number: str
    mmsi: Optional[str] = None
    name: str
    flag: str
    vessel_type: str
    build_year: Optional[int] = None
    gross_tonnage: Optional[float] = None
    dwt: Optional[float] = None
    length_m: Optional[float] = None
    beam_m: Optional[float] = None
    max_draft_m: Optional[float] = None
    engine_type: Optional[str] = None
    engine_power_kw: Optional[float] = None
    primary_fuel_type: Optional[str] = None
    service_speed_knots: Optional[float] = None
    design_speed_knots: Optional[float] = None
    eexi: Optional[float] = None
    cii_rating: Optional[str] = None

class VesselResponse(VesselBase):
    id: UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class AircraftBase(BaseModel):
    tail_number: str
    icao_type_code: str
    manufacturer: Optional[str] = None
    model: Optional[str] = None
    build_year: Optional[int] = None
    mtow_kg: Optional[float] = None
    max_range_nm: Optional[float] = None
    cruise_speed_knots: Optional[float] = None
    fuel_capacity_liters: Optional[float] = None
    primary_fuel_type: str = "Jet A-1"
    engine_type: Optional[str] = None
    engine_count: Optional[int] = None

class AircraftResponse(AircraftBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

class AISObservationBase(BaseModel):
    vessel_id: UUID
    mmsi: Optional[str] = None
    observed_at: datetime
    latitude: float
    longitude: float
    sog_knots: Optional[float] = None
    cog_degrees: Optional[float] = None
    heading: Optional[float] = None
    navigation_status: Optional[str] = None
    collection_type: AISCollectionType
    position_accuracy: Optional[bool] = None
    provider: str
    confidence: ConfidenceLevel
    data_status: DataGovernanceStatus
    evidence_id: Optional[UUID] = None

class AISObservationResponse(AISObservationBase):
    id: UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class VoyageSimulationRequest(BaseModel):
    vessel_id: UUID
    distance_nm: float
    target_speed_knots: Optional[float] = None
    regulatory_scope_percent: float = 100.0 # 100 for intra-EU, 50 for extra-EU

class RegulatoryResult(BaseModel):
    eu_ets_cost_eur: float
    eu_ets_chargeable_co2: float
    fueleu_ghg_intensity: float
    fueleu_compliant: bool
    fueleu_penalty_eur: float
    total_regulatory_cost_eur: float

class EvidenceProof(BaseModel):
    hash: str
    timestamp: str
    methodology: str

class VoyageSimulationResponse(BaseModel):
    vessel_imo: str
    vessel_name: str
    route_distance_nm: float
    speed_knots: float
    time_hours: float
    time_days: float
    engine_load_pct: float
    power_required_kw: float
    fuel_type: str
    fuel_consumed_tonnes: float
    energy_consumed_mj: float
    ttw_co2_tonnes: float
    fuel_cost_usd: float
    regulatory: RegulatoryResult
    evidence: EvidenceProof

class LegRequest(BaseModel):
    mode: str  # 'TRUCK', 'VESSEL', 'AIR'
    origin: str
    destination: str
    distance_km: float
    asset_id: Optional[UUID] = None

class MultimodalRouteRequest(BaseModel):
    booking_reference: str
    cargo_weight_tonnes: float
    legs: List[LegRequest]

class LegResult(BaseModel):
    mode: str
    co2_tonnes: float
    data_source: str  # e.g., 'meridian_estimate', 'greensee_ai'
    distance_km: float

class MultimodalRouteResponse(BaseModel):
    booking_reference: str
    terrestrial_co2: float
    maritime_co2: float
    air_co2: float
    total_co2e: float
    cpr_verde_eligible: bool
    legs: List[LegResult]
    evidence_hash: str

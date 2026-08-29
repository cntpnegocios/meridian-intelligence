from sqlalchemy import Column, String, Float, Boolean, DateTime, ForeignKey, Enum, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import enum
import uuid
from app.db.session import Base

class DataGovernanceStatus(str, enum.Enum):
    MEASURED = "MEASURED"
    REPORTED = "REPORTED"
    VERIFIED = "VERIFIED"
    ESTIMATED = "ESTIMATED"
    INFERRED = "INFERRED"
    STALE = "STALE"
    UNAVAILABLE = "UNAVAILABLE"

class ConfidenceLevel(str, enum.Enum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"
    UNAVAILABLE = "UNAVAILABLE"

class Vessel(Base):
    __tablename__ = "vessels"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    imo_number = Column(String, unique=True)
    name = Column(String)
    flag = Column(String)
    vessel_type = Column(String)
    created_at = Column(DateTime, server_default=text("now()"))

class Voyage(Base):
    __tablename__ = "voyages"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vessel_id = Column(UUID(as_uuid=True), ForeignKey("vessels.id"))
    external_project_id = Column(String)
    origin_port_unlocode = Column(String)
    destination_port_unlocode = Column(String)
    departure_at = Column(DateTime)
    arrival_at = Column(DateTime)
    status = Column(String, default="PLANNED")
    created_at = Column(DateTime, server_default=text("now()"))

class PortCall(Base):
    __tablename__ = "port_calls"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vessel_id = Column(UUID(as_uuid=True), ForeignKey("vessels.id"))
    voyage_id = Column(UUID(as_uuid=True), ForeignKey("voyages.id"))
    port_unlocode = Column(String, nullable=False)
    arrival_at = Column(DateTime)
    departure_at = Column(DateTime)
    is_intermediate_stop = Column(Boolean, default=False)
    status = Column(Enum(DataGovernanceStatus), default=DataGovernanceStatus.UNAVAILABLE)
    created_at = Column(DateTime, server_default=text("now()"))

class VoyageLeg(Base):
    __tablename__ = "voyage_legs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    voyage_id = Column(UUID(as_uuid=True), ForeignKey("voyages.id"))
    start_port_call_id = Column(UUID(as_uuid=True), ForeignKey("port_calls.id"))
    end_port_call_id = Column(UUID(as_uuid=True), ForeignKey("port_calls.id"))
    distance_nm = Column(Float)
    distance_status = Column(Enum(DataGovernanceStatus), default=DataGovernanceStatus.UNAVAILABLE)
    created_at = Column(DateTime, server_default=text("now()"))

class AISObservation(Base):
    __tablename__ = "ais_observations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vessel_id = Column(UUID(as_uuid=True), ForeignKey("vessels.id"))
    observed_at = Column(DateTime, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    sog_knots = Column(Float)
    cog_degrees = Column(Float)
    provider = Column(String, nullable=False)
    confidence = Column(Enum(ConfidenceLevel), default=ConfidenceLevel.UNAVAILABLE)
    data_status = Column(Enum(DataGovernanceStatus), default=DataGovernanceStatus.MEASURED)
    ingestion_job_id = Column(String)
    created_at = Column(DateTime, server_default=text("now()"))

class Evidence(Base):
    __tablename__ = "evidence"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    authority = Column(String)
    source_url = Column(String, nullable=False)
    captured_at = Column(DateTime, nullable=False)
    sha256 = Column(String, nullable=False)
    parser_name = Column(String)
    parser_version = Column(String)
    extraction_method = Column(String)
    confidence = Column(Enum(ConfidenceLevel), default=ConfidenceLevel.UNAVAILABLE)
    raw_object_key = Column(String)
    human_validation_status = Column(String, default="PENDING")
    created_at = Column(DateTime, server_default=text("now()"))

class SourceRegistry(Base):
    __tablename__ = "source_registry"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    authority = Column(String, nullable=False)
    jurisdiction = Column(String)
    base_url = Column(String, nullable=False)
    access_method = Column(String, nullable=False)
    license = Column(String)
    collection_frequency = Column(String, nullable=False)
    parser_version = Column(String)
    last_success = Column(DateTime)
    last_failure = Column(DateTime)
    status = Column(String, default="ACTIVE")
    created_at = Column(DateTime, server_default=text("now()"))

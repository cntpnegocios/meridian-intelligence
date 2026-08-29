from datetime import datetime, timezone
from app.adapters.ais_provider import AISProviderAdapter
from app.schemas.api_models import AISObservationBase
from app.models.domain import DataGovernanceStatus, ConfidenceLevel, AISCollectionType
import uuid

class DemoAISProvider(AISProviderAdapter):
    """
    Demo AIS Provider for Sprint 1/2.
    Returns DEMO marked data to ensure no live data is fabricated.
    """
    async def get_latest_position(self, imo_number: str) -> AISObservationBase:
        return AISObservationBase(
            vessel_id=uuid.uuid4(),
            mmsi="123456789",
            observed_at=datetime.now(timezone.utc),
            latitude=-23.9618, # Santos
            longitude=-46.3322,
            sog_knots=14.5,
            cog_degrees=45.0,
            heading=45.0,
            navigation_status="Under way using engine",
            collection_type=AISCollectionType.SATELLITE,
            position_accuracy=True,
            provider="DEMO_PROVIDER",
            confidence=ConfidenceLevel.LOW,
            data_status=DataGovernanceStatus.UNAVAILABLE, # Marked as unavailable per spec
            evidence_id=None
        )

    async def get_historical_positions(self, imo_number: str, start_time: datetime, end_time: datetime) -> list[AISObservationBase]:
        return []

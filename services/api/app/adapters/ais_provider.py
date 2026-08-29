from abc import ABC, abstractmethod
from typing import List
from datetime import datetime
from app.schemas.api_models import AISObservationBase

class AISProviderAdapter(ABC):
    """
    Abstract interface for AIS/S-AIS Providers.
    Must be implemented by concrete adapters (e.g. SpireAdapter, KplerAdapter).
    """

    @abstractmethod
    async def get_latest_position(self, imo_number: str) -> AISObservationBase:
        """Fetch the latest position for a specific vessel."""
        pass

    @abstractmethod
    async def get_historical_positions(self, imo_number: str, start_time: datetime, end_time: datetime) -> List[AISObservationBase]:
        """Fetch historical positions for a vessel within a time window."""
        pass

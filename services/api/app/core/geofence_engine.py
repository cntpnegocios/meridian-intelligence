import math
from typing import Tuple

class GeofenceEngine:
    """
    Core logic for calculating geofence breaches.
    In a real production environment, this could be offloaded to PostGIS (ST_DWithin).
    """
    
    @staticmethod
    def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """
        Calculate the great circle distance between two points 
        on the earth (specified in decimal degrees) in meters.
        """
        R = 6371000  # radius of Earth in meters
        
        phi1 = math.radians(lat1)
        phi2 = math.radians(lat2)
        delta_phi = math.radians(lat2 - lat1)
        delta_lambda = math.radians(lon2 - lon1)
        
        a = math.sin(delta_phi/2.0)**2 + \
            math.cos(phi1) * math.cos(phi2) * \
            math.sin(delta_lambda/2.0)**2
            
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c

    @classmethod
    def check_port_arrival(cls, vessel_lat: float, vessel_lon: float, port_lat: float, port_lon: float, radius_meters: int) -> bool:
        """
        Check if a vessel is inside a port's geofence.
        """
        distance = cls.haversine(vessel_lat, vessel_lon, port_lat, port_lon)
        return distance <= radius_meters

    @classmethod
    def process_ais_observation(cls, db_session, ais_observation) -> None:
        """
        Workflow:
        1. Query active voyage for this vessel.
        2. Get destination port coordinates.
        3. If check_port_arrival() is true:
           - Mark voyage leg as COMPLETED
           - Create PortCall
           - Trigger Notification / Event
        """
        # Placeholder for Sprint 4 implementation
        pass

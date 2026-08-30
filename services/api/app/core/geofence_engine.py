from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List, Dict, Any

class GeofenceEngine:
    @staticmethod
    def process_ping(db: Session, vessel_id: str, lat: float, lon: float) -> List[Dict[str, Any]]:
        # 1. Find which zones the vessel is currently inside
        query_inside = text("""
            SELECT id, name, zone_type 
            FROM regulatory_zones 
            WHERE ST_Contains(geom, ST_SetSRID(ST_MakePoint(:lon, :lat), 4326))
        """)
        current_zones = db.execute(query_inside, {"lon": lon, "lat": lat}).fetchall()
        current_zone_ids = set([str(z[0]) for z in current_zones])

        # 3. Look up last known state
        query_state = text("""
            SELECT DISTINCT ON (zone_id) zone_id, event_type
            FROM geofence_events
            WHERE vessel_id = :v_id
            ORDER BY zone_id, event_time DESC
        """)
        last_events = db.execute(query_state, {"v_id": vessel_id}).fetchall()
        active_zone_ids = set([str(e[0]) for e in last_events if e[1] == 'ENTER'])

        new_events = []

        # 4. Deltas
        entered_zones = current_zone_ids - active_zone_ids
        exited_zones = active_zone_ids - current_zone_ids

        # 5. ENTER
        for z_id in entered_zones:
            db.execute(text("""
                INSERT INTO geofence_events (vessel_id, zone_id, event_type, latitude, longitude)
                VALUES (:v_id, :z_id, 'ENTER', :lat, :lon)
            """), {"v_id": vessel_id, "z_id": z_id, "lat": lat, "lon": lon})
            
            zone_info = next(z for z in current_zones if str(z[0]) == z_id)
            new_events.append({"type": "ENTER", "zone_name": zone_info[1], "zone_type": zone_info[2]})

        # 6. EXIT
        for z_id in exited_zones:
            db.execute(text("""
                INSERT INTO geofence_events (vessel_id, zone_id, event_type, latitude, longitude)
                VALUES (:v_id, :z_id, 'EXIT', :lat, :lon)
            """), {"v_id": vessel_id, "z_id": z_id, "lat": lat, "lon": lon})
            new_events.append({"type": "EXIT", "zone_id": z_id})

        if new_events:
            db.commit()

        return new_events

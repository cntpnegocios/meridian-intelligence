from sqlalchemy.orm import Session
from sqlalchemy import text
import json
from typing import Dict, Any

class RiskEngine:
    @staticmethod
    def evaluate_route(db: Session, geojson_linestring: Dict[str, Any]) -> Dict[str, Any]:
        """
        Takes a GeoJSON LineString (a voyage route) and intersects it with PostGIS Risk Zones
        (War, Piracy, Severe Weather). Calculates exposure in Nautical Miles.
        """
        geom_json = json.dumps(geojson_linestring)
        
        # PostGIS query: Intersect the LineString route with Risk Zones
        # Cast intersection to ::geography to accurately calculate distance over the Earth's curvature in meters
        query = text("""
            SELECT name, zone_type, description,
                   ST_Length(ST_Intersection(geom, ST_SetSRID(ST_GeomFromGeoJSON(:geojson), 4326))::geography) / 1852.0 AS exposed_nm
            FROM regulatory_zones
            WHERE zone_type IN ('WAR_RISK', 'PIRACY', 'WEATHER_WARNING')
              AND ST_Intersects(geom, ST_SetSRID(ST_GeomFromGeoJSON(:geojson), 4326))
        """)
        
        result = db.execute(query, {"geojson": geom_json}).fetchall()
        
        risks = []
        total_risk_score = 0.0
        
        for row in result:
            zone_name = row[0]
            zone_type = row[1]
            description = row[2]
            exposed_nm = float(row[3])
            
            # Risk Heuristics (1 to 10 scale multiplier)
            weight = 10 if zone_type in ('WAR_RISK', 'PIRACY') else 7
            zone_score = weight * exposed_nm
            total_risk_score += zone_score
            
            risks.append({
                "zone_name": zone_name,
                "risk_type": zone_type,
                "description": description,
                "exposure_nautical_miles": round(exposed_nm, 2),
                "severity_multiplier": weight,
                "zone_risk_score": round(zone_score, 2)
            })
            
        return {
            "safe_to_sail": len(risks) == 0,
            "total_risk_score": round(total_risk_score, 2),
            "critical_warnings": len([r for r in risks if r['risk_type'] == 'WAR_RISK']),
            "risk_factors": risks
        }

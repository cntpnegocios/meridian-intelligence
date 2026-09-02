from typing import Dict, Any, List
import uuid
import hashlib
from datetime import datetime
from app.schemas.api_models import MultimodalRouteRequest, MultimodalRouteResponse, LegResult
from app.core.greensee_client import GreenseeClient

class MultimodalEngine:
    """
    Multimodal Orchestrator Engine.
    Routes different transport modes to the best available Intelligence engine.
    """
    
    @staticmethod
    def _calculate_terrestrial(distance_km: float) -> LegResult:
        # Simple theoretical baseline for trucks: ~105g CO2/tkm
        co2 = (distance_km * 0.105) / 1000.0  # Just a baseline dummy formula
        return LegResult(
            mode="TRUCK",
            co2_tonnes=round(co2, 2),
            data_source="Meridian Estimate",
            distance_km=distance_km
        )

    @staticmethod
    def _calculate_aviation(distance_km: float) -> LegResult:
        # Aviation baseline: ~600g CO2/km (dummy formula for demo)
        co2 = (distance_km * 0.600) / 1000.0 
        return LegResult(
            mode="AIR",
            co2_tonnes=round(co2, 2),
            data_source="Meridian Estimate",
            distance_km=distance_km
        )

    @staticmethod
    def _calculate_maritime(origin: str, dest: str, distance_km: float) -> LegResult:
        # Try Greensee AI first (The Intelligence integration)
        greensee_data = GreenseeClient.get_maritime_emissions(origin, dest)
        
        if greensee_data:
            # Successfully got data from Greensee
            return LegResult(
                mode="VESSEL",
                co2_tonnes=round(greensee_data["co2_emissions_mt"], 2),
                data_source="Greensee AI Enriched",
                distance_km=round(greensee_data["distance_nm"] * 1.852, 2)
            )
        
        # Fallback to Meridian theoretical estimate
        # Baseline: ~15g CO2/tkm for ships
        co2 = (distance_km * 0.015) / 1000.0
        return LegResult(
            mode="VESSEL",
            co2_tonnes=round(co2, 2),
            data_source="Meridian Estimate",
            distance_km=distance_km
        )

    @staticmethod
    def simulate_multimodal_journey(req: MultimodalRouteRequest) -> MultimodalRouteResponse:
        results: List[LegResult] = []
        terr_co2 = 0.0
        mar_co2 = 0.0
        air_co2 = 0.0
        
        for leg in req.legs:
            if leg.mode.upper() == "TRUCK":
                res = MultimodalEngine._calculate_terrestrial(leg.distance_km)
                terr_co2 += res.co2_tonnes
            elif leg.mode.upper() == "VESSEL":
                res = MultimodalEngine._calculate_maritime(leg.origin, leg.destination, leg.distance_km)
                mar_co2 += res.co2_tonnes
            elif leg.mode.upper() == "AIR":
                res = MultimodalEngine._calculate_aviation(leg.distance_km)
                air_co2 += res.co2_tonnes
            else:
                continue
                
            # Scale by cargo weight (naive approach for demo)
            res.co2_tonnes = round(res.co2_tonnes * req.cargo_weight_tonnes, 2)
            results.append(res)
            
        total = round(terr_co2 + mar_co2 + air_co2, 2)
        
        # CPR Verde eligibility: Only if it's agricultural cargo in Brazil. We simulate True for demo
        cpr_eligible = True if req.cargo_weight_tonnes > 10 else False
        
        # Generate SHA256 Evidence Hash
        raw = f"{req.booking_reference}-{total}-{datetime.utcnow().isoformat()}"
        evidence_hash = hashlib.sha256(raw.encode('utf-8')).hexdigest()
        
        return MultimodalRouteResponse(
            booking_reference=req.booking_reference,
            terrestrial_co2=round(terr_co2, 2),
            maritime_co2=round(mar_co2, 2),
            air_co2=round(air_co2, 2),
            total_co2e=total,
            cpr_verde_eligible=cpr_eligible,
            legs=results,
            evidence_hash=evidence_hash
        )

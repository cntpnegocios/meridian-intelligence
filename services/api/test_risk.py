import asyncio
import httpx
from datetime import datetime, timezone

async def run_risk_test():
    # 1. Rota Suicida que cruza o Mar Vermelho e vai para o Golfo do México (Furacão Milton)
    suicide_route = {
        "type": "LineString",
        "coordinates": [
            [43.0, 15.0],  # Mar Vermelho (WAR_RISK) - Pirataria Houthi
            [44.0, 14.0],
            [30.0, 30.0],  # Meio do caminho (Safe)
            [-82.0, 24.0], # Dentro do Golfo do México (WEATHER_WARNING - Hurricane)
            [-86.0, 26.0]  # Furacão
        ]
    }
    
    # 2. Rota Segura (Do Brasil para a Europa)
    safe_route = {
        "type": "LineString",
        "coordinates": [
            [-46.0, -24.0], # Santos
            [-30.0, -10.0], # Oceano Atlantico (Safe)
            [-10.0, 30.0],  # Costa da África
            [4.0, 51.9]     # Rotterdam
        ]
    }

    async with httpx.AsyncClient() as client:
        print("===== RISK ENGINE EVALUATION =====")
        
        print("\\n1. Evaluating Safe Route (Santos -> Rotterdam):")
        r_safe = await client.post("http://localhost:8000/api/v1/risk/evaluate-route", json=safe_route)
        print(r_safe.json())

        print("\\n2. Evaluating Suicide Route (Red Sea -> Hurricane):")
        r_suicide = await client.post("http://localhost:8000/api/v1/risk/evaluate-route", json=suicide_route)
        print(r_suicide.json())

if __name__ == "__main__":
    asyncio.run(run_risk_test())

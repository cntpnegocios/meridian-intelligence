# PHASE 18 & 19 — AI AGENT EVALUATION (REGULATORY INTELLIGENCE)

## The Problem
Meridian Intelligence needs to track shifting maritime regulations (EU ETS, FuelEU Maritime, IMO CI) and map them to Green Corridor scenarios. Regulatory documents are unstructured PDFs, HTML pages, and fragmented government notices.

## Scrapling (Web Scraping Agent)
- **Role:** Autonomous extraction of regulatory texts from known maritime authority URLs (e.g. EMSA, IMO, Sefaz).
- **Pros:** Fast, avoids legacy BeautifulSoup maintenance, handles modern web structures.
- **Decision:** Use Scrapling for the initial data ingestion layer to build the Regulatory Corpus.

## Agent OS (Orchestration & Reasoning)
- **Role:** Parse the scraped corpus, answer complex domain questions ("Does FuelEU apply to a 4999 GT vessel on a Santos-Rotterdam route?"), and calculate exposure.
- **Decision:** Use an Agent OS framework (e.g. LangChain / CrewAI / Semantic Kernel) inside the Intelligence layer.
- **Security:** Ensure agents only read from the Corpus and never execute untrusted code or modify the MRV core.

## Target Flow
1. `RegulatoryScraper` (Scrapling) runs weekly -> dumps to `docs/intelligence/corpus/`.
2. `RegulatoryAgent` (Agent OS) indexes the corpus.
3. `/corridors/calculator` invokes the Agent: "Assess FuelEU penalty risk for Scenario X".
4. Agent returns risk score and reasoning.

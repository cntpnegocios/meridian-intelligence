from abc import ABC, abstractmethod

class BaseScraper(ABC):
    """
    Abstract base class for all regulatory and maritime evidence scrapers.
    """
    @property
    @abstractmethod
    def source_id(self) -> str:
        """The source_registry ID this scraper is responsible for."""
        pass

    @abstractmethod
    async def scrape(self) -> list[dict]:
        """
        Executes the scraping process.
        Returns a list of raw evidence objects ready to be hashed and stored.
        """
        pass

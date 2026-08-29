export async function checkHealth(): Promise<'LIVE' | 'API UNAVAILABLE'> {
  try {
    const response = await fetch('/api/health', { method: 'GET' });
    if (!response.ok) {
      return 'API UNAVAILABLE';
    }
    return 'LIVE';
  } catch (error) {
    return 'API UNAVAILABLE';
  }
}

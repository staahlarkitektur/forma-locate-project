export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
  try {
    const res = await fetch(url, {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'Forma-Locate-Project-Extension/1.0',
      },
    })
    if (!res.ok) return null
    const data = await res.json() as { display_name?: string }
    return data.display_name ?? null
  } catch {
    return null
  }
}

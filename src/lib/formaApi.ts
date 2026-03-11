import { Forma } from 'forma-embedded-view-sdk/auto'

export interface LocationData {
  lat: number
  lng: number
}

export interface ProjectData {
  name: string
  timezone: string
  projectId: string
  region: 'eu' | 'us'
}

export interface FormaProjectInfo {
  location: LocationData | null
  project: ProjectData
}

function localToLatLng(
  x: number,
  y: number,
  originLat: number,
  originLng: number,
): LocationData {
  const lat = originLat + y / 111320
  const lng = originLng + x / (111320 * Math.cos((originLat * Math.PI) / 180))
  return { lat, lng }
}

async function getSiteLimitCentroid(
  originLat: number,
  originLng: number,
): Promise<LocationData | null> {
  const paths = await Forma.geometry.getPathsByCategory({ category: 'site_limit' })
  if (!paths.length) return null

  const footprint = await Forma.geometry.getFootprint({ path: paths[0] })
  if (!footprint || !footprint.coordinates.length) return null

  const coords = footprint.coordinates
  const cx = coords.reduce((sum, [x]) => sum + x, 0) / coords.length
  const cy = coords.reduce((sum, [, y]) => sum + y, 0) / coords.length

  return localToLatLng(cx, cy, originLat, originLng)
}

export async function loadProjectInfo(): Promise<FormaProjectInfo> {
  const [rawProject, geoLocation] = await Promise.all([
    Forma.project.get(),
    Forma.project.getGeoLocation(),
  ])

  let location: LocationData | null = null
  if (geoLocation) {
    const [originLat, originLng] = geoLocation
    location = await getSiteLimitCentroid(originLat, originLng)
      ?? { lat: originLat, lng: originLng }
  }

  return {
    location,
    project: {
      name: rawProject.name,
      timezone: rawProject.timezone,
      projectId: Forma.getProjectId(),
      region: Forma.getRegion() === 'EMEA' ? 'eu' : 'us',
    },
  }
}

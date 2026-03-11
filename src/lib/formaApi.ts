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

export async function loadProjectInfo(): Promise<FormaProjectInfo> {
  const [rawProject, geoLocation] = await Promise.all([
    Forma.project.get(),
    Forma.project.getGeoLocation(),
  ])

  return {
    location: geoLocation ? { lat: geoLocation[0], lng: geoLocation[1] } : null,
    project: {
      name: rawProject.name,
      timezone: rawProject.timezone,
      projectId: Forma.getProjectId(),
      region: Forma.getRegion() === 'EMEA' ? 'eu' : 'us',
    },
  }
}

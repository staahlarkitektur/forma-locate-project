import { useEffect, useState } from 'react'
import { loadProjectInfo } from './lib/formaApi'
import { reverseGeocode } from './lib/geocode'
import type { FormaProjectInfo } from './lib/formaApi'
import { GoogleMapEmbed } from './components/GoogleMapEmbed'
import { CoordinateDisplay } from './components/CoordinateDisplay'
import { ProjectMetadata } from './components/ProjectMetadata'

function App() {
  const [data, setData] = useState<FormaProjectInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [addressLoading, setAddressLoading] = useState(false)

  useEffect(() => {
    loadProjectInfo()
      .then((info) => {
        setData(info)
        if (info.location) {
          setAddressLoading(true)
          reverseGeocode(info.location.lat, info.location.lng)
            .then(setAddress)
            .finally(() => setAddressLoading(false))
        }
      })
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : 'Failed to load project data')
      )
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="px-4 py-2 border-b border-gray-200 flex-shrink-0">
        <span className="text-sm font-semibold text-gray-700">Locate Project</span>
      </header>

      {/* Loading */}
      {loading && (
        <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
          Loading project location…
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="m-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* No geolocation */}
      {!loading && !error && data && !data.location && (
        <div className="m-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
          <p className="font-medium mb-1">No location data available</p>
          <p>This Forma project does not have geographic coordinates set. Location data is configured when the project is created.</p>
        </div>
      )}

      {/* Success */}
      {!loading && !error && data && data.location && (
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Map */}
          <div className="flex-1 min-h-0">
            <GoogleMapEmbed lat={data.location.lat} lng={data.location.lng} />
          </div>

          {/* Info below map */}
          <div className="flex-shrink-0 border-t border-gray-100 px-4 py-3 space-y-3">
            <CoordinateDisplay
              lat={data.location.lat}
              lng={data.location.lng}
              address={address}
              addressLoading={addressLoading}
            />
            <div className="border-t border-gray-100 pt-3">
              <ProjectMetadata project={data.project} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

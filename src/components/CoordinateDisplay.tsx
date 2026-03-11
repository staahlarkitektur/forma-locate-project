import { useState } from 'react'

interface Props {
  lat: number
  lng: number
  address: string | null
  addressLoading: boolean
}


export function CoordinateDisplay({ lat, lng, address, addressLoading }: Props) {
  const [copied, setCopied] = useState(false)

  const decimalStr = `${lat.toFixed(6)}, ${lng.toFixed(6)}`
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`

  function handleCopy() {
    navigator.clipboard.writeText(decimalStr).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="space-y-2">
      {/* Address */}
      <div className="text-sm text-weave-text">
        {addressLoading ? (
          <span className="text-weave-text-secondary italic">Looking up address…</span>
        ) : address ? (
          <span>{address}</span>
        ) : null}
      </div>

      {/* Coordinates */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs text-weave-text-secondary">{decimalStr}</span>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 text-xs text-weave-twilight hover:opacity-75 font-medium transition-opacity"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Google Maps link */}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-weave-twilight hover:opacity-75 font-medium transition-opacity"
      >
        Open in Google Maps
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  )
}

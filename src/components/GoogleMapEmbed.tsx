interface Props {
  lat: number
  lng: number
}

export function GoogleMapEmbed({ lat, lng }: Props) {
  const src = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`
  return (
    <iframe
      src={src}
      className="w-full h-full border-0"
      loading="lazy"
      title="Project location"
    />
  )
}

"use client"

interface Location {
  lat: number
  lng: number
  name: string
  address: string
}

interface InteractiveMapProps {
  className?: string
  location: Location
}

export default function InteractiveMap({ className = "", location }: InteractiveMapProps) {
  // Generate Google Maps embed URL with the location
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.${location.lat}${location.lng}!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${location.lat}%2C${location.lng}!5e0!3m2!1sen!2sus!4v${Date.now()}!5m2!1sen!2sus`

  return (
    <iframe 
      src={mapUrl}
      className={`w-full h-full ${className}`}
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
} 
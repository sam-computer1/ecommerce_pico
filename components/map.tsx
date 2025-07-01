"use client"

import { useEffect, useState } from 'react'

interface Location {
  lat: number
  lng: number
  name: string
  address: string
}

interface MapProps {
  className?: string
  location: Location
}

export default function Map({ className = "", location }: MapProps) {
  const [mapUrl, setMapUrl] = useState<string>('')
  
  useEffect(() => {
    // Set map URL only on client side
    setMapUrl("https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7839.16529965385!2d106.652492!3d10.766613!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fa5e3e68613%3A0x47bc8460635e0f28!2sPICo.!5e0!3m2!1sen!2sin!4v1746437167571!5m2!1sen!2sin")
  }, [])

  // Don't render until URL is available on client
  if (!mapUrl) {
    return <div className={`w-full h-full bg-gray-100 flex items-center justify-center ${className}`}>Loading map...</div>
  }

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
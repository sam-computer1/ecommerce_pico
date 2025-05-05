"use client"

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
  // Generate Google Maps embed URL - now using the same URL for all locations
  const getMapUrl = () => {
    // New map URL for PICo. location
    return "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7839.16529965385!2d106.652492!3d10.766613!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fa5e3e68613%3A0x47bc8460635e0f28!2sPICo.!5e0!3m2!1sen!2sin!4v1746437167571!5m2!1sen!2sin"
  };

  return (
    <iframe 
      src={getMapUrl()}
      className={`w-full h-full ${className}`}
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
} 
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
  // Generate Google Maps embed URL with specific locations
  const getMapUrl = () => {
    // Specific locations based on the selection
    if (location.name === "New York") {
      // Times Square, New York
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5825801099486!2d106.6499116113197!3d10.766618359328842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fa5e3e68613%3A0x47bc8460635e0f28!2sPICo.!5e0!3m2!1sen!2sin!4v1742281528437!5m2!1sen!2sin"
      } else if (location.name === "Shanghai") {
      // Nanjing Road, Shanghai
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3411.9961547804815!2d121.47119132511542!3d31.23030996760856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35b270fe01e1993f%3A0x5577d0e58781af38!2sNanjing%20Road%20Pedestrian%20Street!5e0!3m2!1sen!2sus!4v1697931327225!5m2!1sen!2sus";
    } else {
      // Linking Road, Bandra, Mumbai
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.451097451025!2d72.83199457508893!3d19.0630912537775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c93e7e00a045%3A0x6dab2c9db5ca346e!2sLinking%20Rd%2C%20Bandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1697931424062!5m2!1sen!2sin";
    }
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
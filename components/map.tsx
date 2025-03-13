"use client"

interface MapProps {
  className?: string
}

export default function Map({ className = "" }: MapProps) {
  return (
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5826485260723!2d106.6524919!3d10.7666131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fa5e3e68613%3A0x47bc8460635e0f28!2sPICo.!5e0!3m2!1sen!2sin!4v1741882353257!5m2!1sen!2sin"
      className={`w-full h-full ${className}`}
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
} 
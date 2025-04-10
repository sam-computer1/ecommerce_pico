"use client"

import { MapPin, Phone, Mail, Clock } from "lucide-react"
import Map from "@/components/map"
import { useState } from "react"

// Store coordinates for each location
const STORE_LOCATIONS = {
  newYork: {
    lat: 40.758564,
    lng: -73.989135,
    name: "New York",
    address: "Times Square, Manhattan, NY 10036"
  },
  shanghai: {
    lat: 31.230310,
    lng: 121.471191,
    name: "Shanghai",
    address: "Nanjing Road Pedestrian Street, Huangpu District"
  },
  mumbai: {
    lat: 19.063091,
    lng: 72.831995,
    name: "Mumbai",
    address: "Linking Road, Bandra West, Maharashtra"
  }
}

export default function ContactPage() {
  const [selectedLocation, setSelectedLocation] = useState(STORE_LOCATIONS.newYork)

  return (
    <main className="flex-1 bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Contact Us</h1>
          <p className="text-lg mb-8 text-foreground/80">
            We'd love to hear from you. Please reach out directly to one of our locations.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Locations</h2>
          
          {/* Horizontal card layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* New York Store */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30 h-full">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#1A1A1A] dark:text-[#EAEAEA] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[#1A1A1A] dark:text-[#EAEAEA]">New York</p>
                  <p className="text-[#5E5E5E] dark:text-[#C0C0C0]">Times Square, Manhattan, NY 10036</p>
                  <div className="mt-2 text-[#5E5E5E] dark:text-[#C0C0C0]">
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Email: newyork@modernkicks.com</p>
                    <p className="mt-1 text-sm">
                      Mon-Fri: 9am - 8pm<br />
                      Sat: 10am - 6pm<br />
                      Sun: 12pm - 5pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Shanghai Store */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30 h-full">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#1A1A1A] dark:text-[#EAEAEA] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[#1A1A1A] dark:text-[#EAEAEA]">Shanghai</p>
                  <p className="text-[#5E5E5E] dark:text-[#C0C0C0]">Nanjing Road Pedestrian Street, Huangpu District</p>
                  <div className="mt-2 text-[#5E5E5E] dark:text-[#C0C0C0]">
                    <p>Phone: +86 21 5555 8888</p>
                    <p>Email: shanghai@modernkicks.com</p>
                    <p className="mt-1 text-sm">
                      Mon-Fri: 10am - 9pm<br />
                      Sat-Sun: 11am - 8pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mumbai Store */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30 h-full">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#1A1A1A] dark:text-[#EAEAEA] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[#1A1A1A] dark:text-[#EAEAEA]">Mumbai</p>
                  <p className="text-[#5E5E5E] dark:text-[#C0C0C0]">Linking Road, Bandra West, Maharashtra</p>
                  <div className="mt-2 text-[#5E5E5E] dark:text-[#C0C0C0]">
                    <p>Phone: +91 22 3333 4444</p>
                    <p>Email: mumbai@modernkicks.com</p>
                    <p className="mt-1 text-sm">
                      Mon-Sat: 11am - 9pm<br />
                      Sun: 12pm - 7pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-[#1A1A1A] dark:text-[#EAEAEA]">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-[#000000] text-white p-2 rounded-full hover:bg-[#D4AF37] transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="bg-[#000000] text-white p-2 rounded-full hover:bg-[#D4AF37] transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="bg-[#000000] text-white p-2 rounded-full hover:bg-[#D4AF37] transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-[#1A1A1A] dark:text-[#EAEAEA]">Visit Our Stores</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30 overflow-hidden h-[400px]">
              <Map location={selectedLocation} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <button
                onClick={() => setSelectedLocation(STORE_LOCATIONS.newYork)}
                className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md dark:shadow-gray-900/30 transition-all duration-200 hover:shadow-lg dark:hover:shadow-gray-900/50 ${
                  selectedLocation.name === "New York" 
                    ? "ring-2 ring-[#D4AF37] dark:ring-[#D4AF37]" 
                    : ""
                }`}
              >
                <p className="font-semibold text-[#1A1A1A] dark:text-[#EAEAEA]">New York</p>
                <p className="text-[#5E5E5E] dark:text-[#C0C0C0] text-sm">Times Square, Manhattan, NY 10036</p>
              </button>
              <button
                onClick={() => setSelectedLocation(STORE_LOCATIONS.shanghai)}
                className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md dark:shadow-gray-900/30 transition-all duration-200 hover:shadow-lg dark:hover:shadow-gray-900/50 ${
                  selectedLocation.name === "Shanghai" 
                    ? "ring-2 ring-[#D4AF37] dark:ring-[#D4AF37]" 
                    : ""
                }`}
              >
                <p className="font-semibold text-[#1A1A1A] dark:text-[#EAEAEA]">Shanghai</p>
                <p className="text-[#5E5E5E] dark:text-[#C0C0C0] text-sm">Nanjing Road Pedestrian Street, Huangpu District</p>
              </button>
              <button
                onClick={() => setSelectedLocation(STORE_LOCATIONS.mumbai)}
                className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md dark:shadow-gray-900/30 transition-all duration-200 hover:shadow-lg dark:hover:shadow-gray-900/50 ${
                  selectedLocation.name === "Mumbai" 
                    ? "ring-2 ring-[#D4AF37] dark:ring-[#D4AF37]" 
                    : ""
                }`}
              >
                <p className="font-semibold text-[#1A1A1A] dark:text-[#EAEAEA]">Mumbai</p>
                <p className="text-[#5E5E5E] dark:text-[#C0C0C0] text-sm">Linking Road, Bandra West, Maharashtra</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
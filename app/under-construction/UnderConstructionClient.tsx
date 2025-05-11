"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Construction, ArrowLeft, Clock, Mail, CheckCircle, ArrowRight } from "lucide-react"
import ScrollToTop from "@/components/scroll-to-top"

export default function UnderConstructionClient() {
  return (
    <main className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4 text-primary">Coming Soon</h1>
            <p className="text-lg text-gray-600 mb-8">Our website is under construction. We'll be launching soon!</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                  We're Building Something Amazing
                </h2>
                <p className="text-lg text-gray-600 mb-8 text-center">
                  Our team is working hard to bring you a fantastic shopping experience. Check back soon!
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold">Coming Soon</h3>
                    <ul className="mt-4 space-y-2 text-gray-600">
                      <li className="flex items-center"><CheckCircle className="h-5 w-5 text-primary mr-2" /> Premium Products</li>
                      <li className="flex items-center"><CheckCircle className="h-5 w-5 text-primary mr-2" /> Exclusive Designs</li>
                      <li className="flex items-center"><CheckCircle className="h-5 w-5 text-primary mr-2" /> Fast Shipping</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold">Get Notified</h3>
                    <p className="text-gray-600">
                      Sign up to receive updates about our launch and special offers!
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="group text-black">
                    <Link href="/">
                      <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                      Return to Home
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="">
                    <Link href="/contact">
                      Contact Us
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </main>
  )
}


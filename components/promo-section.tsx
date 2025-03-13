"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

export default function PromoSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section ref={sectionRef} className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Offer</h2>
            <p className="text-gray-300 text-lg mb-6">Get 20% off on all running shoes. Limited time offer.</p>
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold">00</div>
                <div className="text-sm text-gray-400">Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">00</div>
                <div className="text-sm text-gray-400">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">00</div>
                <div className="text-sm text-gray-400">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">00</div>
                <div className="text-sm text-gray-400">Seconds</div>
              </div>
            </div>
            <Link
              href="/products"
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Shop Now
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px]"
          >
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Promotional shoes"
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}


"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"

export default function ProductCTA() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Performance Redefined</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Introducing our latest innovation in athletic footwear. Designed for maximum comfort and performance, no
              matter your sport or activity.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Revolutionary cushioning technology</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Breathable, lightweight materials</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Enhanced stability and support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Durable construction for long-lasting wear</span>
              </li>
            </ul>
            <Link href="/products/1" className="inline-flex items-center text-primary font-medium group">
              Explore the Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[500px] order-1 md:order-2"
          >
            <Image
              src="/placeholder.svg?height=1000&width=800"
              alt="Featured athletic shoe"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}


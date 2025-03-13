"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function ProductsHeader({ title, description, imageSrc, theme = "default" }) {
  let bgColor, textColor

  switch (theme) {
    case "dark":
      bgColor = "bg-gray-900"
      textColor = "text-white"
      break
    case "pink":
      bgColor = "bg-pink-100"
      textColor = "text-pink-900"
      break
    case "blue":
      bgColor = "bg-blue-100"
      textColor = "text-blue-900"
      break
    case "gray":
      bgColor = "bg-[#666666]"
      textColor = "text-white"
      break
    default:
      bgColor = "bg-gray-100"
      textColor = "text-gray-900"
  }

  return (
    <section className={`relative overflow-hidden ${bgColor} ${textColor}`}>
      <div className="absolute inset-0 z-0">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg md:text-xl opacity-80">{description}</p>
        </motion.div>
      </div>
    </section>
  )
}


"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface ProductsHeaderProps {
  title: string
  description: string
  imageSrc: string
  theme?: "default" | "gold" | "purple" | "skyblue" | "brown"
}

export default function ProductsHeader({ title, description, imageSrc, theme = "default" }: ProductsHeaderProps) {
  const themeStyles = {
    default: "bg-gray-100",
    gold: "bg-[#C9A959] text-white",
    purple: "bg-[#a35b8e] text-white",
    skyblue: "bg-[#6db1de] text-white",
    brown: "bg-[#8B5E3B] text-white"
  }

  let bgColor, textColor

  switch (theme) {
    case "brown":
      bgColor = "bg-[#8B5E3B]"
      textColor = "text-white"
      break
    case "skyblue":
      bgColor = "bg-[#6db1de]"
      textColor = "text-white"
      break
    case "gold":
      bgColor = "bg-[#C9A959]"
      textColor = "text-white"
      break
    default:
      bgColor = "bg-gray-100"
      textColor = "text-gray-900"
  }

  return (
    <section className={`relative overflow-hidden ${themeStyles[theme]}`}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover opacity-75" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
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


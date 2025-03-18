"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface Product {
  id: number
  name: string
  price: number
  category: string
  type: string
  image?: string
  isNew?: boolean
}

export default function ProductCard({ product, theme = "default" }: { product: Product; theme?: string }) {
  let accentColor

  switch (theme) {
    case "pink":
      accentColor = "bg-pink-500 hover:bg-pink-600 dark:bg-pink-700 dark:hover:bg-pink-800"
      break
    case "blue":
      accentColor = "bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
      break
    case "gray":
      accentColor = "bg-[#666666] hover:bg-[#555555] dark:bg-gray-700 dark:hover:bg-gray-800"
      break
    default:
      accentColor = "bg-primary hover:bg-primary/90"
  }

  return (
    <motion.div
      whileHover={{ y: -10 }}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        y: {
          type: "spring",
          stiffness: 300,
          damping: 15,
        },
      }}
      className="group product-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 dark:border dark:border-gray-700"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded z-10">
            NEW
          </span>
        )}
        {/* {product.discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">
            {product.discount}% OFF
          </span>
        )} */}

        {/* Simple hover overlay without action buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end mt-2">
          <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{product.type}</div>
        </div>
      </div>
    </motion.div>
  )
}


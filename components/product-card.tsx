"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useToast } from "@/components/ui/use-toast"
import { Heart, ShoppingCart } from "lucide-react"

export default function ProductCard({ product, theme = "default" }) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Add default color and size
    const productWithDefaults = {
      ...product,
      selectedColor: product.colors ? product.colors[0] : "black",
      selectedSize: product.sizes ? product.sizes[0] : "US 9",
      quantity: 1,
    }

    addToCart(productWithDefaults)

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart with default options.`,
    })
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (inWishlist) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

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
      <Link href={`/products/${product.id}`}>
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
          {product.discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">
              {product.discount}% OFF
            </span>
          )}

          {/* Action buttons overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end justify-end p-3">
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlistToggle}
                className={`p-2 rounded-full ${
                  inWishlist ? "bg-red-500 text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                } shadow-md hover:shadow-lg transition-all`}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="p-2 rounded-full bg-primary text-white shadow-md hover:shadow-lg transition-all"
                aria-label="Add to cart"
              >
                <ShoppingCart className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
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

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-baseline">
              <span className="text-lg font-bold dark:text-white">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < product.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.reviewCount})</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}


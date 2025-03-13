"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Heart, Minus, Plus, Share2, Star, ShoppingCart, Check } from "lucide-react"

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAdded, setIsAdded] = useState(false)

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()
  const inWishlist = isInWishlist(product.id)

  // Reset isAdded state after animation completes
  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isAdded])

  // Mock data for demo purposes
  const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"]
  const colors = ["black", "white", "red", "blue", "gray"]
  const images = [
    product.image || "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ]

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      })
      return
    }

    if (!selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      })
      return
    }

    addToCart({
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    })

    setIsAdded(true)

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlistToggle = () => {
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

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[500px] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-full"
                >
                  <Image
                    src={images[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div className="flex gap-2 overflow-auto pb-2">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 shadow-md transition-all ${
                    selectedImage === index
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Product view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
                )}
                {product.discount > 0 && (
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              <p className="text-sm text-green-600 mt-1">In stock and ready to ship</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(color)}
                      className={`h-8 w-8 rounded-full border-2 ${
                        selectedColor === color ? "border-gray-900 ring-2 ring-primary" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color: ${color}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`border rounded-md py-2 text-sm font-medium shadow-sm transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary/10 text-primary shadow-md"
                          : "border-gray-200 text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center border border-gray-200 rounded-md w-fit shadow-sm">
                  <motion.button
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={decreaseQuantity}
                    className="px-3 py-2 text-gray-600 hover:text-primary"
                  >
                    <Minus className="h-4 w-4" />
                  </motion.button>
                  <span className="px-4 py-2 text-center w-12">{quantity}</span>
                  <motion.button
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={increaseQuantity}
                    className="px-3 py-2 text-gray-600 hover:text-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 relative bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all overflow-hidden"
                onClick={handleAddToCart}
                disabled={isAdded}
              >
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.div
                      key="added"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center"
                    >
                      <Check className="h-5 w-5 mr-2" />
                      Added to Cart
                    </motion.div>
                  ) : (
                    <motion.div
                      key="add"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className={`flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all ${
                    inWishlist ? "text-red-500 border-red-500 hover:bg-red-50" : ""
                  }`}
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`h-5 w-5 ${inWishlist ? "fill-red-500" : ""}`} />
                  <span className="sr-only sm:not-sr-only sm:inline">
                    {inWishlist ? "In Wishlist" : "Add to Wishlist"}
                  </span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="icon" variant="outline" className="shadow-md hover:shadow-lg transition-all">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </motion.div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium mb-2">Product Description</h3>
              <p className="text-gray-600">
                {product.description ||
                  "Experience unparalleled comfort and style with these premium shoes. Designed with cutting-edge technology, they provide exceptional support for all-day wear. The breathable materials keep your feet cool, while the durable construction ensures long-lasting performance."}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-sm font-medium">Features</h4>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1">
                    <li>Breathable mesh upper</li>
                    <li>Cushioned insole</li>
                    <li>Durable rubber outsole</li>
                    <li>Reinforced heel counter</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Materials</h4>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1">
                    <li>Upper: Synthetic mesh</li>
                    <li>Lining: Textile</li>
                    <li>Insole: EVA foam</li>
                    <li>Outsole: Rubber</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


"use client"

import Link from "next/link"
import Image from "next/image"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

export default function WishlistContent() {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product) => {
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
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-8">Save items you love to your wishlist and find them all in one place.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      <AnimatePresence>
        {wishlistItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 bg-white p-4 rounded-lg shadow-md"
          >
            <div className="relative h-48 sm:h-40 sm:w-40 flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={item.image || "/placeholder.svg?height=200&width=200"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-medium">
                    <Link href={`/products/${item.id}`} className="hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </p>
                </div>
                <p className="text-lg font-medium">${item.price.toFixed(2)}</p>
              </div>

              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>

              <div className="mt-auto pt-4 flex flex-wrap gap-3 justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>

                <Button size="sm" className="bg-primary hover:bg-[#8a0505]" onClick={() => handleAddToCart(item)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}


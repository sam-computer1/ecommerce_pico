"use client"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function CartContent() {
  const { cartItems, updateQuantity, removeFromCart } = useCart()

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  const shipping = 5.99
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4 border-b py-4"
            >
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={item.image || "/placeholder.svg?height=200&width=200"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Size: {item.selectedSize} | Color: {item.selectedColor}
                    </p>
                  </div>
                  <p className="text-lg font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <button
                      onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 text-gray-600 hover:text-primary"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-1 text-center w-10">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                      className="px-2 py-1 text-gray-600 hover:text-primary"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button onClick={() => removeFromCart(item)} className="text-gray-500 hover:text-red-500">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="md:col-span-1">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Button className="w-full mt-6" size="lg" asChild>
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>

          <div className="mt-4 text-center">
            <Link href="/products" className="text-sm text-primary hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


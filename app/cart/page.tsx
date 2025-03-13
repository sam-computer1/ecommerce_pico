import type { Metadata } from "next"
import CartContent from "@/components/cart-content"

export const metadata: Metadata = {
  title: "Your Cart - Modern Footwear",
  description: "Review and checkout items in your shopping cart.",
}

export default function CartPage() {
  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 py-10 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        <CartContent />
      </div>
    </main>
  )
}


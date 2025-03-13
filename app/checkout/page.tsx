import type { Metadata } from "next"
import CheckoutForm from "@/components/checkout-form"

export const metadata: Metadata = {
  title: "Checkout - Modern Footwear",
  description: "Complete your purchase.",
}

export default function CheckoutPage() {
  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 py-10 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <CheckoutForm />
      </div>
    </main>
  )
}


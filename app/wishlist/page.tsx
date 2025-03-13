import type { Metadata } from "next"
import WishlistContent from "@/components/wishlist-content"

export const metadata: Metadata = {
  title: "Your Wishlist - Modern Footwear",
  description: "View and manage your saved items in your wishlist.",
}

export default function WishlistPage() {
  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        <WishlistContent />
      </div>
    </main>
  )
}


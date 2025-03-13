import type { Metadata } from "next"
import ProductsGrid from "@/components/products-grid"
import ProductsHeader from "@/components/products-header"
import { products } from "@/lib/products"

export const metadata: Metadata = {
  title: "Kids' Bags - Modern Footwear",
  description: "Browse our collection of kids' bags and accessories.",
}

export default function KidsBagsPage() {
  // Filter only kids' bags products
  const kidsBagsProducts = products
    .filter((product) => product.category === "kids")
    .slice(0, 4) // For demo purposes, just show some products
    .map((product) => ({
      ...product,
      name: `Kids' ${product.name} Bag`,
      description: `Premium kids' bag with exceptional durability and fun design.`,
      type: "bag",
    }))

  return (
    <main className="flex-1 bg-blue-50 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <ProductsHeader
        title="Kids' Bags Collection"
        description="Discover our premium selection of kids' bags designed for durability and fun."
        imageSrc="/placeholder.svg?height=500&width=1920"
        theme="blue"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid products={kidsBagsProducts} theme="blue" hideSearch={true} productType="bag" category="kids" />
      </div>
    </main>
  )
}


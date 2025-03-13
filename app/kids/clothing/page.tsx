import type { Metadata } from "next"
import ProductsGrid from "@/components/products-grid"
import ProductsHeader from "@/components/products-header"
import { products } from "@/lib/products"

export const metadata: Metadata = {
  title: "Kids' Clothing - Modern Footwear",
  description: "Browse our collection of kids' clothing for every occasion.",
}

export default function KidsClothingPage() {
  // Filter only kids' clothing products
  const kidsClothingProducts = products
    .filter((product) => product.category === "kids")
    .slice(0, 6) // For demo purposes, just show some products
    .map((product) => ({
      ...product,
      name: `Kids' ${product.name} Apparel`,
      description: `Premium kids' clothing with exceptional comfort and durability.`,
      type: "clothing",
    }))

  return (
    <main className="flex-1 bg-blue-50 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <ProductsHeader
        title="Kids' Clothing Collection"
        description="Discover our premium selection of kids' apparel designed for comfort and durability."
        imageSrc="/placeholder.svg?height=500&width=1920"
        theme="blue"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid
          products={kidsClothingProducts}
          theme="blue"
          hideSearch={true}
          productType="clothing"
          category="kids"
        />
      </div>
    </main>
  )
}


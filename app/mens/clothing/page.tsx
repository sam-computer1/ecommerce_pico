import type { Metadata } from "next"
import ProductsGrid from "@/components/products-grid"
import ProductsHeader from "@/components/products-header"
import { products } from "@/lib/products"

export const metadata: Metadata = {
  title: "Men's Clothing - Modern Footwear",
  description: "Browse our collection of men's clothing for every occasion.",
}

export default function MensClothingPage() {
  // Filter only men's clothing products
  const mensClothingProducts = products
    .filter((product) => product.category === "men")
    .slice(0, 6) // For demo purposes, just show some products
    .map((product) => ({
      ...product,
      name: `Men's ${product.name} Apparel`,
      description: `Premium men's clothing with exceptional comfort and style.`,
      type: "clothing",
    }))

  return (
    <main className="flex-1 bg-[#666666] transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <ProductsHeader
        title="Men's Clothing Collection"
        description="Discover our premium selection of men's apparel designed for style and comfort."
        imageSrc="/placeholder.svg?height=500&width=1920"
        theme="gray"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid
          products={mensClothingProducts}
          theme="gray"
          hideSearch={true}
          productType="clothing"
          category="men"
        />
      </div>
    </main>
  )
}


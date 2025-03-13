import type { Metadata } from "next"
import ProductsGrid from "@/components/products-grid"
import ProductsHeader from "@/components/products-header"
import { products } from "@/lib/products"

export const metadata: Metadata = {
  title: "Women's Clothing - Modern Footwear",
  description: "Browse our collection of women's clothing for every occasion.",
}

export default function WomensClothingPage() {
  // Filter only women's clothing products
  const womensClothingProducts = products
    .filter((product) => product.category === "women")
    .slice(0, 6) // For demo purposes, just show some products
    .map((product) => ({
      ...product,
      name: `Women's ${product.name} Apparel`,
      description: `Premium women's clothing with exceptional comfort and style.`,
      type: "clothing",
    }))

  return (
    <main className="flex-1 bg-pink-50 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <ProductsHeader
        title="Women's Clothing Collection"
        description="Discover our premium selection of women's apparel designed for style and comfort."
        imageSrc="/placeholder.svg?height=500&width=1920"
        theme="pink"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid
          products={womensClothingProducts}
          theme="pink"
          hideSearch={true}
          productType="clothing"
          category="women"
        />
      </div>
    </main>
  )
}


import type { Metadata } from "next"
import ProductsGrid from "@/components/products-grid"
import ProductsHeader from "@/components/products-header"
import { products } from "@/lib/products"

export const metadata: Metadata = {
  title: "Women's Bags - Modern Footwear",
  description: "Browse our collection of women's bags and accessories.",
}

export default function WomensBagsPage() {
  // Filter only women's bags products
  const womensBagsProducts = products
    .filter((product) => product.category === "women")
    .slice(0, 4) // For demo purposes, just show some products
    .map((product) => ({
      ...product,
      name: `Women's ${product.name} Bag`,
      description: `Premium women's bag with exceptional durability and style.`,
      type: "bag",
    }))

  return (
    <main className="flex-1 bg-[#FAF1E6] transition-colors duration-300 dark:bg-[#2E1A1A] dark:text-[#B3B3B3]">
      <ProductsHeader
        title="Women's Bags Collection"
        description="Discover our premium selection of women's bags designed for style and functionality."
        imageSrc="/placeholder.svg?height=500&width=1920"
        theme="purple"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid products={womensBagsProducts} theme="purple" hideSearch={true} productType="bag" category="women" />
      </div>
    </main>
  )
}


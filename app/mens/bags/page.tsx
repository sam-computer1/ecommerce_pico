import type { Metadata } from "next"
import ProductsGrid from "@/components/products-grid"
import ProductsHeader from "@/components/products-header"
import { products } from "@/lib/products"

export const metadata: Metadata = {
  title: "Men's Bags - Modern Footwear",
  description: "Browse our collection of men's bags and accessories.",
}

export default function MensBagsPage() {
  // Filter only men's bags products
  const mensBagsProducts = products
    .filter((product) => product.category === "men")
    .slice(0, 4) // For demo purposes, just show some products
    .map((product) => ({
      ...product,
      name: `Men's ${product.name} Bag`,
      description: `Premium men's bag with exceptional durability and style.`,
      type: "bag",
    }))

  return (
    <main className="flex-1 bg-[#F5F5F5] transition-colors duration-300 dark:bg-[#181818] dark:text-[#A1A1A1]">
      <ProductsHeader
        title="Men's Bags Collection"
        description="Discover our premium selection of men's bags designed for style and functionality."
        imageSrc="/placeholder.svg?height=500&width=1920"
        theme="brown"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid products={mensBagsProducts} theme="brown" hideSearch={true} productType="bag" category="men" />
      </div>
    </main>
  )
}


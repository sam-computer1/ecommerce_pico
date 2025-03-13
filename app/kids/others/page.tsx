import type { Metadata } from "next"
import ProductsGrid from "@/components/products-grid"
import ProductsHeader from "@/components/products-header"
import { products } from "@/lib/products"

export const metadata: Metadata = {
  title: "Kids' Accessories - Modern Footwear",
  description: "Browse our collection of kids' accessories and other items.",
}

export default function KidsOthersPage() {
  // Filter only kids' other products
  const kidsOtherProducts = products
    .filter((product) => product.category === "kids")
    .slice(0, 3) // For demo purposes, just show some products
    .map((product) => ({
      ...product,
      name: `Kids' ${product.name} Accessory`,
      description: `Premium kids' accessory with exceptional quality and fun design.`,
      type: "accessory",
    }))

  return (
    <main className="flex-1 bg-blue-50 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <ProductsHeader
        title="Kids' Accessories"
        description="Discover our premium selection of kids' accessories that are both fun and functional."
        imageSrc="/placeholder.svg?height=500&width=1920"
        theme="blue"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid products={kidsOtherProducts} theme="blue" hideSearch={true} productType="other" category="kids" />
      </div>
    </main>
  )
}


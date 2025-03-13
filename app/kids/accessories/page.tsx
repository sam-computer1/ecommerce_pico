import type { Metadata } from "next"
import ProductsGrid from "@/components/products-grid"
import ProductsHeader from "@/components/products-header"
import { products } from "@/lib/products"

export const metadata: Metadata = {
  title: "Kids' Accessories - Modern Footwear",
  description: "Browse our collection of kids' accessories for every occasion.",
}

export default function KidsAccessoriesPage() {
  // Filter only kids' accessories products
  const kidsAccessoriesProducts = products
    .filter((product) => product.category === "kids" && product.type === "accessory")
    .slice(0, 6) // For demo purposes, just show some products
    .map((product) => ({
      ...product,
      name: `Kids' ${product.name} Accessory`,
      description: `Premium kids' accessories with exceptional quality and style.`,
      type: "accessory",
    }))

  return (
    <main className="flex-1 bg-[#F8F2EB] transition-colors duration-300 dark:bg-[#1A1A40] dark:text-[#A9A9A9]">
      <ProductsHeader
        title="Kids' Accessories"
        description="Discover our premium selection of kids' accessories designed for style and functionality."
        imageSrc="/placeholder.svg?height=500&width=1920"
        theme="skyblue"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid
          products={kidsAccessoriesProducts}
          theme="skyblue"
          hideSearch={true}
          productType="accessory"
          category="kids"
        />
      </div>
    </main>
  )
} 
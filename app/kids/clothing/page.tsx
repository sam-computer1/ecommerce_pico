import type { Metadata } from "next"
import ProductsGrid from "@/components/products-grid"
import ProductsHeader from "@/components/products-header"
import { products } from "@/lib/products"

export const metadata: Metadata = {
  title: "Kids' Clothing - Modern Footwear",
  description: "Browse our collection of kids' clothing for every occasion.",
}

export default function KidsClothingPage() {
  const kidsClothingProducts = products.filter(
    (product) => product.category === "kids" && product.type === "clothing"
  )

  return (
    <main className="flex-1 bg-[#F8F2EB] transition-colors duration-300 dark:bg-[#1A1A40] dark:text-[#A9A9A9]">
      <ProductsHeader
        title="Kids' Clothing"
        description="Discover our premium selection of kids' clothing designed for style and comfort."
        imageSrc="/placeholder.svg?height=500&width=1920"
        theme="skyblue"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid
          products={kidsClothingProducts}
          theme="skyblue"
          hideSearch={true}
          productType="clothing"
          category="kids"
        />
      </div>
    </main>
  )
}


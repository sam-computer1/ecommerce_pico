import type { Metadata } from "next"
import ProductsGrid from "@/components/products-grid"
import ProductsHeader from "@/components/products-header"
import { products } from "@/lib/products"

export const metadata: Metadata = {
  title: "Kids' Shoes - Modern Footwear",
  description: "Browse our collection of kids' shoes for every occasion.",
}

export default function KidsPage() {
  // Filter only kids' products
  const kidsProducts = products.filter((product) => product.category === "kids")

  return (
    <main className="flex-1 bg-[#F8F2EB] transition-colors duration-300 dark:bg-[#1A1A40] dark:text-[#A9A9A9]">
      <ProductsHeader
        title="Kids' Collection"
        description="Discover our premium selection of kids' footwear designed for style and performance."
        imageSrc="/placeholder.svg?height=500&width=1920"
        theme="skyblue"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid products={kidsProducts} theme="skyblue" hideSearch={true} productType="footwear" category="kids" />
      </div>
    </main>
  )
}


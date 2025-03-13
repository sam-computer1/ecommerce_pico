import type { Metadata } from "next"
import ProductsGrid from "@/components/products-grid"
import ProductsHeader from "@/components/products-header"
import { products } from "@/lib/products"

export const metadata: Metadata = {
  title: "Men's Shoes - Modern Footwear",
  description: "Browse our collection of men's shoes for every occasion.",
}

export default function MensPage() {
  // Filter only men's products
  const mensProducts = products.filter((product) => product.category === "men")

  return (
    <main className="flex-1 bg-[#666666] transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <ProductsHeader
        title="Men's Collection"
        description="Discover our premium selection of men's footwear designed for style and performance."
        imageSrc="/placeholder.svg?height=500&width=1920"
        theme="gray"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid products={mensProducts} theme="gray" hideSearch={true} productType="footwear" category="men" />
      </div>
    </main>
  )
}


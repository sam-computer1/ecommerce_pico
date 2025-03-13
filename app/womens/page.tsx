import type { Metadata } from "next"
import ProductsGrid from "@/components/products-grid"
import ProductsHeader from "@/components/products-header"
import { products } from "@/lib/products"

export const metadata: Metadata = {
  title: "Women's Shoes - Modern Footwear",
  description: "Browse our collection of women's shoes for every occasion.",
}

export default function WomensPage() {
  // Filter only women's products
  const womensProducts = products.filter((product) => product.category === "women")

  return (
    <main className="flex-1 bg-[#FAF1E6] transition-colors duration-300 dark:bg-[#2E1A1A] dark:text-[#B3B3B3]">
      <ProductsHeader
        title="Women's Collection"
        description="Discover our premium selection of women's footwear designed for style and performance."
        imageSrc="/placeholder.svg?height=500&width=1920"
        theme="purple"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid
          products={womensProducts}
          theme="purple"
          hideSearch={true}
          productType="footwear"
          category="women"
        />
      </div>
    </main>
  )
}


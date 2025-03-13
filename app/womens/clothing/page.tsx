import type { Metadata } from "next"
import ProductsGrid from "@/components/products-grid"
import ProductsHeader from "@/components/products-header"
import { products } from "@/lib/products"

export const metadata: Metadata = {
  title: "Women's Clothing - Modern Footwear",
  description: "Browse our collection of women's clothing for every occasion.",
}

export default function WomensClothingPage() {
  const womensClothingProducts = products.filter(
    (product) => product.category === "women" && product.type === "clothing"
  )

  return (
    <main className="flex-1 bg-[#FAF1E6] transition-colors duration-300 dark:bg-[#2E1A1A] dark:text-[#B3B3B3]">
      <ProductsHeader
        title="Women's Clothing"
        description="Discover our premium selection of women's clothing designed for style and comfort."
        imageSrc="/placeholder.svg?height=500&width=1920"
        theme="purple"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid
          products={womensClothingProducts}
          theme="purple"
          hideSearch={true}
          productType="clothing"
          category="women"
        />
      </div>
    </main>
  )
}


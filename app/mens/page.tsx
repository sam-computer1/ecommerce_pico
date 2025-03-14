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
    <main className="flex-1 bg-[#F5F5F5] transition-colors duration-300 dark:bg-[#181818] dark:text-[#A1A1A1]">
      <ProductsHeader
        title="Men's Collection"
        description="Discover our premium selection of men's footwear designed for style and performance."
        imageSrc="https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=2000&auto=format&fit=crop"
        theme="brown"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid products={mensProducts} theme="brown" hideSearch={true} productType="footwear" category="men" />
      </div>
    </main>
  )
}


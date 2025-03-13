import type { Metadata } from "next"
import ProductsGrid from "@/components/products-grid"
import ProductsHeader from "@/components/products-header"
import { products } from "@/lib/products"

export const metadata: Metadata = {
  title: "Men's Accessories - Modern Footwear",
  description: "Browse our collection of men's accessories and other items.",
}

export default function MensOthersPage() {
  // Filter only men's other products
  const mensOtherProducts = products
    .filter((product) => product.category === "men")
    .slice(0, 3) // For demo purposes, just show some products
    .map((product) => ({
      ...product,
      name: `Men's ${product.name} Accessory`,
      description: `Premium men's accessory with exceptional quality and style.`,
      type: "accessory",
    }))

  return (
    <main className="flex-1 bg-[#F5F5F5] transition-colors duration-300 dark:bg-[#181818] dark:text-[#A1A1A1]">
      <ProductsHeader
        title="Men's Accessories"
        description="Discover our premium selection of men's accessories to complete your look."
        imageSrc="/placeholder.svg?height=500&width=1920"
        theme="brown"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid products={mensOtherProducts} theme="brown" hideSearch={true} productType="other" category="men" />
      </div>
    </main>
  )
}


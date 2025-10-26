"use client"

import ProductsGrid from "@/components/products-grid"
import { products } from "@/lib/products"
import ProductsHeader from "@/components/products-header"

export default function ProductsPage() {
  return (
    <main className="flex-1 bg-[#F6F6F6] transition-colors duration-300">
      <ProductsHeader
        title="All Products"
        description="Discover our complete collection of premium products"
        imageSrc="https://5lewiexqmin2zbg0.public.blob.vercel-storage.com/ShoesPics/shoes11.JPG"
        theme="brown"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid products={products} productType="all" theme="default" />
      </div>
    </main>
  )
}


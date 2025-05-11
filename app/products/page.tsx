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
        imageSrc="https://203fr2t3uf9dwcdt.public.blob.vercel-storage.com/Pico_pics/931293a0-d055-4b52-9107-249ddd06f4b8-ak7t3St8BPfgX54FjnmbVgAPgJVV0y.JPG"
        theme="brown"
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid products={products} productType="all" theme="default" />
      </div>
    </main>
  )
}


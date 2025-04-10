"use client"

import ProductsGrid from "@/components/products-grid"
import { products } from "@/lib/products"

export default function ProductsPage() {
  return (
    <main className="flex-1 bg-[#F6F6F6] transition-colors duration-300 dark:bg-[#191919] dark:text-[#B3B3B3]">
      <div className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://203fr2t3uf9dwcdt.public.blob.vercel-storage.com/Pico_pics/931293a0-d055-4b52-9107-249ddd06f4b8-ak7t3St8BPfgX54FjnmbVgAPgJVV0y.JPG')" }}
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-start px-4 md:px-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold text-[#EAEAEA] tracking-tight">All Products</h1>
            <p className="text-lg md:text-xl text-[#D9D9D9] mt-2">
              Discover our complete collection of premium products
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <ProductsGrid products={products} productType="all" theme="default" />
      </div>
    </main>
  )
}


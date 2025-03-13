"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { products } from "@/lib/products"
import ProductCard from "@/components/product-card"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeaturedProductsSection() {
  // Filter only featured products
  const featuredProducts = products.filter((product) => product.isFeatured).slice(0, 8)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const sliderRef = useRef(null)

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <section ref={sectionRef} className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-gray-600 mt-2">Our handpicked selection of premium footwear</p>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={scrollLeft}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollRight}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div ref={sliderRef} className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 pb-4 space-x-4 snap-x">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="min-w-[280px] max-w-[280px] snap-start"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block bg-primary text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Shop All Featured Products
          </Link>
        </div>
      </div>
    </section>
  )
}


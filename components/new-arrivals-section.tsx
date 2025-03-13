"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { products } from "@/lib/products"
import ProductCard from "@/components/product-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NewArrivalsSection() {
  // Filter only products marked as new
  const newProducts = products.filter((product) => product.isNew)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCategory, setVisibleCategory] = useState("all")
  const carouselRef = useRef(null)
  const [productsPerSlide, setProductsPerSlide] = useState(4)

  // Adjust products per slide based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setProductsPerSlide(1)
      } else if (window.innerWidth < 1024) {
        setProductsPerSlide(2)
      } else if (window.innerWidth < 1280) {
        setProductsPerSlide(3)
      } else {
        setProductsPerSlide(4)
      }
    }

    handleResize() // Initial call
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const categories = [
    { id: "all", name: "All" },
    { id: "men", name: "Men" },
    { id: "women", name: "Women" },
    { id: "kids", name: "Kids" },
  ]

  const filteredProducts =
    visibleCategory === "all" ? newProducts : newProducts.filter((product) => product.category === visibleCategory)

  const totalSlides = Math.ceil(filteredProducts.length / productsPerSlide)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex, filteredProducts.length, totalSlides])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-[#666666]">New Arrivals</h2>
          <p className="text-[#666666] max-w-2xl mx-auto">
            Check out our latest drops featuring innovative designs and premium materials.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setVisibleCategory(category.id)
                  setCurrentIndex(0) // Reset carousel when changing category
                }}
                className={`px-4 py-2 rounded-full transition-colors ${
                  visibleCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Carousel Navigation */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 -ml-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full bg-white shadow-md hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10 -mr-4">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full bg-white shadow-md hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Carousel Container */}
          <div className="overflow-hidden" ref={carouselRef}>
            <motion.div
              className="flex transition-all duration-500"
              initial={{ x: 0 }}
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex flex-wrap md:flex-nowrap gap-6">
                  {filteredProducts
                    .slice(slideIndex * productsPerSlide, (slideIndex + 1) * productsPerSlide)
                    .map((product) => (
                      <div
                        key={product.id}
                        className={`w-full ${
                          productsPerSlide === 1
                            ? "w-full"
                            : productsPerSlide === 2
                              ? "sm:w-1/2"
                              : productsPerSlide === 3
                                ? "sm:w-1/2 lg:w-1/3"
                                : "sm:w-1/2 lg:w-1/3 xl:w-1/4"
                        } px-2 mb-6`}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block bg-white px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}


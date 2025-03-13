import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import NewArrivalsSection from "@/components/new-arrivals-section"
import FeaturedProductsSection from "@/components/featured-products-section"
import PromoSection from "@/components/promo-section"
import CategoryShowcase from "@/components/category-showcase"
import ProductCTA from "@/components/product-cta"
import NewsletterSection from "@/components/newsletter-section"
import ScrollToTop from "@/components/scroll-to-top"

export default function HomePage() {
  return (
    <main className="flex-1 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Hero image of signature shoes"
          fill
          priority
          className="object-cover object-center scale-105 animate-[zoomOut_10s_ease-in-out_infinite_alternate]"
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-start px-4 md:px-6">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight hero-text">
              The Future of Footwear is Here
            </h1>
            <p className="text-lg md:text-xl text-gray-200 hero-text">
              Experience revolutionary comfort and style with our latest collection of performance shoes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 hero-text">
              <Button
                size="lg"
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/products" className="px-8">
                  Shop Now
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500 font-bold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/about" className="px-8">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Removed the mouse button element */}
      </section>

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* New Arrivals */}
      <NewArrivalsSection />

      {/* Featured Products */}
      <FeaturedProductsSection />

      {/* Hero Product Call To Action */}
      <ProductCTA />

      {/* Promo Section */}
      <PromoSection />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </main>
  )
}


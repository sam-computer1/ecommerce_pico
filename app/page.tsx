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
    <main className="flex-1 bg-[#FAF4ED] transition-colors duration-300 dark:bg-[#1E1A17] dark:text-[#D9D9D9]">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <Image
          src="\images\homepage\hero.jpg"
          alt="Hero image of signature shoes"
          fill
          priority
          className="object-cover object-center scale-105 animate-[zoomOut_10s_ease-in-out_infinite_alternate]"
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-start px-4 md:px-6">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-[#EAEAEA] tracking-tight hero-text">
              The Future of Footwear is Here
            </h1>
            <p className="text-lg md:text-xl text-[#D9D9D9] hero-text">
              Experience revolutionary comfort and style with our latest collection of performance shoes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 hero-text">
              <Button
                size="lg"
                asChild
                className="bg-[#474646] hover:bg-[#C9A959] text-white font-bold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all dark:bg-[#B78B26] dark:hover:bg-[#4A3C31]"
              >
                <Link href="/products" className="px-8">
                  Shop Now
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-[#C9A959]/20 text-white border-white font-bold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all dark:border-[#B78B26] dark:hover:bg-[#4A3C31]/20"
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


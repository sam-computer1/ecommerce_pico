import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background text-accent-3 py-6 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
          {/* Left Section */}
          <div className="flex-1 max-w-md">
            <h3 className="text-3xl font-bold mb-2 text-accent-1">PICo.</h3>
            <p className="text-accent-2 text-sm mb-4">
              Premium footwear for men, women, and kids. Quality, comfort, and style in every step.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-accent-3 hover:text-accent-1 transition-colors p-1.5 hover:bg-accent-3/10 rounded-full">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-accent-3 hover:text-accent-1 transition-colors p-1.5 hover:bg-accent-3/10 rounded-full">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-accent-3 hover:text-accent-1 transition-colors p-1.5 hover:bg-accent-3/10 rounded-full">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-accent-3 hover:text-accent-1 transition-colors p-1.5 hover:bg-accent-3/10 rounded-full">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-16">
            {/* Mobile: row layout for Shop and Support, Desktop: original layout */}
            <div className="flex flex-row md:flex-col space-x-8 md:space-x-0 space-y-0 md:space-y-0">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-2 text-accent-1">Shop</h3>
                <ul className="space-y-1.5">
                  <li>
                    <Link href="/products" className="text-accent-3 hover:text-accent-1 transition-colors text-sm">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="text-accent-3 hover:text-accent-1 transition-colors text-sm">
                      Footwear
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="text-accent-3 hover:text-accent-1 transition-colors text-sm">
                      Clothing
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="text-accent-3 hover:text-accent-1 transition-colors text-sm">
                      Accessories
                    </Link>
                  </li>
                  <li>
                    <Link href="/size-guide" className="text-accent-3 hover:text-accent-1 transition-colors text-sm">
                      Size Guide
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="md:hidden">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-2 text-accent-1">Support</h3>
                <ul className="space-y-1.5">
                  <li>
                    <Link href="/contact" className="text-accent-3 hover:text-accent-1 transition-colors text-sm">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/under-construction" className="text-accent-3 hover:text-accent-1 transition-colors text-sm">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-accent-3 hover:text-accent-1 transition-colors text-sm">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Desktop Only Support Section */}
            <div className="hidden md:block">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2 text-accent-1">Support</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/contact" className="text-accent-3 hover:text-accent-1 transition-colors text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/under-construction" className="text-accent-3 hover:text-accent-1 transition-colors text-sm">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-accent-3 hover:text-accent-1 transition-colors text-sm">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-6 pt-4 text-center text-accent-2 text-sm">
          <p>&copy; {new Date().getFullYear()} PICo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 dark:bg-[#121212] dark:border-t dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-16">
          {/* Brand Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2">Pico</h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Premium footwear for men, women, and kids. Quality, comfort, and style in every step.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-gray-800 rounded-full">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-gray-800 rounded-full">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-gray-800 rounded-full">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-gray-800 rounded-full">
                <Youtube size={20} />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex space-x-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Shop</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Footwear
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link href="/size-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Support</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/under-construction" className="text-gray-400 hover:text-white transition-colors text-sm">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Pico. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


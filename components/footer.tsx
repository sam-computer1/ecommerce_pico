import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 dark:bg-[#121212] dark:border-t dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Pico</h3>
            <p className="text-gray-400 mb-4">
              Premium footwear for men, women, and kids. Quality, comfort, and style in every step.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>

          {/* Column 2 - Shop Men */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop Men</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mens" className="text-gray-400 hover:text-white transition-colors">
                  Footwear
                </Link>
              </li>
              <li>
                <Link href="/mens/clothing" className="text-gray-400 hover:text-white transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/mens/bags" className="text-gray-400 hover:text-white transition-colors">
                  Bags
                </Link>
              </li>
              <li>
                <Link href="/mens/others" className="text-gray-400 hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-400 hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Shop Women & Kids */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop Women & Kids</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/womens" className="text-gray-400 hover:text-white transition-colors">
                  Women's Footwear
                </Link>
              </li>
              <li>
                <Link href="/womens/clothing" className="text-gray-400 hover:text-white transition-colors">
                  Women's Clothing
                </Link>
              </li>
              <li>
                <Link href="/kids" className="text-gray-400 hover:text-white transition-colors">
                  Kids' Footwear
                </Link>
              </li>
              <li>
                <Link href="/kids/clothing" className="text-gray-400 hover:text-white transition-colors">
                  Kids' Clothing
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-gray-400 hover:text-white transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Support & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/under-construction" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/under-construction" className="text-gray-400 hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-400 hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Pico. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


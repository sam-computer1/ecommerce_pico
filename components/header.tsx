"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from "@/components/theme-toggle"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const headerRef = useRef<HTMLElement>(null)

  // Check if we've scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      // Close search when scrolling
      setIsSearchOpen(false)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  // Add a new useEffect to handle body scroll locking
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent scrolling on the body when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when mobile menu is closed
      document.body.style.overflow = '';
    }
    
    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md ${
        isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-[101]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="h-10 w-auto"
            >
              <Image 
                src="/placeholder-logo.png" 
                alt="Pico Logo" 
                width={120} 
                height={40} 
                className="h-10 w-auto dark:brightness-110 dark:contrast-125"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center space-x-10 relative z-[101]"
          >
            <motion.div whileHover={{ y: -2 }}>
              <Link
                href="/"
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  pathname === "/" ? "text-primary" : "text-gray-700 dark:text-gray-200"
                }`}
              >
                Home
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Link
                href="/products"
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  pathname === "/products" ? "text-primary" : "text-gray-700 dark:text-gray-200"
                }`}
              >
                All Products
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Link
                href="/about"
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  pathname === "/about" ? "text-primary" : "text-gray-700 dark:text-gray-200"
                }`}
              >
                About
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Link
                href="/contact"
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  pathname === "/contact" ? "text-primary" : "text-gray-700 dark:text-gray-200"
                }`}
              >
                Contact
              </Link>
            </motion.div>
          </motion.nav>

          {/* Right Side Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            {/* Theme toggle - only show on desktop */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden md:block">
              <ThemeToggle />
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-transparent dark:hover:bg-transparent transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5 dark:text-gray-200" />
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-transparent dark:hover:bg-transparent transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 dark:text-gray-200" />
                ) : (
                  <Menu className="h-6 w-6 dark:text-gray-200" />
                )}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
          >
            <div className="container mx-auto px-4 py-4">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="flex-1 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Button
                  type="submit"
                  className="shadow-md hover:shadow-lg transition-all dark:bg-primary dark:text-white"
                >
                  Search
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu - Redesigned */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 overflow-y-auto max-h-[calc(100vh-4rem)] z-50"
          >
            <div className="container mx-auto px-4 py-4">
              <Link
                href="/"
                className={`block py-3 text-base ${pathname === "/" ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/products"
                className={`block py-3 text-base ${pathname === "/products" ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Products
              </Link>

              <Link
                href="/about"
                className={`block py-3 text-base ${pathname === "/about" ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>

              <Link
                href="/contact"
                className={`block py-3 text-base ${pathname === "/contact" ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="border-t border-gray-200 dark:border-gray-700 mt-3 pt-3">
                {/* Theme toggle in mobile menu */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-base text-gray-700 dark:text-gray-200">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}


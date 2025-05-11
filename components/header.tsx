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
      try {
        if (isSearchOpen && headerRef.current) {
          const searchContainer = headerRef.current.querySelector('.search-container');
          const target = event.target as Element;
          const isClickingSearchContainer = searchContainer && searchContainer.contains(target);
          const isClickingSearchToggle = target.closest('button')?.classList.contains('search-toggle');
          
          if (!isClickingSearchContainer && !isClickingSearchToggle) {
            setIsSearchOpen(false);
          }
        }
      } catch (error) {
        // Fallback if there's an error in querySelector or classList
        console.error("Error in click handler:", error);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

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
      className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 bg-background ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Left Justified */}
          <div className="flex items-center">
            <Link href="/" className="relative z-[101] flex items-center h-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="relative flex items-center justify-center"
                style={{ 
                  width: "100px",
                  height: "50px"
                }}
              >
                <Image 
                  src="/placeholder-logo.png" 
                  alt="PICo. Logo" 
                  width={180}
                  height={50}
                  priority
                  style={{ objectFit: 'contain' }}
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center space-x-10 relative z-[101]"
          >
            <motion.div whileHover={{ y: -2 }}>
              <Link
                href="/"
                className={`text-sm font-medium hover:text-accent-1 transition-colors ${
                  pathname === "/" ? "text-accent-1" : "text-accent-3"
                }`}
              >
                Home
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Link
                href="/products"
                className={`text-sm font-medium hover:text-accent-1 transition-colors ${
                  pathname === "/products" ? "text-accent-1" : "text-accent-3"
                }`}
              >
                All Products
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Link
                href="/contact"
                className={`text-sm font-medium hover:text-accent-1 transition-colors ${
                  pathname === "/contact" ? "text-accent-1" : "text-accent-3"
                }`}
              >
                Contact
              </Link>
            </motion.div>
          </motion.nav>

          {/* Right Side Actions - Right Justified */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            {/* Search button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-transparent transition-colors search-toggle"
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isMobileMenuOpen) {
                    setIsMobileMenuOpen(false);
                  }
                }}
              >
                <Search className="h-5 w-5 text-black" />
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-transparent transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  if (isSearchOpen) {
                    setIsSearchOpen(false);
                  }
                }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-accent-2" />
                ) : (
                  <Menu className="h-6 w-6 text-accent-2" />
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
            className="border-t border-border bg-background search-container"
            data-testid="search-container"
          >
            <div className="container mx-auto px-4 py-4">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="flex-1 bg-background text-foreground border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                  style={{ fontSize: '16px' }}
                  autoFocus={window.innerWidth > 768}
                />
                <Button
                  type="submit"
                  className="bg-black text-white shadow-md hover:shadow-lg transition-all"
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
            className="md:hidden fixed top-16 left-0 right-0 bg-background border-t border-border overflow-y-auto max-h-[calc(100vh-4rem)] z-50"
          >
            <div className="container mx-auto px-4 py-4">
              <Link
                href="/"
                className={`block py-3 text-base ${pathname === "/" ? "text-accent-1 font-medium" : "text-accent-3"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/products"
                className={`block py-3 text-base ${pathname === "/products" ? "text-accent-1 font-medium" : "text-accent-3"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Products
              </Link>

              <Link
                href="/contact" 
                className={`block py-3 text-base ${pathname === "/contact" ? "text-accent-1 font-medium" : "text-accent-3"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}


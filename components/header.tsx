"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart, User, Search, ChevronDown, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from "@/components/theme-toggle"

type DropdownType = "men" | "women" | "kids" | "mobile-men" | "mobile-women" | "mobile-kids" | null;

interface CategoryMenuItem {
  name: string;
  path: string;
}

interface CategoryMenus {
  men: CategoryMenuItem[];
  women: CategoryMenuItem[];
  kids: CategoryMenuItem[];
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()
  const headerRef = useRef<HTMLElement>(null)
  const accountDropdownRef = useRef<HTMLDivElement>(null)
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false)

  // Check if we've scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      // Close dropdown, search when scrolling
      setActiveDropdown(null)
      setIsSearchOpen(false)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }

      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Calculate total number of items in cart
  const itemCount = cartItems.reduce((total: number, item) => total + item.quantity, 0)
  const wishlistCount = wishlistItems.length

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleDropdownToggle = (dropdown: DropdownType) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  const categoryMenus: CategoryMenus = {
    men: [
      { name: "Footwear", path: "/mens" },
      { name: "Clothing", path: "/mens/clothing" },
      { name: "Bags", path: "/mens/bags" },
      { name: "Others", path: "/mens/others" },
    ],
    women: [
      { name: "Footwear", path: "/womens" },
      { name: "Clothing", path: "/womens/clothing" },
      { name: "Bags", path: "/womens/bags" },
      { name: "Others", path: "/womens/others" },
    ],
    kids: [
      { name: "Footwear", path: "/kids" },
      { name: "Clothing", path: "/kids/clothing" },
      { name: "Bags", path: "/kids/bags" },
      { name: "Others", path: "/kids/others" },
    ],
  }

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold dark:text-white">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              Pico
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex space-x-10"
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

            {/* Men's Dropdown */}
            <motion.div className="relative" whileHover={{ y: -2 }}>
              <button
                className={`flex items-center text-sm font-medium hover:text-primary transition-colors ${
                  pathname.startsWith("/mens") ? "text-primary" : "text-gray-700 dark:text-gray-200"
                }`}
                onClick={() => handleDropdownToggle("men")}
                onMouseEnter={() => setActiveDropdown("men")}
              >
                Men
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <AnimatePresence>
                {activeDropdown === "men" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border dark:border-gray-700"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {categoryMenus.men.map((item) => (
                      <motion.div key={item.path} whileHover={{ x: 5, backgroundColor: "#f3f4f6" }}>
                        <Link
                          href={item.path}
                          className={`block px-4 py-2 text-sm ${
                            pathname === item.path ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"
                          } hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Women's Dropdown */}
            <motion.div className="relative" whileHover={{ y: -2 }}>
              <button
                className={`flex items-center text-sm font-medium hover:text-primary transition-colors ${
                  pathname.startsWith("/womens") ? "text-primary" : "text-gray-700 dark:text-gray-200"
                }`}
                onClick={() => handleDropdownToggle("women")}
                onMouseEnter={() => setActiveDropdown("women")}
              >
                Women
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <AnimatePresence>
                {activeDropdown === "women" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border dark:border-gray-700"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {categoryMenus.women.map((item) => (
                      <motion.div key={item.path} whileHover={{ x: 5, backgroundColor: "#f3f4f6" }}>
                        <Link
                          href={item.path}
                          className={`block px-4 py-2 text-sm ${
                            pathname === item.path ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"
                          } hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Kids' Dropdown */}
            <motion.div className="relative" whileHover={{ y: -2 }}>
              <button
                className={`flex items-center text-sm font-medium hover:text-primary transition-colors ${
                  pathname.startsWith("/kids") ? "text-primary" : "text-gray-700 dark:text-gray-200"
                }`}
                onClick={() => handleDropdownToggle("kids")}
                onMouseEnter={() => setActiveDropdown("kids")}
              >
                Kids
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <AnimatePresence>
                {activeDropdown === "kids" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border dark:border-gray-700"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {categoryMenus.kids.map((item) => (
                      <motion.div key={item.path} whileHover={{ x: 5, backgroundColor: "#f3f4f6" }}>
                        <Link
                          href={item.path}
                          className={`block px-4 py-2 text-sm ${
                            pathname === item.path ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"
                          } hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
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
            {/* Only show theme toggle on desktop */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden md:block">
              <ThemeToggle />
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5 dark:text-gray-200" />
              </Button>
            </motion.div>

            {/* Account Dropdown - Hover */}
            <div
              ref={accountDropdownRef}
              className="relative hidden md:block"
              onMouseEnter={() => setIsAccountDropdownOpen(true)}
              onMouseLeave={() => setIsAccountDropdownOpen(false)}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-1 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <User className="h-5 w-5 dark:text-gray-200" />
                <ChevronDown className="h-4 w-4 dark:text-gray-200" />
              </motion.button>

              <AnimatePresence>
                {isAccountDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border dark:border-gray-700"
                  >
                    <Link
                      href="/account/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/account/orders"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Orders
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Wishlist
                      {wishlistCount > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      href="/account/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Settings
                    </Link>
                    <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist button - visible on desktop */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Link href="/wishlist" className="relative">
                  <Heart className="h-5 w-5 dark:text-gray-200" />
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Link href="/cart" className="relative">
                  <ShoppingCart className="h-5 w-5 dark:text-gray-200" />
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </Link>
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 overflow-y-auto max-h-[80vh]"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Theme Toggle in Mobile Menu */}
              <div className="flex justify-end mb-4">
                <ThemeToggle />
              </div>

              <Link
                href="/"
                className={`block py-3 ${pathname === "/" ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Men's Dropdown */}
              <div className="py-1">
                <button
                  onClick={() => handleDropdownToggle("mobile-men")}
                  className={`flex items-center justify-between w-full py-2 ${
                    pathname.startsWith("/mens") ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <span>Men</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "mobile-men" ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "mobile-men" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 space-y-2 mt-1"
                    >
                      {categoryMenus.men.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          className={`block py-2 ${
                            pathname === item.path ? "text-primary font-medium" : "text-gray-600 dark:text-gray-300"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Women's Dropdown */}
              <div className="py-1">
                <button
                  onClick={() => handleDropdownToggle("mobile-women")}
                  className={`flex items-center justify-between w-full py-2 ${
                    pathname.startsWith("/womens") ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <span>Women</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "mobile-women" ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "mobile-women" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 space-y-2 mt-1"
                    >
                      {categoryMenus.women.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          className={`block py-2 ${
                            pathname === item.path ? "text-primary font-medium" : "text-gray-600 dark:text-gray-300"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Kids' Dropdown */}
              <div className="py-1">
                <button
                  onClick={() => handleDropdownToggle("mobile-kids")}
                  className={`flex items-center justify-between w-full py-2 ${
                    pathname.startsWith("/kids") ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <span>Kids</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === "mobile-kids" ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "mobile-kids" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 space-y-2 mt-1"
                    >
                      {categoryMenus.kids.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          className={`block py-2 ${
                            pathname === item.path ? "text-primary font-medium" : "text-gray-600 dark:text-gray-300"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/products"
                className={`block py-3 ${pathname === "/products" ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Products
              </Link>

              <Link
                href="/about"
                className={`block py-3 ${pathname === "/about" ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>

              <Link
                href="/contact"
                className={`block py-3 ${pathname === "/contact" ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="border-t border-gray-200 dark:border-gray-700 mt-3 pt-3">
                <Link
                  href="/account/profile"
                  className={`block py-3 ${pathname === "/account/profile" ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>

                <Link
                  href="/wishlist"
                  className={`flex items-center py-3 ${pathname === "/wishlist" ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/cart"
                  className={`block py-3 ${pathname === "/cart" ? "text-primary font-medium" : "text-gray-700 dark:text-gray-200"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cart
                </Link>

                <div className="flex items-center py-3">
                  <span className="text-gray-700 dark:text-gray-200 mr-3">Theme</span>
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


"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import ProductCard from "@/components/product-card"
import { SlidersHorizontal, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import SizeChartDialog from "@/components/size-chart-dialog"

interface Product {
  id: number
  name: string
  description: string
  price: number
  rating: number
  category: string
  type: "footwear" | "clothing" | "bag" | "accessory"
  brand?: string
  colors?: string[]
  sizes?: string[]
  materials?: string[]
  styles?: string[]
  isFeatured?: boolean
  createdAt: string
}

interface ProductsGridProps {
  products: Product[]
  theme?: "default" | "gold" | "purple" | "skyblue" | "brown" | "gray"
  hideSearch?: boolean
  productType?: string
  category?: "men" | "women" | "kids"
}

// Define static arrays outside the component to avoid recreating them on each render
const TYPES = ["footwear", "clothing", "bag", "accessory"]
const COLORS = ["black", "white", "red", "blue", "green", "gray", "pink", "purple", "yellow", "brown"]
const CATEGORIES = ["men", "women", "kids"]
const FOOTWEAR_SIZES = ["US 5", "US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"]
const MENS_CLOTHING_SIZES = ["S", "M", "L", "XL", "XXL", "3XL"]
const WOMENS_CLOTHING_SIZES = ["XS", "S", "M", "L", "XL", "XXL"]
const KIDS_FOOTWEAR_SIZES = ["US 1", "US 2", "US 3", "US 4", "US 5", "US 6"]
const KIDS_CLOTHING_SIZES = ["4T", "5T", "6", "7", "8", "10", "12", "14"]

// Theme color classes
const THEME_CLASSES = {
  default: "bg-[#F6F6F6] dark:bg-[#191919]",
  gold: "bg-[#FCFAEE]",
  purple: "bg-[#F9F5FC]",
  skyblue: "bg-[#F0F9FF]",
  brown: "bg-[#F8F6F4]",
  gray: "bg-[#F4F5F7]",
}

// Color mapping for the color filter
const COLOR_MAPPINGS: Record<string, string> = {
  black: "bg-black",
  white: "bg-white border border-gray-300",
  red: "bg-red-600",
  blue: "bg-blue-600",
  green: "bg-green-600",
  gray: "bg-gray-500",
  pink: "bg-pink-500",
  purple: "bg-purple-600",
  yellow: "bg-yellow-400",
  brown: "bg-amber-800",
}

export default function ProductsGrid({
  products,
  theme = "default",
  hideSearch = false,
  productType = "footwear",
  category = "women",
}: ProductsGridProps) {
  // State for the filtered products and sorting
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Filter states - what's actually applied
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Filter sheet state
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  // Pending filter states - what's shown in the filter sheet before applying
  const [pendingTypes, setPendingTypes] = useState<string[]>([])
  const [pendingColors, setPendingColors] = useState<string[]>([])
  const [pendingSizes, setPendingSizes] = useState<string[]>([])
  const [pendingCategories, setPendingCategories] = useState<string[]>([])

  // Handle filter sheet opening - initialize pending filters with current values
  const handleOpenFilterSheet = useCallback(() => {
    setPendingTypes([...selectedTypes])
    setPendingColors([...selectedColors])
    setPendingSizes([...selectedSizes])
    setPendingCategories([...selectedCategories])
    setIsFilterOpen(true)
  }, [selectedTypes, selectedColors, selectedSizes, selectedCategories])

  // Handle filter sheet closing directly - no state changes
  const handleCloseFilterSheet = useCallback(() => {
    setIsFilterOpen(false)
  }, [])

  // Determine if we should show size filter based on product types
  const shouldShowSizeFilter = useMemo(() => {
    // For initial product type (coming from page props)
    if (productType === "footwear" || productType === "clothing") {
      return true
    }
    
    // For selected filters (when on "all" product type page)
    if (pendingTypes.length > 0) {
      return pendingTypes.includes("footwear") || pendingTypes.includes("clothing")
    }
    
    return false;
  }, [productType, pendingTypes])
  
  // Determine if we're showing footwear or clothing sizes
  const isClothingSelected = useMemo(() => {
    // If specific product type is set from page props
    if (productType === "clothing") {
      return true;
    }
    
    // When filtering on "all" products page
    if (pendingTypes.length > 0) {
      return pendingTypes.includes("clothing")
    }
    
    // Default to footwear
    return false;
  }, [productType, pendingTypes])
  
  // Get the appropriate sizes based on current selection
  const displaySizes = useMemo(() => {
    // Don't show sizes for bags/accessories
    if (!shouldShowSizeFilter) {
      return [];
    }
    
    // Get sizes based on clothing vs footwear
    if (isClothingSelected) {
      // Return appropriate clothing sizes based on category
      if (category === "kids") {
        return KIDS_CLOTHING_SIZES;
      } else if (category === "men") {
        return MENS_CLOTHING_SIZES;
      } else {
        return WOMENS_CLOTHING_SIZES;
      }
    } else {
      // Return appropriate footwear sizes based on category
      return category === "kids" ? KIDS_FOOTWEAR_SIZES : FOOTWEAR_SIZES;
    }
  }, [shouldShowSizeFilter, isClothingSelected, category])

  // Clear pending sizes when product type changes
  useEffect(() => {
    const pendingHasBagOrAccessory = pendingTypes.includes("bag") || pendingTypes.includes("accessory");
    const pendingHasClothing = pendingTypes.includes("clothing");
    const pendingHasFootwear = pendingTypes.includes("footwear");
    
    // If user selects a type that doesn't support sizes, clear pending sizes
    if ((pendingHasBagOrAccessory && pendingTypes.length === 1) || 
        (!pendingHasClothing && !pendingHasFootwear && pendingTypes.length > 0)) {
      setPendingSizes([]);
    }
    
    // If user switches between clothing and footwear, clear pending sizes
    if (pendingHasClothing && !pendingHasFootwear && selectedSizes.some(size => FOOTWEAR_SIZES.includes(size) || KIDS_FOOTWEAR_SIZES.includes(size))) {
      setPendingSizes([]);
    } else if (pendingHasFootwear && !pendingHasClothing && selectedSizes.some(size => 
      MENS_CLOTHING_SIZES.includes(size) || 
      WOMENS_CLOTHING_SIZES.includes(size) || 
      KIDS_CLOTHING_SIZES.includes(size)
    )) {
      setPendingSizes([]);
    }
  }, [pendingTypes, selectedSizes])

  // Memoize filtered products to avoid recalculation on every render
  const filteredProducts = useMemo(() => {
    // Start with a fresh copy of products
    let result = [...products]

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    // Apply type filter (only for "all" and "other" product types)
    if ((productType === "all" || productType === "other") && selectedTypes.length > 0) {
      result = result.filter((product) => selectedTypes.includes(product.type))
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      result = result.filter(
        (product) => product.colors && product.colors.some((color) => selectedColors.includes(color))
      )
    }

    // Apply size filter
    if (selectedSizes.length > 0) {
      result = result.filter((product) => {
        // Don't apply size filter for bags or accessories
        if (product.type === 'bag' || product.type === 'accessory') {
          return true
        }
        
        // Check if product has the selected sizes
        return product.sizes && product.sizes.some((size) => selectedSizes.includes(size))
      })
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        return [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case "featured":
        return [...result].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
      default:
        return result
    }
  }, [
    products,
    sortBy,
    searchQuery,
    selectedTypes,
    selectedColors,
    selectedSizes,
    selectedCategories,
    productType
  ])

  // Event handlers with useCallback to prevent recreating functions on every render
  const handleSortChange = useCallback((value: string) => {
    setSortBy(value)
  }, [])

  const togglePendingCategory = useCallback((cat: string) => {
    setPendingCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }, [])

  const togglePendingType = useCallback((type: string) => {
    setPendingTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }, [])

  const togglePendingColor = useCallback((color: string) => {
    setPendingColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
  }, [])

  const togglePendingSize = useCallback((size: string) => {
    setPendingSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }, [])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const applyFilters = useCallback(() => {
    setSelectedCategories([...pendingCategories])
    setSelectedTypes([...pendingTypes])
    setSelectedColors([...pendingColors])
    setSelectedSizes([...pendingSizes])
    setIsFilterOpen(false)
  }, [pendingCategories, pendingTypes, pendingColors, pendingSizes])

  const clearAllFilters = useCallback(() => {
    setPendingCategories([])
    setPendingTypes([])
    setPendingColors([])
    setPendingSizes([])
  }, [])

  // Helper functions
  const getColorStyle = useCallback((color: string) => {
    return `${COLOR_MAPPINGS[color]} h-6 w-6 rounded-full cursor-pointer transition-all duration-200`
  }, [])

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0 mb-8">
      {!hideSearch && (
          <div className="relative w-full md:max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 border-none bg-white dark:bg-gray-900 shadow-sm rounded-full w-full md:min-w-[280px]"
              value={searchQuery}
              onChange={handleSearch}
              autoComplete="off"
              style={{ fontSize: '16px' }}
            />
        </div>
      )}

        <div className="flex items-center gap-4 self-start md:self-auto">
          <div className="hidden md:block">
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-none min-w-[180px] shadow-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Button - separate from Sheet */}
          <Button
            variant="outline"
            className="bg-white dark:bg-gray-800 border-none shadow-sm flex items-center gap-2"
            onClick={handleOpenFilterSheet}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="md:hidden">Sort & Filter</span>
            <span className="hidden md:inline">Filter</span>
          </Button>
          
          {/* Filter Sheet with proper accessibility structure */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto" side="right">
              <SheetHeader className="mb-4">
                <SheetTitle>Filter Products</SheetTitle>
              </SheetHeader>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Sort By</h3>
                  <div className="grid grid-cols-2 gap-2">
              <Button
                      variant={sortBy === "featured" ? "default" : "outline"}
                      onClick={() => handleSortChange("featured")}
                      className={sortBy === "featured" ? "bg-[#aa0202] text-[#f4edca] dark:bg-[#8a0505] dark:text-[#f4edca]" : ""}
              >
                      Featured
              </Button>
                    <Button
                      variant={sortBy === "newest" ? "default" : "outline"}
                      onClick={() => handleSortChange("newest")}
                      className={sortBy === "newest" ? "bg-[#aa0202] text-[#f4edca] dark:bg-[#8a0505] dark:text-[#f4edca]" : ""}
                    >
                      Newest
                    </Button>
                  </div>
                </div>

                {/* Only show Category filter for "all" product type */}
                {productType === "all" && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Category</h3>
                    <div className="space-y-2">
                      {CATEGORIES.map((cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                          <div
                            onClick={() => togglePendingCategory(cat)}
                            className={`h-4 w-4 rounded border cursor-pointer transition-colors duration-200 ${
                              pendingCategories.includes(cat)
                                ? "bg-[#aa0202] dark:bg-[#cb0000] border-transparent"
                                : "border-[#8a0505] dark:border-[#aa0202]"
                            }`}
                          >
                            {pendingCategories.includes(cat) && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[#f4edca] dark:text-[#f4edca]"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>
                          <label className="text-sm font-medium capitalize cursor-pointer">{cat}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Only show Product Type filter for "all" or "other" product types */}
                {(productType === "all" || productType === "other") && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Product Type</h3>
                    <div className="space-y-2">
                      {TYPES.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <div
                            onClick={() => togglePendingType(type)}
                            className={`h-4 w-4 rounded border cursor-pointer transition-colors duration-200 ${
                              pendingTypes.includes(type)
                                ? "bg-[#aa0202] dark:bg-[#cb0000] border-transparent"
                                : "border-[#8a0505] dark:border-[#aa0202]"
                            }`}
                          >
                            {pendingTypes.includes(type) && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[#f4edca] dark:text-[#f4edca]"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>
                          <label className="text-sm font-medium capitalize cursor-pointer">{type}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color filter */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Colors</h3>
                  <div className="flex flex-wrap gap-3">
                    {COLORS.map((color) => (
                      <div
                        key={color}
                        className={`${getColorStyle(color)} ${
                          pendingColors.includes(color) ? "ring-2 ring-[#aa0202] dark:ring-[#cb0000] ring-offset-2" : ""
                        }`}
                        onClick={() => togglePendingColor(color)}
                      />
                    ))}
                  </div>
                </div>

                {/* Size filter - only show if relevant product type is selected */}
                {shouldShowSizeFilter && displaySizes.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Sizes</h3>
                      <SizeChartDialog
                        type={isClothingSelected ? "clothing" : "footwear"} 
                        category={category}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {displaySizes.map((size) => (
                        <div
                          key={size}
                          className={`px-3 py-2 border rounded-md text-sm cursor-pointer transition-colors duration-200 ${
                            pendingSizes.includes(size)
                              ? "bg-[#aa0202] dark:bg-[#cb0000] text-[#f4edca] border-transparent"
                              : "border-[#8a0505] dark:border-[#aa0202] hover:border-[#aa0202]"
                          }`}
                          onClick={() => togglePendingSize(size)}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                </div>

              <div className="border-t pt-4 mt-6">
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                  <Button className="flex-1 bg-[#aa0202] text-[#f4edca] hover:bg-[#8a0505] dark:bg-[#8a0505] dark:hover:bg-[#aa0202]" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 ${THEME_CLASSES[theme]}`}
        >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
              <ProductCard
                  key={product.id}
                product={product}
                theme={theme}
              />
              ))
            ) : (
            <div className="col-span-full text-center py-16">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
              </motion.div>
          </AnimatePresence>
    </div>
  )
}


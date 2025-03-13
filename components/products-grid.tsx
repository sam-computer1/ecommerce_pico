"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import { SlidersHorizontal, SearchIcon, Filter, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
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

export default function ProductsGrid({
  products,
  theme = "default",
  hideSearch = false,
  productType = "footwear", // "footwear", "clothing", "bag", "other", "all"
  category = "women", // "men", "women", "kids"
}: ProductsGridProps) {
  const [sortBy, setSortBy] = useState("featured")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [priceRange, setPriceRange] = useState([0, 300])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // New state for filter changes
  const [pendingPriceRange, setPendingPriceRange] = useState<[number, number]>([0, 300])
  const [pendingBrands, setPendingBrands] = useState<string[]>([])
  const [pendingTypes, setPendingTypes] = useState<string[]>([])
  const [pendingColors, setPendingColors] = useState<string[]>([])
  const [pendingSizes, setPendingSizes] = useState<string[]>([])
  const [pendingMaterials, setPendingMaterials] = useState<string[]>([])
  const [pendingStyles, setPendingStyles] = useState<string[]>([])
  const [pendingCategories, setPendingCategories] = useState<string[]>([])
  const [pendingRatings, setPendingRatings] = useState<string[]>([])

  // Initialize pending filters with current filters
  useEffect(() => {
    setPendingPriceRange([priceRange[0], priceRange[1]] as [number, number])
    setPendingBrands(selectedBrands)
    setPendingTypes(selectedTypes)
    setPendingColors(selectedColors)
    setPendingSizes(selectedSizes)
    setPendingMaterials(selectedMaterials)
    setPendingStyles(selectedStyles)
    setPendingCategories(selectedCategories)
    setPendingRatings(selectedRatings)
  }, [
    priceRange,
    selectedBrands,
    selectedTypes,
    selectedColors,
    selectedSizes,
    selectedMaterials,
    selectedStyles,
    selectedCategories,
    selectedRatings,
  ])

  // Apply sorting and filtering when products, sortBy, selectedBrands or searchQuery change
  useEffect(() => {
    let result = [...products]

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((product) => selectedBrands.includes(product.brand || "Nike"))
    }

    // Apply type filter (only for "all" and "other" product types)
    if ((productType === "all" || productType === "other") && selectedTypes.length > 0) {
      result = result.filter((product) => selectedTypes.includes(product.type || "footwear"))
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      result = result.filter(
        (product) => product.colors && product.colors.some((color) => selectedColors.includes(color)),
      )
    }

    // Apply size filter - now dynamically based on selected product type
    if (selectedSizes.length > 0) {
      // Only apply size filter if the product matches the current filter type
      // or if no specific type is selected
      result = result.filter((product) => {
        // If no product types are selected, or the product type matches the selected types
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type || "footwear")

        // Only apply size filter if the product type matches
        if (matchesType) {
          return product.sizes && product.sizes.some((size) => selectedSizes.includes(size))
        }
        return true
      })
    }

    // Apply material filter (for bags)
    if (selectedMaterials.length > 0) {
      result = result.filter(
        (product) => product.materials && product.materials.some((material) => selectedMaterials.includes(material)),
      )
    }

    // Apply style filter
    if (selectedStyles.length > 0) {
      result = result.filter(
        (product) => product.styles && product.styles.some((style) => selectedStyles.includes(style)),
      )
    }

    // Apply rating filter
    if (selectedRatings.length > 0) {
      result = result.filter((product) => {
        // Convert rating to nearest 0.5 increment
        const roundedRating = Math.round(product.rating * 2) / 2
        return selectedRatings.includes(roundedRating.toString())
      })
    }

    // Apply price range filter
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    result = sortProducts(result, sortBy)

    setFilteredProducts(result)
  }, [
    products,
    sortBy,
    selectedBrands,
    searchQuery,
    priceRange,
    selectedTypes,
    selectedColors,
    selectedSizes,
    selectedMaterials,
    selectedStyles,
    selectedCategories,
    selectedRatings,
    productType,
  ])

  // Sort products
  const sortProducts = (productsToSort: Product[], sortBy: string) => {
    switch (sortBy) {
      case "price-asc":
        return [...productsToSort].sort((a, b) => a.price - b.price)
      case "price-desc":
        return [...productsToSort].sort((a, b) => b.price - a.price)
      case "newest":
        return [...productsToSort].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case "featured":
        return [...productsToSort].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
      case "rating-desc":
        return [...productsToSort].sort((a, b) => b.rating - a.rating)
      default:
        return productsToSort
    }
  }

  const brands = ["Nike", "Adidas", "Puma", "New Balance", "Reebok"]
  const types = ["footwear", "clothing", "bag", "accessory"]
  const colors = ["black", "white", "red", "blue", "green", "gray", "pink", "purple", "yellow", "brown"]
  const ratings = ["5", "4.5", "4", "3.5", "3", "2.5", "2", "1.5", "1"]

  // Different size options based on product type
  const footwearSizes = ["US 5", "US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"]
  const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const kidsSizes =
    productType === "footwear"
      ? ["US 1", "US 2", "US 3", "US 4", "US 5", "US 6"]
      : ["4T", "5T", "6", "7", "8", "10", "12", "14"]

  // Get the appropriate sizes based on product type and category
  const togglePendingCategory = (category: string) => {
    if (pendingCategories.includes(category)) {
      setPendingCategories(pendingCategories.filter((c) => c !== category))
    } else {
      setPendingCategories([...pendingCategories, category])
    }
  }

  const categories = ["men", "women", "kids"]

  // Check if bag type is selected
  const isBagSelected = selectedTypes.includes("bag") || productType === "bag"

  const getSizes = () => {
    // Don't show sizes if bag is selected
    if (isBagSelected) {
      return []
    }

    // If we have selected types, use those to determine which sizes to show
    if (selectedTypes.length > 0) {
      if (selectedTypes.includes("clothing")) {
        return category === "kids" ? kidsSizes : clothingSizes
      } else if (selectedTypes.includes("footwear")) {
        return category === "kids" ? kidsSizes : footwearSizes
      }
      // If neither clothing nor footwear is selected, don't show sizes
      return []
    }

    // Default behavior based on productType prop
    if (productType === "footwear") {
      return category === "kids" ? kidsSizes : footwearSizes
    } else if (productType === "clothing") {
      return category === "kids" ? kidsSizes : clothingSizes
    } else if (productType === "all") {
      // For "all" products page with no type selected, show both types
      return [...footwearSizes, ...clothingSizes]
    }
    return []
  }

  const sizes = getSizes()

  // Determine if we should show type filter
  const shouldShowTypeFilter = productType === "all" || productType === "other"

  // Determine if we should show category filter
  const shouldShowCategoryFilter = productType === "all"

  const materials = ["Leather", "Canvas", "Nylon", "Polyester", "Cotton", "Suede", "Mesh"]
  const styles = ["Casual", "Athletic", "Formal", "Outdoor", "Fashion"]

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating-desc", label: "Highest Rated" },
  ]

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  const togglePendingBrand = (brand: string) => {
    if (pendingBrands.includes(brand)) {
      setPendingBrands(pendingBrands.filter((b) => b !== brand))
    } else {
      setPendingBrands([...pendingBrands, brand])
    }
  }

  const togglePendingType = (type: string) => {
    if (pendingTypes.includes(type)) {
      setPendingTypes(pendingTypes.filter((t) => t !== type))
    } else {
      setPendingTypes([...pendingTypes, type])
    }
  }

  const togglePendingColor = (color: string) => {
    if (pendingColors.includes(color)) {
      setPendingColors(pendingColors.filter((c) => c !== color))
    } else {
      setPendingColors([...pendingColors, color])
    }
  }

  const togglePendingSize = (size: string) => {
    if (pendingSizes.includes(size)) {
      setPendingSizes(pendingSizes.filter((s) => s !== size))
    } else {
      setPendingSizes([...pendingSizes, size])
    }
  }

  const togglePendingMaterial = (material: string) => {
    if (pendingMaterials.includes(material)) {
      setPendingMaterials(pendingMaterials.filter((m) => m !== material))
    } else {
      setPendingMaterials([...pendingMaterials, material])
    }
  }

  const togglePendingStyle = (style: string) => {
    if (pendingStyles.includes(style)) {
      setPendingStyles(pendingStyles.filter((s) => s !== style))
    } else {
      setPendingStyles([...pendingStyles, style])
    }
  }

  const togglePendingRating = (rating: string) => {
    if (pendingRatings.includes(rating)) {
      setPendingRatings(pendingRatings.filter((r) => r !== rating))
    } else {
      setPendingRatings([...pendingRatings, rating])
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const applyFilters = () => {
    setSelectedBrands(pendingBrands)
    setSelectedTypes(pendingTypes)
    setSelectedColors(pendingColors)
    setSelectedSizes(pendingSizes)
    setSelectedMaterials(pendingMaterials)
    setSelectedStyles(pendingStyles)
    setSelectedCategories(pendingCategories)
    setSelectedRatings(pendingRatings)
    setPriceRange(pendingPriceRange)
    setIsFilterOpen(false)
  }

  const clearAllFilters = () => {
    setPendingBrands([])
    setPendingTypes([])
    setPendingColors([])
    setPendingSizes([])
    setPendingMaterials([])
    setPendingStyles([])
    setPendingCategories([])
    setPendingRatings([])
    setPendingPriceRange([0, 300])

    setSelectedBrands([])
    setSelectedTypes([])
    setSelectedColors([])
    setSelectedSizes([])
    setSelectedMaterials([])
    setSelectedStyles([])
    setSelectedCategories([])
    setSelectedRatings([])
    setPriceRange([0, 300])
    setSearchQuery("")
  }

  const getColorStyle = (color: string) => {
    // Map color names to their hex values
    const colorHexMap: Record<string, string> = {
      black: "#000000",
      white: "#FFFFFF",
      red: "#DC2626",
      blue: "#2563EB",
      green: "#16A34A",
      gray: "#6B7280",
      pink: "#DB2777",
      purple: "#7C3AED",
      yellow: "#EAB308",
      brown: "#B45309"
    }
    
    // Return border color classes only, background will be set inline
    const borderColorMap: Record<string, string> = {
      black: "border-gray-400 dark:border-gray-100",
      white: "border-gray-300 dark:border-gray-100",
      red: "border-red-400 dark:border-red-300",
      blue: "border-blue-400 dark:border-blue-300",
      green: "border-green-400 dark:border-green-300",
      gray: "border-gray-400 dark:border-gray-300",
      pink: "border-pink-400 dark:border-pink-300",
      purple: "border-purple-400 dark:border-purple-300",
      yellow: "border-yellow-400 dark:border-yellow-300",
      brown: "border-amber-600 dark:border-amber-300"
    }
    
    return {
      hex: colorHexMap[color] || "#E5E7EB", // Default to gray-200 if color not found
      borderClass: borderColorMap[color] || "border-gray-300 dark:border-gray-600"
    }
  }

  // Render star rating component
  const renderStars = (rating: string) => {
    const stars = []
    const fullStars = Math.floor(Number.parseFloat(rating))
    const hasHalfStar = Number.parseFloat(rating) % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-gray-300 dark:text-gray-600" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>,
        )
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300 dark:text-gray-600" />)
      }
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{rating}</span>
      </div>
    )
  }

  const themeStyles = {
    default: "bg-white dark:bg-gray-800",
    gold: "bg-[#d4b56e] text-white",
    purple: "bg-[#a35b8e] text-white",
    skyblue: "bg-[#6db1de] text-white"
  }

  return (
    <div>
      {/* Search Bar - conditionally rendered */}
      {!hideSearch && (
        <div className="mb-6">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 w-full dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <p className={`${theme === "gray" ? "text-white" : "text-gray-500 dark:text-gray-400"}`}>
          {filteredProducts.length} products
          {(selectedBrands.length > 0 ||
            selectedTypes.length > 0 ||
            selectedColors.length > 0 ||
            selectedSizes.length > 0 ||
            selectedMaterials.length > 0 ||
            selectedRatings.length > 0 ||
            selectedStyles.length > 0) && (
            <button onClick={clearAllFilters} className="ml-2 text-sm text-primary hover:underline">
              Clear filters
            </button>
          )}
        </p>

        <div className="flex items-center gap-2">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 md:hidden shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="overflow-y-auto dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700"
            >
              <div className="h-full py-6 space-y-8 overflow-y-auto">
                {/* Category Filter - only on all products page */}
                {shouldShowCategoryFilter && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Category</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <div key={cat} className="flex items-center gap-2">
                          <Checkbox
                            id={`mobile-category-${cat}`}
                            checked={pendingCategories.includes(cat)}
                            onCheckedChange={() => togglePendingCategory(cat)}
                            className="dark:border-gray-600"
                          />
                          <Label htmlFor={`mobile-category-${cat}`} className="text-sm capitalize dark:text-gray-300">
                            {cat}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-4">Brand</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center gap-2">
                        <Checkbox
                          id={`mobile-brand-${brand}`}
                          checked={pendingBrands.includes(brand)}
                          onCheckedChange={() => togglePendingBrand(brand)}
                          className="dark:border-gray-600"
                        />
                        <Label htmlFor={`mobile-brand-${brand}`} className="text-sm dark:text-gray-300">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Type filter - only on all products and others pages */}
                {shouldShowTypeFilter && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Type</h3>
                    <div className="space-y-2">
                      {types.map((type) => (
                        <div key={type} className="flex items-center gap-2">
                          <Checkbox
                            id={`mobile-type-${type}`}
                            checked={pendingTypes.includes(type)}
                            onCheckedChange={() => togglePendingType(type)}
                            className="dark:border-gray-600"
                          />
                          <Label htmlFor={`mobile-type-${type}`} className="text-sm capitalize dark:text-gray-300">
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rating filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Rating</h3>
                  <div className="space-y-2">
                    {ratings.map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <Checkbox
                          id={`mobile-rating-${rating}`}
                          checked={pendingRatings.includes(rating)}
                          onCheckedChange={() => togglePendingRating(rating)}
                          className="dark:border-gray-600"
                        />
                        <Label
                          htmlFor={`mobile-rating-${rating}`}
                          className="text-sm flex items-center dark:text-gray-300"
                        >
                          {renderStars(rating)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => {
                      const colorStyle = getColorStyle(color);
                      return (
                        <motion.button
                          key={color}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => togglePendingColor(color)}
                          className={`h-8 w-8 rounded-full border-2 ${colorStyle.borderClass} ${
                            pendingColors.includes(color) 
                              ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900" 
                              : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2 dark:hover:ring-gray-400 dark:ring-offset-gray-900"
                          }`}
                          style={{ backgroundColor: colorStyle.hex }}
                          title={color.charAt(0).toUpperCase() + color.slice(1)}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Size filter - only show if there are sizes available and not bag type */}
                {sizes.length > 0 && !isBagSelected && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Size</h3>
                      <SizeChartDialog
                        type={pendingTypes.includes("clothing") ? "clothing" : "footwear"}
                        category={category}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => togglePendingSize(size)}
                          className={`px-3 py-1 border rounded-md text-sm ${
                            pendingSizes.includes(size)
                              ? "bg-primary text-white border-primary"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Material filter - only show for bags or if bag type is selected */}
                {(productType === "bag" || pendingTypes.includes("bag") || productType === "all") && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Material</h3>
                    <div className="space-y-2">
                      {materials.map((material) => (
                        <div key={material} className="flex items-center gap-2">
                          <Checkbox
                            id={`mobile-material-${material}`}
                            checked={pendingMaterials.includes(material)}
                            onCheckedChange={() => togglePendingMaterial(material)}
                            className="dark:border-gray-600"
                          />
                          <Label htmlFor={`mobile-material-${material}`} className="text-sm dark:text-gray-300">
                            {material}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Style filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Style</h3>
                  <div className="space-y-2">
                    {styles.map((style) => (
                      <div key={style} className="flex items-center gap-2">
                        <Checkbox
                          id={`mobile-style-${style}`}
                          checked={pendingStyles.includes(style)}
                          onCheckedChange={() => togglePendingStyle(style)}
                          className="dark:border-gray-600"
                        />
                        <Label htmlFor={`mobile-style-${style}`} className="text-sm dark:text-gray-300">
                          {style}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between dark:text-gray-300">
                      <span>${pendingPriceRange[0]}</span>
                      <span>${pendingPriceRange[1]}</span>
                    </div>
                    <div className="pt-2">
                      <input
                        type="range"
                        min="0"
                        max="300"
                        step="10"
                        value={pendingPriceRange[1]}
                        onChange={(e) => setPendingPriceRange([pendingPriceRange[0], Number.parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button className="w-full flex items-center justify-center gap-2" onClick={applyFilters}>
                    <Filter className="h-4 w-4" />
                    Apply Filters
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full dark:border-gray-700 dark:text-gray-200"
                    onClick={clearAllFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger
              className={`w-[180px] shadow-md hover:shadow-lg transition-shadow ${
                theme === "gray" ? "bg-white text-gray-900" : "dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
              }`}
            >
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Sidebar filters - visible on desktop */}
        <div className="hidden md:block col-span-1">
          <div className="space-y-8 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-4 pb-4 filter-scrollbar">
            {/* Category Filter - only on all products page */}
            {shouldShowCategoryFilter && (
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${theme === "gray" ? "text-white" : "dark:text-white"}`}>
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center gap-2">
                      <Checkbox
                        id={`category-${cat}`}
                        checked={pendingCategories.includes(cat)}
                        onCheckedChange={() => togglePendingCategory(cat)}
                        className="dark:border-gray-600"
                      />
                      <Label
                        htmlFor={`category-${cat}`}
                        className={`text-sm capitalize ${theme === "gray" ? "text-white" : "dark:text-white"}`}
                      >
                        {cat}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === "gray" ? "text-white" : "dark:text-white"}`}>
                Brand
              </h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center gap-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={pendingBrands.includes(brand)}
                      onCheckedChange={() => togglePendingBrand(brand)}
                      className="dark:border-gray-600"
                    />
                    <Label
                      htmlFor={`brand-${brand}`}
                      className={`text-sm ${theme === "gray" ? "text-white" : "dark:text-white"}`}
                    >
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Type filter - only on all products and others pages */}
            {shouldShowTypeFilter && (
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${theme === "gray" ? "text-white" : "dark:text-white"}`}>
                  Type
                </h3>
                <div className="space-y-2">
                  {types.map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={pendingTypes.includes(type)}
                        onCheckedChange={() => togglePendingType(type)}
                        className="dark:border-gray-600"
                      />
                      <Label
                        htmlFor={`type-${type}`}
                        className={`text-sm capitalize ${theme === "gray" ? "text-white" : "dark:text-white"}`}
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rating filter */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === "gray" ? "text-white" : "dark:text-white"}`}>
                Rating
              </h3>
              <div className="space-y-2">
                {ratings.map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={pendingRatings.includes(rating)}
                      onCheckedChange={() => togglePendingRating(rating)}
                      className="dark:border-gray-600"
                    />
                    <Label
                      htmlFor={`rating-${rating}`}
                      className={`text-sm flex items-center ${theme === "gray" ? "text-white" : "dark:text-white"}`}
                    >
                      {renderStars(rating)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === "gray" ? "text-white" : "dark:text-white"}`}>
                Color
              </h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => {
                  const colorStyle = getColorStyle(color);
                  return (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => togglePendingColor(color)}
                      className={`h-8 w-8 rounded-full border-2 ${colorStyle.borderClass} ${
                        pendingColors.includes(color) 
                          ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900" 
                          : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2 dark:hover:ring-gray-400 dark:ring-offset-gray-900"
                      }`}
                      style={{ backgroundColor: colorStyle.hex }}
                      title={color.charAt(0).toUpperCase() + color.slice(1)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size filter - only show if there are sizes available and not bag type */}
            {sizes.length > 0 && !isBagSelected && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${theme === "gray" ? "text-white" : "dark:text-white"}`}>
                    Size
                  </h3>
                  <SizeChartDialog
                    type={pendingTypes.includes("clothing") ? "clothing" : "footwear"}
                    category={category}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => togglePendingSize(size)}
                      className={`px-3 py-1 border rounded-md text-sm ${
                        pendingSizes.includes(size)
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Material filter - only show for bags or if bag type is selected */}
            {(productType === "bag" || pendingTypes.includes("bag") || productType === "all") && (
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${theme === "gray" ? "text-white" : "dark:text-white"}`}>
                  Material
                </h3>
                <div className="space-y-2">
                  {materials.map((material) => (
                    <div key={material} className="flex items-center gap-2">
                      <Checkbox
                        id={`material-${material}`}
                        checked={pendingMaterials.includes(material)}
                        onCheckedChange={() => togglePendingMaterial(material)}
                        className="dark:border-gray-600"
                      />
                      <Label
                        htmlFor={`material-${material}`}
                        className={`text-sm ${theme === "gray" ? "text-white" : "dark:text-white"}`}
                      >
                        {material}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Style filter */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === "gray" ? "text-white" : "dark:text-white"}`}>
                Style
              </h3>
              <div className="space-y-2">
                {styles.map((style) => (
                  <div key={style} className="flex items-center gap-2">
                    <Checkbox
                      id={`style-${style}`}
                      checked={pendingStyles.includes(style)}
                      onCheckedChange={() => togglePendingStyle(style)}
                      className="dark:border-gray-600"
                    />
                    <Label
                      htmlFor={`style-${style}`}
                      className={`text-sm ${theme === "gray" ? "text-white" : "dark:text-white"}`}
                    >
                      {style}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === "gray" ? "text-white" : "dark:text-white"}`}>
                Price Range
              </h3>
              <div className="space-y-4">
                <div className={`flex justify-between ${theme === "gray" ? "text-white" : "dark:text-white"}`}>
                  <span>${pendingPriceRange[0]}</span>
                  <span>${pendingPriceRange[1]}</span>
                </div>
                <div className="pt-2">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    step="10"
                    value={pendingPriceRange[1]}
                    onChange={(e) => setPendingPriceRange([pendingPriceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button className="w-full flex items-center justify-center gap-2" onClick={applyFilters}>
                <Filter className="h-4 w-4" />
                Apply Filters
              </Button>
              <Button
                variant="outline"
                className="w-full dark:border-gray-700 dark:text-gray-200"
                onClick={clearAllFilters}
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} theme={theme} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className={`text-lg ${theme === "gray" ? "text-white" : "text-gray-500 dark:text-gray-400"}`}>
                  No products found. Try adjusting your filters.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 dark:border-gray-700 dark:text-gray-200"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}


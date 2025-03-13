import { notFound } from "next/navigation"
import ProductsGrid from "@/components/products-grid"
import { products } from "@/lib/products"

export function generateMetadata({ searchParams }) {
  const query = searchParams.q || ""

  return {
    title: `Search Results for "${query}" - Modern Footwear`,
    description: `Browse search results for "${query}" in our premium footwear collection.`,
  }
}

export default function SearchPage({ searchParams }) {
  const query = searchParams.q || ""

  if (!query) {
    notFound()
  }

  // Filter products based on search query
  const searchResults = products.filter((product) => {
    const searchQuery = query.toLowerCase()
    return (
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery)
    )
  })

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Showing results for "{query}"</p>

        <ProductsGrid products={searchResults} />
      </div>
    </main>
  )
}


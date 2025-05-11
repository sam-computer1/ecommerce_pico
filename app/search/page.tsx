import { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductsGrid from "@/components/products-grid"
import { products } from "@/lib/products"

interface SearchParams {
  q?: string
}

export function generateMetadata({ searchParams }: { searchParams: SearchParams }): Metadata {
  const query = searchParams.q || ""

  return {
    title: `Search results for "${query}" - PICo.`,
    description: `Browse search results for "${query}" in our premium footwear collection.`,
  }
}

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const query = searchParams.q || ""

  if (!query) {
    notFound()
  }

  // Filter products based on search query
  const searchResults = products.filter(product => {
    const searchString = `${product.name} ${product.description} ${product.category}`
      .toLowerCase()
    return searchString.includes(query.toLowerCase())
  })

  return (
    <main className="flex-1 bg-gray-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Search Results</h1>
        <p className="text-gray-600 mb-8">Showing results for "{query}"</p>
        
        <ProductsGrid products={searchResults} />
      </div>
    </main>
  )
}


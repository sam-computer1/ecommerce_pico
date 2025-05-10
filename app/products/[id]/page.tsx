import { notFound } from "next/navigation"
import { products } from "@/lib/products"

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata(props: Props) {
  const { id } = await props.params
  const product = products.find((p) => p.id.toString() === id)

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    }
  }

  return {
    title: `${product.name} - Modern Footwear`,
    description: product.description,
  }
}

export default async function Page(props: Props) {
  const { id } = await props.params
  const product = products.find((p) => p.id.toString() === id)

  if (!product) {
    notFound()
  }

  return (
    <main className="flex-1 bg-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {product.description || "Product description not available."}
          </p>
          <p className="mt-4 text-xl font-semibold">${product.price.toFixed(2)}</p>
          <div className="mt-8">
            <p>This page is currently under development.</p>
          </div>
        </div>
      </div>
    </main>
  )
}


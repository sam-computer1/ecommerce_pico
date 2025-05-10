import { notFound } from "next/navigation"
import { products } from "@/lib/products"
import ProductDetail from "@/components/product-detail"
import RelatedProducts from "@/components/related-products"

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

  // Find related products with the same category
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4)

  return (
    <main className="flex-1 bg-white transition-colors duration-300">
      <ProductDetail product={product} />
      <RelatedProducts products={relatedProducts} />
    </main>
  )
}


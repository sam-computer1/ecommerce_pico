import { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Products - Modern Footwear",
  description: "Browse our complete collection of premium footwear and accessories.",
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 
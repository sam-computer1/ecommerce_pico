import type { Metadata } from "next"
import UnderConstructionClient from "./UnderConstructionClient"

export const metadata: Metadata = {
  title: "Under Construction - Pico",
  description: "This page is currently under construction. Please check back later.",
}

export default function UnderConstructionPage() {
  return <UnderConstructionClient />
}


import type { Metadata } from "next"
import UnderConstructionClient from "./UnderConstructionClient"

export const metadata: Metadata = {
  title: "In Development - PICo.",
  description: "This feature is currently in development. Our team is working diligently to enhance your experience.",
}

export default function UnderConstructionPage() {
  return <UnderConstructionClient />
}


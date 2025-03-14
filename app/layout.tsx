import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pico - Premium Shoes for Everyone",
  description: "Discover our collection of premium footwear for men, women, and kids.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <Script id="force-light-mode" strategy="beforeInteractive" src="/force-light-mode.js" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col transition-colors duration-300`}>
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <div className="flex-grow transition-colors duration-300 pt-16">
                {children}
              </div>
              <Footer />
              <ScrollToTop />
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
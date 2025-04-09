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
  title: "PICo. - Premium Shoes for Everyone",
  description: "Discover premium footwear for all occasions. Shop the latest styles in shoes, sneakers, and boots.",
  icons: '/vite.svg',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <Script id="force-light-mode" strategy="beforeInteractive" src="/force-light-mode.js" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col transition-colors duration-300 w-full overflow-x-hidden`}>
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
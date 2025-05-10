import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChatProvider } from "@/context/chat-context"
import { Toaster } from "@/components/ui/toaster"
import ScrollToTop from "@/components/scroll-to-top"
import { ChatWidget } from "@/components/ui/chat-widget"
import { TooltipProvider } from "@/components/ui/tooltip"

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
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col transition-colors duration-300 w-full overflow-x-hidden`}>
        <TooltipProvider>
          <ChatProvider>
            <Header />
            <div className="flex-grow transition-colors duration-300 pt-16">
              {children}
            </div>
            <Footer />
            <ScrollToTop />
            <ChatWidget />
            <Toaster />
          </ChatProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}



import './globals.css'
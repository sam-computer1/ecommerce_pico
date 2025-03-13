"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  [key: string]: any;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on client side
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      try {
        setWishlistItems(JSON.parse(storedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (product: WishlistItem) => {
    setWishlistItems((prev) => {
      // Check if the product already exists in the wishlist
      const existingItemIndex = prev.findIndex((item) => item.id === product.id)

      if (existingItemIndex > -1) {
        // If it exists, don't add it again
        return prev
      } else {
        // If it doesn't exist, add it to the wishlist
        return [...prev, { ...product }]
      }
    })
  }

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((prev) => {
      return prev.filter((item) => item.id !== productId)
    })
  }

  const isInWishlist = (productId: number): boolean => {
    return wishlistItems.some((item) => item.id === productId)
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist(): WishlistContextType {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}


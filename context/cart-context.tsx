"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  image?: string;
  [key: string]: any;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  updateQuantity: (product: CartItem, quantity: number) => void;
  removeFromCart: (product: CartItem) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage on client side
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: CartItem) => {
    setCartItems((prev) => {
      // Check if the product already exists in the cart
      const existingItemIndex = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor,
      )

      if (existingItemIndex > -1) {
        // If it exists, update the quantity
        const updatedItems = [...prev]
        updatedItems[existingItemIndex].quantity += product.quantity || 1
        return updatedItems
      } else {
        // If it doesn't exist, add it to the cart
        return [...prev, { ...product, quantity: product.quantity || 1 }]
      }
    })
  }

  const updateQuantity = (product: CartItem, quantity: number) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (
          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
        ) {
          return { ...item, quantity }
        }
        return item
      })
    })
  }

  const removeFromCart = (product: CartItem) => {
    setCartItems((prev) => {
      return prev.filter(
        (item) =>
          !(
            item.id === product.id &&
            item.selectedSize === product.selectedSize &&
            item.selectedColor === product.selectedColor
          ),
      )
    })
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}


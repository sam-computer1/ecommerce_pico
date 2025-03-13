"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, CreditCard, LockIcon } from "lucide-react"

export default function CheckoutForm() {
  const router = useRouter()
  const { cartItems, clearCart } = useCart()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  const shipping = 5.99
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  const handleSubmit = (e) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      clearCart()
      setIsLoading(false)

      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      })

      router.push("/")
    }, 2000)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <motion.div whileHover={{ y: -2 }} className="col-span-2 sm:col-span-1">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" className="mt-1 shadow-sm focus:shadow-md transition-shadow" required />
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="col-span-2 sm:col-span-1">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" className="mt-1 shadow-sm focus:shadow-md transition-shadow" required />
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" className="mt-1 shadow-sm focus:shadow-md transition-shadow" required />
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" className="mt-1 shadow-sm focus:shadow-md transition-shadow" required />
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="col-span-2 sm:col-span-1">
                <Label htmlFor="city">City</Label>
                <Input id="city" className="mt-1 shadow-sm focus:shadow-md transition-shadow" required />
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="col-span-2 sm:col-span-1">
                <Label htmlFor="state">State / Province</Label>
                <Select>
                  <SelectTrigger id="state" className="mt-1 shadow-sm hover:shadow-md transition-shadow">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                    <SelectItem value="fl">Florida</SelectItem>
                    <SelectItem value="il">Illinois</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="col-span-2 sm:col-span-1">
                <Label htmlFor="postal-code">Postal Code</Label>
                <Input id="postal-code" className="mt-1 shadow-sm focus:shadow-md transition-shadow" required />
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="col-span-2 sm:col-span-1">
                <Label htmlFor="country">Country</Label>
                <Select defaultValue="us">
                  <SelectTrigger id="country" className="mt-1 shadow-sm hover:shadow-md transition-shadow">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="col-span-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" className="mt-1 shadow-sm focus:shadow-md transition-shadow" required />
              </motion.div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <Tabs defaultValue="card" className="w-full" onValueChange={setPaymentMethod}>
              <TabsList className="grid w-full grid-cols-3 shadow-md">
                <TabsTrigger value="card">Credit Card</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="apple">Apple Pay</TabsTrigger>
              </TabsList>
              <TabsContent value="card" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ y: -2 }} className="col-span-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <div className="relative mt-1">
                      <Input
                        id="card-number"
                        placeholder="0000 0000 0000 0000"
                        className="mt-1 pl-10 shadow-sm focus:shadow-md transition-shadow"
                        required
                      />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }} className="col-span-2 sm:col-span-1">
                    <Label htmlFor="expiration">Expiration Date</Label>
                    <Input
                      id="expiration"
                      placeholder="MM/YY"
                      className="mt-1 shadow-sm focus:shadow-md transition-shadow"
                      required
                    />
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }} className="col-span-2 sm:col-span-1">
                    <Label htmlFor="cvc">CVC</Label>
                    <div className="relative mt-1">
                      <Input
                        id="cvc"
                        placeholder="000"
                        className="mt-1 pl-10 shadow-sm focus:shadow-md transition-shadow"
                        required
                      />
                      <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }} className="col-span-2">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input id="card-name" className="mt-1 shadow-sm focus:shadow-md transition-shadow" required />
                  </motion.div>
                </div>
              </TabsContent>
              <TabsContent value="paypal" className="pt-4">
                <div className="rounded-lg border p-6 text-center">
                  <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button type="button" className="w-full shadow-lg hover:shadow-xl transition-all btn-shine">
                      Continue with PayPal
                    </Button>
                  </motion.div>
                </div>
              </TabsContent>
              <TabsContent value="apple" className="pt-4">
                <div className="rounded-lg border p-6 text-center">
                  <p className="mb-4">You will be redirected to Apple Pay to complete your payment.</p>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button type="button" className="w-full shadow-lg hover:shadow-xl transition-all btn-shine">
                      Continue with Apple Pay
                    </Button>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div>
        <div className="rounded-lg border bg-white p-6 shadow-lg sticky top-20">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4 max-h-[300px] overflow-auto mb-4">
            {cartItems.map((item) => (
              <motion.div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md shadow-sm">
                  <Image
                    src={item.image || "/placeholder.svg?height=100&width=100"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-xs text-gray-500">
                    Size: {item.selectedSize} | Color: {item.selectedColor}
                  </p>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-1">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">Secure checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-1">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">Free returns within 30 days</span>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full shine-effect bg-primary shadow-lg hover:shadow-xl transition-all text-lg"
                size="lg"
                onClick={handleSubmit}
                disabled={isLoading || cartItems.length === 0}
              >
                {isLoading ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </Button>
            </motion.div>

            <div className="text-center">
              <Link href="/cart" className="text-sm text-primary hover:underline">
                Return to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Package, Eye } from "lucide-react"

export const metadata: Metadata = {
  title: "My Orders - Modern Footwear",
  description: "View your order history and track current orders.",
}

export default function OrdersPage() {
  // Mock order data
  const orders = [
    {
      id: "ORD-12345",
      date: "May 15, 2023",
      status: "Delivered",
      total: 249.97,
      items: [
        { id: 1, name: "Air Flow Runner", price: 129.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
        { id: 2, name: "Urban Street Pro", price: 89.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
      ],
    },
    {
      id: "ORD-12346",
      date: "June 2, 2023",
      status: "Processing",
      total: 159.99,
      items: [
        { id: 3, name: "Flex Performance", price: 119.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
        { id: 4, name: "Classic Court", price: 79.99, quantity: 0.5, image: "/placeholder.svg?height=80&width=80" },
      ],
    },
  ]

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <nav className="space-y-2">
                <Link
                  href="/account/profile"
                  className="block py-2 px-3 hover:bg-gray-100 dark:bg-gray-800 rounded-md transition-colors"
                >
                  Profile
                </Link>
                <Link href="/account/orders" className="block py-2 px-3 bg-primary text-white rounded-md">
                  Orders
                </Link>
                <Link href="/wishlist" className="block py-2 px-3 hover:bg-gray-100 dark:bg-gray-800 rounded-md transition-colors">
                  Wishlist
                </Link>
                <Link
                  href="/account/settings"
                  className="block py-2 px-3 hover:bg-gray-100 dark:bg-gray-800 rounded-md transition-colors"
                >
                  Settings
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Placed on {order.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/account/orders/${order.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 transition-colors duration-300">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium">${item.price.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <Package className="h-4 w-4" />
                          <span className="text-sm">{order.items.length} items</span>
                        </div>
                        <p className="font-bold">Total: ${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't placed any orders yet.</p>
                <Button asChild>
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}


import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "My Profile - Modern Footwear",
  description: "View and manage your account profile.",
}

export default function ProfilePage() {
  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <nav className="space-y-2">
                <Link href="/account/profile" className="block py-2 px-3 bg-primary text-white rounded-md">
                  Profile
                </Link>
                <Link href="/account/orders" className="block py-2 px-3 hover:bg-gray-100 dark:bg-gray-800 rounded-md transition-colors">
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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                  <p className="font-medium">John Doe</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium">john.doe@example.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="font-medium">+1 (555) 123-4567</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                  <p className="font-medium">January 1, 1990</p>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4 border-t pt-4">Shipping Address</h2>
              <div className="mb-6">
                <p className="font-medium">John Doe</p>
                <p>123 Main Street</p>
                <p>Apt 4B</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
              </div>

              <h2 className="text-xl font-semibold mb-4 border-t pt-4">Billing Address</h2>
              <div className="mb-6">
                <p className="font-medium">John Doe</p>
                <p>123 Main Street</p>
                <p>Apt 4B</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Edit Profile</Button>
                <Button>Change Password</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


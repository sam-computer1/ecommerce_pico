import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export const metadata: Metadata = {
  title: "Account Settings - Modern Footwear",
  description: "Manage your account settings and preferences.",
}

export default function SettingsPage() {
  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900 dark:bg-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

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
                <Link href="/account/orders" className="block py-2 px-3 hover:bg-gray-100 dark:bg-gray-800 rounded-md transition-colors">
                  Orders
                </Link>
                <Link href="/wishlist" className="block py-2 px-3 hover:bg-gray-100 dark:bg-gray-800 rounded-md transition-colors">
                  Wishlist
                </Link>
                <Link href="/account/settings" className="block py-2 px-3 bg-primary text-white rounded-md">
                  Settings
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Email Preferences</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order Confirmations</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails about your orders</p>
                  </div>
                  <Switch defaultChecked id="order-emails" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotional Emails</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails about sales and new products</p>
                  </div>
                  <Switch defaultChecked id="promo-emails" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive our weekly newsletter</p>
                  </div>
                  <Switch id="newsletter-emails" />
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4 border-t pt-4">Password</h2>

              <form className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" className="mt-1" />
                </div>

                <Button type="submit">Update Password</Button>
              </form>

              <h2 className="text-xl font-semibold mb-4 border-t pt-4">Delete Account</h2>

              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>

              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Construction, ArrowLeft, Clock, Mail } from "lucide-react"
import ScrollToTop from "@/components/scroll-to-top"

export default function UnderConstructionClient() {
  return (
    <main className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-center mb-8">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="relative"
                >
                  <Construction className="h-24 w-24 text-primary" />
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute inset-0 rounded-full border-2 border-primary"
                  />
                </motion.div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-center dark:text-white"
              >
                Page Under Construction
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center"
              >
                We're working hard to bring you something amazing. This page is currently under construction and will be
                available soon.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl"
                >
                  <div className="flex items-center mb-4">
                    <Clock className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-lg font-semibold dark:text-white">Coming Soon</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    We're working diligently to complete this page. Check back in a few days!
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl"
                >
                  <div className="flex items-center mb-4">
                    <Mail className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-lg font-semibold dark:text-white">Get Notified</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Want to know when we launch? Contact us and we'll keep you updated.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button asChild className="group text-black dark:text-white">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Return to Home
                  </Link>
                </Button>

                <Button variant="outline" asChild className="dark:text-white dark:border-gray-600">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <ScrollToTop />
    </main>
  )
}


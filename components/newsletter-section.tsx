"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { motion, useInView } from "framer-motion"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setEmail("")
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      })
    }, 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 className="text-3xl font-bold mb-4" variants={itemVariants}>
            Stay Updated
          </motion.h2>
          <motion.p className="text-gray-600 mb-8" variants={itemVariants}>
            Subscribe to our newsletter for exclusive offers, new releases, and more.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            variants={itemVariants}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 shadow-sm focus:shadow-md transition-shadow"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-[#8a0505] text-white font-bold py-2 px-6 rounded-md shadow-lg hover:shadow-xl transition-all text-base"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </motion.div>
          </motion.form>

          <motion.p className="text-sm text-gray-500 mt-4" variants={itemVariants}>
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}


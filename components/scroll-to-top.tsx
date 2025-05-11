"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Debounced scroll handler to prevent excessive updates
  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset
    
    if (currentScrollPos > 500) {
      if (!isVisible) setIsVisible(true)
    } else {
      if (isVisible) setIsVisible(false)
    }
  }, [isVisible])

  useEffect(() => {
    // Add throttled event listener
    let timeoutId: NodeJS.Timeout | null = null
    
    const onScroll = () => {
      if (timeoutId) return
      
      timeoutId = setTimeout(() => {
        handleScroll()
        timeoutId = null
      }, 100)
    }
    
    window.addEventListener("scroll", onScroll)
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      window.removeEventListener("scroll", onScroll)
    }
  }, [handleScroll])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-24 right-6 z-[90]"
        >
          <Button
            onClick={scrollToTop}
            className="h-12 w-12 rounded-full shadow-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground border-2 border-white/20 transition-all hover:shadow-xl"
            size="icon"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


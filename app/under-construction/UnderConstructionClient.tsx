"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Construction, Loader2, Code, Database, Server, LayoutGrid, Terminal, GitBranch } from "lucide-react"
import ScrollToTop from "@/components/scroll-to-top"
import { useEffect, useState } from "react"

export default function UnderConstructionClient() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }
  
  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  }
  
  const pulse = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity, repeatType: "loop" as const }
    }
  }

  // Development icons for the background
  const devIcons = [
    { Icon: Code, position: { top: "15%", left: "10%" }, size: 22, delay: 0 },
    { Icon: Database, position: { top: "25%", right: "15%" }, size: 20, delay: 0.5 },
    { Icon: Server, position: { bottom: "20%", left: "20%" }, size: 22, delay: 1 },
    { Icon: LayoutGrid, position: { bottom: "30%", right: "10%" }, size: 26, delay: 1.5 },
    { Icon: Terminal, position: { top: "60%", left: "80%" }, size: 18, delay: 2 },
    { Icon: GitBranch, position: { top: "70%", right: "75%" }, size: 24, delay: 2.5 },
  ];

  // If not client yet, render a simple version to avoid hydration mismatch
  if (!isClient) {
    return (
      <main className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 transition-colors duration-300 min-h-screen relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen relative z-10">
          <div className="w-full max-w-3xl mx-auto">
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-700">
              <div className="p-8 md:p-12 text-center">
                <div className="mb-8 flex justify-center">
                  <div className="relative bg-gray-800 rounded-full p-4">
                    <Code className="h-16 w-16 text-[#00ff99]" />
                  </div>
                </div>
                <div className="mb-8 relative">
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-1 tracking-tight">
                      <span className="text-[#00ff99]">UNDER</span>
                    </h2>
                    <div className="relative">
                      <h2 className="text-5xl md:text-7xl font-black tracking-tight">
                        <span className="relative inline-block text-white">
                          DEVELOPMENT
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Our team is working diligently to enhance your experience with this feature. 
                  We're focused on creating something exceptional for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-[#00ff99] hover:bg-[#00cc77] text-gray-900 shadow-lg">
                    <Link href="/">Return to Home</Link>
                  </Button>
                  <Button variant="outline" asChild className="border-gray-500 text-gray-300 hover:bg-gray-700 bg-gray-700/50">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <motion.main 
      initial="hidden"
      animate="visible"
      className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 transition-colors duration-300 min-h-screen relative overflow-hidden"
    >
      {/* Matrix-like digit rain animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#000]/60"></div>
        
        {/* Digital rain columns */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute top-0 w-8 overflow-hidden text-center"
            style={{ 
              left: `${i * 5}%`, 
              height: '150%',
              color: 'rgba(0, 255, 128, 0.15)',
              fontFamily: 'monospace',
              fontSize: '14px'
            }}
            initial={{ y: -1000 }}
            animate={{ y: 1000 }}
            transition={{ 
              duration: 15 + Math.random() * 20, 
              repeat: Infinity, 
              repeatType: "loop" as const,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            {Array.from({ length: 30 }).map((_, j) => (
              <div key={j} className="my-4">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
      
      {/* Floating dev icons */}
      {devIcons.map(({ Icon, position, size, delay }, index) => (
        <motion.div
          key={index}
          className="absolute z-0"
          style={{ ...position }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0, 0.4, 0], 
            y: [20, -20, 20],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 6,
            delay: delay,
            repeat: Infinity,
            repeatType: "loop" as const 
          }}
        >
          <Icon className="text-[#00ff99]/40" style={{ width: size, height: size }} />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen relative z-10">
        <motion.div 
          variants={fadeIn}
          className="w-full max-w-3xl mx-auto"
        >
          <motion.div 
            variants={fadeInScale}
            className="bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-700"
          >
            <div className="p-8 md:p-12 text-center">
              <motion.div 
                variants={fadeInUp}
                className="mb-8 flex justify-center"
              >
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#00ff99]/30 via-[#00ff99]/60 to-[#00ff99]/30 blur-lg animate-pulse"></div>
                  <div className="relative bg-gray-800 rounded-full p-4">
                    <Code className="h-16 w-16 text-[#00ff99]" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                variants={fadeInUp}
                className="mb-8 relative"
              >
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-4xl md:text-5xl font-black mb-1 tracking-tight">
                    <span className="text-[#00ff99]">UNDER</span>
                  </h2>
                  <div className="relative">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tight">
                      <span className="relative inline-block text-white">
                        DEVELOPMENT
                        <span className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-[#00ff99] to-[#00ff99]/50 rounded-full"></span>
                      </span>
                    </h2>
                  </div>
                </div>
              </motion.div>
              
              <motion.div className="flex items-center justify-center mb-6">
                <motion.div 
                  initial="initial"
                  animate="animate"
                  variants={pulse}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#00ff99]/10 rounded-full"
                >
                  <Loader2 className="h-4 w-4 text-[#00ff99] animate-spin" />
                  <span className="text-sm font-medium text-[#00ff99]">Work in progress</span>
                </motion.div>
              </motion.div>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                Our team is working diligently to enhance your experience with this feature. 
                We're focused on creating something exceptional for you.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button asChild className="group bg-[#00ff99] hover:bg-[#00cc77] text-gray-900 shadow-lg shadow-[#00ff99]/20 hover:shadow-[#00ff99]/30 transition-all">
                  <Link href="/" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Return to Home
                  </Link>
                </Button>
                <Button variant="outline" asChild className="border-gray-500 text-gray-300 hover:bg-gray-700 shadow-none transition-all bg-gray-700/50">
                  <Link href="/contact" className="flex items-center">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <ScrollToTop />
    </motion.main>
  )
}


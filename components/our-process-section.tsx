"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"

const ProcessStep = ({ 
  index, 
  title, 
  description, 
  isLast = false 
}: { 
  index: number; 
  title: string; 
  description: string; 
  isLast?: boolean 
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.div
        className="relative w-full"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } }
        }}
      >
        <div className="flex flex-col items-center">
          {/* Step Number */}
          <motion.div
            className="w-16 h-16 rounded-full bg-[#690707] dark:bg-[#cb0000] text-[#f4edca] flex items-center justify-center text-2xl font-bold mb-4 z-10"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {index + 1}
          </motion.div>
          
          {/* Step Image */}
          <div className="w-full max-w-[250px] bg-background rounded-lg overflow-hidden shadow-xl mb-4">
            <div className="aspect-square relative">
              <Image
                src={`/placeholder.svg?height=250&width=250&text=Process+Step+${index + 1}`}
                alt={`Process step ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Step Content */}
          <div className="text-center px-4 mb-6">
            <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
            <p className="text-foreground/70">{description}</p>
          </div>
        </div>
      </motion.div>
      
      {/* Arrow connector - only show if not the last item */}
      {!isLast && (
        <motion.div
          className="hidden md:flex items-center justify-center mb-8"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { 
              opacity: 1, 
              scale: 1, 
              transition: { duration: 0.3, delay: index * 0.2 + 0.3 }
            }
          }}
        >
          <ArrowRight size={32} className="text-[#690707] dark:text-[#cb0000] animate-pulse" />
        </motion.div>
      )}
    </div>
  )
}

// For mobile, we'll show a vertical flow with downward arrows
const MobileArrow = ({ index, controls }: { index: number; controls: any }) => {
  return (
    <motion.div
      className="md:hidden flex justify-center py-4"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 0 },
        visible: { 
          opacity: 1, 
          scale: 1, 
          transition: { duration: 0.3, delay: index * 0.2 + 0.3 }
        }
      }}
    >
      <div className="h-12 w-0.5 bg-[#690707] dark:bg-[#cb0000] relative">
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 border-b-2 border-r-2 border-[#690707] dark:border-[#cb0000] rotate-45" />
      </div>
    </motion.div>
  )
}

export default function OurProcessSection() {
  const processSteps = [
    {
      title: "Design & Development",
      description: "Our expert designers create innovative footwear concepts tailored to your brand specifications."
    },
    {
      title: "Material Selection",
      description: "We source premium, sustainable materials that meet the highest quality and durability standards."
    },
    {
      title: "Prototyping & Testing",
      description: "Each design undergoes rigorous testing to ensure comfort, durability and performance."
    },
    {
      title: "Production",
      description: "State-of-the-art manufacturing facilities bring designs to life with precision and care."
    },
    {
      title: "Quality Control & Delivery",
      description: "Thorough quality inspections ensure every pair meets our exacting standards before shipping."
    }
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#666666] dark:text-[#cb0000]">Our Process</h2>
          <p className="text-[#666666] dark:text-[#cb0000] max-w-2xl mx-auto">
            From concept to delivery, we ensure quality and excellence at every step of the manufacturing process.
          </p>
        </div>

        {/* Desktop Process Flow (Horizontal) */}
        <div className="hidden md:grid grid-cols-5 gap-6 mb-16">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              index={index}
              title={step.title}
              description={step.description}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </div>

        {/* Mobile Process Flow (Vertical) */}
        <div className="md:hidden space-y-2">
          {processSteps.map((step, index) => {
            const ref = useRef(null)
            const isInView = useInView(ref, { once: true, amount: 0.3 })
            const controls = useAnimation()
            
            useEffect(() => {
              if (isInView) {
                controls.start("visible")
              }
            }, [isInView])
            
            return (
              <div key={index} ref={ref}>
                <ProcessStep
                  index={index}
                  title={step.title}
                  description={step.description}
                  isLast={index === processSteps.length - 1}
                />
                {index < processSteps.length - 1 && <MobileArrow index={index} controls={controls} />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 
"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

export default function CategoryShowcase() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const categories = [
    {
      id: "mens",
      name: "Men",
      image: "/images/homepage/men.png",
      color: "bg-[#666666]",
      textColor: "text-white",
      link: "/mens",
    },
    {
      id: "womens",
      name: "Women",
      image: "/images/homepage/women.png",
      color: "bg-pink-500",
      textColor: "text-white",
      link: "/womens",
    },
    {
      id: "kids",
      name: "Kids",
      image: "/images/homepage/kid.png",
      color: "bg-blue-500",
      textColor: "text-white",
      link: "/kids",
    },
  ]

  const translateY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section ref={sectionRef} className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-4 text-[#666666]"
        >
          Shop By Category
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-[#666666] mb-10 max-w-2xl mx-auto"
        >
          Discover our curated collections designed for every style and occasion
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className={`group relative overflow-hidden rounded-lg ${category.color} h-[400px] shadow-lg`}
            >
              <Link href={category.link} className="block h-full w-full relative">
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={`${category.name} category`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
                <motion.div
                  className="absolute inset-0 z-10 flex flex-col justify-end p-6"
                  style={{ y: translateY }}
                >
                  <motion.h3 className={`text-2xl font-bold ${category.textColor} mb-2`}>{category.name}</motion.h3>
                  <motion.p className={`${category.textColor} mb-4 opacity-80`}>Latest collection</motion.p>
                  <motion.span
                    className={`inline-block ${category.textColor} font-medium text-sm underline group-hover:translate-x-2 transition-transform duration-300`}
                  >
                    Shop Now
                  </motion.span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


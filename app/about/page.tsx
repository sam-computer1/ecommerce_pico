import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us - Modern Footwear",
  description: "Learn about our story, mission, and commitment to quality footwear.",
}

export default function AboutPage() {
  return (
    <main className="flex-1 bg-[#FFFFF0] text-[#191970] transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image src="/placeholder.svg?height=800&width=1600" alt="Background pattern" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-lg mb-8">
              Crafting premium footwear since 2010, we've been on a mission to combine style, comfort, and
              sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="mb-4">
                At ModernKicks, we believe that great footwear should be a perfect blend of style, comfort, and
                durability. Our mission is to create shoes that not only look good but feel good too, allowing you to
                put your best foot forward every day.
              </p>
              <p className="mb-4">
                We're committed to sustainable practices and ethical manufacturing, ensuring that our footprint on the
                planet is as light as possible.
              </p>
              <p>
                Every pair of shoes we create is designed with passion and crafted with precision, using only the
                highest quality materials to ensure longevity and comfort.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/placeholder.svg?height=800&width=600" alt="Our workshop" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-[#D4AF37] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="mb-8">We stand by our core values in everything we do, from design to delivery.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-3">Quality</h3>
              <p>
                We never compromise on quality. Every stitch, every material, and every design element is carefully
                selected and crafted to ensure durability and comfort.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p>
                We're constantly pushing the boundaries of footwear design, incorporating the latest technologies and
                trends to create shoes that are both functional and fashionable.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p>
                We're committed to reducing our environmental impact through sustainable sourcing, eco-friendly
                materials, and responsible manufacturing practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="mb-8">
              Meet the passionate individuals behind ModernKicks who work tirelessly to bring you the best footwear
              experience.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4 shadow-md">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=Team Member ${i}`}
                    alt={`Team member ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Team Member {i}</h3>
                <p className="text-[#D4AF37]">Position</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-[#191970]/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p>From a small workshop to a global brand, here's how we've grown over the years.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#D4AF37]"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {[
                {
                  year: "2010",
                  title: "The Beginning",
                  description: "ModernKicks was founded with a vision to create stylish, comfortable footwear.",
                },
                {
                  year: "2013",
                  title: "First Store",
                  description: "We opened our first physical store in New York City.",
                },
                { year: "2016", title: "Going Global", description: "Expanded our operations to Europe and Asia." },
                {
                  year: "2020",
                  title: "Sustainability Initiative",
                  description: "Launched our eco-friendly line made from recycled materials.",
                },
                {
                  year: "2023",
                  title: "Innovation Hub",
                  description: "Opened our innovation center dedicated to developing new footwear technologies.",
                },
              ].map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? "flex-row-reverse" : ""}`}>
                  <div className="flex-1 transition-colors duration-300"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#D4AF37] border-4 border-[#FFFFF0] z-10"></div>
                  <div className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300">
                    <div className="text-[#D4AF37] font-bold text-xl mb-2">{item.year}</div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#191970] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="max-w-2xl mx-auto mb-8">
            We're always looking for passionate individuals to join our team and help us continue to create amazing
            footwear.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-white">
              <Link href="/careers">View Careers</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white dark:bg-gray-800/20">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}


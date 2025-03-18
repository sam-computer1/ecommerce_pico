"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import TeamMemberDialog, { TeamMemberProps } from "@/components/team-member-dialog"

// Define team members data
const TEAM_MEMBERS: TeamMemberProps[] = [
  {
    id: 1,
    name: "Emma Johnson",
    position: "Founder & CEO",
    bio: "Emma founded Pico in 2010 with a vision to create stylish and comfortable footwear. With over 15 years of experience in fashion design, she leads the company's creative direction and business strategy. She believes in sustainable practices and ethical manufacturing, ensuring that Pico' footprint on the planet is as light as possible.",
    imageSrc: "/placeholder.svg?height=300&width=300&text=Emma Johnson"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Head of Design",
    bio: "Michael brings over a decade of experience in footwear design. Before joining Pico, he worked with several luxury brands in Europe. He's passionate about combining aesthetics with functionality and is constantly exploring new materials and technologies to enhance the comfort and sustainability of our products.",
    imageSrc: "/placeholder.svg?height=300&width=300&text=Michael Chen"
  },
  {
    id: 3,
    name: "Mr. Subhrodeep Banerjee",
    position: "Operations Director",
    bio: "Mr. Subhrodeep Banerjee brings over 16 years of extensive experience in the IT industry, having played a significant role in various multinational corporations. His expertise spans across multiple domains, with a strong foundation in SAP ERP implementation during his tenure in MNCs.\n\nIn addition to his corporate experience, Mr. Banerjee has served as a leading faculty member in Bhutan and West Bengal-India, for seven years and has been a guest lecturer for several manufacturing companies in West Bengal.\n\nHis academic qualifications include an MBA in Finance, an M.Com., a CS (Inter.), a B.Com., and an LLB. Complementing his finance and legal background, he holds IT certifications in DIT and SAP, with proficiency in SAP FICO, FSCM, FICA, PP, MM, and SD modules.\n\nMr. Banerjee's diverse expertise in IT, finance, and legal domains makes him a valuable asset in the field of enterprise resource planning and business process optimization.",
    imageSrc: "/placeholder.svg?height=300&width=300&text=Subhrodeep Banerjee"
  },
  {
    id: 4,
    name: "David Wilson",
    position: "Marketing Head",
    bio: "David leads our marketing and brand strategy. With his innovative approach to digital marketing and deep understanding of consumer behavior, he has successfully positioned Pico as a premium footwear brand. He's passionate about storytelling and creating authentic connections with our customers.",
    imageSrc: "/placeholder.svg?height=300&width=300&text=David Wilson"
  },
  {
    id: 5,
    name: "Alex Thompson",
    position: "Co-Founder",
    bio: "As a co-founder of Pico, Alex brings a unique blend of entrepreneurial spirit and technical expertise to the company. With a background in sustainable materials and manufacturing processes, he has been instrumental in developing our eco-friendly production methods and establishing partnerships with ethical suppliers worldwide.\n\nHis vision for sustainable fashion has helped shape Pico's commitment to environmental responsibility while maintaining the highest standards of quality and comfort. Alex's innovative approach to material sourcing and production has set new industry standards for sustainable footwear manufacturing.",
    imageSrc: "/placeholder.svg?height=300&width=300&text=Alex Thompson"
  }
]

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMemberProps | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenMemberDialog = (member: TeamMemberProps) => {
    setSelectedMember(member);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <main className="flex-1 bg-[#F4F2F0] transition-colors duration-300 dark:bg-[#1C1C1C] dark:text-[#D9D9D9]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image src="/placeholder.svg?height=800&width=1600" alt="Background pattern" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1A1A1A] dark:text-[#EAEAEA]">Our Story</h1>
            <p className="text-lg mb-8 text-[#4A3C31] dark:text-[#C0C0C0]">
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
              <h2 className="text-3xl font-bold mb-4 text-[#1A1A1A] dark:text-[#EAEAEA]">Our Mission</h2>
              <p className="mb-4 text-[#4A3C31] dark:text-[#C0C0C0]">
                At Pico, we believe that great footwear should be a perfect blend of style, comfort, and
                durability. Our mission is to create shoes that not only look good but feel good too, allowing you to
                put your best foot forward every day.
              </p>
              <p className="mb-4 text-[#4A3C31] dark:text-[#C0C0C0]">
                We're committed to sustainable practices and ethical manufacturing, ensuring that our footprint on the
                planet is as light as possible.
              </p>
              <p className="text-[#4A3C31] dark:text-[#C0C0C0]">
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
            <h2 className="text-3xl font-bold mb-4 text-[#1A1A1A] dark:text-[#EAEAEA]">Our Values</h2>
            <p className="mb-8 text-[#4A3C31] dark:text-[#121212]">We stand by our core values in everything we do, from design to delivery.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/90 dark:bg-gray-800/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-3 text-[#1A1A1A] dark:text-[#EAEAEA]">Quality</h3>
              <p className="text-[#4A3C31] dark:text-[#121212]">
                We never compromise on quality. Every stitch, every material, and every design element is carefully
                selected and crafted to ensure durability and comfort.
              </p>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-3 text-[#1A1A1A] dark:text-[#EAEAEA]">Innovation</h3>
              <p className="text-[#4A3C31] dark:text-[#121212]">
                We're constantly pushing the boundaries of footwear design, incorporating the latest technologies and
                trends to create shoes that are both functional and fashionable.
              </p>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-3 text-[#1A1A1A] dark:text-[#EAEAEA]">Sustainability</h3>
              <p className="text-[#4A3C31] dark:text-[#121212]">
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
            <h2 className="text-3xl font-bold mb-4 text-[#1A1A1A] dark:text-[#EAEAEA]">Our Team</h2>
            <p className="mb-8 text-[#4A3C31] dark:text-[#C0C0C0]">
              Meet the passionate individuals behind Pico who work tirelessly to bring you the best footwear
              experience.
            </p>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.id} 
                className="text-center cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => handleOpenMemberDialog(member)}
              >
                <div className="relative h-48 w-48 mx-auto rounded-full overflow-hidden mb-3 shadow-md">
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-[#EAEAEA]">{member.name}</h3>
                <p className="text-sm text-[#D4AF37] dark:text-[#C77C48]">{member.position}</p>
                <p className="mt-1 text-xs text-[#4A3C31] dark:text-[#C0C0C0]">Click to learn more</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-[#1A1A1A]/5 dark:bg-[#EAEAEA]/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#1A1A1A] dark:text-[#EAEAEA]">Our Journey</h2>
            <p className="text-[#4A3C31] dark:text-[#C0C0C0]">From a small workshop to a global brand, here's how we've grown over the years.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#D4AF37] dark:bg-[#C77C48]"></div>

            {/* Timeline items */}
            <div className="space-y-16">
              {[
                {
                  year: "2010",
                  title: "The Beginning",
                  description: "Pico was founded with a vision to create stylish, comfortable footwear.",
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
                  <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300">
                      <div className="text-[#D4AF37] dark:text-[#C77C48] font-bold text-xl mb-2">{item.year}</div>
                      <h3 className="text-lg font-semibold mb-2 text-[#1A1A1A] dark:text-[#EAEAEA]">{item.title}</h3>
                      <p className="text-[#4A3C31] dark:text-[#C0C0C0]">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#D4AF37] dark:bg-[#C77C48] border-4 border-[#FFFFF0] dark:border-gray-900 z-10"></div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1A1A1A] dark:bg-[#000000] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#EAEAEA]">Join Our Journey</h2>
          <p className="max-w-2xl mx-auto mb-8 text-[#C0C0C0]">
            We're always looking for passionate individuals to join our team and help us continue to create amazing
            footwear.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#D4AF37] dark:bg-[#C77C48] hover:bg-[#D4AF37]/80 dark:hover:bg-[#C77C48]/80 text-white">
              <Link href="/careers">View Careers</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 dark:border-white dark:text-white border-gray-800 text-gray-800">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Member Dialog */}
      <TeamMemberDialog 
        member={selectedMember} 
        isOpen={dialogOpen} 
        onClose={handleCloseDialog} 
      />
    </main>
  )
}


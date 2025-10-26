"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import OurProcessSection from "@/components/our-process-section"
import FeaturedProductsSection from "@/components/featured-products-section"
import CategoryShowcase from "@/components/category-showcase"
import ProductCTA from "@/components/product-cta"
import NewsletterSection from "@/components/newsletter-section"
import ScrollToTop from "@/components/scroll-to-top"
import TeamMemberDialog, { TeamMemberProps } from "@/components/team-member-dialog"
import { motion, useInView } from "framer-motion"

// Define team members data
const TEAM_MEMBERS: TeamMemberProps[] = [
  {
    id: 1,
    name: "Jai Prakash Chharia",
    position: "Chairman",
    bio: "Jai Prakash Chharia is a seasoned leader with over 40 years of experience in international trade and 30+ years as an entrepreneur. His extensive expertise across industries and global markets gives PICo. a strategic advantage in the apparel, accessories, and footwear sector. Known for his ability to navigate complex trade environments, forge international partnerships, and drive sustainable growth, Mr. Chharia brings visionary leadership, sharp business acumen, and a commitment to ethical practices. As Chairman, he provides strategic direction and fosters a culture of innovation, integrity, and excellence.",
    imageSrc: "https://5lewiexqmin2zbg0.public.blob.vercel-storage.com/TeamPics/Mr.%20Jai%20Prakash.jpg"
  },
  {
    id: 2,
    name: "Johnny Tranz",
    position: "Director (Technical)",
    bio: "Johnny Tran brings over three decades of expertise in footwear manufacturing and international trade to his role as Director (Technical) at PICo. His career spans key markets across Asia, including Hong Kong, Vietnam, and Korea, where he has worked with leading manufacturers and global brands such as Reebok, Decathlon, Zara, and American Eagle. With a strong foundation in sales, product development, and technical operations, Johnny has a proven track record of driving innovation, ensuring production excellence, and meeting the highest quality standards. At PICo., he leads technical strategy and manufacturing, leveraging his deep industry knowledge to deliver cutting-edge, high-performance footwear solutions.",
    imageSrc: "https://5lewiexqmin2zbg0.public.blob.vercel-storage.com/TeamPics/Mr.%20Johnny.jpg"
  },
  {
    id: 3,
    name: "Subhrodeep Banerjee",
    position: "Director (IT and Digital Processes)",
    bio: "Subhrodeep Banerjee brings over 16 years of experience in the IT industry, specializing in SAP ERP implementation across multiple domains. He has worked with several multinational corporations and also served as a faculty member and guest lecturer in Bhutan and West Bengal. Holding an MBA in Finance, M.Com., CS (Inter.), B.Com., LLB, and certifications in DIT and SAP, he is proficient in SAP FICO, FSCM, FICA, PP, MM, and SD. His combined expertise in IT, finance, and law positions him as a key contributor to enterprise resource planning and business process optimization.",
    imageSrc: "https://5lewiexqmin2zbg0.public.blob.vercel-storage.com/TeamPics/Mr.%20Subhrodeep.jpg"
  },
  {
    id: 4,
    name: "Ashutosh Chharia",
    position: "Director (Factory Operations & Production)",
    bio: "Ashutosh Chharia is a results-driven leader with over a decade of experience in managing large-scale manufacturing operations. Holding a B.Tech in Food Engineering and Processing, he combines strong technical expertise with hands-on operational leadership. At PICo., he oversees the full production lifecycle—from raw material procurement to final output—ensuring efficiency, quality, and timely delivery. His core strengths include process optimization, strategic production planning, quality management, cost control, and team leadership. With a focus on operational excellence and regulatory compliance, Ashutosh plays a key role in maintaining PICo.'s high production standards and competitive edge.",
    imageSrc: "https://5lewiexqmin2zbg0.public.blob.vercel-storage.com/TeamPics/Mr.%20Ashutosh.jpg"
  },
  {
    id: 5,
    name: "Harshvardhan Chharia",
    position: "Director (Communication)/Legal Representative",
    bio: "Harshvardhan Chharia is a strategic leader driving PICo.'s communications and legal operations. With a B.Com. in International Trade and a postgraduate specialization in Public Relations and Corporate Communications, he blends global business insight with expert communication skills. He leads the company's brand strategy, stakeholder engagement, and public relations while ensuring consistent and impactful messaging across all channels. As Legal Representative, he oversees corporate governance, regulatory compliance, and interdepartmental coordination. Harshvardhan's integrated approach to communication, legal affairs, and international business supports PICo.'s sustained growth and global positioning.",
    imageSrc: "https://5lewiexqmin2zbg0.public.blob.vercel-storage.com/TeamPics/Mr.%20Harshvardhan.jpg"
  }
]

export default function HomePage() {
  const [selectedMember, setSelectedMember] = useState<TeamMemberProps | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Refs for scroll animations
  const aboutRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const joinJourneyRef = useRef(null);
  
  // InView hooks
  const aboutInView = useInView(aboutRef, { once: true, amount: 0.3 });
  const visionInView = useInView(visionRef, { once: true, amount: 0.3 });
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 });
  const joinJourneyInView = useInView(joinJourneyRef, { once: true, amount: 0.3 });

  const handleOpenMemberDialog = (member: TeamMemberProps) => {
    setSelectedMember(member);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <main className="flex-1 bg-[#FAF4ED] transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <Image
          src="/images/homepage/collection-header.jpg"
          alt="Hero image of signature shoes"
          fill
          priority
          className="object-cover object-center scale-105 animate-[zoomOut_10s_ease-in-out_infinite_alternate]"
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-start px-4 md:px-6">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-[#EAEAEA] tracking-tight hero-text">
            Modern Luxury
            </h1>
            <p className="text-lg md:text-xl text-[#D9D9D9] hero-text">
            Modern Luxury is the ability to think clearly, sleep deeply, move slowly and live quietly in a world designed to prevent all four
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 hero-text">
              <Button
                size="lg"
                asChild
                className="bg-[#474646] hover:bg-[#C9A959] text-white font-bold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/products" className="px-8">
                  Shop Now
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-[#C9A959]/20 text-white border-white font-bold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/" className="px-8">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <motion.section 
        ref={aboutRef}
        initial="hidden"
        animate={aboutInView ? "visible" : "visible"}
        variants={fadeIn}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={fadeInUp}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl font-bold mb-4 text-foreground">About Us</h2>
              <p className="text-foreground/80 tracking-[0.5px] font-serif leading-relaxed text-lg text-justify">
                PICo. is a strategic partner for global brands in the apparel, accessories, and footwear industries, delivering end-to-end B2B solutions. We support every stage of the product lifecycle—from concept development and design, informed by trend forecasting and material innovation, to sourcing and manufacturing through our vetted global network. Our services include comprehensive supply chain optimization, covering logistics, inventory management, and stringent quality control. With meticulous production oversight and expert handling of international trade and export logistics, PICo. ensures a seamless path from concept to final delivery.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInScale}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-1 md:order-2"
            >
              <Image src="https://5lewiexqmin2zbg0.public.blob.vercel-storage.com/ShoesPics/shoes2.JPG" alt="About our company" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Mission Section */}
      <motion.section 
        ref={missionRef}
        initial="hidden"
        animate={missionInView ? "visible" : "visible"}
        variants={fadeIn}
        className="py-16 bg-[#1A1A1A]/5"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={fadeInScale}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-1 md:order-1"
            >
              <Image src="https://5lewiexqmin2zbg0.public.blob.vercel-storage.com/ShoesPics/shoes7.JPG" alt="Our company vision" fill className="object-cover" />
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="order-2 md:order-2"
            >
              <h2 className="text-3xl font-bold mb-4 text-foreground">Our Mission</h2>
              <p className="text-foreground/80 tracking-[0.5px] font-serif leading-relaxed text-lg text-justify">
                PICo. is a strategic partner in end-to-end product development for global brands, offering an integrated suite of B2B services from concept to delivery. We transform brand visions into market-ready designs through trend forecasting, material innovation, and technical expertise. Backed by a global network of vetted manufacturers, we ensure ethical production, specialized capabilities, and cost efficiency. Our supply chain solutions encompass logistics, inventory, quality control, and production oversight to ensure precision and reliability. From international shipping to final delivery, PICo. delivers seamless execution. While our in-house label reflects our design excellence, our primary focus is empowering brands with tailored, transparent, and results-driven partnerships.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Vision Section */}
      <motion.section 
        ref={visionRef}
        initial="hidden"
        animate={visionInView ? "visible" : "visible"}
        variants={fadeIn}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={fadeInUp}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl font-bold mb-4 text-foreground">Our Vision</h2>
              <p className="text-foreground/80 tracking-[0.5px] font-serif leading-relaxed text-lg text-justify">
                PICo. envisions a future where global brands can bring their creative visions to life with ease and confidence. As a trusted end-to-end solution provider, we are committed to simplifying the product development process, enabling our B2B clients to focus on their brand identity and innovation. Our vision is to set the benchmark for operational excellence, ethical production, and supply chain expertise, fostering long-term partnerships built on trust and shared success. We continuously evolve by embracing new technologies and anticipating industry trends, ensuring our clients benefit from cutting-edge, reliable, and high-quality solutions that drive global competitiveness.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInScale}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-1 md:order-2"
            >
              <Image src="https://5lewiexqmin2zbg0.public.blob.vercel-storage.com/ShoesPics/shoes15.JPG" alt="Our workshop" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        ref={valuesRef}
        initial="hidden"
        animate={valuesInView ? "visible" : "visible"}
        variants={fadeIn}
        className="py-16 bg-background text-foreground"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Values</h2>
            <p className="mb-8 text-foreground/80">We stand by our core values in everything we do, from design to delivery.</p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            className="relative w-full max-w-6xl mx-auto"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div variants={fadeInScale} className="flex flex-col items-center w-full md:w-auto">
                <div className="w-20 h-20 rounded-full bg-[#8B0000] flex items-center justify-center text-white mb-2 shadow-lg">
                  <span className="font-serif font-bold text-xl">01</span>
                </div>
                <div className="border-t-2 border-dashed border-[#8B0000] w-24 md:w-32 my-2"></div>
                <h3 className="text-lg font-semibold text-center text-[#8B0000]">Boundless Creative Potential</h3>
              </motion.div>
              
              <motion.div variants={fadeInScale} className="flex flex-col items-center w-full md:w-auto">
                <div className="w-20 h-20 rounded-full bg-[#8B0000] flex items-center justify-center text-white mb-2 shadow-lg">
                  <span className="font-serif font-bold text-xl">02</span>
                </div>
                <div className="border-t-2 border-dashed border-[#8B0000] w-24 md:w-32 my-2"></div>
                <h3 className="text-lg font-semibold text-center text-[#8B0000]">Unwavering Ethical Integrity</h3>
              </motion.div>
              
              <motion.div variants={fadeInScale} className="flex flex-col items-center w-full md:w-auto">
                <div className="w-20 h-20 rounded-full bg-[#8B0000] flex items-center justify-center text-white mb-2 shadow-lg">
                  <span className="font-serif font-bold text-xl">03</span>
                </div>
                <div className="border-t-2 border-dashed border-[#8B0000] w-24 md:w-32 my-2"></div>
                <h3 className="text-lg font-semibold text-center text-[#8B0000]">Premier Strategic Partner</h3>
              </motion.div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8 md:mt-4">
              <motion.div variants={fadeInScale} className="flex flex-col items-center w-full md:w-auto">
                <div className="w-20 h-20 rounded-full bg-[#8B0000] flex items-center justify-center text-white mb-2 shadow-lg">
                  <span className="font-serif font-bold text-xl">04</span>
                </div>
                <div className="border-t-2 border-dashed border-[#8B0000] w-24 md:w-32 my-2"></div>
                <h3 className="text-lg font-semibold text-center text-[#8B0000]">Collaborative Excellence</h3>
              </motion.div>
              
              <motion.div variants={fadeInScale} className="flex flex-col items-center w-full md:w-auto">
                <div className="w-20 h-20 rounded-full bg-[#8B0000] flex items-center justify-center text-white mb-2 shadow-lg">
                  <span className="font-serif font-bold text-xl">05</span>
                </div>
                <div className="border-t-2 border-dashed border-[#8B0000] w-24 md:w-32 my-2"></div>
                <h3 className="text-lg font-semibold text-center text-[#8B0000]">Exceeding Expectations</h3>
              </motion.div>
              
              <motion.div variants={fadeInScale} className="flex flex-col items-center w-full md:w-auto">
                <div className="w-20 h-20 rounded-full bg-[#8B0000] flex items-center justify-center text-white mb-2 shadow-lg">
                  <span className="font-serif font-bold text-xl">06</span>
                </div>
                <div className="border-t-2 border-dashed border-[#8B0000] w-24 md:w-32 my-2"></div>
                <h3 className="text-lg font-semibold text-center text-[#8B0000]">Cutting-Edge Solutions</h3>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* LanceSoft Partnership Section */}
      <section className="py-16 bg-[#FAF4ED]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column: The Power of Partnership */}
            <div className="bg-[#F6F1E8] p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold mb-6 text-center text-foreground">The Power of Partnership</h2>
              <h3 className="text-xl font-semibold mb-4 text-center text-[#8B0000]">Introducing LanceSoft Vietnam</h3>
              <p className="text-foreground/80 tracking-[0.5px] font-serif leading-relaxed text-lg text-justify">
                PICo. operates as a sister company and is a strategic local partner of LanceSoft (www.lancesoft.com),
                a leading global workforce solutions and IT services company. This powerful partnership brings
                together PICo.'s deep expertise in apparel, accessories, and footwear manufacturing in Vietnam with
                LanceSoft's massive global reach and operational scale. LanceSoft is a global force, boasting a
                significant worldwide presence.
              </p>
            </div>
            
            {/* Right Column: LanceSoft's Global Footprint */}
            <div className="bg-[#F6F1E8] p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold mb-6 text-center text-foreground">LanceSoft's Global Footprint</h2>
              <h3 className="text-xl font-semibold mb-4 text-center text-[#8B0000]">Empowering Our Partnership</h3>
              <p className="text-foreground/80 tracking-[0.5px] font-serif leading-relaxed text-lg text-justify">
                LanceSoft's extensive global network is a key asset to the PICo. partnership, providing a robust infrastructure
                and broad market insights. With a presence spanning across North America, Europe, Asia, and Australia,
                LanceSoft operates over 32 regional offices and multiple delivery centers.
                This expansive footprint allows LanceSoft to serve over 110 enterprise clients worldwide, including Fortune
                companies, across diverse industries such as IT, Healthcare, Finance, and Manufacturing. Through LanceSoft
                Vietnam, PICo. manages all local activities, effectively connecting this vast global capability with specialized
                manufacturing excellence in Vietnam, offering our clients unparalleled support and expertise on a global scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <motion.section 
        ref={teamRef}
        initial="hidden"
        animate={teamInView ? "visible" : "visible"}
        variants={fadeIn}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Team</h2>
            <p className="mb-8 text-foreground/80">
              Meet the passionate individuals behind PICo. who work tirelessly to bring you the best footwear
              experience.
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4"
          >
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div 
                key={member.id} 
                variants={fadeInScale}
                className="text-center cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => handleOpenMemberDialog(member)}
                custom={index}
              >
                <div className="relative h-48 w-48 mx-auto rounded-full overflow-hidden mb-3 shadow-md">
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    fill
                    className="object-cover object-center"
                    style={{ 
                      objectPosition: member.id <= 3 
                        ? '50% 10%' 
                        : '50% 25%' 
                    }}
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                <p className="text-sm text-[#D4AF37]">{member.position}</p>
                <p className="mt-1 text-xs text-foreground">Click to learn more</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Our Process (replaces New Arrivals) */}
      <OurProcessSection />

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* Featured Products */}
      <FeaturedProductsSection />

      {/* Hero Product Call To Action */}
      <ProductCTA />

      {/* Join Our Journey Section */}
      <motion.section 
        ref={joinJourneyRef}
        initial="hidden"
        animate={joinJourneyInView ? "visible" : "visible"}
        variants={fadeIn}
        className="py-16 bg-[#1A1A1A] text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold mb-4 text-foreground"
          >
            Join Our Journey
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="max-w-2xl mx-auto mb-8 text-foreground/80"
          >
            We're always looking for passionate individuals to join our team and help us continue to create amazing
            footwear.
          </motion.p>
          <motion.div 
            variants={fadeInScale}
            className="flex justify-center"
          >
            <Button asChild variant="outline" className="border-white text-white bg-black/30 hover:bg-white/20 hover:text-white border-2">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Member Dialog */}
      <TeamMemberDialog 
        member={selectedMember} 
        isOpen={dialogOpen} 
        onClose={handleCloseDialog} 
      />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </main>
  )
} 
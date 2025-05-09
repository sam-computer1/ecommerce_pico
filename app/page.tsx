"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import TeamMemberDialog, { TeamMemberProps } from "@/components/team-member-dialog"
import { motion, useInView } from "framer-motion"

// Define team members data
const TEAM_MEMBERS: TeamMemberProps[] = [
  {
    id: 1,
    name: "Jai Prakash Chharia",
    position: "Chairman",
    bio: "Jai Prakash Chharia is a visionary leader and seasoned expert whose career spans over four decades in the dynamic realm of international trade. His profound understanding of global commerce, cultivated across diverse industries and product sectors, provides PICo. with an unparalleled strategic advantage. Mr. Chharia's journey is defined not only by his extensive experience but also by his entrepreneurial drive, which has been a cornerstone of his professional life for more than 30 years.\nMr. Chharia's expertise encompasses a vast spectrum of international trade activities. He possesses a deep understanding of international markets, trade regulations, and cultural nuances, enabling him to identify and capitalize on global opportunities. He has a proven ability to forge strong international partnerships, negotiate complex trade agreements, and establish successful business ventures across diverse geographical regions. His extensive experience in handling a wide array of industries and products provides a holistic perspective on the intricacies of international commerce. Mr. Chharia also has a thorough understanding of international trade risks, compliance requirements, and ethical business practices, ensuring sustainable and responsible growth.\nAs an entrepreneur for over three decades, Mr. Chharia has demonstrated visionary leadership, with an ability to identify market gaps, develop innovative business models, and inspire teams to achieve ambitious goals. He exhibits strategic thinking, with a talent for long-term planning, anticipating market trends, and positioning businesses for sustained success in the global arena. Mr. Chharia also possesses strong business acumen, with a strong understanding of financial management, operational efficiency, and business growth strategies, driving profitability and maximizing shareholder value. He has the capacity to navigate economic fluctuations, overcome challenges, and adapt business strategies to thrive in ever-changing market conditions.\nIn his role as Chairman of PICo., Jai Prakash Chharia provides invaluable strategic guidance, leveraging his vast experience and entrepreneurial spirit to steer the company towards continued growth and success in the global apparel, accessories, and footwear industry. His leadership fosters a culture of excellence, integrity, and a relentless pursuit of innovation.",
    imageSrc: "https://203fr2t3uf9dwcdt.public.blob.vercel-storage.com/Pico_pics/Mr.%20Jai%20Prakash-xO1SNGQEyA48xG0ypBV5olhunM4Qhi.jpg"
  },
  {
    id: 2,
    name: "Johnny Tranz",
    position: "Director (Technical)",
    bio: "Mr. Johnny Tran embodies a rare confluence of deep-rooted industry knowledge and forward-thinking technical acumen, making him a driving force at PICo. His journey, which began with formative years in Hong Kong from 1990 to 1998, provided an early immersion into the global trade landscape. This foundation was further strengthened by his experience with Asahi Japan Gas Cooker manufacturers, offering a valuable introduction to the intricacies of manufacturing processes.From 2001 to 2008, Johnny distinguished himself as a dynamic Sales Manager in Vietnam, representing No-Tape, a Japan Technology Industrial entity specializing in vital components for footwear production: bond, glue, and primer. During this period, he demonstrated an exceptional ability to cultivate strategic partnerships and secure significant business with leading international brand trading companies, including R&N, Novi, Dutchman, ISA, American Eagle, Decathlon, Reebok, and Swiss. This success underscored his capacity to understand and meet the exacting demands of a diverse and discerning clientele. Johnny's expertise in the footwear sector deepened considerably between 2009 and 2015 through his collaboration with various Korean shoe companies, focusing on the dynamic realm of sports footwear. His involvement in development and sales within respected Korean groups such as Kangnam, Sammi Tong Yang, H.World Vina, Anjin Vina, Deawoong, J Young, and Yu Young provided him with invaluable insights into the nuances of footwear design, material innovation, and large-scale production. Most recently, from 2016 to 2023, Johnny's career has been marked by his engagement with a broad spectrum of international brands, showcasing his adaptability and comprehensive grasp of the global footwear market. His portfolio includes collaborations with Human Australia, Kenkoh Japan, Bonker India, Wearer Tech Safety Shoes England, Gola, Zara, 4 You, and numerous others, spanning both men's, women's & kid's fashion footwear. As Director (Technical) at PICo., Johnny Tran channels his extensive and multifaceted experience into driving technical excellence and innovation. He spearheads the implementation of advanced technologies, oversees all technical production aspects, and ensures the highest standards of precision and quality in manufacturing. Johnny's profound understanding of footwear development, manufacturing intricacies, and global market dynamics positions him as an indispensable asset to PICo., ensuring the delivery of exceptional products and services that consistently exceed client expectations.",
    imageSrc: "https://203fr2t3uf9dwcdt.public.blob.vercel-storage.com/Pico_pics/Mr.%20Johnny-5e3F49qCKebyn5i0k57qGbIm1PRYp9.jpg"
  },
  {
    id: 3,
    name: "Mr. Subhrodeep Banerjee",
    position: "Director (IT and Digital Processes)",
    bio: "Mr. Subhrodeep Banerjee brings over 16 years of extensive experience in the IT industry, having played a significant role in various multinational corporations. His expertise spans across multiple domains, with a strong foundation in SAP ERP implementation during his tenure in MNCs.\nIn addition to his corporate experience, Mr. Banerjee has served as a leading faculty member in Bhutan and West Bengal-India, for seven years and has been a guest lecturer for several manufacturing companies in West Bengal.\nHis academic qualifications include an MBA in Finance, an M.Com., a CS (Inter.), a B.Com., and an LLB. Complementing his finance and legal background, he holds IT certifications in DIT and SAP, with proficiency in SAP FICO, FSCM, FICA, PP, MM, and SD modules.\nMr. Banerjee's diverse expertise in IT, finance, and legal domains makes him a valuable asset in the field of enterprise resource planning and business process optimization.",
    imageSrc: "https://203fr2t3uf9dwcdt.public.blob.vercel-storage.com/Pico_pics/Mr.%20Subhrodeep-heUHKhck9im1y39TNtGXsoyfh3qfoy.jpg"
  },
  {
    id: 4,
    name: "Ashutosh Chharia",
    position: "Director (Factories & Production)",
    bio: "Ashutosh Chharia is a highly driven and technically astute leader who serves as PICo.'s Director of Factories & Production. He brings to this role a potent combination of academic rigor and extensive practical experience in overseeing large-scale manufacturing operations. Mr. Chharia holds a Bachelor of Technology (B.Tech) degree in Food Engineering and Processing, providing him with a robust foundation in process design, optimization, and efficiency principles. \nHis career, spanning over a decade, is characterized by hands-on immersion in the complexities of factory control, management, and oversight. Ashutosh has cultivated a proven track record of success in enhancing productivity and ensuring operational excellence within demanding manufacturing environments. His expertise encompasses advanced process optimization, where he excels at analyzing existing workflows, identifying areas for improvement, and implementing streamlined processes to maximize efficiency and output. He is also skilled in strategic production planning, developing and executing comprehensive production plans that encompass resource allocation, capacity planning, and scheduling to meet production targets and deadlines. Quality management systems are another area of strength; he is highly proficient in establishing and enforcing rigorous quality management systems, implementing quality control checkpoints, and ensuring adherence to international quality standards to deliver superior products. Ashutosh is committed to operational efficiency and cost reduction, minimizing waste, optimizing resource utilization, and implementing cost-effective strategies to enhance profitability and maintain a competitive edge. He possesses strong leadership skills, effectively managing large teams, fostering a collaborative work environment, and mentoring personnel to achieve peak performance. Furthermore, Mr. Chharia ensures strict adherence to all relevant industry regulations, safety protocols, and ethical manufacturing practices, prioritizing a safe and compliant working environment.\nAt PICo., Ashutosh Chharia is the central authority for all production and factory-related matters. His responsibilities include end-to-end production oversight, directing and coordinating all aspects of the production lifecycle, from raw material procurement to finished goods, ensuring seamless execution and timely delivery. He also manages factory operations, including workforce management, equipment maintenance, and facility optimization. He establishes and maintains robust quality assurance and control systems, ensuring that all products meet PICo.'s exacting standards. Ashutosh Chharia's unique combination of technical expertise, practical experience, and strategic vision makes him an invaluable asset to PICo., driving the efficient and high-quality production of our products.",
    imageSrc: "https://203fr2t3uf9dwcdt.public.blob.vercel-storage.com/Pico_pics/Ashutosh-FdsAZjhOL8Vn41MnSceufKALuohAeM.jpeg"
  },
  {
    id: 5,
    name: "Harshvardhan Chharia",
    position: "Director (Communication)/Legal Representative",
    bio: "Harshvardhan Chharia is a dynamic and visionary leader who serves as PICo.'s Director (Communication) and Legal Representative, playing a pivotal role in shaping the company's strategic direction and fostering its growth. His academic foundation is rooted in a Bachelor of Commerce (B.Com.) degree with a major in International Trade, providing him with a robust understanding of the intricacies of global commerce, spanning market dynamics, trade regulations, and international business practices. He further cultivated his expertise through postgraduate studies in Public Relations and Corporate Communications, a specialization that equips him with a unique set of skills to navigate the complexities of modern business communication.\nThis educational background provides Harshvardhan with the ability to craft and communicate a compelling brand vision, developing strategic messaging and managing corporate communications to enhance brand reputation and cultivate strong relationships with stakeholders. He is adept at leveraging his understanding of international trade to identify global opportunities, mitigate potential risks, and establish successful partnerships across diverse markets. Furthermore, he excels at fostering strategic relationships, building and maintaining connections with clients, partners, and key industry influencers through effective communication strategies, public relations initiatives, and proactive stakeholder engagement.\nIn his capacity as PICo.'s Director (Communication) and Legal Representative, Harshvardhan Chharia is responsible for defining and executing the company's comprehensive communication strategy, both internally and externally. He oversees brand development, ensuring consistent messaging across all platforms, and works to enhance brand visibility and recognition in the marketplace. A key aspect of his role involves building and maintaining strong relationships with a wide range of stakeholders, including clients, partners, and media outlets. Beyond his communication responsibilities, as the Legal Representative of the company, he handles and oversees all processes, ensuring effective communication, execution, and implementation of plans across all departments. Additionally, he manages all legal and corporate affairs, ensuring the company's compliance with relevant regulations and overseeing corporate governance to uphold the highest ethical and legal standards. Harshvardhan Chharia's distinctive combination of business acumen, communication expertise, operational oversight, and in-depth knowledge of international trade is instrumental in driving PICo.'s success and expansion within the competitive global landscape of the Fashion and Footwear industry.",
    imageSrc: "https://203fr2t3uf9dwcdt.public.blob.vercel-storage.com/Pico_pics/Mr.%20Harshvardhan-1cjTlna4y9txXDFgYvyjQCKgQwY2cO.jpg"
  }
]

export default function HomePage() {
  const [selectedMember, setSelectedMember] = useState<TeamMemberProps | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const journeyRef = useRef(null);
  const ctaRef = useRef(null);
  
  // InView hooks
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const aboutInView = useInView(aboutRef, { once: true, amount: 0.3 });
  const visionInView = useInView(visionRef, { once: true, amount: 0.3 });
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 });
  const journeyInView = useInView(journeyRef, { once: true, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

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
    <main className="flex-1 bg-background text-foreground">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "visible"}
        variants={fadeIn}
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-1">
          <Image src="https://203fr2t3uf9dwcdt.public.blob.vercel-storage.com/Pico_pics/7eee46af-44bd-41cd-9876-c48a7bb56f82-iF5qLkcLXvCLNwnq5wH2clsrlUiVGz.JPG?height=800&width=1600" alt="Background pattern" fill className="object-cover" />
        </div>
        <motion.div 
          className="container mx-auto px-4 relative z-10"
        >
          <motion.div 
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4 text-white dark:text-white"
            >
              Our Story
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg mb-8 text-white dark:text-white"
            >
              Crafting premium footwear since 2010, we've been on a mission to combine style, comfort, and
              sustainability.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.section>

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
              <p className="mb-4 text-foreground/80">
                PICo. is a dedicated partner for global brands seeking excellence in apparel, accessories, and footwear production. We streamline the complexities of product development by offering a meticulously integrated suite of services tailored to the unique needs of our B2B clients. From the initial spark of concept and design development, where we translate brand visions into tangible creations through trend forecasting, material innovation, and technical design solutions, to the crucial stages of sourcing and manufacturing partnerships, we connect brands with a carefully vetted global network.
              </p>
              <p className="mb-4 text-foreground/80">
                Our expertise extends to optimizing the entire supply chain, ensuring efficient logistics, inventory management, and robust quality control systems. We provide rigorous production control and oversight, meticulously managing every detail to guarantee adherence to specifications, timelines, and the highest quality standards.
              </p>
              <p className="text-foreground/80">
                PICo. also simplifies the complexities of international trade, offering comprehensive export and delivery solutions to ensure a smooth and reliable journey to the final destination.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInScale}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-1 md:order-2"
            >
              <Image src="https://203fr2t3uf9dwcdt.public.blob.vercel-storage.com/Pico_pics/8c074977-6abd-49f7-880f-e86e6fda6849-GNeczudDdumtOnABrULkH1gXx85fNM.JPG?height=800&width=600&text=About PICo." alt="About our company" fill className="object-cover" />
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
        className="py-16 bg-[#1A1A1A]/5 dark:bg-[#EAEAEA]/5"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={fadeInScale}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-1 md:order-1"
            >
              <Image src="https://203fr2t3uf9dwcdt.public.blob.vercel-storage.com/Pico_pics/931293a0-d055-4b52-9107-249ddd06f4b8-ak7t3St8BPfgX54FjnmbVgAPgJVV0y.JPG?height=800&width=600&text=Our Vision" alt="Our company vision" fill className="object-cover" />
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="order-2 md:order-2"
            >
              <h2 className="text-3xl font-bold mb-4 text-foreground">Our Vision</h2>
              <p className="mb-4 text-foreground/80">
                PICo. envisions a future where global brands can realize their creative ambitions without compromise or complexity. We strive to be the definitive end-to-end solution provider, recognized for our unwavering commitment to providing a seamless and comprehensive suite of services that simplifies the product development process and empowers our clients to focus on their core brand identity and creative vision.
              </p>
              <p className="mb-4 text-foreground/80">
                Our vision is to set the industry standard for operational efficiency, ethical production, and supply chain mastery, enabling our partners to achieve unparalleled market competitiveness. We are dedicated to cultivating long-term, collaborative relationships with our B2B clients, acting as a trusted advisor and proactive problem-solver, focused on their sustained success.
              </p>
              <p className="text-foreground/80">
                PICo. is committed to continuously evolving our expertise, embracing new technologies, and anticipating industry trends, ensuring that our clients always have access to the most advanced and effective solutions. PICo. aspires to be synonymous with reliability, efficiency, and exceptional quality, empowering our partners to lead in the global marketplace.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        ref={missionRef}
        initial="hidden"
        animate={missionInView ? "visible" : "visible"}
        variants={fadeIn}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={fadeInScale}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-1 md:order-2"
            >
              <Image src="https://203fr2t3uf9dwcdt.public.blob.vercel-storage.com/Pico_pics/7eee46af-44bd-41cd-9876-c48a7bb56f82-iF5qLkcLXvCLNwnq5wH2clsrlUiVGz.JPG?height=800&width=600" alt="Our workshop" fill className="object-cover" />
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl font-bold mb-4 text-foreground">Our Mission</h2>
              <p className="mb-4 text-foreground/80">
                PICo. is the strategic orchestrator of seamless product development for global brands. We provide a meticulously integrated suite of services designed to empower our B2B partners at every stage of their journey, from initial concept to final delivery. Our expertise encompasses translating brand visions into tangible designs, offering trend forecasting, material innovation, and technical design solutions.
              </p>
              <p className="mb-4 text-foreground/80">
                We leverage a global network of carefully vetted manufacturers, ensuring access to specialized capabilities, ethical production practices, and competitive pricing. PICo. streamlines the flow of materials and goods, implementing efficient logistics, inventory management, and quality control systems to maximize efficiency and minimize risk.
              </p>
              <p className="text-foreground/80">
                We also provide rigorous monitoring and management of the production process, ensuring adherence to specifications, timelines, and quality standards, and manage all aspects of international shipping, customs clearance, and final delivery, ensuring a smooth and reliable experience. While our PICo. label showcases our design sensibility and commitment to quality, our core mission is to be the indispensable partner for global brands, providing tailored solutions, fostering transparent collaborations, and delivering exceptional results that drive their success.
              </p>
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
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={fadeInScale}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300"
            >
              <div className="text-[#D4AF37] dark:text-[#C77C48] font-bold text-xl mb-2">Quality</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Our Standard</h3>
              <p className="text-foreground/80">
                We never compromise on quality. Every stitch, every material, and every design element is carefully
                selected and crafted to ensure durability and comfort.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInScale}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300"
            >
              <div className="text-[#D4AF37] dark:text-[#C77C48] font-bold text-xl mb-2">Innovation</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Our Approach</h3>
              <p className="text-foreground/80">
                We're constantly pushing the boundaries of footwear design, incorporating the latest technologies and
                trends to create shoes that are both functional and fashionable.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInScale}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300"
            >
              <div className="text-[#D4AF37] dark:text-[#C77C48] font-bold text-xl mb-2">Sustainability</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Our Commitment</h3>
              <p className="text-foreground/80">
                We're committed to reducing our environmental impact through sustainable sourcing, eco-friendly
                materials, and responsible manufacturing practices.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

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

      {/* Timeline Section */}
      <motion.section 
        ref={journeyRef}
        initial="hidden"
        animate={journeyInView ? "visible" : "visible"}
        variants={fadeIn}
        className="py-16 bg-[#1A1A1A]/5 dark:bg-[#EAEAEA]/5"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Journey</h2>
            <p className="text-foreground/80">From a small workshop to a global brand, here's how we've grown over the years.</p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#D4AF37] dark:bg-[#C77C48]"></div>

            {/* Timeline items */}
            <motion.div 
              variants={staggerContainer}
              className="space-y-16"
            >
              {[
                {
                  year: "2010",
                  title: "The Beginning",
                  description: "PICo. was founded with a vision to create stylish, comfortable footwear.",
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
                <motion.div 
                  key={index} 
                  variants={fadeInScale}
                  custom={index}
                  className={`relative flex items-center ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300">
                      <div className="text-[#D4AF37] dark:text-[#C77C48] font-bold text-xl mb-2">{item.year}</div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                      <p className="text-foreground/80">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#D4AF37] dark:bg-[#C77C48] border-4 border-[#FFFFF0] dark:border-gray-900 z-10"></div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "visible"}
        variants={fadeIn}
        className="py-16 bg-[#1A1A1A] dark:bg-[#000000] text-white"
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
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 dark:border-white dark:text-white border-gray-800 text-gray-800">
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
    </main>
  )
}


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
  
  // InView hooks
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

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

      {/* Team Member Dialog */}
      <TeamMemberDialog 
        member={selectedMember} 
        isOpen={dialogOpen} 
        onClose={handleCloseDialog} 
      />
    </main>
  )
}


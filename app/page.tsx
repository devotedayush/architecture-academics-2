"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Check,
  Play,
  Briefcase,
  GraduationCap,
  Building2,
  Users,
  Award,
  BookOpen,
  Zap,
  Target,
  Globe,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import { AuthForm } from "@/components/auth-form"

type Role = "students" | "professionals" | "institutions"

const roleContent = {
  students: {
    title: "From cracking NATA to topping studio juries.",
    subtitle: "Entrance-prep roadmaps for aspirants and semester-wise refreshers for university learners.",
    features: ["Adaptive NATA practice tests", "Semester-mapped course playlists", "Intern & fresh-grad job board"],
    primaryCTA: "Watch Demo",
    secondaryCTA: "Browse Courses",
    icon: GraduationCap,
    description:
      "Navigate your architectural education with confidence. From NATA preparation to final portfolio reviews, access curated resources designed specifically for Indian architecture students. Connect with peers, find mentors, and discover internship opportunities that align with your career aspirations.",
  },
  professionals: {
    title: "Advance your practice, grow your network, hire emerging talent.",
    subtitle: "Workshops, conferences, and a curated talent pool for India's architectural firms.",
    features: [
      "Post & discover jobs and RFPs",
      "Hands-on CPD workshops & seminars",
      "Live discussion lounge with peers",
    ],
    primaryCTA: "Watch Demo",
    secondaryCTA: "Post a Job",
    icon: Briefcase,
    description:
      "Elevate your architectural practice through continuous learning and strategic networking. Access exclusive workshops led by industry veterans, participate in thought-provoking discussions, and connect with the next generation of architectural talent ready to contribute to your projects.",
  },
  institutions: {
    title: "Elevate architectural education with collaborative digital tooling.",
    subtitle: "List programmes, host conferences, and publish nationwide surveys.",
    features: [
      "One-click course catalogue management",
      "Conference & call-for-papers engine",
      "Faculty-driven research survey builder",
    ],
    primaryCTA: "Watch Demo",
    secondaryCTA: "Host a Seminar",
    icon: Building2,
    description:
      "Transform how architectural education is delivered and experienced. Streamline administrative processes, facilitate meaningful academic discourse, and contribute to the collective knowledge base that shapes India's architectural landscape through collaborative research initiatives.",
  },
}

const testimonials = [
  {
    quote:
      "The structured approach to NATA preparation helped me secure admission to my dream architecture college. The peer forums were invaluable.",
    author: "Priya Sharma",
    role: "B.Arch Student, SPA Delhi",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "As a practicing architect, the CPD workshops have significantly enhanced my technical skills and business acumen.",
    author: "Rajesh Kumar",
    role: "Principal Architect, Kumar Associates",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "The platform has revolutionized how we manage our curriculum and engage with students across multiple campuses.",
    author: "Dr. Meera Patel",
    role: "Dean, Faculty of Architecture",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

const faqs = [
  {
    question: "How does the platform cater to different architectural specializations?",
    answer:
      "Our content is organized across various specializations including sustainable design, urban planning, heritage conservation, and contemporary practice. Each role-specific section offers targeted resources and networking opportunities.",
  },
  {
    question: "What makes this platform specifically relevant for Indian architecture?",
    answer:
      "We focus on Indian building codes, climate-responsive design, local materials, and the unique challenges of practicing architecture in India. Our content is created by and for the Indian architectural community.",
  },
  {
    question: "How can institutions integrate this platform with existing curricula?",
    answer:
      "Our institutional tools are designed to complement existing academic structures. Faculty can easily create course modules, track student progress, and facilitate collaborative projects across different institutions.",
  },
  {
    question: "What support is available for career transitions within architecture?",
    answer:
      "We provide comprehensive career guidance, from student to professional transitions, specialization changes, and entrepreneurial ventures. Our mentorship programs connect you with experienced professionals in your area of interest.",
  },
]

const roleImages = {
  students: "/students.png",
  professionals: "/professionals.png",
  institutions: "/institutions.png",
}

export default function ArchitectureAcademics() {
  const [activeRole, setActiveRole] = useState<Role>("students")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Navigation - Role Selector */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">architecture-academics.online</span>
            </div>

            <div className="flex items-center space-x-0">
              {(Object.keys(roleContent) as Role[]).map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`px-6 py-2 font-medium text-sm transition-all duration-200 ${
                    activeRole === role ? "bg-[#FF9A1F] text-white" : "bg-gray-900 text-white hover:bg-gray-800"
                  } ${role === "students" ? "rounded-l-lg" : role === "institutions" ? "rounded-r-lg" : ""}`}
                >
                  {role === "students" ? "Students" : role === "professionals" ? "Professional" : "Institution"}
                </button>
              ))}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:bg-gradient-to-r hover:from-[#FFB700] hover:via-[#FF9A1F] hover:to-[#FF7B00] hover:text-white transition-all duration-300 bg-transparent"
                >
                  Sign In / Sign Up
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <AuthForm />
              </DialogContent>
            </Dialog>
          </div>

          {/* Secondary Navigation */}
          <div className="flex items-center justify-center space-x-8 py-4 border-t border-gray-100">
            <a href="#" className="text-gray-700 hover:text-[#FF9A1F] font-medium transition-colors">
              Courses
            </a>
            <a href="#" className="text-gray-700 hover:text-[#FF9A1F] font-medium transition-colors">
              Workshops
            </a>
            <a href="#" className="text-gray-700 hover:text-[#FF9A1F] font-medium transition-colors">
              Events
            </a>
            <a href="#" className="text-gray-700 hover:text-[#FF9A1F] font-medium transition-colors">
              Seminars
            </a>
            <a href="#" className="text-gray-700 hover:text-[#FF9A1F] font-medium transition-colors">
              Discussion
            </a>
            <a href="#" className="text-gray-700 hover:text-[#FF9A1F] font-medium transition-colors">
              Forums
            </a>
            <a href="#" className="text-gray-700 hover:text-[#FF9A1F] font-medium transition-colors">
              Jobs& Internships
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {roleContent[activeRole].title}
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">{roleContent[activeRole].subtitle}</p>

                <ul className="space-y-4 mb-8">
                  {roleContent[activeRole].features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-[#FF9A1F] flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] hover:opacity-90 flex items-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>{roleContent[activeRole].primaryCTA}</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="hover:bg-gradient-to-r hover:from-[#FFB700] hover:via-[#FF9A1F] hover:to-[#FF7B00] hover:text-white transition-all duration-300 bg-transparent"
                  >
                    {roleContent[activeRole].secondaryCTA}
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-8 relative overflow-hidden">
                  <Image
                    src={roleImages[activeRole]}
                    alt="Architecture Learning"
                    width={500}
                    height={400}
                    className="relative z-10"
                  />
                  <div className="absolute top-4 right-4 w-16 h-16 bg-[#FF9A1F] rounded-full flex items-center justify-center z-20">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Architecture Education Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From foundational learning to advanced practice, our platform supports every stage of your architectural
              journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Structured Learning Paths",
                description:
                  "Carefully curated curricula aligned with Indian architectural education standards and industry requirements.",
              },
              {
                icon: Users,
                title: "Collaborative Community",
                description:
                  "Connect with peers, mentors, and industry professionals in a vibrant ecosystem of knowledge sharing.",
              },
              {
                icon: Award,
                title: "Industry Recognition",
                description:
                  "Certificates and credentials recognized by leading architectural firms and educational institutions.",
              },
              {
                icon: Zap,
                title: "Real-time Updates",
                description:
                  "Stay current with the latest trends, technologies, and opportunities in Indian architecture.",
              },
              {
                icon: Target,
                title: "Career Guidance",
                description:
                  "Personalized career counseling and placement support tailored to your architectural aspirations.",
              },
              {
                icon: Globe,
                title: "Pan-India Network",
                description: "Access opportunities and connections across all major architectural hubs in India.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Architecture Community</h2>
            <p className="text-xl text-gray-600">
              Hear from students, professionals, and educators who are part of our growing community
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <Image
                    src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].author}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-bold text-gray-900">{testimonials[currentTestimonial].author}</div>
                    <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-gradient-to-r from-[#FFB700] to-[#FF7B00]"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our platform</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-lg border border-gray-200"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Architecture Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students, professionals, and institutions who are already part of India's most
            comprehensive architecture education platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-gray-900 hover:bg-gray-100 flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 flex items-center space-x-2 bg-transparent"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">architecture-academics.online</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering India's architecture community through education, collaboration, and innovation.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">For Students</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    NATA Preparation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Course Materials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Internships
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Career Guidance
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">For Professionals</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    CPD Workshops
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Job Board
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Networking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Industry Updates
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">For Institutions</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Course Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Conference Hosting
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Research Tools
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Faculty Resources
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 architecture-academics.online. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Check,
  Play,
  GraduationCap,
  BookOpen,
  Target,
  Users,
  Award,
  Briefcase,
  Calendar,
  MessageSquare,
  BarChart3,
  ArrowRight,
  PenTool,
  Clock,
  Trophy,
  Building2,
} from "lucide-react"
import { Counter } from "@/components/ui/counter"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AuthForm } from "@/components/auth-form"

type StudentType = "NATA" | "UNIV"
type Year = 1 | 2 | 3 | 4 | 5

export default function StudentsPage() {
  const [studentType, setStudentType] = useState<StudentType>("NATA")
  const [selectedYear, setSelectedYear] = useState<Year>(1)

  const stats = [
    { number: 2500, label: "Active Courses", suffix: "+" },
    { number: 180, label: "Live Workshops", suffix: "+" },
    { number: 15000, label: "Students", suffix: "+" },
  ]

  const sectionCards = [
    { icon: BookOpen, title: "Courses", description: "Structured learning paths" },
    { icon: Users, title: "Workshops", description: "Hands-on skill building" },
    { icon: Calendar, title: "Seminars", description: "Expert-led sessions" },
    { icon: Award, title: "Conferences", description: "Industry gatherings" },
    { icon: Target, title: "Events", description: "Networking opportunities" },
    { icon: MessageSquare, title: "Discussions", description: "Peer collaboration" },
    { icon: Briefcase, title: "Jobs", description: "Career opportunities" },
    { icon: BarChart3, title: "Surveys", description: "Industry insights" },
  ]

  const faqs = [
    {
      question: "How does the NATA preparation track differ from regular architecture courses?",
      answer:
        "Our NATA track is specifically designed for entrance exam success, focusing on drawing skills, mathematical aptitude, and aesthetic sensitivity. It includes timed mock tests, personalized feedback, and strategies tailored to the NATA format, unlike our semester-based university courses.",
    },
    {
      question: "Can university students access NATA preparation materials?",
      answer:
        "Yes, university students can access NATA materials as supplementary resources. However, the main university track focuses on semester-specific coursework, studio projects, and professional development more relevant to current students.",
    },
    {
      question: "When do internship opportunities become available for university students?",
      answer:
        "Internship and job opportunities are primarily available to 4th and 5th-year students who have completed foundational coursework. Earlier year students can access career guidance and preparation materials to build towards these opportunities.",
    },
    {
      question: "How are courses structured for different university years?",
      answer:
        "Each year has curated content: Years 1-2 focus on fundamentals and design basics, Year 3 introduces specialized topics, while Years 4-5 emphasize professional practice, advanced studios, and career preparation including internships and job placements.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">architecture-academics.online</span>
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
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFB700]/5 via-[#FF9A1F]/5 to-[#FF7B00]/5" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-[#FFB700]/10 to-[#FF7B00]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-[#FF9A1F]/10 to-[#FFB700]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Shape your architecture journey—whether you're
              <span className="bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] bg-clip-text text-transparent">
                {" "}
                cracking NATA
              </span>{" "}
              or acing final-year studio.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Tailored plans, resources and opportunities for every stage of your architectural education journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] hover:opacity-90 flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Watch Demo</span>
              </Button>
              <Button
                variant="outline"
                className="hover:bg-gradient-to-r hover:from-[#FFB700] hover:via-[#FF9A1F] hover:to-[#FF7B00] hover:text-white transition-all duration-300 bg-transparent"
              >
                Explore Tracks
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Student Type Selector */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-2 rounded-full flex space-x-2">
              <button
                onClick={() => setStudentType("NATA")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  studentType === "NATA"
                    ? "bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Target className="w-5 h-5" />
                <span className="font-medium">NATA Aspirant</span>
              </button>
              <button
                onClick={() => setStudentType("UNIV")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  studentType === "UNIV"
                    ? "bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                <span className="font-medium">University Student</span>
              </button>
            </div>
          </div>

          {/* Conditional Content */}
          <AnimatePresence mode="wait">
            {studentType === "NATA" && (
              <motion.div
                key="nata"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Master NATA with Confidence</h2>
                    <p className="text-xl text-gray-600 mb-8">
                      Comprehensive preparation program designed specifically for NATA success, with proven strategies
                      and expert guidance.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <ul className="space-y-4 mb-8">
                        <li className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-[#FF9A1F] flex-shrink-0" />
                          <span className="text-gray-700">12-week NATA lesson plan</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-[#FF9A1F] flex-shrink-0" />
                          <span className="text-gray-700">Perspective & aesthetic-sensitivity drills</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-[#FF9A1F] flex-shrink-0" />
                          <span className="text-gray-700">Weekly timed mock tests</span>
                        </li>
                      </ul>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] hover:opacity-90 flex items-center space-x-2">
                          <PenTool className="w-4 h-4" />
                          <span>Start Prep</span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="hover:bg-gradient-to-r hover:from-[#FFB700] hover:via-[#FF9A1F] hover:to-[#FF7B00] hover:text-white transition-all duration-300"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch Demo
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Clock className="w-6 h-6 text-[#FF9A1F]" />
                        <h3 className="font-bold text-gray-900">Structured Timeline</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Our 12-week program breaks down NATA preparation into manageable phases, covering drawing
                        fundamentals, mathematical reasoning, and general aptitude with progressive difficulty levels.
                      </p>
                      <div className="flex items-center space-x-3">
                        <Trophy className="w-5 h-5 text-[#FF9A1F]" />
                        <span className="text-sm text-gray-600">95% success rate among our students</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {studentType === "UNIV" && (
              <motion.div
                key="univ"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      Excel in Your Architecture Studies
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                      Year-specific resources, studio support, and career opportunities tailored to your current
                      academic level.
                    </p>
                  </div>

                  {/* Year Selector */}
                  <div className="flex justify-center mb-8">
                    <div className="bg-gray-100 p-1 rounded-lg flex space-x-1">
                      {[1, 2, 3, 4, 5].map((year) => (
                        <button
                          key={year}
                          onClick={() => setSelectedYear(year as Year)}
                          className={`px-4 py-2 rounded-md transition-all duration-200 ${
                            selectedYear === year
                              ? "bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] text-white shadow-sm"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          Year {year}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <ul className="space-y-4 mb-8">
                        <li className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-[#FF9A1F] flex-shrink-0" />
                          <span className="text-gray-700">Year-mapped course playlists</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-[#FF9A1F] flex-shrink-0" />
                          <span className="text-gray-700">Studio kits & design theory refreshers</span>
                        </li>
                        {selectedYear >= 4 && (
                          <li className="flex items-center space-x-3">
                            <Check className="w-5 h-5 text-[#FF9A1F] flex-shrink-0" />
                            <span className="text-gray-700">Jobs & internships for senior students</span>
                          </li>
                        )}
                      </ul>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] hover:opacity-90 flex items-center space-x-2">
                          <BookOpen className="w-4 h-4" />
                          <span>Browse Courses</span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="hover:bg-gradient-to-r hover:from-[#FFB700] hover:via-[#FF9A1F] hover:to-[#FF7B00] hover:text-white transition-all duration-300"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch Demo
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Award className="w-6 h-6 text-[#FF9A1F]" />
                        <h3 className="font-bold text-gray-900">Year {selectedYear} Focus</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedYear <= 2 &&
                          "Foundation years focus on design fundamentals, architectural history, and basic technical skills. Build your creative foundation with guided studio projects and theoretical knowledge."}
                        {selectedYear === 3 &&
                          "Third year introduces specialized topics like environmental design, structural systems, and urban planning. Develop your architectural thinking and technical competency."}
                        {selectedYear >= 4 &&
                          "Senior years emphasize professional practice, advanced studios, and career preparation. Access internship opportunities and industry connections to launch your career."}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Section Sampler */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore All Learning Resources</h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools and content to support every aspect of your architectural education
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sectionCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
                <div className="flex items-center mt-3 text-[#FF9A1F] group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-16 bg-gradient-to-r from-[#FFB700]/5 via-[#FF9A1F]/5 to-[#FF7B00]/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] bg-clip-text text-transparent mb-2">
                  <Counter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Student Questions Answered</h2>
            <p className="text-xl text-gray-600">Common questions about our student-focused programs and resources</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm"
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
            Ready to Accelerate Your Architecture Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already using our platform to excel in their architectural education and
            career preparation.
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
    </div>
  )
}

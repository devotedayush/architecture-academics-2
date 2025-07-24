"use client"

import type React from "react"

import { useEffect, useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  BookOpen,
  Calendar,
  Clock,
  Users,
  Play,
  CheckCircle,
  TrendingUp,
  FileText,
  Download,
  MessageSquare,
  Building2,
  LogOut,
  Settings,
  Bell,
  Search,
  Briefcase,
  ArrowLeft,
  Upload,
  ArrowRight,
} from "lucide-react"
import { useAuthStore } from "@/lib/auth-store"
import { useRouter } from "next/navigation"
import { useCoursesStore, courses as allCourses } from "@/lib/courses-store"

// Define types for assignment questions
type QuestionType = "multiple-choice" | "text" | "file-upload"

interface Question {
  id: string
  type: QuestionType
  text: string
  options?: string[]
  answer?: string | null
  fileUrl?: string | null
}

interface AssignmentWithQuestions {
  id: number
  title: string
  dueDate: string
  subject: string
  status: "pending" | "completed"
  description: string
  questions: Question[]
}

export default function StudentDashboard() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentWithQuestions | null>(null)
  const [answers, setAnswers] = useState<Record<string, string | null>>({})
  const { wishlist } = useCoursesStore()
  const [assignments, setAssignments] = useState<AssignmentWithQuestions[]>([])

  // Get user's enrolled courses based on their student type and year
  const enrolledCourses = useMemo(() => {
    return allCourses
      .filter((course) => {
        if (user?.studentType === "NATA") {
          // NATA aspirants only see NATA preparation courses
          return course.year === "NATA" && course.enrolled
        } else {
          // University students only see courses for their current year (no NATA courses)
          return course.year === user?.year && course.enrolled
        }
      })
      .slice(0, 3) // Show top 3 for dashboard
  }, [user?.studentType, user?.year])

  useEffect(() => {
    if (!user || user.role !== "student") {
      router.push("/")
      return
    }

    // Mock assignments with questions
    setAssignments([
      {
        id: 1,
        title: user?.studentType === "NATA" ? "Perspective Drawing Exercise" : "Site Analysis Project",
        dueDate: "2 days",
        subject: user?.studentType === "NATA" ? "Drawing" : "Design Studio",
        status: "pending",
        description:
          user?.studentType === "NATA"
            ? "Complete the following perspective drawing exercises to demonstrate your understanding of vanishing points and spatial representation."
            : "Analyze the provided site and answer questions about its context, constraints, and opportunities.",
        questions: [
          {
            id: "q1-1",
            type: "text",
            text:
              user?.studentType === "NATA"
                ? "Explain the difference between one-point and two-point perspective drawing techniques."
                : "Describe the key site characteristics and how they might influence your design approach.",
          },
          {
            id: "q1-2",
            type: "multiple-choice",
            text:
              user?.studentType === "NATA"
                ? "Which of the following is NOT a type of perspective drawing?"
                : "Which of the following site analysis methods would be most appropriate for this project?",
            options:
              user?.studentType === "NATA"
                ? ["One-point perspective", "Two-point perspective", "Parallel perspective", "Four-point perspective"]
                : ["SWOT Analysis", "Figure-ground mapping", "Sectional analysis", "Color theory analysis"],
          },
          {
            id: "q1-3",
            type: "file-upload",
            text:
              user?.studentType === "NATA"
                ? "Upload your completed perspective drawing exercise."
                : "Upload your site analysis diagram.",
          },
        ],
      },
      {
        id: 2,
        title: user?.studentType === "NATA" ? "Aptitude Test Practice" : "Material Study Report",
        dueDate: "5 days",
        subject: user?.studentType === "NATA" ? "Mathematics" : "Construction",
        status: "pending",
        description:
          user?.studentType === "NATA"
            ? "Practice these mathematical aptitude questions to prepare for the NATA exam."
            : "Research and analyze the assigned building material, addressing the questions below.",
        questions: [
          {
            id: "q2-1",
            type: "multiple-choice",
            text:
              user?.studentType === "NATA"
                ? "If the perimeter of a square is 20 units, what is its area?"
                : "Which property is NOT typically associated with reinforced concrete?",
            options:
              user?.studentType === "NATA"
                ? ["25 square units", "100 square units", "20 square units", "25 square units"]
                : ["Compressive strength", "Tensile flexibility", "Thermal mass", "Acoustic transparency"],
          },
          {
            id: "q2-2",
            type: "text",
            text:
              user?.studentType === "NATA"
                ? "Solve the following problem: A building is 45 meters tall. If a person stands 60 meters away from the building, at what angle (from the horizontal) must they look to see the top of the building?"
                : "Explain how the selected material's properties influence its application in contemporary architecture. Provide specific examples.",
          },
          {
            id: "q2-3",
            type: "file-upload",
            text:
              user?.studentType === "NATA"
                ? "Upload your solutions to the practice problems."
                : "Upload your material analysis report with diagrams and examples.",
          },
        ],
      },
      {
        id: 3,
        title: user?.studentType === "NATA" ? "Portfolio Review" : "Case Study Analysis",
        dueDate: "Submitted",
        subject: user?.studentType === "NATA" ? "General" : "Theory",
        status: "completed",
        description:
          user?.studentType === "NATA"
            ? "This assignment required you to compile and submit a preliminary portfolio of your work."
            : "This assignment required an analysis of the assigned architectural case study.",
        questions: [
          {
            id: "q3-1",
            type: "text",
            text:
              user?.studentType === "NATA"
                ? "Describe the concept behind your strongest portfolio piece."
                : "Analyze the relationship between form and function in the case study building.",
            answer: "Completed",
          },
          {
            id: "q3-2",
            type: "file-upload",
            text:
              user?.studentType === "NATA"
                ? "Upload your portfolio (PDF format)."
                : "Upload your case study analysis document.",
            fileUrl: "submitted-file.pdf",
          },
        ],
      },
    ])
  }, [user, router])

  const upcomingEvents = [
    {
      id: 1,
      title: user?.studentType === "NATA" ? "NATA Mock Test Series" : "Guest Lecture: Sustainable Architecture",
      date: "Dec 15, 2024",
      time: "10:00 AM",
      type: user?.studentType === "NATA" ? "exam" : "lecture",
    },
    {
      id: 2,
      title: user?.studentType === "NATA" ? "Drawing Workshop" : "Studio Review Presentation",
      date: "Dec 18, 2024",
      time: "2:00 PM",
      type: "workshop",
    },
    {
      id: 3,
      title: "Architecture Career Fair",
      date: "Dec 22, 2024",
      time: "9:00 AM",
      type: "career",
    },
  ]

  const jobOpportunities =
    user?.year >= 4
      ? [
          {
            id: 1,
            title: "Junior Architect Intern",
            company: "Design Studio XYZ",
            location: "Mumbai",
            type: "Internship",
            posted: "2 days ago",
          },
          {
            id: 2,
            title: "Architecture Assistant",
            company: "Urban Planning Associates",
            location: "Delhi",
            type: "Part-time",
            posted: "1 week ago",
          },
          {
            id: 3,
            title: "CAD Operator",
            company: "Construction Corp",
            location: "Bangalore",
            type: "Freelance",
            posted: "3 days ago",
          },
        ]
      : []

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleFileUpload = (questionId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just store the file name
      setAnswers((prev) => ({
        ...prev,
        [questionId]: file.name,
      }))
    }
  }

  const handleSubmitAssignment = () => {
    // In a real app, you would submit the answers to a server
    alert("Assignment submitted successfully!")

    // Update the assignment status to completed
    const updatedAssignments = assignments.map((a) =>
      a.id === selectedAssignment?.id ? { ...a, status: "completed" as const } : a,
    )
    setAssignments(updatedAssignments)

    // Close the assignment view
    setSelectedAssignment(null)

    // Clear answers
    setAnswers({})
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Simplified for logged-in users */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.fullName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/student/settings")}>
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => {
                setActiveTab("overview")
                setSelectedAssignment(null)
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === "overview"
                  ? "bg-gradient-to-r from-[#FFB700]/10 to-[#FF7B00]/10 text-[#FF7B00] border border-[#FFB700]/20"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("courses")
                setSelectedAssignment(null)
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === "courses"
                  ? "bg-gradient-to-r from-[#FFB700]/10 to-[#FF7B00]/10 text-[#FF7B00] border border-[#FFB700]/20"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Courses</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("assignments")
                setSelectedAssignment(null)
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === "assignments"
                  ? "bg-gradient-to-r from-[#FFB700]/10 to-[#FF7B00]/10 text-[#FF7B00] border border-[#FFB700]/20"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Assignments</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("schedule")
                setSelectedAssignment(null)
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === "schedule"
                  ? "bg-gradient-to-r from-[#FFB700]/10 to-[#FF7B00]/10 text-[#FF7B00] border border-[#FFB700]/20"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule</span>
            </button>

            {user?.year >= 4 && user?.studentType === "UNIV" && (
              <button
                onClick={() => {
                  setActiveTab("jobs")
                  setSelectedAssignment(null)
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === "jobs"
                    ? "bg-gradient-to-r from-[#FFB700]/10 to-[#FF7B00]/10 text-[#FF7B00] border border-[#FFB700]/20"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Briefcase className="w-5 h-5" />
                <span>Jobs & Internships</span>
              </button>
            )}

            <button
              onClick={() => {
                setActiveTab("community")
                setSelectedAssignment(null)
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === "community"
                  ? "bg-gradient-to-r from-[#FFB700]/10 to-[#FF7B00]/10 text-[#FF7B00] border border-[#FFB700]/20"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Community</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Welcome back, {user.fullName}</h2>
                    <p className="text-white/90">
                      {user?.studentType === "NATA"
                        ? "Stay focused on your entrance exam preparation"
                        : `Keep up the great work in your ${user?.year === 1 ? "first" : user?.year === 2 ? "second" : user?.year === 3 ? "third" : user?.year === 4 ? "fourth" : "final"} year`}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">
                      {user?.studentType === "NATA" ? "12" : user?.year <= 2 ? "8" : user?.year === 3 ? "6" : "4"}
                    </div>
                    <div className="text-white/90">
                      {user?.studentType === "NATA" ? "weeks left" : "courses this semester"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Completed assignment</p>
                        <p className="text-xs text-gray-500">
                          {user?.studentType === "NATA" ? "Portfolio Review" : "Case Study Analysis"} - 2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Play className="w-5 h-5 text-[#FF9A1F] mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Watched lecture</p>
                        <p className="text-xs text-gray-500">
                          {user?.studentType === "NATA" ? "Drawing Techniques" : "Sustainable Design"} - 5 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MessageSquare className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Posted in forum</p>
                        <p className="text-xs text-gray-500">
                          {user?.studentType === "NATA" ? "NATA Preparation Tips" : "Studio Project Discussion"} - 1 day
                          ago
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>Upcoming Events</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#FF9A1F] rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">{event.title}</p>
                          <p className="text-xs text-gray-500">
                            {event.date} at {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => router.push("/courses")}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse All Courses
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">by {course.instructor}</p>
                        </div>
                        <Badge variant={course.completed === course.lessons ? "default" : "secondary"}>
                          {course.completed === course.lessons ? "completed" : "active"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{Math.round((course.completed / course.lessons) * 100)}%</span>
                        </div>
                        <Progress value={(course.completed / course.lessons) * 100} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>
                            {course.completed}/{course.lessons} lessons
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] hover:opacity-90"
                          onClick={() => {
                            // Navigate to course player or lesson
                            router.push(`/courses/${course.id}/lesson/${course.completed + 1}`)
                          }}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Continue Learning
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {enrolledCourses.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No enrolled courses</h3>
                  <p className="text-gray-600 mb-4">Start your learning journey by enrolling in courses</p>
                  <Button
                    onClick={() => router.push("/courses")}
                    className="bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] hover:opacity-90"
                  >
                    Browse Courses
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === "assignments" && !selectedAssignment && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Assignments</h2>
              </div>

              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <Card
                    key={assignment.id}
                    className={`hover:shadow-lg transition-shadow cursor-pointer ${
                      assignment.status === "completed" ? "opacity-75" : ""
                    }`}
                    onClick={() => (assignment.status === "pending" ? setSelectedAssignment(assignment) : null)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                            <Badge variant={assignment.status === "pending" ? "destructive" : "default"}>
                              {assignment.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span>Subject: {assignment.subject}</span>
                            <span>Due: {assignment.dueDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {assignment.status === "completed" ? (
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              View Submission
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm">
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "assignments" && selectedAssignment && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAssignment(null)}
                  className="hover:bg-gray-100"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Assignments
                </Button>
                <h2 className="text-2xl font-bold text-gray-900">{selectedAssignment.title}</h2>
                <Badge variant="outline" className="ml-2">
                  Due: {selectedAssignment.dueDate}
                </Badge>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Assignment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{selectedAssignment.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Subject: {selectedAssignment.subject}</span>
                    <span>Due: {selectedAssignment.dueDate}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {selectedAssignment.questions.map((question, index) => (
                  <Card key={question.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{question.text}</p>

                      {question.type === "text" && (
                        <Textarea
                          placeholder="Type your answer here..."
                          className="min-h-[120px]"
                          value={answers[question.id] || ""}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        />
                      )}

                      {question.type === "multiple-choice" && question.options && (
                        <RadioGroup
                          value={answers[question.id] || ""}
                          onValueChange={(value) => handleAnswerChange(question.id, value)}
                        >
                          {question.options.map((option, i) => (
                            <div key={i} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={`option-${question.id}-${i}`} />
                              <Label htmlFor={`option-${question.id}-${i}`}>{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}

                      {question.type === "file-upload" && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="file"
                              id={`file-${question.id}`}
                              className="hidden"
                              onChange={(e) => handleFileUpload(question.id, e)}
                            />
                            <Button
                              variant="outline"
                              onClick={() => document.getElementById(`file-${question.id}`)?.click()}
                              className="w-full justify-center"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              {answers[question.id] ? "Change File" : "Upload File"}
                            </Button>
                          </div>
                          {answers[question.id] && (
                            <p className="text-sm text-gray-600">Selected file: {answers[question.id]}</p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <Button variant="outline" onClick={() => setSelectedAssignment(null)}>
                  Save Draft
                </Button>
                <Button
                  className="bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] hover:opacity-90"
                  onClick={handleSubmitAssignment}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit Assignment
                </Button>
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Schedule</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Classes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-[#FFB700]/10 rounded-lg">
                      <div className="w-3 h-3 bg-[#FF9A1F] rounded-full"></div>
                      <div>
                        <p className="font-medium">
                          {user?.studentType === "NATA" ? "Drawing Practice" : "Design Studio"}
                        </p>
                        <p className="text-sm text-gray-600">10:00 AM - 12:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="font-medium">
                          {user?.studentType === "NATA" ? "Math Aptitude" : "Building Technology"}
                        </p>
                        <p className="text-sm text-gray-600">2:00 PM - 4:00 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Calendar className="w-5 h-5 text-[#FF9A1F]" />
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-600">
                            {event.date} at {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "jobs" && user?.year >= 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Jobs & Internships</h2>
                <Button>
                  <Search className="w-4 h-4 mr-2" />
                  Browse All Jobs
                </Button>
              </div>

              <div className="space-y-4">
                {jobOpportunities.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <p className="text-gray-600 mt-1">
                            {job.company} • {job.location}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline">{job.type}</Badge>
                            <span className="text-sm text-gray-500">Posted {job.posted}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Save
                          </Button>
                          <Button size="sm">Apply Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "community" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Community</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Discussion Forums</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium">
                        {user?.studentType === "NATA" ? "NATA Preparation Tips" : "Studio Project Help"}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">24 new messages</p>
                    </div>
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium">Career Guidance</h4>
                      <p className="text-sm text-gray-600 mt-1">12 new messages</p>
                    </div>
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium">General Discussion</h4>
                      <p className="text-sm text-gray-600 mt-1">8 new messages</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Study Groups</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          {user?.studentType === "NATA" ? "NATA 2024 Batch" : `Year ${user?.year} Study Group`}
                        </h4>
                        <Badge>Active</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">45 members</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Architecture Portfolio Review</h4>
                        <Badge variant="outline">Join</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">23 members</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

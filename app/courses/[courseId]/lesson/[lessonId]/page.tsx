"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipForward, SkipBack, CheckCircle, Clock, User, ArrowLeft, Download } from "lucide-react"
import { allCourses } from "@/lib/courses-store"

interface CoursePlayerProps {
  params: {
    courseId: string
    lessonId: string
  }
}

export default function CourseLessonPage({ params }: CoursePlayerProps) {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(1800) // 30 minutes mock duration

  const course = allCourses.find((c) => c.id === params.courseId)
  const lessonNumber = Number.parseInt(params.lessonId)

  useEffect(() => {
    if (!course) {
      router.push("/dashboard/student")
      return
    }
  }, [course, router])

  if (!course) return null

  const progress = (currentTime / duration) * 100
  const courseProgress = ((lessonNumber - 1) / course.lessons) * 100

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    if (lessonNumber < course.lessons) {
      router.push(`/courses/${course.id}/lesson/${lessonNumber + 1}`)
    }
  }

  const handlePrevious = () => {
    if (lessonNumber > 1) {
      router.push(`/courses/${course.id}/lesson/${lessonNumber - 1}`)
    }
  }

  const handleComplete = () => {
    // TODO: Update course progress in store
    if (lessonNumber < course.lessons) {
      handleNext()
    } else {
      router.push("/dashboard/student?tab=courses")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/student")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{course.title}</h1>
                <p className="text-sm text-gray-600">
                  Lesson {lessonNumber} of {course.lessons}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{Math.round(courseProgress)}% Complete</div>
                <Progress value={courseProgress} className="w-32 h-2" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-900 rounded-t-lg relative flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </div>
                    <p className="text-lg font-medium">
                      {course.year === "NATA" ? "NATA Preparation" : `Year ${course.year}`} - Lesson {lessonNumber}
                    </p>
                    <p className="text-gray-300">
                      {course.category === "Workshop"
                        ? "Hands-on Workshop"
                        : course.category === "Seminar"
                          ? "Expert Seminar"
                          : "Online Course"}
                    </p>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="p-4 bg-gray-50 rounded-b-lg">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" onClick={handlePrevious} disabled={lessonNumber === 1}>
                      <SkipBack className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePlayPause}
                      className="bg-gradient-to-r from-[#FFB700] to-[#FF7B00] text-white hover:opacity-90"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>

                    <Button variant="ghost" size="sm" onClick={handleNext} disabled={lessonNumber === course.lessons}>
                      <SkipForward className="w-4 h-4" />
                    </Button>

                    <div className="flex-1">
                      <Progress value={progress} className="h-2" />
                    </div>

                    <span className="text-sm text-gray-600">
                      {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, "0")} / 30:00
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lesson Content */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Lesson {lessonNumber}: {course.syllabus[lessonNumber - 1] || "Course Content"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>30 minutes</span>
                  </div>
                  <Badge variant="outline">{course.category}</Badge>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {course.tagline} This lesson covers fundamental concepts and practical applications that will help
                    you master the key skills needed for architectural practice.
                  </p>

                  <h4 className="font-medium text-gray-900 mt-6 mb-3">Learning Objectives:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Understand core principles and methodologies</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Apply concepts through practical exercises</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Develop professional skills and techniques</span>
                    </li>
                  </ul>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleComplete}
                    className="bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] hover:opacity-90"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Complete & Continue
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resources
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{Math.round(courseProgress)}%</span>
                    </div>
                    <Progress value={courseProgress} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600">
                    {course.completed} of {course.lessons} lessons completed
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lesson List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Outline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from({ length: course.lessons }, (_, i) => i + 1).map((lesson) => (
                    <div
                      key={lesson}
                      className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                        lesson === lessonNumber
                          ? "bg-amber-50 border border-amber-200"
                          : lesson <= course.completed
                            ? "bg-green-50 hover:bg-green-100"
                            : "hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        if (lesson <= course.completed + 1) {
                          router.push(`/courses/${course.id}/lesson/${lesson}`)
                        }
                      }}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          lesson === lessonNumber
                            ? "bg-amber-500 text-white"
                            : lesson <= course.completed
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {lesson <= course.completed ? <CheckCircle className="w-3 h-3" /> : lesson}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Lesson {lesson}</div>
                        <div className="text-xs text-gray-600">{course.syllabus[lesson - 1] || "Course Content"}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

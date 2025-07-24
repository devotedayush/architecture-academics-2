"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Search, Heart, Play, Clock, User, BookOpen, Check, Sparkles, ChevronRight, Filter } from "lucide-react"
import { useCoursesStore, courses, fakeRecommend, type Course } from "@/lib/courses-store"

const CircularProgress = ({ progress, size = 40 }: { progress: number; size?: number }) => {
  const radius = (size - 4) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-amber-500 transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium text-gray-600">{Math.round(progress)}%</span>
      </div>
    </div>
  )
}

const CourseCard = ({ course }: { course: Course }) => {
  const { wishlist, addToWishlist, removeFromWishlist, highlightedCourses } = useCoursesStore()
  const isWishlisted = wishlist.includes(course.id)
  const isHighlighted = highlightedCourses.includes(course.id)
  const progress = course.enrolled ? (course.completed / course.lessons) * 100 : 0

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(course.id)
    } else {
      addToWishlist(course.id)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group ${isHighlighted ? "ring-2 ring-amber-400 shadow-lg shadow-amber-200" : ""}`}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant={course.year === "NATA" ? "default" : "secondary"}>
                  {course.year === "NATA" ? "NATA" : `Year ${course.year}`}
                </Badge>
                <Badge variant="outline">{course.category}</Badge>
              </div>
              <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              {course.enrolled && <CircularProgress progress={progress} size={32} />}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWishlistToggle}
                className={`p-1 ${isWishlisted ? "text-red-500" : "text-gray-400"} hover:scale-110 transition-all`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.tagline}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-xs text-gray-500">
              <User className="w-3 h-3 mr-1" />
              {course.instructor}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <BookOpen className="w-3 h-3 mr-1" />
                {course.lessons} lessons
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Preview
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{course.title}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Course Overview</h4>
                    <p className="text-sm text-gray-600">{course.tagline}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Instructor</h4>
                    <p className="text-sm text-gray-600">{course.instructor}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Syllabus</h4>
                    <ul className="space-y-1">
                      {course.syllabus.map((item, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <Check className="w-3 h-3 mr-2 text-amber-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4">
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                      Add to Wishlist
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Button
              size="sm"
              className={`flex-1 ${
                course.enrolled
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              }`}
            >
              {course.enrolled ? (
                <>
                  <Play className="w-3 h-3 mr-1" />
                  Continue
                </>
              ) : (
                "Enroll"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const AIRecommender = () => {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { setHighlightedCourses, clearHighlights } = useCoursesStore()

  const handleRecommend = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const recommendedIds = fakeRecommend(prompt)
    setHighlightedCourses(recommendedIds)
    setIsOpen(false)
    setPrompt("")
    setIsLoading(false)

    setTimeout(() => {
      clearHighlights()
    }, 3000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-amber-50 hover:border-amber-300 bg-transparent">
          <Sparkles className="w-4 h-4 mr-2" />
          Ask AI
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>AI Course Recommender</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">What do you want to learn?</label>
            <Textarea
              placeholder="e.g., I want to learn sustainable design and green building techniques..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <Button
            onClick={handleRecommend}
            disabled={!prompt.trim() || isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
          >
            {isLoading ? "Finding recommendations..." : "Get Recommendations"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function CoursesSection() {
  const { selectedYear, selectedCategories, searchQuery, wishlist, setSelectedYear, toggleCategory, setSearchQuery } =
    useCoursesStore()

  const [displayedCourses, setDisplayedCourses] = useState(12)
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // First filter by year/student type
      let matchesYear = false
      if (selectedYear === "all") {
        matchesYear = true
      } else if (selectedYear === "NATA") {
        // Only show NATA courses when NATA is selected
        matchesYear = course.year === "NATA"
      } else {
        // Only show university courses for the selected year (exclude NATA courses)
        matchesYear = course.year === selectedYear && course.year !== "NATA"
      }

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category)
      const matchesSearch =
        debouncedSearch === "" ||
        course.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        course.tagline.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        course.instructor.toLowerCase().includes(debouncedSearch.toLowerCase())

      return matchesYear && matchesCategory && matchesSearch
    })
  }, [selectedYear, selectedCategories, debouncedSearch])

  const visibleCourses = filteredCourses.slice(0, displayedCourses)
  const hasMore = displayedCourses < filteredCourses.length

  const loadMore = () => {
    setDisplayedCourses((prev) => Math.min(prev + 12, filteredCourses.length))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Courses & Pathways
            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full mt-1"></div>
          </h1>
          <p className="text-gray-600">Discover structured learning paths for your architectural journey</p>
        </div>
        <div className="flex items-center space-x-2">
          {wishlist.length > 0 && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              <Heart className="w-3 h-3 mr-1 fill-current" />
              {wishlist.length} wishlisted
            </Badge>
          )}
          <AIRecommender />
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Year:</span>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedYear === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedYear("all")}
              className={
                selectedYear === "all"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                  : ""
              }
            >
              All Years
            </Button>
            <Button
              variant={selectedYear === "NATA" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedYear("NATA")}
              className={
                selectedYear === "NATA"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                  : ""
              }
            >
              NATA
            </Button>
            {[1, 2, 3, 4, 5].map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedYear(year)}
                className={
                  selectedYear === year
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                    : ""
                }
              >
                Year {year}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Category:</span>
          <div className="flex flex-wrap gap-2">
            {["Workshop", "Seminar", "Online"].map((category) => (
              <Button
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCategory(category)}
                className={
                  selectedCategories.includes(category)
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                    : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search courses, instructors, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {visibleCourses.length} of {filteredCourses.length} courses
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {visibleCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </AnimatePresence>
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center pt-6">
          <Button
            onClick={loadMore}
            variant="outline"
            className="hover:bg-amber-50 hover:border-amber-300 bg-transparent"
          >
            Load More Courses
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  )
}

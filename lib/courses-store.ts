import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Course = {
  id: string
  title: string
  year: number | "NATA"
  category: "Workshop" | "Seminar" | "Online"
  lessons: number
  completed: number
  tagline: string
  instructor: string
  duration: string
  syllabus: string[]
  enrolled: boolean
}

interface CoursesStore {
  wishlist: string[]
  selectedYear: number | "NATA" | "all"
  selectedCategories: string[]
  searchQuery: string
  highlightedCourses: string[]
  addToWishlist: (courseId: string) => void
  removeFromWishlist: (courseId: string) => void
  setSelectedYear: (year: number | "NATA" | "all") => void
  toggleCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  setHighlightedCourses: (courseIds: string[]) => void
  clearHighlights: () => void
  updateCourseProgress: (courseId: string, completedLessons: number) => void
}

export const useCoursesStore = create<CoursesStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      selectedYear: "all",
      selectedCategories: [],
      searchQuery: "",
      highlightedCourses: [],

      addToWishlist: (courseId) =>
        set((state) => ({
          wishlist: [...state.wishlist, courseId],
        })),

      removeFromWishlist: (courseId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== courseId),
        })),

      setSelectedYear: (year) => set({ selectedYear: year }),

      toggleCategory: (category) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category],
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setHighlightedCourses: (courseIds) => set({ highlightedCourses: courseIds }),

      clearHighlights: () => set({ highlightedCourses: [] }),

      updateCourseProgress: (courseId: string, completedLessons: number) => {
        // TODO: This would typically update the backend
        // For now, we'll update the local courses array
        const courseIndex = courses.findIndex((c) => c.id === courseId)
        if (courseIndex !== -1) {
          courses[courseIndex].completed = completedLessons
        }
      },
    }),
    {
      name: "courses-storage",
    },
  ),
)

export const courses: Course[] = [
  // NATA Preparation Courses (only for NATA aspirants)
  {
    id: "nata-1",
    title: "NATA Drawing Fundamentals",
    year: "NATA",
    category: "Online",
    lessons: 24,
    completed: 18,
    tagline: "Master perspective drawing and sketching techniques for NATA success",
    instructor: "Prof. Rajesh Kumar",
    duration: "8 weeks",
    syllabus: ["Basic sketching", "Perspective drawing", "Shading techniques", "Composition"],
    enrolled: true,
  },
  {
    id: "nata-2",
    title: "Mathematical Aptitude for NATA",
    year: "NATA",
    category: "Online",
    lessons: 20,
    completed: 12,
    tagline: "Comprehensive math preparation covering all NATA topics",
    instructor: "Dr. Priya Sharma",
    duration: "6 weeks",
    syllabus: ["Algebra", "Geometry", "Trigonometry", "Mensuration"],
    enrolled: true,
  },
  {
    id: "nata-3",
    title: "Aesthetic Sensitivity Training",
    year: "NATA",
    category: "Workshop",
    lessons: 16,
    completed: 14,
    tagline: "Develop visual perception and aesthetic judgment for NATA",
    instructor: "Prof. Meera Patel",
    duration: "6 weeks",
    syllabus: ["Visual perception", "Color theory", "Proportion", "Aesthetic judgment"],
    enrolled: true,
  },
  {
    id: "nata-4",
    title: "NATA Mock Test Series",
    year: "NATA",
    category: "Online",
    lessons: 12,
    completed: 0,
    tagline: "Practice tests and exam strategies for NATA success",
    instructor: "Dr. Amit Verma",
    duration: "4 weeks",
    syllabus: ["Mock tests", "Time management", "Exam strategies", "Performance analysis"],
    enrolled: false,
  },

  // Year 1 University Courses
  {
    id: "year1-1",
    title: "Architectural Design Studio I",
    year: 1,
    category: "Workshop",
    lessons: 16,
    completed: 8,
    tagline: "Introduction to design thinking and spatial concepts",
    instructor: "Prof. Meera Patel",
    duration: "12 weeks",
    syllabus: ["Design process", "Space planning", "Model making", "Presentation skills"],
    enrolled: true,
  },
  {
    id: "year1-2",
    title: "Building Construction Basics",
    year: 1,
    category: "Seminar",
    lessons: 12,
    completed: 6,
    tagline: "Understanding materials and construction methods",
    instructor: "Ar. Suresh Reddy",
    duration: "8 weeks",
    syllabus: ["Materials", "Foundation systems", "Wall construction", "Roofing"],
    enrolled: true,
  },
  {
    id: "year1-3",
    title: "Architectural History",
    year: 1,
    category: "Online",
    lessons: 14,
    completed: 12,
    tagline: "Evolution of architecture through different periods",
    instructor: "Dr. Kavita Singh",
    duration: "10 weeks",
    syllabus: ["Ancient architecture", "Medieval period", "Modern movements", "Contemporary trends"],
    enrolled: true,
  },

  // Year 2 University Courses
  {
    id: "year2-1",
    title: "Environmental Design",
    year: 2,
    category: "Workshop",
    lessons: 18,
    completed: 10,
    tagline: "Climate-responsive architecture and sustainability",
    instructor: "Dr. Kavita Singh",
    duration: "10 weeks",
    syllabus: ["Climate analysis", "Passive design", "Energy efficiency", "Green building"],
    enrolled: true,
  },
  {
    id: "year2-2",
    title: "Structural Systems",
    year: 2,
    category: "Online",
    lessons: 14,
    completed: 0,
    tagline: "Understanding loads, forces, and structural behavior",
    instructor: "Prof. Anil Gupta",
    duration: "8 weeks",
    syllabus: ["Load analysis", "Beam design", "Column design", "Foundation design"],
    enrolled: false,
  },
  {
    id: "year2-3",
    title: "AutoCAD for Architects",
    year: 2,
    category: "Workshop",
    lessons: 8,
    completed: 0,
    tagline: "Complete technical drawing skills for architects",
    instructor: "Ar. Rohit Sharma",
    duration: "4 weeks",
    syllabus: ["2D drafting", "3D modeling", "Layouts", "Plotting"],
    enrolled: false,
  },

  // Year 3 University Courses
  {
    id: "year3-1",
    title: "Urban Planning Principles",
    year: 3,
    category: "Seminar",
    lessons: 16,
    completed: 0,
    tagline: "City planning and urban development strategies",
    instructor: "Dr. Ravi Mehta",
    duration: "12 weeks",
    syllabus: ["Urban theory", "Zoning", "Transportation", "Public spaces"],
    enrolled: false,
  },
  {
    id: "year3-2",
    title: "Heritage Conservation",
    year: 3,
    category: "Workshop",
    lessons: 20,
    completed: 0,
    tagline: "Preserving architectural heritage and restoration techniques",
    instructor: "Ar. Deepika Joshi",
    duration: "14 weeks",
    syllabus: ["Conservation principles", "Documentation", "Restoration methods", "Case studies"],
    enrolled: false,
  },
  {
    id: "year3-3",
    title: "SketchUp for Architects",
    year: 3,
    category: "Online",
    lessons: 10,
    completed: 0,
    tagline: "3D modeling and visualization techniques",
    instructor: "Ar. Neha Agarwal",
    duration: "5 weeks",
    syllabus: ["Basic modeling", "Advanced tools", "Rendering", "Animation"],
    enrolled: false,
  },

  // Year 4 University Courses
  {
    id: "year4-1",
    title: "Professional Practice",
    year: 4,
    category: "Seminar",
    lessons: 10,
    completed: 0,
    tagline: "Business skills and project management for architects",
    instructor: "Ar. Vikram Malhotra",
    duration: "6 weeks",
    syllabus: ["Project management", "Client relations", "Contracts", "Fee structure"],
    enrolled: false,
  },
  {
    id: "year4-2",
    title: "Advanced Design Studio",
    year: 4,
    category: "Workshop",
    lessons: 24,
    completed: 0,
    tagline: "Complex architectural projects and design development",
    instructor: "Prof. Sunita Kohli",
    duration: "16 weeks",
    syllabus: ["Complex programming", "Site analysis", "Design development", "Technical drawings"],
    enrolled: false,
  },
  {
    id: "year4-3",
    title: "Vastu Shastra in Modern Architecture",
    year: 4,
    category: "Seminar",
    lessons: 6,
    completed: 0,
    tagline: "Integrating traditional principles with contemporary design",
    instructor: "Dr. Sanjay Prakash",
    duration: "3 weeks",
    syllabus: ["Vastu principles", "Modern applications", "Case studies", "Design integration"],
    enrolled: false,
  },

  // Year 5 University Courses
  {
    id: "year5-1",
    title: "Thesis Project",
    year: 5,
    category: "Workshop",
    lessons: 30,
    completed: 0,
    tagline: "Independent research and design project",
    instructor: "Prof. Ashok Lall",
    duration: "20 weeks",
    syllabus: ["Research methodology", "Design thesis", "Documentation", "Presentation"],
    enrolled: false,
  },
  {
    id: "year5-2",
    title: "Contemporary Architecture",
    year: 5,
    category: "Online",
    lessons: 12,
    completed: 0,
    tagline: "Current trends and future directions in architecture",
    instructor: "Dr. Bijoy Ramachandran",
    duration: "8 weeks",
    syllabus: ["Modern movements", "Digital architecture", "Parametric design", "Future trends"],
    enrolled: false,
  },
  {
    id: "year5-3",
    title: "Smart Cities and IoT",
    year: 5,
    category: "Seminar",
    lessons: 8,
    completed: 0,
    tagline: "Technology integration in urban planning",
    instructor: "Dr. Kiran Bedi",
    duration: "4 weeks",
    syllabus: ["Smart city concepts", "IoT applications", "Data analytics", "Implementation"],
    enrolled: false,
  },
]

// TODO: Replace with actual AI API
export const fakeRecommend = (prompt: string): string[] => {
  const seed = prompt.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const shuffled = [...courses].sort(() => 0.5 - Math.sin(seed))
  return shuffled.slice(0, 3).map((course) => course.id)
}

export { courses as allCourses }

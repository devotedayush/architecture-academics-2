import { create } from "zustand"
import { persist } from "zustand/middleware"

type UserRole = "student" | "faculty" | "architectural-firm" | "institution"
type StudentType = "NATA" | "UNIV"

interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  institution: string
  studentType?: StudentType
  year?: number
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  signup: (
    userData: Omit<User, "id"> & { password: string; studentType?: StudentType; year?: string },
  ) => Promise<boolean>
  logout: () => void
  updateStudentPreferences: (studentType: StudentType, year?: number) => void
  updateProfile: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string, role: UserRole) => {
        set({ isLoading: true })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock successful login for demo purposes
        const mockUser: User = {
          id: "user_" + Math.random().toString(36).substr(2, 9),
          email,
          fullName: email
            .split("@")[0]
            .replace(/[._]/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          role,
          institution:
            role === "student"
              ? "SPA Delhi"
              : role === "faculty"
                ? "CEPT University"
                : role === "architectural-firm"
                  ? "Kumar Associates"
                  : "Architecture Institute",
          studentType: role === "student" ? "NATA" : undefined,
          year: role === "student" ? 1 : undefined,
        }

        set({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        })

        return true
      },

      signup: async (userData) => {
        set({ isLoading: true })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const newUser: User = {
          id: "user_" + Math.random().toString(36).substr(2, 9),
          email: userData.email,
          fullName: userData.fullName,
          role: userData.role,
          institution: userData.institution,
          studentType: userData.role === "student" ? userData.studentType : undefined,
          year: userData.role === "student" && userData.studentType === "UNIV" ? Number(userData.year) : undefined,
        }

        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        })

        return true
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateStudentPreferences: (studentType: StudentType, year?: number) => {
        const { user } = get()
        if (user && user.role === "student") {
          set({
            user: {
              ...user,
              studentType,
              year,
            },
          })
        }
      },

      updateProfile: (updates: Partial<User>) => {
        const { user } = get()
        if (user) {
          set({
            user: {
              ...user,
              ...updates,
            },
          })
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)

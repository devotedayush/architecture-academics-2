import { create } from "zustand"
import { persist } from "zustand/middleware"

type StudentType = "NATA" | "UNIV"
type Year = 1 | 2 | 3 | 4 | 5

interface StudentStore {
  studentType: StudentType
  year: Year
  setStudentType: (type: StudentType) => void
  setYear: (year: Year) => void
}

export const useStudentStore = create<StudentStore>()(
  persist(
    (set) => ({
      studentType: "NATA",
      year: 1,
      setStudentType: (type) => set({ studentType: type }),
      setYear: (year) => set({ year }),
    }),
    {
      name: "student-preferences",
    },
  ),
)

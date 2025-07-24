"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail, Lock, User, Building2, GraduationCap, Briefcase, Target } from "lucide-react"
import { useAuthStore } from "@/lib/auth-store"
import { useRouter } from "next/navigation"

export function AuthForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    role: "",
    institution: "",
    studentType: "",
    year: "",
  })

  const { login, signup, isLoading } = useAuthStore()
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (mode: "signin" | "signup") => {
    try {
      let success = false

      if (mode === "signin") {
        // For demo, we'll assume the role based on email domain or default to student
        const role = formData.email.includes("@firm")
          ? "architectural-firm"
          : formData.email.includes("@edu")
            ? "institution"
            : formData.email.includes("@faculty")
              ? "faculty"
              : "student"
        success = await login(formData.email, formData.password, role as any)
      } else {
        success = await signup({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          role: formData.role as any,
          institution: formData.institution,
          studentType: formData.studentType as any,
          year: formData.year,
        })
      }

      if (success) {
        // Redirect based on role
        if (formData.role === "student" || (!formData.role && mode === "signin")) {
          router.push("/dashboard/student")
        } else if (formData.role === "faculty") {
          router.push("/dashboard/faculty")
        } else if (formData.role === "architectural-firm") {
          router.push("/dashboard/firm")
        } else if (formData.role === "institution") {
          router.push("/dashboard/institution")
        }
      }
    } catch (error) {
      console.error("Authentication error:", error)
    }
  }

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto">
      <DialogHeader className="text-center mb-6">
        <DialogTitle className="text-2xl font-bold text-gray-900">Welcome to Architecture Academics</DialogTitle>
        <p className="text-gray-600 mt-2">Join India's premier architecture education platform</p>
      </DialogHeader>

      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger
            value="signin"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FFB700] data-[state=active]:via-[#FF9A1F] data-[state=active]:to-[#FF7B00] data-[state=active]:text-white"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FFB700] data-[state=active]:via-[#FF9A1F] data-[state=active]:to-[#FF7B00] data-[state=active]:text-white"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signin" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signin-email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="signin-email"
                type="email"
                placeholder="student@example.com"
                className="pl-10"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500">Try: student@example.com, pro@firm.com, or admin@edu.in</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signin-password" className="text-sm font-medium text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="signin-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter any password"
                className="pl-10 pr-10"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-500">Any password will work for demo</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <button className="text-[#FF9A1F] hover:text-[#FF7B00] font-medium">Forgot password?</button>
          </div>

          <Button
            onClick={() => handleSubmit("signin")}
            disabled={isLoading || !formData.email || !formData.password}
            className="w-full bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] hover:opacity-90 text-white font-medium py-2.5"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full bg-transparent" disabled={isLoading}>
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full bg-transparent" disabled={isLoading}>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="signup" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name" className="text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="signup-name"
                type="text"
                placeholder="Enter your full name"
                className="pl-10"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="signup-email"
                type="email"
                placeholder="your.email@example.com"
                className="pl-10"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role-select" className="text-sm font-medium text-gray-700">
              I am a...
            </Label>
            <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Student</span>
                  </div>
                </SelectItem>
                <SelectItem value="faculty">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Faculty</span>
                  </div>
                </SelectItem>
                <SelectItem value="architectural-firm">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4" />
                    <span>Architectural Firm</span>
                  </div>
                </SelectItem>
                <SelectItem value="institution">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4" />
                    <span>Institution</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.role === "student" && (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Student Type</Label>
                <Select value={formData.studentType} onValueChange={(value) => handleInputChange("studentType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NATA">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>NATA Aspirant</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="UNIV">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4" />
                        <span>University Student</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.studentType === "UNIV" && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Current Year</Label>
                  <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your current year" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          Year {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="institution" className="text-sm font-medium text-gray-700">
              {formData.role === "student"
                ? "College/University"
                : formData.role === "faculty"
                  ? "Institution/University"
                  : formData.role === "architectural-firm"
                    ? "Firm Name"
                    : "Institution Name"}
            </Label>
            <Input
              id="institution"
              type="text"
              placeholder={
                formData.role === "student"
                  ? "e.g., SPA Delhi, CEPT University"
                  : formData.role === "faculty"
                    ? "e.g., Your Institution Name"
                    : formData.role === "architectural-firm"
                      ? "e.g., Your Architecture Firm"
                      : "e.g., Your Institution Name"
              }
              value={formData.institution}
              onChange={(e) => handleInputChange("institution", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="pl-10 pr-10"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                className="pl-10"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-start space-x-2 text-sm">
            <input type="checkbox" className="rounded border-gray-300 mt-0.5" required />
            <span className="text-gray-600">
              I agree to the{" "}
              <button className="text-[#FF9A1F] hover:text-[#FF7B00] font-medium">Terms of Service</button> and{" "}
              <button className="text-[#FF9A1F] hover:text-[#FF7B00] font-medium">Privacy Policy</button>
            </span>
          </div>

          <Button
            onClick={() => handleSubmit("signup")}
            disabled={
              isLoading ||
              !formData.email ||
              !formData.password ||
              !formData.fullName ||
              !formData.role ||
              !formData.institution ||
              (formData.role === "student" && !formData.studentType) ||
              (formData.role === "student" && formData.studentType === "UNIV" && !formData.year)
            }
            className="w-full bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] hover:opacity-90 text-white font-medium py-2.5"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuthStore } from "@/lib/auth-store"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, User, Mail, Building2, GraduationCap, Target } from "lucide-react"

export default function StudentSettings() {
  const { user, updateStudentPreferences } = useAuthStore()
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    institution: user?.institution || "",
    studentType: user?.studentType || "NATA",
    year: user?.year?.toString() || "1",
  })

  const [isSaving, setIsSaving] = useState(false)

  if (!user || user.role !== "student") {
    router.push("/")
    return null
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update student preferences
    updateStudentPreferences(
      formData.studentType as "NATA" | "UNIV",
      formData.studentType === "UNIV" ? Number(formData.year) : undefined,
    )

    setIsSaving(false)

    // Show success message (in a real app, you'd use a toast)
    alert("Profile updated successfully!")

    // Navigate back to dashboard
    router.push("/dashboard/student")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/student")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-sm text-gray-600">Manage your account information</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled
                  />
                </div>
                <p className="text-xs text-gray-500">Email cannot be changed. Contact support if needed.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution" className="text-sm font-medium text-gray-700">
                  College/University
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="institution"
                    type="text"
                    placeholder="e.g., SPA Delhi, CEPT University"
                    className="pl-10"
                    value={formData.institution}
                    onChange={(e) => handleInputChange("institution", e.target.value)}
                  />
                </div>
              </div>

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

              <div className="pt-6 border-t">
                <div className="flex space-x-4">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-[#FFB700] via-[#FF9A1F] to-[#FF7B00] hover:opacity-90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/dashboard/student")}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Delete Account</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

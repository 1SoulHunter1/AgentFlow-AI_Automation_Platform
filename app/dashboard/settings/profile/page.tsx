"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"
import { AddPasswordModal } from "@/components/settings/add-password-modal"

export default function ProfilePage() {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [fullName, setFullName] = useState("Shashank Singh")
  const [profileImage, setProfileImage] = useState(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vzgobNcJNhPklMSTKDOWJ5z14TwK20.png",
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your profile</p>
      </div>

      <div className="space-y-6">
        {/* Profile Image Section */}
        <div className="rounded-lg border border-border bg-card p-6">
          <Label className="mb-4 block text-sm font-medium">Profile image</Label>
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileImage || "/placeholder.svg"} alt={fullName} />
              <AvatarFallback>
                {fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center gap-2">
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <Upload className="mr-2 h-4 w-4" />
                Upload image
                <input
                  type="file"
                  accept=".jpeg,.jpg,.png,.heif,.svg,.xml"
                  onChange={handleImageUpload}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </Button>
              <p className="text-xs text-muted-foreground">Allowed types: .jpeg, .jpg, .png, .heif, .svg+xml</p>
            </div>
          </div>
        </div>

        {/* Full Name Section */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="fullName" className="text-sm font-medium">
              Full name
            </Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="max-w-md" />
          </div>
        </div>

        {/* Password Section */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Password</Label>
            <Button variant="outline" onClick={() => setShowPasswordModal(true)}>
              Add password
            </Button>
          </div>
        </div>
      </div>

      <AddPasswordModal open={showPasswordModal} onOpenChange={setShowPasswordModal} />
    </div>
  )
}

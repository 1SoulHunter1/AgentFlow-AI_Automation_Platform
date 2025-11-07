"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Lightbulb } from "lucide-react"

const colors = [
  { name: "gray", class: "bg-gray-500" },
  { name: "green", class: "bg-emerald-500" },
  { name: "cyan", class: "bg-cyan-500" },
  { name: "blue", class: "bg-blue-500" },
  { name: "purple", class: "bg-purple-500" },
  { name: "pink", class: "bg-pink-500" },
  { name: "orange", class: "bg-orange-500" },
  { name: "violet", class: "bg-violet-500" },
]

export default function NewProjectPage() {
  const router = useRouter()
  const [showDialog, setShowDialog] = useState(true)
  const [projectName, setProjectName] = useState("")
  const [selectedColor, setSelectedColor] = useState("gray")

  const handleCreateProject = () => {
    if (!projectName.trim()) return

    // In a real app, this would create the project in a database
    const projectId = Date.now().toString()
    router.push(`/dashboard/projects/${projectId}`)
  }

  const handleClose = () => {
    setShowDialog(false)
    router.push("/dashboard")
  }

  return (
    <DashboardLayout>
      <Dialog open={showDialog} onOpenChange={handleClose}>
        <DialogContent className="max-w-md font-sans">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">New project</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Info Section */}
            <div className="flex gap-3 rounded-lg bg-blue-50 p-4">
              <Lightbulb className="h-5 w-5 flex-shrink-0 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">What are projects?</p>
                <p className="mt-1 text-sm text-blue-700">
                  Projects let you organize chats and add instructions & files to groups of chats.
                </p>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="text-sm font-medium text-foreground">Name</label>
              <Input
                placeholder="e.g. Q1 Marketing Planning"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="mt-1.5"
              />
            </div>

            {/* Color Picker */}
            <div>
              <label className="text-sm font-medium text-foreground">Color</label>
              <div className="mt-2 flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`h-10 w-10 rounded-full ${color.class} ${
                      selectedColor === color.name
                        ? "ring-2 ring-offset-2 ring-blue-500"
                        : "hover:ring-2 hover:ring-offset-2 hover:ring-gray-300"
                    } transition-all`}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>

            {/* Project Limit */}
            <p className="text-xs text-muted-foreground">0/10 projects used</p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleCreateProject} disabled={!projectName.trim()}>
              Create project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

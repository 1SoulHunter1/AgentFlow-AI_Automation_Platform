"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Trash2, Maximize2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function GeneralPage() {
  const [workspaceName, setWorkspaceName] = useState("Acme-1")
  const [companyDescription, setCompanyDescription] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isExpandedTextarea, setIsExpandedTextarea] = useState(false)

  const handleIconUpload = () => {
    // Handle workspace icon upload
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/png, image/jpeg"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        // Validate file size (max 512 KB)
        if (file.size > 512 * 1024) {
          alert("File size must be less than 512 KB")
          return
        }
        console.log("[v0] Uploading workspace icon:", file.name)
        // Handle upload logic here
      }
    }
    input.click()
  }

  const handleDeleteWorkspace = () => {
    console.log("[v0] Deleting workspace")
    // Handle workspace deletion
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="flex-1 space-y-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold">General</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure the basics of your workspace</p>
      </div>

      <div className="max-w-3xl space-y-8">
        {/* Workspace icon */}
        <div className="space-y-3">
          <div>
            <Label className="text-base font-medium">Workspace icon</Label>
            <p className="text-sm text-muted-foreground mt-1">Format 1:1; PNG or JPEG; max 512 KB</p>
          </div>
          <Button variant="outline" onClick={handleIconUpload} className="gap-2 bg-transparent">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </div>

        {/* Workspace name */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="workspace-name" className="text-base font-medium">
              Workspace name
            </Label>
            <p className="text-sm text-muted-foreground mt-1">Set the name of your workspace</p>
          </div>
          <Input
            id="workspace-name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Company description */}
        <div className="space-y-3">
          <Label htmlFor="company-description" className="text-base font-medium">
            Company description
          </Label>
          <div className="relative">
            <Textarea
              id="company-description"
              placeholder="Enter general information and knowledge that the models should know about your company."
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              className="min-h-[200px] resize-none pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-2 right-2 h-8 w-8"
              onClick={() => setIsExpandedTextarea(true)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Delete workspace */}
        <div className="space-y-3 pt-4 border-t">
          <div>
            <Label className="text-base font-medium">Delete workspace</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Note that this is irreversible. All data associated with the workspace and its members will be lost.
            </p>
          </div>
          <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete workspace
          </Button>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete workspace</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this workspace? This action cannot be undone. All data associated with the
              workspace and its members will be permanently lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteWorkspace}>
              Delete workspace
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Expanded textarea dialog */}
      <Dialog open={isExpandedTextarea} onOpenChange={setIsExpandedTextarea}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Company description</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Enter general information and knowledge that the models should know about your company."
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            className="min-h-[400px] resize-none"
          />
          <DialogFooter>
            <Button onClick={() => setIsExpandedTextarea(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

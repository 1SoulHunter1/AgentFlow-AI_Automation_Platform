"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface CreateKnowledgeFolderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateFolder: (name: string, description: string) => void
}

export function CreateKnowledgeFolderModal({ open, onOpenChange, onCreateFolder }: CreateKnowledgeFolderModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleCreate = () => {
    if (name.trim()) {
      onCreateFolder(name, description)
      setName("")
      setDescription("")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create new "Knowledge folder"</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="folder-name">Name</Label>
            <Input
              id="folder-name"
              placeholder="Enter a name for the knowledge folder"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="folder-description">Description</Label>
            <Textarea
              id="folder-description"
              placeholder="Describe in a few sentences what kind of content can be found in this knowledge folder. This description will also be used by the AI."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!name.trim()} className="bg-blue-600 hover:bg-blue-700 text-white">
            Create knowledge folder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

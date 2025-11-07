"use client"

import type React from "react"

import { useState } from "react"
import { Folder, Plus, Mic, Maximize2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface ProjectFile {
  id: string
  name: string
  type: string
  size: string
}

export function ProjectDetailContent({ projectId }: { projectId: string }) {
  const [showCustomInstructions, setShowCustomInstructions] = useState(false)
  const [showAttachKnowledge, setShowAttachKnowledge] = useState(false)
  const [customInstructions, setCustomInstructions] = useState("")
  const [attachedFiles, setAttachedFiles] = useState<ProjectFile[]>([])
  const [message, setMessage] = useState("")

  const projectName = projectId === "1" ? "Project 1" : `Project ${projectId}`

  const handleSaveInstructions = () => {
    setShowCustomInstructions(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles: ProjectFile[] = Array.from(files).map((file) => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024).toFixed(1)} KB`,
    }))

    setAttachedFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (fileId: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  return (
    <div className="flex h-full flex-col font-sans">
      {/* Header */}
      <div className="border-b border-border px-8 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <Folder className="h-5 w-5 text-emerald-600" />
              </div>
              <h1 className="text-2xl font-semibold text-foreground">{projectName}</h1>
            </div>
            <Button variant="ghost" size="sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Instructions and Files */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setShowCustomInstructions(true)}
              className="flex flex-col items-start gap-2 rounded-lg border border-border bg-card p-4 text-left hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
                Custom instructions
              </div>
              <p className="text-sm text-muted-foreground">
                {customInstructions || "Click to add custom instructions for the project."}
              </p>
            </button>

            <button
              onClick={() => setShowAttachKnowledge(true)}
              className="flex flex-col items-start gap-2 rounded-lg border border-border bg-card p-4 text-left hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <FileText className="h-4 w-4" />
                Attached files
              </div>
              <p className="text-sm text-muted-foreground">
                {attachedFiles.length > 0
                  ? attachedFiles.map((f) => f.name).join(", ")
                  : "Click to add files to the project."}
              </p>
            </button>
          </div>

          {/* Chat Grid */}
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square rounded-lg border border-dashed border-border bg-muted/20" />
            ))}
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t border-border px-8 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="relative">
            <Textarea
              placeholder={`Ask in ${projectName}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[60px] resize-none pr-32"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 px-3">
                <Plus className="mr-1.5 h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mr-1.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                Web search
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mr-1.5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Deep research
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mr-1.5"
                >
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                Canvas
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mr-1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                Image
              </Button>
              <Button size="sm" className="h-8">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Instructions Dialog */}
      <Dialog open={showCustomInstructions} onOpenChange={setShowCustomInstructions}>
        <DialogContent className="max-w-5xl font-sans">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Custom instructions</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Custom instructions are used to guide the project's behavior.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Textarea
              placeholder="Click to add custom instructions for the project."
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              className="min-h-[300px] resize-none"
            />

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mr-2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
                Optimize
              </Button>
              <Button variant="ghost" size="sm">
                <Mic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="ml-auto">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowCustomInstructions(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveInstructions}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Attach Knowledge Dialog */}
      <Dialog open={showAttachKnowledge} onOpenChange={setShowAttachKnowledge}>
        <DialogContent className="max-w-4xl font-sans">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Attach knowledge</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Directly attach files to the project and all its chats as knowledge.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {attachedFiles.length > 0 && (
              <div>
                <p className="mb-3 text-sm font-medium text-foreground">Files ({attachedFiles.length})</p>
                <div className="space-y-2">
                  {attachedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between rounded-md border border-border bg-background p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-red-100">
                          <FileText className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {attachedFiles.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 py-12">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                    <FileText className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                    <FileText className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                    <FileText className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center">
              <label htmlFor="file-upload">
                <Button variant="outline" size="sm" asChild>
                  <span className="cursor-pointer">
                    <Plus className="mr-2 h-4 w-4" />
                    Attach
                  </span>
                </Button>
              </label>
              <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileUpload} />
              <span className="ml-2 text-sm text-muted-foreground">or drag and drop files here</span>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={() => setShowAttachKnowledge(false)}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

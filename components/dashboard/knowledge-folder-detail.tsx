"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreHorizontal, Settings, Users, Upload, FileText, Loader2, Eye, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface KnowledgeFile {
  id: string
  name: string
  status: "extracting" | "imported" | "error"
  uploadedAt: string
  size?: string
}

interface KnowledgeFolderDetailProps {
  folderId: string
  folderName: string
  folderDescription?: string
}

export function KnowledgeFolderDetail({ folderId, folderName, folderDescription }: KnowledgeFolderDetailProps) {
  const [files, setFiles] = useState<KnowledgeFile[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isDragging, setIsDragging] = useState(false)

  const handleFileUpload = useCallback((uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return

    const newFiles: KnowledgeFile[] = Array.from(uploadedFiles).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      status: "extracting" as const,
      uploadedAt: new Date().toISOString(),
      size: `${(file.size / 1024).toFixed(1)} KB`,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate extraction completion
    newFiles.forEach((file) => {
      setTimeout(
        () => {
          setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: "imported" as const } : f)))
        },
        2000 + Math.random() * 2000,
      )
    })
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      handleFileUpload(e.dataTransfer.files)
    },
    [handleFileUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileUpload(e.target.files)
    },
    [handleFileUpload],
  )

  const handleDeleteFile = useCallback((fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }, [])

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{folderName}</h1>
              <p className="text-sm text-muted-foreground mt-1">{folderDescription || "Click to add description"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Files Section */}
      <div className="flex-1 overflow-hidden flex flex-col px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{files.length} Files</h2>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Upload className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        {/* File List or Empty State */}
        <div
          className={`flex-1 overflow-y-auto border border-border rounded-lg ${
            isDragging ? "border-blue-500 border-2 bg-blue-50/50" : ""
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {files.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium mb-1">
                <label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:underline">
                  Click here
                </label>
                . Drop your files or{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  upload via API
                </a>
              </p>
              <p className="text-xs text-muted-foreground max-w-md">
                Supports text files like PDF, DOCX, TXT, or Markdown. Attach files like XLSX or CSV directly to an
                assistant or chat.{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  More about supported file types
                </a>
              </p>
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileInputChange}
                accept=".pdf,.docx,.txt,.md,.xlsx,.csv"
              />
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/50">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-4">
                    {file.status === "extracting" ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Extracting</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(file.uploadedAt)}
                        </span>
                        <span className="text-xs text-muted-foreground">Imported</span>
                      </>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteFile(file.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

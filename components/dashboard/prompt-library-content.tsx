"use client"

import { useState } from "react"
import { Search, Plus, ChevronDown, MoreHorizontal, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BUILT_IN_TEMPLATES } from "@/lib/prompt-templates"

interface Prompt {
  id: string
  title: string
  content: string
  visibility: "only-you" | "workspace"
  folderId: string
  createdBy: {
    name: string
    avatar?: string
  }
}

interface Folder {
  id: string
  name: string
  type: "private" | "workspace"
  prompts: Prompt[]
}

export function PromptLibraryContent() {
  const [showAddPrompt, setShowAddPrompt] = useState(false)
  const [showAddFolder, setShowAddFolder] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [newPromptTitle, setNewPromptTitle] = useState("")
  const [newPromptContent, setNewPromptContent] = useState("")
  const [newPromptVisibility, setNewPromptVisibility] = useState<"only-you" | "workspace">("only-you")
  const [newFolderName, setNewFolderName] = useState("")
  const [newFolderSharing, setNewFolderSharing] = useState<"only-you" | "workspace">("only-you")
  const [showTemplates, setShowTemplates] = useState(false)

  const [folders, setFolders] = useState<Folder[]>([
    {
      id: "private",
      name: "Private",
      type: "private",
      prompts: [],
    },
    {
      id: "workspace",
      name: "Workspace",
      type: "workspace",
      prompts: [],
    },
  ])

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["private", "workspace"]))

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const handleAddPrompt = () => {
    if (!newPromptTitle.trim() || !newPromptContent.trim()) return

    const newPrompt: Prompt = {
      id: Date.now().toString(),
      title: newPromptTitle,
      content: newPromptContent,
      visibility: newPromptVisibility,
      folderId: newPromptVisibility === "only-you" ? "private" : "workspace",
      createdBy: {
        name: "Shashank Singh",
        avatar: undefined,
      },
    }

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === newPrompt.folderId ? { ...folder, prompts: [...folder.prompts, newPrompt] } : folder,
      ),
    )

    setNewPromptTitle("")
    setNewPromptContent("")
    setNewPromptVisibility("only-you")
    setShowAddPrompt(false)
  }

  const handleAddFolder = () => {
    if (!newFolderName.trim()) return

    const newFolder: Folder = {
      id: Date.now().toString(),
      name: newFolderName,
      type: newFolderSharing === "only-you" ? "private" : "workspace",
      prompts: [],
    }

    setFolders((prev) => [...prev, newFolder])
    setExpandedFolders((prev) => new Set([...prev, newFolder.id]))
    setNewFolderName("")
    setNewFolderSharing("only-you")
    setShowAddFolder(false)
  }

  return (
    <div className="flex h-full flex-col font-sans">
      {/* Header */}
      <div className="border-b border-border px-8 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-foreground">Prompt library</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Save your favorite prompts and share your best ones with your colleagues
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search prompts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-7xl">
          {!searchQuery && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  Built-in Templates
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setShowTemplates(!showTemplates)}>
                  {showTemplates ? "Hide" : "Show all"}
                </Button>
              </div>

              {showTemplates && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {BUILT_IN_TEMPLATES.slice(0, 6).map((template) => (
                    <div
                      key={template.id}
                      className="rounded-lg border border-border bg-card p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => {
                        setNewPromptTitle(template.title)
                        setNewPromptContent(template.content)
                        setShowAddPrompt(true)
                      }}
                    >
                      <h3 className="text-sm font-semibold text-foreground mb-2">{template.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {template.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* All folders header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">All folders</h2>
            <div className="flex items-center gap-2">
              <Popover open={showAddFolder} onOpenChange={setShowAddFolder}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mr-2"
                    >
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                    Add folder
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Folder name</label>
                      <Input
                        placeholder="Folder name"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Shared with</label>
                      <Select value={newFolderSharing} onValueChange={(v: any) => setNewFolderSharing(v)}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="only-you">Only you</SelectItem>
                          <SelectItem value="workspace">Workspace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddFolder} className="w-full">
                      Create folder
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <Button onClick={() => setShowAddPrompt(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add prompt
              </Button>
            </div>
          </div>

          {/* Folders */}
          <div className="space-y-4">
            {folders.map((folder) => (
              <div key={folder.id} className="rounded-lg border border-border bg-card">
                <button
                  onClick={() => toggleFolder(folder.id)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        expandedFolders.has(folder.id) ? "" : "-rotate-90"
                      }`}
                    />
                    <span className="font-medium text-foreground">{folder.name}</span>
                    {folder.type === "private" && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Only you
                      </span>
                    )}
                  </div>
                </button>

                {expandedFolders.has(folder.id) && (
                  <div className="border-t border-border px-4 py-6">
                    {folder.prompts.length === 0 ? (
                      <p className="text-center text-sm text-muted-foreground">No prompts found</p>
                    ) : (
                      <div className="space-y-2">
                        {folder.prompts.map((prompt) => (
                          <div
                            key={prompt.id}
                            className="flex items-center justify-between rounded-md border border-border bg-background p-3 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={prompt.createdBy.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{prompt.createdBy.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-foreground">{prompt.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">{prompt.content}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Prompt Dialog */}
      <Dialog open={showAddPrompt} onOpenChange={setShowAddPrompt}>
        <DialogContent className="max-w-4xl font-sans">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Add prompt</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Select value={newPromptVisibility} onValueChange={(v: any) => setNewPromptVisibility(v)}>
                <SelectTrigger className="w-40">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mr-2"
                  >
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="only-you">Only you</SelectItem>
                  <SelectItem value="workspace">Workspace</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Input
                placeholder="Prompt title"
                value={newPromptTitle}
                onChange={(e) => setNewPromptTitle(e.target.value)}
                className="text-base"
              />
            </div>

            <div>
              <Textarea
                placeholder="Enter your prompt here"
                value={newPromptContent}
                onChange={(e) => setNewPromptContent(e.target.value)}
                className="min-h-[200px] resize-none text-sm"
              />
            </div>

            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Add variable
            </Button>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowAddPrompt(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPrompt}>Save prompt</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

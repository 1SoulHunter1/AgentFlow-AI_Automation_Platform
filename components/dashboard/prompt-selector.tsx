"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { BUILT_IN_TEMPLATES, type PromptTemplate, substituteVariables } from "@/lib/prompt-templates"

interface PromptSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelectPrompt: (prompt: string) => void
}

export function PromptSelector({ isOpen, onClose, onSelectPrompt }: PromptSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null)
  const [variableValues, setVariableValues] = useState<Record<string, string>>({})
  const [userPrompts, setUserPrompts] = useState<any[]>([])

  useEffect(() => {
    if (isOpen) {
      // Fetch user's saved prompts
      fetch("/api/prompts")
        .then((res) => res.json())
        .then((data) => setUserPrompts(data.prompts || []))
        .catch((err) => console.error("Failed to fetch prompts:", err))
    }
  }, [isOpen])

  const filteredTemplates = BUILT_IN_TEMPLATES.filter(
    (template) =>
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredUserPrompts = userPrompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleTemplateSelect = (template: PromptTemplate) => {
    if (template.variables.length > 0) {
      setSelectedTemplate(template)
      // Initialize variable values with defaults
      const defaults: Record<string, string> = {}
      template.variables.forEach((v) => {
        defaults[v.name] = v.defaultValue || ""
      })
      setVariableValues(defaults)
    } else {
      onSelectPrompt(template.content)
      onClose()
    }
  }

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      const finalPrompt = substituteVariables(selectedTemplate.content, variableValues)
      onSelectPrompt(finalPrompt)
      setSelectedTemplate(null)
      setVariableValues({})
      onClose()
    }
  }

  const handleUserPromptSelect = (prompt: any) => {
    onSelectPrompt(prompt.content)
    onClose()
  }

  const categories = Array.from(new Set(BUILT_IN_TEMPLATES.map((t) => t.category)))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] p-0 font-sans">
        {!selectedTemplate ? (
          <>
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
              <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Prompt Library
              </DialogTitle>
              <div className="relative mt-4">
                <svg
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <Input
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </DialogHeader>

            <ScrollArea className="flex-1 px-6 py-4">
              {/* User's Saved Prompts */}
              {filteredUserPrompts.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Your Prompts</h3>
                  <div className="grid gap-3">
                    {filteredUserPrompts.map((prompt) => (
                      <button
                        key={prompt.id}
                        onClick={() => handleUserPromptSelect(prompt)}
                        className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground mb-1">{prompt.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">{prompt.content}</p>
                        </div>
                        <svg
                          className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Built-in Templates by Category */}
              {categories.map((category) => {
                const categoryTemplates = filteredTemplates.filter((t) => t.category === category)
                if (categoryTemplates.length === 0) return null

                return (
                  <div key={category} className="mb-8">
                    <h3 className="text-sm font-semibold text-foreground mb-3">{category}</h3>
                    <div className="grid gap-3">
                      {categoryTemplates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => handleTemplateSelect(template)}
                          className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-left hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-medium text-foreground">{template.title}</h4>
                              {template.isBuiltIn && (
                                <Badge variant="secondary" className="text-xs">
                                  Built-in
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {template.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <svg
                            className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}

              {filteredTemplates.length === 0 && filteredUserPrompts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <svg
                    className="h-12 w-12 text-muted-foreground mb-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <p className="text-sm text-muted-foreground">No prompts found</p>
                  <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
                </div>
              )}
            </ScrollArea>
          </>
        ) : (
          <>
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setSelectedTemplate(null)} className="p-0 h-auto">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </Button>
                <DialogTitle className="text-xl font-semibold">{selectedTemplate.title}</DialogTitle>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{selectedTemplate.description}</p>
            </DialogHeader>

            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-4">
                {selectedTemplate.variables.map((variable) => (
                  <div key={variable.name}>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      {variable.name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </label>
                    <p className="text-xs text-muted-foreground mb-2">{variable.description}</p>
                    {variable.name.includes("content") ||
                    variable.name.includes("notes") ||
                    variable.name.includes("code") ||
                    variable.name.includes("data") ? (
                      <textarea
                        value={variableValues[variable.name] || ""}
                        onChange={(e) => setVariableValues((prev) => ({ ...prev, [variable.name]: e.target.value }))}
                        placeholder={variable.defaultValue || `Enter ${variable.name}...`}
                        className="w-full min-h-[120px] rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={variableValues[variable.name] || ""}
                        onChange={(e) => setVariableValues((prev) => ({ ...prev, [variable.name]: e.target.value }))}
                        placeholder={variable.defaultValue || `Enter ${variable.name}...`}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-border">
              <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                Cancel
              </Button>
              <Button onClick={handleUseTemplate}>Use Template</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface MentionCategory {
  id: string
  label: string
  icon: React.ReactNode
  items?: MentionItem[]
}

interface MentionItem {
  id: string
  name: string
  description?: string
  icon?: React.ReactNode
}

interface MentionMenuProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (item: MentionItem, category: string) => void
  searchQuery: string
}

const categories: MentionCategory[] = [
  {
    id: "assistants",
    label: "Assistants",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    items: [
      { id: "gpt-4", name: "GPT-4.1", description: "Advanced reasoning and analysis" },
      { id: "claude", name: "Claude Sonnet 4", description: "Creative and detailed responses" },
      { id: "research", name: "Research Assistant", description: "Deep research and analysis" },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    items: [
      { id: "slack", name: "Slack", description: "Team communication" },
      { id: "gmail", name: "Gmail", description: "Email management" },
      { id: "notion", name: "Notion", description: "Knowledge base" },
      { id: "jira", name: "Jira", description: "Project tracking" },
    ],
  },
  {
    id: "knowledge",
    label: "Knowledge folders",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    items: [
      { id: "folder1", name: "Folder 1", description: "2 files" },
      { id: "company-docs", name: "Company Docs", description: "15 files" },
      { id: "research", name: "Research Papers", description: "8 files" },
    ],
  },
  {
    id: "prompts",
    label: "Prompts",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    items: [
      { id: "summarize", name: "Summarize Document", description: "Create concise summaries" },
      { id: "analyze", name: "Analyze Data", description: "Extract insights from data" },
      { id: "brainstorm", name: "Brainstorm Ideas", description: "Generate creative ideas" },
    ],
  },
]

export function MentionMenu({ isOpen, onClose, onSelect, searchQuery }: MentionMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredCategories, setFilteredCategories] = useState(categories)

  useEffect(() => {
    if (searchQuery) {
      // Filter categories and items based on search query
      const filtered = categories
        .map((category) => ({
          ...category,
          items: category.items?.filter(
            (item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description?.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.items && category.items.length > 0)
      setFilteredCategories(filtered)
    } else {
      setFilteredCategories(categories)
    }
  }, [searchQuery])

  if (!isOpen) return null

  const currentCategory = selectedCategory ? filteredCategories.find((c) => c.id === selectedCategory) : null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Menu */}
      <div className="absolute bottom-full left-0 mb-2 z-50 w-[400px] rounded-xl border border-border bg-background shadow-xl">
        {!selectedCategory ? (
          // Categories view
          <div className="p-3">
            <div className="mb-2 px-3 py-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Categories</h3>
            </div>
            <div className="space-y-1">
              {filteredCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600">{category.icon}</div>
                    <span className="font-medium text-foreground">{category.label}</span>
                  </div>
                  <svg
                    className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors"
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
            {searchQuery && (
              <div className="mt-3 px-3 py-2 text-xs text-muted-foreground border-t border-border">
                ...or continue typing to search
              </div>
            )}
            {!searchQuery && (
              <div className="mt-3 px-3 py-2 text-xs text-muted-foreground border-t border-border">
                ...or continue typing to search
              </div>
            )}
          </div>
        ) : (
          // Items view
          <div className="p-3">
            <div className="mb-2 flex items-center gap-2 px-3 py-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="h-4 w-4 rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {currentCategory?.label}
              </h3>
            </div>
            <div className="space-y-1">
              {currentCategory?.items?.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelect(item, currentCategory.id)
                    onClose()
                  }}
                  className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground text-sm">{item.name}</div>
                    {item.description && <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

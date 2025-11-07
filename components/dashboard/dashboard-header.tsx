"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModelSelector } from "./model-selector"

interface DashboardHeaderProps {
  pageTitle?: string
}

export function DashboardHeader({ pageTitle }: DashboardHeaderProps) {
  const [selectedModel, setSelectedModel] = useState("claude-sonnet-4.5")
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false)

  const modelNames: Record<string, string> = {
    "claude-sonnet-4.5": "Claude 4.5 Sonnet",
    "claude-sonnet-4.5-reasoning": "Claude 4.5 Sonnet Reasoning",
    "claude-sonnet-4": "Claude 4 Sonnet",
    "claude-sonnet-4-reasoning": "Claude 4 Sonnet Reasoning",
    "claude-sonnet-3.7": "Claude 3.7 Sonnet",
    "claude-sonnet-3.5": "Claude 3.5 Sonnet",
    "gpt-5-thinking": "GPT-5 Thinking",
    "gpt-5": "GPT-5",
    "gpt-5-mini": "GPT-5 Mini",
    "gpt-4.1": "GPT-4.1",
    "gpt-4.1-mini": "GPT-4.1 Mini",
    "gpt-4o": "GPT-4o",
    "gemini-2.5-pro": "Gemini 2.5 Pro",
    "gemini-2.5-flash": "Gemini 2.5 Flash",
  }

  return (
    <>
      <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4">
        <div className="flex items-center gap-3">
          {pageTitle ? (
            <h1 className="text-sm font-normal text-foreground">{pageTitle}</h1>
          ) : (
            <button
              onClick={() => setIsModelSelectorOpen(true)}
              className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-normal hover:bg-muted/50 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted-foreground"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6M5.6 5.6l4.2 4.2m4.2 4.2 4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.2-4.2 4.2-4.2" />
              </svg>
              <span className="text-foreground">{modelNames[selectedModel]}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted-foreground"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* User Menu */}
          <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
            <div className="h-7 w-7 rounded-full bg-gradient-ai-primary flex items-center justify-center text-white text-xs font-semibold">
              U
            </div>
          </Button>
        </div>
      </header>

      <ModelSelector
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
        isOpen={isModelSelectorOpen}
        onClose={() => setIsModelSelectorOpen(false)}
      />
    </>
  )
}

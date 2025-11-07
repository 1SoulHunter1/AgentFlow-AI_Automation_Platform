"use client"

import type React from "react"

import { useState } from "react"

interface ModelCapability {
  name: string
  icon: React.ReactNode
  enabled: boolean
}

interface Model {
  id: string
  name: string
  provider: "OpenAI" | "Anthropic" | "Google"
  description: string
  contextWindow: string
  speed: "Fast" | "Medium" | "Slow"
  capabilities: ModelCapability[]
  pricing: string
  bestFor: string[]
}

const models: Model[] = [
  {
    id: "claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    description:
      "Most advanced model for coding and complex multi-step projects. Over 30 hours of autonomous operation.",
    contextWindow: "200K tokens (1M beta)",
    speed: "Medium",
    pricing: "$3/$15 per 1M tokens",
    bestFor: ["Software development", "Complex reasoning", "AI agents", "Long-running tasks"],
    capabilities: [
      { name: "Documents", icon: <DocumentIcon />, enabled: true },
      { name: "Web search", icon: <WebIcon />, enabled: true },
      { name: "Image analysis", icon: <ImageIcon />, enabled: true },
      { name: "Data analyst", icon: <CodeIcon />, enabled: true },
      { name: "Reasoning", icon: <BrainIcon />, enabled: true },
      { name: "Canvas", icon: <PenIcon />, enabled: true },
    ],
  },
  {
    id: "claude-sonnet-4.5-reasoning",
    name: "Claude Sonnet 4.5 Reasoning",
    provider: "Anthropic",
    description: "Extended reasoning variant with enhanced problem-solving for complex analytical tasks.",
    contextWindow: "200K tokens",
    speed: "Slow",
    pricing: "$5/$20 per 1M tokens",
    bestFor: ["Mathematical proofs", "Scientific research", "Complex problem solving"],
    capabilities: [
      { name: "Documents", icon: <DocumentIcon />, enabled: true },
      { name: "Web search", icon: <WebIcon />, enabled: true },
      { name: "Image analysis", icon: <ImageIcon />, enabled: true },
      { name: "Data analyst", icon: <CodeIcon />, enabled: true },
      { name: "Reasoning", icon: <BrainIcon />, enabled: true },
      { name: "Canvas", icon: <PenIcon />, enabled: false },
    ],
  },
  {
    id: "claude-sonnet-4",
    name: "Claude Sonnet 4",
    provider: "Anthropic",
    description: "Balanced model for general-purpose tasks with strong reasoning and coding capabilities.",
    contextWindow: "200K tokens",
    speed: "Medium",
    pricing: "$2.5/$12 per 1M tokens",
    bestFor: ["General tasks", "Content creation", "Analysis", "Coding"],
    capabilities: [
      { name: "Documents", icon: <DocumentIcon />, enabled: true },
      { name: "Web search", icon: <WebIcon />, enabled: true },
      { name: "Image analysis", icon: <ImageIcon />, enabled: true },
      { name: "Data analyst", icon: <CodeIcon />, enabled: true },
      { name: "Reasoning", icon: <BrainIcon />, enabled: true },
      { name: "Canvas", icon: <PenIcon />, enabled: true },
    ],
  },
  {
    id: "claude-sonnet-4-reasoning",
    name: "Claude Sonnet 4 Reasoning",
    provider: "Anthropic",
    description: "Reasoning-focused variant for analytical and mathematical tasks.",
    contextWindow: "200K tokens",
    speed: "Slow",
    pricing: "$4/$18 per 1M tokens",
    bestFor: ["Math problems", "Logic puzzles", "Research analysis"],
    capabilities: [
      { name: "Documents", icon: <DocumentIcon />, enabled: true },
      { name: "Web search", icon: <WebIcon />, enabled: true },
      { name: "Image analysis", icon: <ImageIcon />, enabled: true },
      { name: "Data analyst", icon: <CodeIcon />, enabled: true },
      { name: "Reasoning", icon: <BrainIcon />, enabled: true },
      { name: "Canvas", icon: <PenIcon />, enabled: false },
    ],
  },
  {
    id: "claude-sonnet-3.7",
    name: "Claude Sonnet 3.7",
    provider: "Anthropic",
    description: "Cost-effective model with strong performance for everyday business tasks.",
    contextWindow: "200K tokens",
    speed: "Fast",
    pricing: "$2/$10 per 1M tokens",
    bestFor: ["Business writing", "Customer support", "Data processing"],
    capabilities: [
      { name: "Documents", icon: <DocumentIcon />, enabled: true },
      { name: "Web search", icon: <WebIcon />, enabled: true },
      { name: "Image analysis", icon: <ImageIcon />, enabled: true },
      { name: "Data analyst", icon: <CodeIcon />, enabled: true },
      { name: "Reasoning", icon: <BrainIcon />, enabled: false },
      { name: "Canvas", icon: <PenIcon />, enabled: true },
    ],
  },
  {
    id: "claude-sonnet-3.5",
    name: "Claude Sonnet 3.5",
    provider: "Anthropic",
    description: "Fast and efficient model for high-volume everyday tasks with quick responses.",
    contextWindow: "200K tokens",
    speed: "Fast",
    pricing: "$1.5/$8 per 1M tokens",
    bestFor: ["Quick queries", "Summarization", "Translation", "Simple coding"],
    capabilities: [
      { name: "Documents", icon: <DocumentIcon />, enabled: true },
      { name: "Web search", icon: <WebIcon />, enabled: true },
      { name: "Image analysis", icon: <ImageIcon />, enabled: false },
      { name: "Data analyst", icon: <CodeIcon />, enabled: true },
      { name: "Reasoning", icon: <BrainIcon />, enabled: false },
      { name: "Canvas", icon: <PenIcon />, enabled: true },
    ],
  },
  {
    id: "gpt-5-thinking",
    name: "GPT-5 Thinking",
    provider: "OpenAI",
    description:
      "Advanced reasoning model with extended thinking time for complex problem-solving. 94.6% on AIME 2025.",
    contextWindow: "1M tokens",
    speed: "Slow",
    pricing: "$2/$15 per 1M tokens",
    bestFor: ["Mathematical reasoning", "Scientific analysis", "Complex logic"],
    capabilities: [
      { name: "Documents", icon: <DocumentIcon />, enabled: true },
      { name: "Web search", icon: <WebIcon />, enabled: true },
      { name: "Image analysis", icon: <ImageIcon />, enabled: true },
      { name: "Data analyst", icon: <CodeIcon />, enabled: true },
      { name: "Reasoning", icon: <BrainIcon />, enabled: true },
      { name: "Canvas", icon: <PenIcon />, enabled: false },
    ],
  },
  {
    id: "gpt-5",
    name: "GPT-5",
    provider: "OpenAI",
    description: "Most capable GPT model for multi-step tasks with massive 1M token context window.",
    contextWindow: "1M tokens",
    speed: "Medium",
    pricing: "$1.25/$10 per 1M tokens",
    bestFor: ["Multi-step workflows", "Large document analysis", "Complex projects"],
    capabilities: [
      { name: "Documents", icon: <DocumentIcon />, enabled: true },
      { name: "Web search", icon: <WebIcon />, enabled: true },
      { name: "Image analysis", icon: <ImageIcon />, enabled: true },
      { name: "Data analyst", icon: <CodeIcon />, enabled: true },
      { name: "Reasoning", icon: <BrainIcon />, enabled: true },
      { name: "Canvas", icon: <PenIcon />, enabled: true },
    ],
  },
  {
    id: "gpt-5-mini",
    name: "GPT-5 Mini",
    provider: "OpenAI",
    description: "Smaller, faster version of GPT-5. Great for everyday tasks with significantly faster responses.",
    contextWindow: "128K tokens",
    speed: "Fast",
    pricing: "$0.5/$2 per 1M tokens",
    bestFor: ["Quick responses", "Chat", "Simple tasks", "High volume"],
    capabilities: [
      { name: "Documents", icon: <DocumentIcon />, enabled: true },
      { name: "Web search", icon: <WebIcon />, enabled: true },
      { name: "Image analysis", icon: <ImageIcon />, enabled: true },
      { name: "Data analyst", icon: <CodeIcon />, enabled: true },
      { name: "Reasoning", icon: <BrainIcon />, enabled: false },
      { name: "Canvas", icon: <PenIcon />, enabled: true },
    ],
  },
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    provider: "OpenAI",
    description: "Reliable and well-tested model for production applications with strong general capabilities.",
    contextWindow: "128K tokens",
    speed: "Medium",
    pricing: "$1/$5 per 1M tokens",
    bestFor: ["Production apps", "Reliable outputs", "General purpose"],
    capabilities: [
      { name: "Documents", icon: <DocumentIcon />, enabled: true },
      { name: "Web search", icon: <WebIcon />, enabled: true },
      { name: "Image analysis", icon: <ImageIcon />, enabled: true },
      { name: "Data analyst", icon: <CodeIcon />, enabled: true },
      { name: "Reasoning", icon: <BrainIcon />, enabled: false },
      { name: "Canvas", icon: <PenIcon />, enabled: true },
    ],
  },
  {
    id: "gpt-4.1-mini",
    name: "GPT-4.1 Mini",
    provider: "OpenAI",
    description: "Smaller, faster version of GPT-4.1. Great for everyday tasks with significantly faster responses.",
    contextWindow: "128K tokens",
    speed: "Fast",
    pricing: "$0.4/$1.5 per 1M tokens",
    bestFor: ["Everyday tasks", "Fast responses", "Cost-effective"],
    capabilities: [
      { name: "Documents", icon: <DocumentIcon />, enabled: true },
      { name: "Web search", icon: <WebIcon />, enabled: true },
      { name: "Image analysis", icon: <ImageIcon />, enabled: true },
      { name: "Data analyst", icon: <CodeIcon />, enabled: true },
      { name: "Reasoning", icon: <BrainIcon />, enabled: false },
      { name: "Canvas", icon: <PenIcon />, enabled: true },
    ],
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    description: "Multimodal model optimized for vision and audio tasks with fast performance.",
    contextWindow: "128K tokens",
    speed: "Fast",
    pricing: "$0.8/$3 per 1M tokens",
    bestFor: ["Image analysis", "Vision tasks", "Multimodal applications"],
    capabilities: [
      { name: "Documents", icon: <DocumentIcon />, enabled: true },
      { name: "Web search", icon: <WebIcon />, enabled: true },
      { name: "Image analysis", icon: <ImageIcon />, enabled: true },
      { name: "Data analyst", icon: <CodeIcon />, enabled: true },
      { name: "Reasoning", icon: <BrainIcon />, enabled: false },
      { name: "Canvas", icon: <PenIcon />, enabled: true },
    ],
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    description:
      "Advanced multimodal model processing text, images, audio, and video simultaneously. 1M token context.",
    contextWindow: "1M tokens (2M soon)",
    speed: "Medium",
    pricing: "$5/$20 per 1M tokens",
    bestFor: ["Multimodal tasks", "Video analysis", "Large context", "Code debugging"],
    capabilities: [
      { name: "Documents", icon: <DocumentIcon />, enabled: true },
      { name: "Web search", icon: <WebIcon />, enabled: true },
      { name: "Image analysis", icon: <ImageIcon />, enabled: true },
      { name: "Data analyst", icon: <CodeIcon />, enabled: true },
      { name: "Reasoning", icon: <BrainIcon />, enabled: true },
      { name: "Canvas", icon: <PenIcon />, enabled: true },
    ],
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google",
    description: "Fast and efficient multimodal model for high-throughput applications with quick responses.",
    contextWindow: "1M tokens",
    speed: "Fast",
    pricing: "$0.3/$1 per 1M tokens",
    bestFor: ["High volume", "Fast multimodal", "Real-time applications"],
    capabilities: [
      { name: "Documents", icon: <DocumentIcon />, enabled: true },
      { name: "Web search", icon: <WebIcon />, enabled: true },
      { name: "Image analysis", icon: <ImageIcon />, enabled: true },
      { name: "Data analyst", icon: <CodeIcon />, enabled: true },
      { name: "Reasoning", icon: <BrainIcon />, enabled: false },
      { name: "Canvas", icon: <PenIcon />, enabled: true },
    ],
  },
]

function getProviderLogo(provider: string) {
  if (provider === "OpenAI") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    )
  } else if (provider === "Anthropic") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#D4A574" />
        <path d="M8.5 6h2.2l5.8 12h-2.4l-1.4-3H8.3l-1.4 3H4.7L8.5 6zm.9 3.8L7.9 13h3l-1.5-3.2z" fill="#1A1A1A" />
        <path d="M14.5 6h2.2l5.8 12h-2.4l-1.4-3h-4.4l-1.4 3h-2.2L14.5 6zm.9 3.8L13.9 13h3l-1.5-3.2z" fill="#1A1A1A" />
      </svg>
    )
  } else if (provider === "Google") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    )
  }
  return null
}

// Icon components
function DocumentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function WebIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function ImageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function BrainIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  )
}

function PenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  )
}

export function ModelSelector({
  selectedModel,
  onSelectModel,
  isOpen,
  onClose,
}: {
  selectedModel: string
  onSelectModel: (modelId: string) => void
  isOpen: boolean
  onClose: () => void
}) {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null)
  const currentModel = models.find((m) => m.id === selectedModel) || models[0]
  const displayModel = hoveredModel ? models.find((m) => m.id === hoveredModel) || currentModel : currentModel

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/20" onClick={onClose}>
      <div
        className="bg-background border border-border rounded-lg shadow-2xl w-[900px] max-h-[600px] flex overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Panel - Model List */}
        <div className="w-[320px] border-r border-border bg-muted/30 flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Models</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onSelectModel(model.id)
                  onClose()
                }}
                onMouseEnter={() => setHoveredModel(model.id)}
                onMouseLeave={() => setHoveredModel(null)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  model.id === selectedModel
                    ? "bg-muted"
                    : hoveredModel === model.id
                      ? "bg-muted/50"
                      : "hover:bg-muted/30"
                }`}
              >
                <div className="text-muted-foreground">{getProviderLogo(model.provider)}</div>
                <span className="text-sm font-normal">{model.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Model Details */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-muted-foreground">{getProviderLogo(displayModel.provider)}</div>
            <h3 className="text-lg font-semibold">
              {displayModel.provider} / {displayModel.name}
            </h3>
          </div>

          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{displayModel.description}</p>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Context:</span>
              <span className="font-medium">{displayModel.contextWindow}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Speed:</span>
              <span
                className={`font-medium ${
                  displayModel.speed === "Fast"
                    ? "text-green-600"
                    : displayModel.speed === "Medium"
                      ? "text-yellow-600"
                      : "text-orange-600"
                }`}
              >
                {displayModel.speed}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Pricing:</span>
              <span className="font-medium">{displayModel.pricing}</span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Best for</h4>
            <div className="flex flex-wrap gap-2">
              {displayModel.bestFor.map((use, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-muted text-xs rounded-md">
                  {use}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Capabilities</h4>
            <div className="grid grid-cols-2 gap-3">
              {displayModel.capabilities.map((capability, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md border ${
                    capability.enabled ? "border-border bg-background" : "border-border/50 bg-muted/30 opacity-50"
                  }`}
                >
                  <div className={capability.enabled ? "text-foreground" : "text-muted-foreground"}>
                    {capability.icon}
                  </div>
                  <span className={`text-sm ${capability.enabled ? "text-foreground" : "text-muted-foreground"}`}>
                    {capability.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

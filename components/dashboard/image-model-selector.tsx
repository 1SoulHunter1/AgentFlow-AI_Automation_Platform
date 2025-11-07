"use client"

import type React from "react"
import { useState } from "react"

interface ImageModelCapability {
  name: string
  icon: React.ReactNode
  enabled: boolean
}

interface ImageModel {
  id: string
  name: string
  provider: "FLUX" | "Google" | "OpenAI"
  description: string
  resolution: string
  speed: string
  capabilities: ImageModelCapability[]
  pricing: string
  bestFor: string[]
}

const imageModels: ImageModel[] = [
  {
    id: "flux-1.1-pro-ultra",
    name: "FLUX1.1 [pro] Ultra",
    provider: "FLUX",
    description:
      "Professional 4MP ultra-high-resolution image generation in seconds. Best for 2K resolution with Raw mode for authentic, natural-looking results.",
    resolution: "2048x2048 (4MP)",
    speed: "~10 seconds",
    pricing: "6 credits per image",
    bestFor: ["Professional photography", "High-resolution art", "Cinematic scenes", "Complex details"],
    capabilities: [
      { name: "Image generation", icon: <ImageGenIcon />, enabled: true },
      { name: "Image editing", icon: <ImageEditIcon />, enabled: true },
      { name: "Image-to-image", icon: <ImageToImageIcon />, enabled: true },
      { name: "Raw mode", icon: <RawModeIcon />, enabled: true },
    ],
  },
  {
    id: "flux-1-kontext",
    name: "FLUX.1 Kontext",
    provider: "FLUX",
    description: "Context-aware image generation with enhanced understanding of complex prompts and scene composition.",
    resolution: "1024x1024",
    speed: "~8 seconds",
    pricing: "4 credits per image",
    bestFor: ["Context-rich scenes", "Story illustration", "Complex compositions"],
    capabilities: [
      { name: "Image generation", icon: <ImageGenIcon />, enabled: true },
      { name: "Image editing", icon: <ImageEditIcon />, enabled: true },
      { name: "Image-to-image", icon: <ImageToImageIcon />, enabled: true },
      { name: "Raw mode", icon: <RawModeIcon />, enabled: false },
    ],
  },
  {
    id: "imagen-4",
    name: "Imagen 4",
    provider: "Google",
    description:
      "Google's flagship model for high-quality, detailed images; best for 2K resolution, text rendering, and creative fidelity.",
    resolution: "2048x2048",
    speed: "~12 seconds",
    pricing: "4 credits per image",
    bestFor: ["Photorealism", "Text rendering", "Creative fidelity", "Detailed scenes"],
    capabilities: [
      { name: "Image generation", icon: <ImageGenIcon />, enabled: true },
      { name: "Image editing", icon: <ImageEditIcon />, enabled: false },
      { name: "Text rendering", icon: <TextRenderIcon />, enabled: true },
      { name: "Photorealism", icon: <PhotoIcon />, enabled: true },
    ],
  },
  {
    id: "imagen-4-fast",
    name: "Imagen 4 Fast",
    provider: "Google",
    description: "Faster version of Imagen 4 optimized for quick iterations and rapid prototyping with good quality.",
    resolution: "1024x1024",
    speed: "~5 seconds",
    pricing: "2 credits per image",
    bestFor: ["Quick iterations", "Rapid prototyping", "High volume", "Fast previews"],
    capabilities: [
      { name: "Image generation", icon: <ImageGenIcon />, enabled: true },
      { name: "Image editing", icon: <ImageEditIcon />, enabled: false },
      { name: "Text rendering", icon: <TextRenderIcon />, enabled: true },
      { name: "Photorealism", icon: <PhotoIcon />, enabled: false },
    ],
  },
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    provider: "OpenAI",
    description:
      "Reliable creative output with strong prompt understanding and artistic interpretation. Great for creative and imaginative scenes.",
    resolution: "1024x1024",
    speed: "~15 seconds",
    pricing: "15 credits per image",
    bestFor: ["Creative art", "Imaginative scenes", "Artistic interpretation", "Reliable output"],
    capabilities: [
      { name: "Image generation", icon: <ImageGenIcon />, enabled: true },
      { name: "Image editing", icon: <ImageEditIcon />, enabled: false },
      { name: "Creative art", icon: <CreativeIcon />, enabled: true },
      { name: "Prompt understanding", icon: <PromptIcon />, enabled: true },
    ],
  },
]

function getProviderLogo(provider: string) {
  if (provider === "FLUX") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#1A1A1A" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#1A1A1A" strokeWidth="2" fill="none" />
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
  } else if (provider === "OpenAI") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 0-.071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    )
  }
  return null
}

// Icon components
function ImageGenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

function ImageEditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <path d="M12 8l4 4-8 8H4v-4l8-8z" />
    </svg>
  )
}

function ImageToImageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="10" height="10" rx="1" />
      <rect x="12" y="7" width="10" height="10" rx="1" />
      <path d="M17 12h-2" />
    </svg>
  )
}

function RawModeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6M1 12h6m6 0h6" />
    </svg>
  )
}

function TextRenderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  )
}

function PhotoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

function CreativeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function PromptIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="10" x2="15" y2="10" />
    </svg>
  )
}

export function ImageModelSelector({
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
  const currentModel = imageModels.find((m) => m.id === selectedModel) || imageModels[0]
  const displayModel = hoveredModel ? imageModels.find((m) => m.id === hoveredModel) || currentModel : currentModel

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
              <span className="font-medium">Default image model</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {imageModels.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onSelectModel(model.id)
                  onClose()
                }}
                onMouseEnter={() => setHoveredModel(model.id)}
                onMouseLeave={() => setHoveredModel(null)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors ${
                  model.id === selectedModel
                    ? "bg-muted"
                    : hoveredModel === model.id
                      ? "bg-muted/50"
                      : "hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground">{getProviderLogo(model.provider)}</div>
                  <span className="text-sm font-normal">{model.name}</span>
                </div>
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
              <span className="text-muted-foreground">Resolution:</span>
              <span className="font-medium">{displayModel.resolution}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Speed:</span>
              <span className="font-medium text-green-600">{displayModel.speed}</span>
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

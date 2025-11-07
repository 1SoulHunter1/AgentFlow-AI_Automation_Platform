"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Text models from dashboard
const textModels = [
  { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5", provider: "Anthropic" },
  { id: "claude-sonnet-4.5-reasoning", name: "Claude Sonnet 4.5 Reasoning", provider: "Anthropic" },
  { id: "claude-sonnet-4", name: "Claude Sonnet 4", provider: "Anthropic" },
  { id: "claude-sonnet-4-reasoning", name: "Claude Sonnet 4 Reasoning", provider: "Anthropic" },
  { id: "claude-sonnet-3.7", name: "Claude Sonnet 3.7", provider: "Anthropic" },
  { id: "claude-sonnet-3.5", name: "Claude Sonnet 3.5", provider: "Anthropic" },
  { id: "gpt-5-thinking", name: "GPT-5 Thinking", provider: "OpenAI" },
  { id: "gpt-5", name: "GPT-5", provider: "OpenAI" },
  { id: "gpt-5-mini", name: "GPT-5 Mini", provider: "OpenAI" },
  { id: "gpt-4.1", name: "GPT-4.1", provider: "OpenAI" },
  { id: "gpt-4.1-mini", name: "GPT-4.1 Mini", provider: "OpenAI" },
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", provider: "Google" },
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "Google" },
]

// Image models from dashboard
const imageModels = [
  { id: "flux-1.1-pro-ultra", name: "FLUX1.1 [pro] Ultra", provider: "FLUX" },
  { id: "flux-1-kontext", name: "FLUX.1 Kontext", provider: "FLUX" },
  { id: "imagen-4", name: "Imagen 4", provider: "Google" },
  { id: "imagen-4-fast", name: "Imagen 4 Fast", provider: "Google" },
  { id: "dall-e-3", name: "DALL-E 3", provider: "OpenAI" },
]

// Embedding models
const embeddingModels = [
  { id: "ada-v2", name: "Ada v2", provider: "OpenAI" },
  { id: "text-embedding-3-small", name: "Text Embedding 3 Small", provider: "OpenAI" },
  { id: "text-embedding-3-large", name: "Text Embedding 3 Large", provider: "OpenAI" },
]

export default function ModelsPage() {
  const [defaultModel, setDefaultModel] = useState("claude-sonnet-4.5")
  const [imageModel, setImageModel] = useState("flux-1-kontext")
  const [embeddingModel, setEmbeddingModel] = useState("ada-v2")
  const [enabledModels, setEnabledModels] = useState<Record<string, boolean>>(
    textModels.reduce((acc, model) => ({ ...acc, [model.id]: true }), {}),
  )

  const toggleModel = (modelId: string) => {
    setEnabledModels((prev) => ({ ...prev, [modelId]: !prev[modelId] }))
  }

  // Group models by provider
  const modelsByProvider = textModels.reduce(
    (acc, model) => {
      if (!acc[model.provider]) acc[model.provider] = []
      acc[model.provider].push(model)
      return acc
    },
    {} as Record<string, typeof textModels>,
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Models</h1>
        <p className="text-sm text-muted-foreground mt-1">Select the models you allow in your workspace</p>
      </div>

      {/* Default model */}
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Label className="text-base font-medium">Default model</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Set the default model for every new chat. A member can override this by setting their personal default
              model in the account settings.
            </p>
          </div>
          <Select value={defaultModel} onValueChange={setDefaultModel}>
            <SelectTrigger className="w-[240px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {textModels.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Image generation model */}
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Label className="text-base font-medium">Image generation model</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Set the default model for image generation for your workspace. A member can override this by setting their
              personal default model in the account settings.
            </p>
          </div>
          <Select value={imageModel} onValueChange={setImageModel}>
            <SelectTrigger className="w-[240px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {imageModels.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Embedding model */}
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Label className="text-base font-medium">Embedding model</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Set the standard model for the embeddings for the application. Currently, only models with an embedding
              size of 1536 can be used as the default model, e.g. 'text-embedding-ada-002' from OpenAI.
            </p>
          </div>
          <Select value={embeddingModel} onValueChange={setEmbeddingModel}>
            <SelectTrigger className="w-[240px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {embeddingModels.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Available models by provider */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium">Available models</h2>
          <p className="text-sm text-muted-foreground mt-1">Enable or disable models for your workspace members</p>
        </div>

        {Object.entries(modelsByProvider).map(([provider, models]) => (
          <Card key={provider} className="p-6">
            <h3 className="text-base font-medium mb-4">{provider}</h3>
            <div className="space-y-3">
              {models.map((model) => (
                <div
                  key={model.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-xs font-medium">
                      {provider === "Anthropic" ? "A" : provider === "OpenAI" ? "O" : "G"}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{model.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {provider} {model.id.includes("reasoning") ? "• Reasoning" : ""}
                      </p>
                    </div>
                  </div>
                  <Switch checked={enabledModels[model.id]} onCheckedChange={() => toggleModel(model.id)} />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

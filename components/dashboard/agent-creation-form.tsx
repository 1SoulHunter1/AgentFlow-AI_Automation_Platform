"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Plus, Upload, Mic, Maximize2 } from "lucide-react"
import { ActionSelectorModal } from "./action-selector-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AgentCreationForm() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [instructions, setInstructions] = useState("")
  const [conversationStarters, setConversationStarters] = useState("")
  const [creativity, setCreativity] = useState([0.7])
  const [selectedModel, setSelectedModel] = useState("gpt-4.1")
  const [showActionSelector, setShowActionSelector] = useState(false)
  const [selectedActions, setSelectedActions] = useState<string[]>([])

  const integrationIcons = [
    { name: "Web", icon: "🌐", color: "bg-blue-100" },
    { name: "Checkmark", icon: "✓", color: "bg-blue-600 text-white" },
    { name: "Stripe", icon: "💳", color: "bg-purple-100" },
    { name: "Zoom", icon: "📹", color: "bg-blue-500 text-white" },
    { name: "Teams", icon: "👥", color: "bg-purple-600 text-white" },
    { name: "Slack", icon: "💬", color: "bg-black text-white" },
    { name: "Calendar", icon: "📅", color: "bg-white border" },
    { name: "GitHub", icon: "🐙", color: "bg-black text-white" },
    { name: "Cloud", icon: "☁️", color: "bg-blue-400 text-white" },
    { name: "Timer", icon: "⏱️", color: "bg-blue-500 text-white" },
    { name: "Code", icon: "💻", color: "bg-gray-200" },
    { name: "Datadog", icon: "🐶", color: "bg-purple-600 text-white" },
    { name: "Teams2", icon: "👥", color: "bg-blue-600 text-white" },
    { name: "AWS", icon: "☁️", color: "bg-orange-500 text-white" },
    { name: "Azure", icon: "☁️", color: "bg-blue-600 text-white" },
    { name: "Notion", icon: "📝", color: "bg-white border" },
    { name: "Stripe2", icon: "💳", color: "bg-black text-white" },
    { name: "GitHub2", icon: "🐙", color: "bg-gray-800 text-white" },
    { name: "Shield", icon: "🛡️", color: "bg-gray-200" },
  ]

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Main Content - Left Side */}
      <div className="flex-1 overflow-y-auto border-r">
        <div className="max-w-3xl mx-auto p-8 space-y-8">
          {/* Avatar Upload */}
          <div className="flex justify-center">
            <button className="h-20 w-20 rounded-full border-2 border-dashed border-muted-foreground/30 hover:border-muted-foreground/50 flex items-center justify-center transition-colors">
              <Plus className="h-8 w-8 text-muted-foreground/50" />
            </button>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Name your assistant"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="A short description of your assistant, displayed in the chat."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="instructions">Instructions</Label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                Learn more
              </a>
            </div>
            <p className="text-sm text-muted-foreground">The instructions that your assistant will follow.</p>
            <div className="relative">
              <Textarea
                id="instructions"
                placeholder="What does this assistant do? How should it behave? What should it avoid doing?"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="min-h-[200px] resize-none pr-20"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 bg-transparent">
                    <svg
                      className="h-3.5 w-3.5 mr-1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                    Optimize
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Conversation Starters */}
          <div className="space-y-2">
            <Label htmlFor="starters">Conversation starters</Label>
            <Input
              id="starters"
              placeholder="Example for users to start the conversation"
              value={conversationStarters}
              onChange={(e) => setConversationStarters(e.target.value)}
              className="h-11"
            />
          </div>

          {/* Knowledge */}
          <div className="space-y-3">
            <Label>Knowledge</Label>
            <p className="text-sm text-muted-foreground">Directly attach files to the assistant as knowledge.</p>
            <div className="border-2 border-dashed rounded-lg p-8">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <span className="text-xl">📄</span>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                    <span className="text-xl">📕</span>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <span className="text-xl">📊</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Attach
                  </Button>
                  <span className="text-sm text-muted-foreground">or drag and drop files here</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Label>Actions</Label>
            <p className="text-sm text-muted-foreground">
              Add actions that your assistant can perform. External tools, web search, knowledge folders, and more.
            </p>
            <div className="border rounded-lg p-6">
              <div className="grid grid-cols-10 gap-3 mb-4">
                {integrationIcons.map((integration, idx) => (
                  <button
                    key={idx}
                    className={`h-10 w-10 rounded-lg ${integration.color} flex items-center justify-center text-lg hover:opacity-80 transition-opacity`}
                    title={integration.name}
                  >
                    {integration.icon}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
                onClick={() => setShowActionSelector(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add action
              </Button>
            </div>
          </div>

          {/* Model */}
          <div className="space-y-3">
            <Label>Model</Label>
            <p className="text-sm text-muted-foreground">Select the model that should power your assistant.</p>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-orange-100 flex items-center justify-center">
                    <span className="text-xs font-semibold text-orange-700">AI</span>
                  </div>
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4.1">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded bg-orange-100 flex items-center justify-center">
                      <span className="text-xs font-semibold text-orange-700">AI</span>
                    </div>
                    <span>GPT-4.1</span>
                  </div>
                </SelectItem>
                <SelectItem value="claude-sonnet-4.5">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded bg-orange-100 flex items-center justify-center">
                      <span className="text-xs font-semibold text-orange-700">AI</span>
                    </div>
                    <span>Claude Sonnet 4.5</span>
                  </div>
                </SelectItem>
                <SelectItem value="grok-4">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded bg-orange-100 flex items-center justify-center">
                      <span className="text-xs font-semibold text-orange-700">AI</span>
                    </div>
                    <span>Grok 4</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Creativity */}
          <div className="space-y-4">
            <Label>Creativity</Label>
            <p className="text-sm text-muted-foreground">
              Define how creative the model should be. We recommend 0.7 for assistants without attached knowledge and
              0.3 with attached knowledge.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="px-3 py-1 rounded border bg-background text-sm font-medium">
                  {creativity[0].toFixed(1)}
                </div>
              </div>
              <Slider value={creativity} onValueChange={setCreativity} min={0} max={1} step={0.1} className="w-full" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Deterministic</span>
                <span>Creative</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Panel - Right Side */}
      <div className="w-[500px] bg-muted/20 flex flex-col">
        <div className="border-b px-6 py-4">
          <h3 className="text-sm font-medium text-muted-foreground">Preview:</h3>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-1">{name || "Untitled Assistant"}</h2>
          <p className="text-sm text-muted-foreground">By Shashank Singh</p>
        </div>
        <div className="border-t p-4">
          <div className="relative">
            <Input placeholder="Ask assistant..." className="pr-20" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Mic className="h-4 w-4" />
              </Button>
              <Button size="icon" className="h-8 w-8 rounded-full bg-foreground hover:bg-foreground/90">
                <svg className="h-4 w-4 text-background" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Selector Modal */}
      <ActionSelectorModal
        open={showActionSelector}
        onOpenChange={setShowActionSelector}
        selectedActions={selectedActions}
        onSelectAction={(actionId) => {
          setSelectedActions([...selectedActions, actionId])
        }}
      />
    </div>
  )
}

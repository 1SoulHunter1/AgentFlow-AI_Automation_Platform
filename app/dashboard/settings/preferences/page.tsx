"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, ImageIcon, BarChart3, PenTool, Brain, X, Monitor, Sun, Moon } from "lucide-react"

export default function PreferencesPage() {
  const [defaultModel, setDefaultModel] = useState<string>("none")
  const [imageModel, setImageModel] = useState<string>("imagen-4")
  const [language, setLanguage] = useState<string>("english")
  const [theme, setTheme] = useState<string>("system")

  const [capabilities, setCapabilities] = useState({
    webSearch: true,
    imageGeneration: true,
    dataAnalyst: true,
    canvas: true,
    chatMemory: false,
  })

  const toggleCapability = (key: keyof typeof capabilities) => {
    setCapabilities((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const clearImageModel = () => {
    setImageModel("none")
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Preferences</h1>
        <p className="text-sm text-muted-foreground">Customize your experience</p>
      </div>

      <div className="space-y-8">
        {/* Default model */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Label className="text-base font-medium">Default model</Label>
              <p className="text-sm text-muted-foreground mt-1">Will be preselected whenever you start a new chat!</p>
            </div>
            <Select value={defaultModel} onValueChange={setDefaultModel}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="claude-sonnet">Claude 4.5 Sonnet</SelectItem>
                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Default image generation model */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Label className="text-base font-medium">Default image generation model</Label>
              <p className="text-sm text-muted-foreground mt-1">
                The image generation model used when generating an image from the chat
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={imageModel} onValueChange={setImageModel}>
                <SelectTrigger className="w-[200px]">
                  <div className="flex items-center gap-2">
                    {imageModel !== "none" && (
                      <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                        G
                      </div>
                    )}
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="imagen-4">Imagen 4</SelectItem>
                  <SelectItem value="imagen-4-fast">Imagen 4 Fast</SelectItem>
                  <SelectItem value="flux-ultra">FLUX1.1 [pro] Ultra</SelectItem>
                  <SelectItem value="dall-e-3">DALL-E 3</SelectItem>
                </SelectContent>
              </Select>
              {imageModel !== "none" && (
                <Button variant="ghost" size="icon" onClick={clearImageModel} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Chat capabilities */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4">
            <Label className="text-base font-medium">Chat capabilities</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Enable additional features for your experience in the regular chat (does not apply to assistant chats)
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 text-sm font-medium">Web search</span>
              <Checkbox checked={capabilities.webSearch} onCheckedChange={() => toggleCapability("webSearch")} />
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <ImageIcon className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 text-sm font-medium">Image generation</span>
              <Checkbox
                checked={capabilities.imageGeneration}
                onCheckedChange={() => toggleCapability("imageGeneration")}
              />
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 text-sm font-medium">Data analyst</span>
              <Checkbox checked={capabilities.dataAnalyst} onCheckedChange={() => toggleCapability("dataAnalyst")} />
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <PenTool className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 text-sm font-medium">Canvas</span>
              <Checkbox checked={capabilities.canvas} onCheckedChange={() => toggleCapability("canvas")} />
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <Brain className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 text-sm font-medium">Chat memory</span>
              <Checkbox checked={capabilities.chatMemory} onCheckedChange={() => toggleCapability("chatMemory")} />
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Label className="text-base font-medium">Language</Label>
              <p className="text-sm text-muted-foreground mt-1">Select your preferred language</p>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="chinese">Chinese</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Theme */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4">
            <Label className="text-base font-medium">Theme</Label>
            <p className="text-sm text-muted-foreground mt-1">Select your preferred theme</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* System theme */}
            <button
              onClick={() => setTheme("system")}
              className={`relative rounded-lg border-2 transition-all ${
                theme === "system" ? "border-primary shadow-md" : "border-border hover:border-muted-foreground"
              }`}
            >
              <div className="p-4">
                <div className="aspect-video rounded-md bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 mb-3 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <div className="w-4 h-4 rounded bg-white dark:bg-gray-900" />
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Monitor className="h-4 w-4" />
                  <span className="text-sm font-medium">System (default)</span>
                </div>
              </div>
            </button>

            {/* Light theme */}
            <button
              onClick={() => setTheme("light")}
              className={`relative rounded-lg border-2 transition-all ${
                theme === "light" ? "border-primary shadow-md" : "border-border hover:border-muted-foreground"
              }`}
            >
              <div className="p-4">
                <div className="aspect-video rounded-md bg-gradient-to-br from-white to-gray-100 mb-3 flex items-center justify-center border border-gray-200">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                    <div className="w-4 h-4 rounded bg-white" />
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Sun className="h-4 w-4" />
                  <span className="text-sm font-medium">Light</span>
                </div>
              </div>
            </button>

            {/* Dark theme */}
            <button
              onClick={() => setTheme("dark")}
              className={`relative rounded-lg border-2 transition-all ${
                theme === "dark" ? "border-primary shadow-md" : "border-border hover:border-muted-foreground"
              }`}
            >
              <div className="p-4">
                <div className="aspect-video rounded-md bg-gradient-to-br from-gray-900 to-black mb-3 flex items-center justify-center border border-gray-800">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                    <div className="w-4 h-4 rounded bg-gray-900" />
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Moon className="h-4 w-4" />
                  <span className="text-sm font-medium">Dark</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

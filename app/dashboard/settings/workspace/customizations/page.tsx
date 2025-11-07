"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Upload, Plus, X } from "lucide-react"

export default function CustomizationsPage() {
  const [customColor, setCustomColor] = useState("#4469FC")
  const [showWorkspaceLogo, setShowWorkspaceLogo] = useState(true)
  const [hideModelLogo, setHideModelLogo] = useState(false)
  const [workspaceTagline, setWorkspaceTagline] = useState("")
  const [chatDisclaimer, setChatDisclaimer] = useState("")
  const [promptRecommendation, setPromptRecommendation] = useState("")
  const [agentDisclaimer, setAgentDisclaimer] = useState("")
  const [infoBoxes, setInfoBoxes] = useState<string[]>([])

  const handleAddInfoBox = () => {
    if (infoBoxes.length < 3) {
      setInfoBoxes([...infoBoxes, ""])
    }
  }

  const handleRemoveInfoBox = (index: number) => {
    setInfoBoxes(infoBoxes.filter((_, i) => i !== index))
  }

  const handleInfoBoxChange = (index: number, value: string) => {
    const newInfoBoxes = [...infoBoxes]
    newInfoBoxes[index] = value
    setInfoBoxes(newInfoBoxes)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Customizations</h1>
        <p className="text-muted-foreground mt-1">
          Customize your workspace to match your brand and legal requirements
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom color</CardTitle>
          <CardDescription>Main color for buttons and highlights in your workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="h-10 w-10 rounded border cursor-pointer"
              />
            </div>
            <Input
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              placeholder="#4469FC"
              className="max-w-[200px]"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Background image</CardTitle>
          <CardDescription>Upload a custom default background image for the home screen.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload image
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Show workspace logo in new chat</CardTitle>
          <CardDescription>
            Controls whether to show or hide the logo and name of the workspace when starting a new chat.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Switch checked={showWorkspaceLogo} onCheckedChange={setShowWorkspaceLogo} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workspace Tagline</CardTitle>
          <CardDescription>A short tagline for your workspace, displayed in the chat.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            value={workspaceTagline}
            onChange={(e) => setWorkspaceTagline(e.target.value)}
            placeholder="e.g. Welcome to our workspace!"
          />
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Chat settings</h2>

        <Card>
          <CardHeader>
            <CardTitle>Hide model logo in chat</CardTitle>
            <CardDescription>Hide the model logo in chat responses and show workspace logo instead</CardDescription>
          </CardHeader>
          <CardContent>
            <Switch checked={hideModelLogo} onCheckedChange={setHideModelLogo} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chat Disclaimer</CardTitle>
            <CardDescription>
              Will be displayed below every prompt input field, frequently contains legal disclaimer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={chatDisclaimer}
              onChange={(e) => setChatDisclaimer(e.target.value)}
              placeholder="e.g. Please do not share personal data in this chat"
              rows={3}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add prompt recommendations</CardTitle>
            <CardDescription>
              Add up to 20 prompt recommendations which will be randomly displayed above the prompt input field in the
              chat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              value={promptRecommendation}
              onChange={(e) => setPromptRecommendation(e.target.value)}
              placeholder="e.g. Help me writing an email for our sales team"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add custom info boxes</CardTitle>
            <CardDescription>
              Add up to 3 custom info boxes that will be displayed next to the prompt input bar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {infoBoxes.map((box, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={box}
                  onChange={(e) => handleInfoBoxChange(index, e.target.value)}
                  placeholder={`Info box ${index + 1}`}
                />
                <Button variant="ghost" size="icon" onClick={() => handleRemoveInfoBox(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {infoBoxes.length < 3 && (
              <Button variant="outline" onClick={handleAddInfoBox}>
                <Plus className="h-4 w-4 mr-2" />
                Add info box
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Agent settings</h2>

        <Card>
          <CardHeader>
            <CardTitle>Agent sharing disclaimer</CardTitle>
            <CardDescription>
              Will be displayed on the agent sharing pop-up, can contain links in Markdown format.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={agentDisclaimer}
              onChange={(e) => setAgentDisclaimer(e.target.value)}
              placeholder="e.g. I confirm that I agree to the [Agent sharing terms](https://example.com/terms)"
              rows={4}
              className="font-mono text-sm"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Globe, ImageIcon, BarChart3, PenTool } from "lucide-react"

export default function AgentsSettingsPage() {
  const [generalAccess, setGeneralAccess] = useState(true)
  const [allowWebSearch, setAllowWebSearch] = useState(true)
  const [allowImageGeneration, setAllowImageGeneration] = useState(true)
  const [allowDataAnalyst, setAllowDataAnalyst] = useState(true)
  const [allowCanvas, setAllowCanvas] = useState(true)
  const [shareUserInfo, setShareUserInfo] = useState(true)
  const [restrictSourceAccess, setRestrictSourceAccess] = useState(false)
  const [allowAgentLogs, setAllowAgentLogs] = useState(false)

  // Default capabilities for newly created agents
  const [defaultWebSearch, setDefaultWebSearch] = useState(false)
  const [defaultImageGeneration, setDefaultImageGeneration] = useState(false)
  const [defaultDataAnalyst, setDefaultDataAnalyst] = useState(false)
  const [defaultCanvas, setDefaultCanvas] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Agents</h1>
        <p className="text-sm text-muted-foreground mt-1">Customize agents for your workspace</p>
      </div>

      <div className="space-y-6">
        {/* General access */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="general-access" className="text-base font-medium text-foreground">
              General access
            </Label>
            <p className="text-sm text-muted-foreground mt-1">Everyone in your workspace can use agents</p>
          </div>
          <Switch id="general-access" checked={generalAccess} onCheckedChange={setGeneralAccess} />
        </div>

        {/* Allow web search */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="web-search" className="text-base font-medium text-foreground">
              Allow web search
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              When enabled, the model is able to search the web for information. This can improve the quality of the
              responses, especially for factual or news related questions.
            </p>
          </div>
          <Switch id="web-search" checked={allowWebSearch} onCheckedChange={setAllowWebSearch} />
        </div>

        {/* Allow image generation */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="image-generation" className="text-base font-medium text-foreground">
              Allow image generation
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              When enabled, the model is able to generate images. This can improve the quality of the responses,
              especially for creative tasks.
            </p>
          </div>
          <Switch id="image-generation" checked={allowImageGeneration} onCheckedChange={setAllowImageGeneration} />
        </div>

        {/* Allow data analyst */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="data-analyst" className="text-base font-medium text-foreground">
              Allow data analyst
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              When enabled, the model is able to execute code in a stateless sandbox environment. This allows users to
              analyse data or run simple scripts.
            </p>
          </div>
          <Switch id="data-analyst" checked={allowDataAnalyst} onCheckedChange={setAllowDataAnalyst} />
        </div>

        {/* Allow canvas */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="canvas" className="text-base font-medium text-foreground">
              Allow canvas
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              When enabled, users can add the canvas tool to their agents. This allows them to create and edit documents
              and code in the chat.
            </p>
          </div>
          <Switch id="canvas" checked={allowCanvas} onCheckedChange={setAllowCanvas} />
        </div>

        {/* Share user info by default */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="share-user-info" className="text-base font-medium text-foreground">
              Share user info by default in agent feedback
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              When enabled, user name and email will be shared with the agent creator by default when providing
              feedback. Users can still opt out of sharing their user info.
            </p>
          </div>
          <Switch id="share-user-info" checked={shareUserInfo} onCheckedChange={setShareUserInfo} />
        </div>

        {/* Allow restriction of source access */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="restrict-source" className="text-base font-medium text-foreground">
              Allow restriction of source access
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              By default, users can click and open the sources in the responses. When you enable this option, agent
              creators can limit access to the source knowledge, so that users can only see the reference to a source,
              but can't open it.
            </p>
          </div>
          <Switch id="restrict-source" checked={restrictSourceAccess} onCheckedChange={setRestrictSourceAccess} />
        </div>

        {/* Allow agent logs */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="agent-logs" className="text-base font-medium text-foreground">
              Allow agent logs
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              When enabled, agent editors can set up logging for their agents via external providers, giving them
              detailed insights into the agent's behavior and performance. In the roles settings, you can define which
              roles should be allowed to set up logging.
            </p>
          </div>
          <Switch id="agent-logs" checked={allowAgentLogs} onCheckedChange={setAllowAgentLogs} />
        </div>

        {/* Default capabilities section */}
        <div className="pt-6">
          <div className="mb-4">
            <h2 className="text-base font-medium text-foreground">Default capabilities</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Configure which capabilities are enabled by default for newly created agents
            </p>
          </div>

          <div className="space-y-4">
            {/* Web search */}
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="default-web-search" className="text-sm font-normal text-foreground">
                  Web search
                </Label>
              </div>
              <Switch id="default-web-search" checked={defaultWebSearch} onCheckedChange={setDefaultWebSearch} />
            </div>

            {/* Image generation */}
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="default-image-gen" className="text-sm font-normal text-foreground">
                  Image generation
                </Label>
              </div>
              <Switch
                id="default-image-gen"
                checked={defaultImageGeneration}
                onCheckedChange={setDefaultImageGeneration}
              />
            </div>

            {/* Data analyst */}
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="default-data-analyst" className="text-sm font-normal text-foreground">
                  Data analyst
                </Label>
              </div>
              <Switch id="default-data-analyst" checked={defaultDataAnalyst} onCheckedChange={setDefaultDataAnalyst} />
            </div>

            {/* Canvas */}
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <PenTool className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="default-canvas" className="text-sm font-normal text-foreground">
                  Canvas
                </Label>
              </div>
              <Switch id="default-canvas" checked={defaultCanvas} onCheckedChange={setDefaultCanvas} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

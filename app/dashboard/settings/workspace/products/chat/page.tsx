"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function ChatSettingsPage() {
  const [generalAccess, setGeneralAccess] = useState(true)
  const [specificMembers, setSpecificMembers] = useState(false)
  const [webSearch, setWebSearch] = useState(true)
  const [imageGeneration, setImageGeneration] = useState(true)
  const [dataAnalyst, setDataAnalyst] = useState(true)
  const [canvas, setCanvas] = useState(true)
  const [chatSharing, setChatSharing] = useState(true)
  const [chatMemory, setChatMemory] = useState(true)
  const [memoryForAll, setMemoryForAll] = useState(false)
  const [dataRetention, setDataRetention] = useState("forever")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Chat</h1>
        <p className="text-sm text-muted-foreground mt-1">Customize chat for your workspace</p>
      </div>

      <div className="space-y-6">
        {/* General access */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="general-access" className="text-base font-medium">
              General access
            </Label>
            <p className="text-sm text-muted-foreground mt-1">Everyone in your workspace can use chat</p>
          </div>
          <Switch id="general-access" checked={generalAccess} onCheckedChange={setGeneralAccess} />
        </div>

        {/* Allow specific members */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="specific-members" className="text-base font-medium">
              Allow specific members or groups to use chat
            </Label>
            <p className="text-sm text-muted-foreground mt-1">Only specific members can use chat</p>
          </div>
          <Switch id="specific-members" checked={specificMembers} onCheckedChange={setSpecificMembers} />
        </div>

        {/* Allow web search */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="web-search" className="text-base font-medium">
              Allow web search
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              When enabled, the model is able to search the web for information. This can improve the quality of the
              responses, especially for factual or news related questions.
            </p>
          </div>
          <Switch id="web-search" checked={webSearch} onCheckedChange={setWebSearch} />
        </div>

        {/* Allow image generation */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="image-generation" className="text-base font-medium">
              Allow image generation
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              When enabled, the model is able to generate images. This can improve the quality of the responses,
              especially for creative tasks.
            </p>
          </div>
          <Switch id="image-generation" checked={imageGeneration} onCheckedChange={setImageGeneration} />
        </div>

        {/* Allow data analyst */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="data-analyst" className="text-base font-medium">
              Allow data analyst
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              When enabled, the model is able to execute code in a stateless sandbox environment. This allows users to
              analyse data or run simple scripts.
            </p>
          </div>
          <Switch id="data-analyst" checked={dataAnalyst} onCheckedChange={setDataAnalyst} />
        </div>

        {/* Allow canvas */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="canvas" className="text-base font-medium">
              Allow canvas
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              When enabled, users can add the canvas tool to their agents. This allows them to create and edit documents
              and code in the chat.
            </p>
          </div>
          <Switch id="canvas" checked={canvas} onCheckedChange={setCanvas} />
        </div>

        {/* Allow chat sharing */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="chat-sharing" className="text-base font-medium">
              Allow chat sharing
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              When enabled, users can share their chats with others in the workspace.
            </p>
          </div>
          <Switch id="chat-sharing" checked={chatSharing} onCheckedChange={setChatSharing} />
        </div>

        {/* Allow chat memory */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="chat-memory" className="text-base font-medium">
              Allow chat memory
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              When enabled, users can turn on memory in their chats. This gives the model the ability to save specific
              user information in their context window. These details are not shared with other users. Learn more about
              memory in our{" "}
              <Link href="#" className="text-primary hover:underline">
                documentation
              </Link>
              .
            </p>
          </div>
          <Switch id="chat-memory" checked={chatMemory} onCheckedChange={setChatMemory} />
        </div>

        {/* Enable memory for all users */}
        <div className="flex items-start justify-between gap-4 py-4 border-b">
          <div className="flex-1">
            <Label htmlFor="memory-all" className="text-base font-medium">
              Enable memory for all users
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              When enabled, memory will be automatically enabled for all users in the workspace, when disabled the last
              selection of the respective user will be respected.
            </p>
          </div>
          <Switch id="memory-all" checked={memoryForAll} onCheckedChange={setMemoryForAll} />
        </div>

        {/* Data retention */}
        <div className="flex items-start justify-between gap-4 py-4">
          <div className="flex-1">
            <Label htmlFor="data-retention" className="text-base font-medium">
              Data retention
            </Label>
            <p className="text-sm text-muted-foreground mt-1">Configure how long messages and chats should be saved</p>
          </div>
          <Select value={dataRetention} onValueChange={setDataRetention}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 Days</SelectItem>
              <SelectItem value="30days">30 Days</SelectItem>
              <SelectItem value="90days">90 Days</SelectItem>
              <SelectItem value="12months">12 Months</SelectItem>
              <SelectItem value="forever">Forever</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

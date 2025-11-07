"use client"

import { useState } from "react"
import { Search, Plus, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { AgentConfigModal } from "./agent-config-modal"

interface Agent {
  id: string
  name: string
  description: string
  author: string
  messages: number
  isPrivate: boolean
}

interface AgentTemplate {
  id: string
  name: string
  description: string
  category: string
  gradient: string
  icon: string
  inputType: string
  instructions: string
  conversationStarters: string[]
  tools: string[]
  defaultModel: string
}

const recommendedTemplates: AgentTemplate[] = [
  {
    id: "research-assistant",
    name: "Research Assistant",
    description: "Conducts comprehensive research using web search, analyzes findings, and creates detailed reports",
    category: "Productivity",
    gradient: "from-blue-600 via-indigo-500 to-purple-500",
    icon: "🔍",
    inputType: "text",
    instructions:
      "You are a Research Assistant agent powered by Tavily web search. Help users research topics, gather information from reliable sources, analyze findings, and create comprehensive reports. Provide citations and summarize key insights.",
    conversationStarters: [
      "Research the latest trends in AI",
      "Find competitive analysis for SaaS products",
      "Summarize recent developments in renewable energy",
      "What are the best practices for remote work?",
    ],
    tools: ["Tavily Search", "Notion", "Google Drive"],
    defaultModel: "Claude Sonnet 4.5",
  },
  {
    id: "visual-content-creator",
    name: "Visual Content Creator",
    description: "Generates stunning images and visual content for marketing, social media, and presentations",
    category: "Marketing",
    gradient: "from-pink-500 via-rose-400 to-orange-400",
    icon: "🎨",
    inputType: "text",
    instructions:
      "You are a Visual Content Creator agent powered by fal.ai image generation. Help users create professional images, marketing visuals, social media graphics, and presentation assets. Generate high-quality images based on detailed descriptions.",
    conversationStarters: [
      "Create a hero image for my landing page",
      "Generate social media graphics for product launch",
      "Design a professional presentation background",
      "Create marketing visuals for email campaign",
    ],
    tools: ["fal.ai", "Canva", "Figma"],
    defaultModel: "Claude Sonnet 4.5",
  },
  {
    id: "workflow-automation",
    name: "Workflow Automation Expert",
    description: "Automates tasks across 100+ tools including Slack, Gmail, Notion, Jira, and more",
    category: "Operations",
    gradient: "from-emerald-600 via-teal-500 to-cyan-500",
    icon: "⚡",
    inputType: "text",
    instructions:
      "You are a Workflow Automation Expert agent powered by Composio. Help users automate repetitive tasks, connect multiple tools, set up workflows, and streamline operations across platforms like Slack, Gmail, Notion, Jira, and 100+ other tools.",
    conversationStarters: [
      "Automate my daily standup reports",
      "Set up notifications for new emails",
      "Create a workflow to sync tasks between tools",
      "Schedule recurring team updates",
    ],
    tools: ["Composio", "Slack", "Gmail", "Notion", "Jira", "Microsoft Teams"],
    defaultModel: "Claude Sonnet 4.5",
  },
]

export function AgentsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "created" | "shared">("all")
  const [sortBy, setSortBy] = useState("most-used")
  const [selectedAgent, setSelectedAgent] = useState<AgentTemplate | null>(null)
  const [showAgentModal, setShowAgentModal] = useState(false)

  const agents: Agent[] = [
    {
      id: "1",
      name: "Untitled Agent",
      description: "No description",
      author: "Shashank Singh (You)",
      messages: 2,
      isPrivate: true,
    },
  ]

  const filteredAgents = agents.filter((agent) => agent.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleTemplateClick = (template: AgentTemplate) => {
    setSelectedAgent(template)
    setShowAgentModal(true)
  }

  const handleUseTemplate = (agent: AgentTemplate) => {
    console.log("[v0] Using template:", agent.name)
    setShowAgentModal(false)
    // TODO: Navigate to agent creation with template
  }

  const handleDuplicate = (agent: AgentTemplate) => {
    console.log("[v0] Duplicating agent:", agent.name)
    setShowAgentModal(false)
    // TODO: Create a copy of the agent
  }

  const handleChat = (agent: AgentTemplate) => {
    console.log("[v0] Starting chat with agent:", agent.name)
    setShowAgentModal(false)
    // TODO: Navigate to chat with this agent
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-background">
      <div className="w-full max-w-5xl px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <h1 className="text-3xl font-semibold flex-1">Agents</h1>
            <div className="flex-1 flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Create agent
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="cursor-pointer py-2.5">
                    <Plus className="mr-3 h-4 w-4" />
                    <span>Start from scratch</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer py-2.5">
                    <Link href="/dashboard/assistants/templates" className="flex items-center">
                      <svg
                        className="mr-3 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                      <span>Use template</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            Pre-configured chat templates that combine custom instructions, knowledge, and skills. See all agents you
            have access to below.
          </p>
        </div>

        {/* Recommended Templates */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Recommended templates</h2>
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/assistants/templates"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                View all
              </Link>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateClick(template)}
                className="rounded-lg overflow-hidden border border-border hover:border-foreground/20 transition-colors cursor-pointer text-left"
              >
                <div className={`h-24 bg-gradient-to-br ${template.gradient} flex items-center justify-center`}>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
                    {template.icon}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1">{template.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search agents"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-background border border-border text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("created")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "created"
                  ? "bg-background border border-border text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Created by you
            </button>
            <button
              onClick={() => setActiveTab("shared")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "shared"
                  ? "bg-background border border-border text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Shared with you
            </button>
            <span className="text-sm text-muted-foreground ml-2">1 Agent</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Most used
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("most-used")}>Most used</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("recently-created")}>Recently created</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("alphabetical")}>Alphabetical</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Agents List */}
        <div className="space-y-3">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-foreground/20 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium mb-1">{agent.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {agent.description}
                  <span className="mx-2">•</span>
                  By {agent.author}
                  <span className="mx-2">•</span>
                  {agent.messages}+ Messages
                  <span className="mx-2">•</span>
                  <span className="inline-flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                    </svg>
                    {agent.isPrivate ? "Private" : "Public"}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mr-1.5"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AgentConfigModal
        agent={selectedAgent}
        open={showAgentModal}
        onOpenChange={setShowAgentModal}
        onUseTemplate={handleUseTemplate}
        onDuplicate={handleDuplicate}
        onChat={handleChat}
      />
    </div>
  )
}

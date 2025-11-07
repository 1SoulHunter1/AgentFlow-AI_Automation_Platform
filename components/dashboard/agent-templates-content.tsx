"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AgentConfigModal } from "./agent-config-modal"

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

const agentTemplates: AgentTemplate[] = [
  // Product Category
  {
    id: "product-roadmap",
    name: "Product Roadmap Manager",
    description: "Manage product roadmaps, track features, and coordinate with teams using Jira and Confluence",
    category: "Product",
    gradient: "from-blue-500 to-cyan-500",
    icon: "📋",
    inputType: "text",
    instructions:
      "You are a Product Roadmap Manager agent. Help users plan and track product features, create roadmaps, sync with Jira for task management, and document decisions in Confluence. Provide insights on feature prioritization and timeline management.",
    conversationStarters: [
      "Show me the current product roadmap",
      "Create a new feature in Jira",
      "What are the upcoming milestones?",
      "Update the product documentation in Confluence",
    ],
    tools: ["Jira", "Confluence", "Notion"],
    defaultModel: "Claude Sonnet 4.5",
  },
  {
    id: "user-feedback",
    name: "User Feedback Analyzer",
    description: "Collect and analyze user feedback from Zendesk, Salesforce, and other channels",
    category: "Product",
    gradient: "from-purple-500 to-pink-500",
    icon: "💬",
    inputType: "text",
    instructions:
      "You are a User Feedback Analyzer agent. Help users collect, categorize, and analyze customer feedback from multiple sources. Identify trends, prioritize issues, and generate actionable insights for product improvements.",
    conversationStarters: [
      "Summarize recent customer feedback",
      "What are the top feature requests?",
      "Show me critical issues from Zendesk",
      "Analyze sentiment trends this month",
    ],
    tools: ["Zendesk", "Salesforce", "Airtable"],
    defaultModel: "Claude Sonnet 4.5",
  },

  // Marketing Category
  {
    id: "content-calendar",
    name: "Content Calendar Manager",
    description: "Plan and schedule marketing content across channels using Notion and Google Calendar",
    category: "Marketing",
    gradient: "from-orange-500 to-red-500",
    icon: "📅",
    inputType: "text",
    instructions:
      "You are a Content Calendar Manager agent. Help users plan, schedule, and track marketing content across multiple channels. Coordinate with team calendars, manage deadlines, and ensure consistent content delivery.",
    conversationStarters: [
      "Show me this week's content schedule",
      "Create a new blog post task",
      "What content is due this month?",
      "Schedule a social media campaign",
    ],
    tools: ["Notion", "Google Calendar", "Airtable"],
    defaultModel: "Claude Sonnet 4.5",
  },
  {
    id: "campaign-tracker",
    name: "Campaign Performance Tracker",
    description: "Track marketing campaigns and analyze performance metrics from HubSpot and Salesforce",
    category: "Marketing",
    gradient: "from-green-500 to-teal-500",
    icon: "📊",
    inputType: "text",
    instructions:
      "You are a Campaign Performance Tracker agent. Help users monitor marketing campaign performance, analyze metrics, track ROI, and generate reports. Integrate data from HubSpot, Salesforce, and other marketing tools.",
    conversationStarters: [
      "Show me campaign performance this quarter",
      "What's the ROI on our latest campaign?",
      "Compare email campaign metrics",
      "Generate a marketing report",
    ],
    tools: ["HubSpot", "Salesforce", "Airtable"],
    defaultModel: "Claude Sonnet 4.5",
  },

  // Sales Category
  {
    id: "lead-manager",
    name: "Lead Management Assistant",
    description: "Manage leads, track opportunities, and automate follow-ups using Salesforce and HubSpot",
    category: "Sales",
    gradient: "from-indigo-500 to-purple-500",
    icon: "🎯",
    inputType: "text",
    instructions:
      "You are a Lead Management Assistant agent. Help users track leads, manage opportunities, schedule follow-ups, and update CRM records. Provide insights on lead quality and conversion rates.",
    conversationStarters: [
      "Show me hot leads this week",
      "Schedule follow-up for a prospect",
      "What's my pipeline value?",
      "Update lead status in Salesforce",
    ],
    tools: ["Salesforce", "HubSpot", "Gmail", "Google Calendar"],
    defaultModel: "Claude Sonnet 4.5",
  },
  {
    id: "email-outreach",
    name: "Email Outreach Coordinator",
    description: "Automate sales outreach, track responses, and manage email campaigns via Gmail and Outlook",
    category: "Sales",
    gradient: "from-pink-500 to-rose-500",
    icon: "✉️",
    inputType: "text",
    instructions:
      "You are an Email Outreach Coordinator agent. Help users create personalized email campaigns, track responses, schedule follow-ups, and analyze email performance. Integrate with Gmail and Outlook for seamless communication.",
    conversationStarters: [
      "Draft an outreach email",
      "Show me email response rates",
      "Schedule a follow-up sequence",
      "Find prospects who haven't responded",
    ],
    tools: ["Gmail", "Outlook", "Salesforce", "HubSpot"],
    defaultModel: "Claude Sonnet 4.5",
  },

  // Operations Category
  {
    id: "task-automator",
    name: "Task Automation Manager",
    description: "Automate workflows and manage tasks across Jira, Notion, and Microsoft Teams",
    category: "Operations",
    gradient: "from-cyan-500 to-blue-500",
    icon: "⚙️",
    inputType: "text",
    instructions:
      "You are a Task Automation Manager agent. Help users automate repetitive workflows, manage tasks across platforms, set up notifications, and streamline operations. Integrate with Jira, Notion, and Teams for efficient task management.",
    conversationStarters: [
      "Create an automated workflow",
      "Show me overdue tasks",
      "Set up a recurring task",
      "Notify team about project updates",
    ],
    tools: ["Jira", "Notion", "Microsoft Teams", "Slack"],
    defaultModel: "Claude Sonnet 4.5",
  },
  {
    id: "document-organizer",
    name: "Document Organization Assistant",
    description: "Organize and manage documents across Google Drive, SharePoint, and Confluence",
    category: "Operations",
    gradient: "from-yellow-500 to-orange-500",
    icon: "📁",
    inputType: "text",
    instructions:
      "You are a Document Organization Assistant agent. Help users organize files, manage document versions, set up folder structures, and ensure proper access controls across cloud storage platforms.",
    conversationStarters: [
      "Organize project documents",
      "Find files related to Q4 planning",
      "Create a shared folder structure",
      "Archive old documents",
    ],
    tools: ["Google Drive", "SharePoint", "Confluence", "Notion"],
    defaultModel: "Claude Sonnet 4.5",
  },

  // Finance Category
  {
    id: "expense-tracker",
    name: "Expense Tracking Assistant",
    description: "Track expenses, manage budgets, and generate financial reports using Airtable and Office 365",
    category: "Finance",
    gradient: "from-emerald-500 to-green-500",
    icon: "💰",
    inputType: "text",
    instructions:
      "You are an Expense Tracking Assistant agent. Help users track expenses, categorize costs, manage budgets, and generate financial reports. Integrate with accounting tools and spreadsheets for accurate financial management.",
    conversationStarters: [
      "Show me this month's expenses",
      "Categorize recent transactions",
      "Generate an expense report",
      "What's our budget status?",
    ],
    tools: ["Airtable", "Office 365", "Gmail"],
    defaultModel: "Claude Sonnet 4.5",
  },
  {
    id: "invoice-manager",
    name: "Invoice Management Agent",
    description: "Create, send, and track invoices using Salesforce and email integrations",
    category: "Finance",
    gradient: "from-blue-600 to-indigo-600",
    icon: "🧾",
    inputType: "text",
    instructions:
      "You are an Invoice Management Agent. Help users create professional invoices, send them to clients, track payment status, and send reminders. Integrate with CRM and email for streamlined invoicing.",
    conversationStarters: [
      "Create an invoice for a client",
      "Show me unpaid invoices",
      "Send payment reminder",
      "Track invoice status",
    ],
    tools: ["Salesforce", "Gmail", "Outlook", "Airtable"],
    defaultModel: "Claude Sonnet 4.5",
  },

  // Legal Category
  {
    id: "contract-reviewer",
    name: "Contract Review Assistant",
    description: "Review contracts, track agreements, and manage legal documents via SharePoint and Confluence",
    category: "Legal",
    gradient: "from-slate-600 to-gray-700",
    icon: "⚖️",
    inputType: "text",
    instructions:
      "You are a Contract Review Assistant agent. Help users review contracts, identify key terms, track agreement status, and manage legal documents. Provide summaries and flag important clauses.",
    conversationStarters: [
      "Review this contract",
      "Summarize key terms",
      "Track contract expiration dates",
      "Find contracts with specific clauses",
    ],
    tools: ["SharePoint", "Confluence", "Google Drive", "Notion"],
    defaultModel: "Claude Sonnet 4.5",
  },
  {
    id: "compliance-monitor",
    name: "Compliance Monitoring Agent",
    description: "Monitor compliance requirements and track regulatory updates using Notion and Confluence",
    category: "Legal",
    gradient: "from-red-600 to-orange-600",
    icon: "🛡️",
    inputType: "text",
    instructions:
      "You are a Compliance Monitoring Agent. Help users track compliance requirements, monitor regulatory changes, manage documentation, and ensure adherence to legal standards.",
    conversationStarters: [
      "Show me compliance checklist",
      "Track regulatory updates",
      "Generate compliance report",
      "What are upcoming deadlines?",
    ],
    tools: ["Notion", "Confluence", "SharePoint", "Airtable"],
    defaultModel: "Claude Sonnet 4.5",
  },
]

const categories = ["All", "Product", "Marketing", "Sales", "Operations", "Finance", "Legal"]

export function AgentTemplatesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedAgent, setSelectedAgent] = useState<AgentTemplate | null>(null)
  const [showAgentModal, setShowAgentModal] = useState(false)

  const filteredTemplates = agentTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAgentClick = (agent: AgentTemplate) => {
    setSelectedAgent(agent)
    setShowAgentModal(true)
  }

  const handleUseTemplate = (agent: AgentTemplate) => {
    console.log("Using template:", agent)
    setShowAgentModal(false)
    // TODO: Navigate to agent creation with template
  }

  const handleDuplicate = (agent: AgentTemplate) => {
    console.log("Duplicating agent:", agent)
    setShowAgentModal(false)
    // TODO: Create a copy of the agent
  }

  const handleChat = (agent: AgentTemplate) => {
    console.log("Starting chat with agent:", agent)
    setShowAgentModal(false)
    // TODO: Navigate to chat with this agent
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-7xl p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">Agent templates</h1>
          <p className="text-muted-foreground">Discover and use pre-built agent templates to get started quickly</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const count =
              category === "All" ? agentTemplates.length : agentTemplates.filter((t) => t.category === category).length

            return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category} {count}
              </Button>
            )
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleAgentClick(template)}
              className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-foreground/20 transition-all text-left"
            >
              {/* Gradient Header */}
              <div className={`h-40 bg-gradient-to-br ${template.gradient} flex items-center justify-center`}>
                <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
                  {template.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{template.description}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>By AgentFlow</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No templates found matching your search.</p>
          </div>
        )}
      </div>

      {/* Agent Configuration Modal */}
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

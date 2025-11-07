"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Check } from "lucide-react"
import { ActionConfigModal } from "./action-config-modal"

interface Action {
  id: string
  name: string
  description: string
  category: string
  integration?: string
  icon: string
}

interface ActionSelectorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedActions: string[]
  onSelectAction: (actionId: string) => void
}

const capabilities: Action[] = [
  {
    id: "web-search",
    name: "Web search",
    description: "Searches the web to improve response quality, especially f...",
    category: "capabilities",
    icon: "🌐",
  },
  {
    id: "image-generation",
    name: "Image generation",
    description: "Generates images in the chat using natural language",
    category: "capabilities",
    icon: "🖼️",
  },
  {
    id: "data-analyst",
    name: "Data analyst",
    description: "Runs code to analyze data, work with CSV or Excel files,...",
    category: "capabilities",
    icon: "💻",
  },
  {
    id: "canvas",
    name: "Canvas",
    description: "Create documents and code in the chat",
    category: "capabilities",
    icon: "📄",
  },
]

const hubspotActions: Action[] = [
  {
    id: "hs-update-contact",
    name: "Update contact",
    description: "Updates a contact in HubSpot",
    category: "integrations",
    integration: "hubspot",
    icon: "🟠",
  },
  {
    id: "hs-update-company",
    name: "Update company",
    description: "Updates a company in HubSpot",
    category: "integrations",
    integration: "hubspot",
    icon: "🟠",
  },
  {
    id: "hs-update-deal",
    name: "Update deal",
    description: "Updates one or more fields from an existing deal",
    category: "integrations",
    integration: "hubspot",
    icon: "🟠",
  },
  {
    id: "hs-get-contact",
    name: "Get contact",
    description: "Gets a contact by its id",
    category: "integrations",
    integration: "hubspot",
    icon: "🟠",
  },
  {
    id: "hs-get-engagement",
    name: "Get contact engagement",
    description: "Retrieve engagement information like recent...",
    category: "integrations",
    integration: "hubspot",
    icon: "🟠",
  },
  {
    id: "hs-get-company",
    name: "Get company",
    description: "Gets a company by its id",
    category: "integrations",
    integration: "hubspot",
    icon: "🟠",
  },
  {
    id: "hs-get-deal",
    name: "Get deal",
    description: "Gets a deal by its id",
    category: "integrations",
    integration: "hubspot",
    icon: "🟠",
  },
  {
    id: "hs-get-deal-context",
    name: "Get deal context",
    description: "Gets all required information on the custom deal object,...",
    category: "integrations",
    integration: "hubspot",
    icon: "🟠",
  },
  {
    id: "hs-find-contact",
    name: "Find contact",
    description: "Finds a contact by searching",
    category: "integrations",
    integration: "hubspot",
    icon: "🟠",
  },
  {
    id: "hs-find-company",
    name: "Find company",
    description: "Finds a company by searching",
    category: "integrations",
    integration: "hubspot",
    icon: "🟠",
  },
  {
    id: "hs-find-deal",
    name: "Find deal",
    description: "Finds a deal by searching",
    category: "integrations",
    integration: "hubspot",
    icon: "🟠",
  },
  {
    id: "hs-get-owners",
    name: "Get HubSpot owners",
    description: "Retrieves all HubSpot owners/users with optional...",
    category: "integrations",
    integration: "hubspot",
    icon: "🟠",
  },
  {
    id: "hs-get-user-context",
    name: "Get current user context",
    description: "Gets the current user's email, hubspot_owner_id, and other...",
    category: "integrations",
    integration: "hubspot",
    icon: "🟠",
  },
]

const jiraActions: Action[] = [
  {
    id: "jira-get-priorities",
    name: "Get priorities",
    description: "Returns all issue priorities (id and name). Use this to map...",
    category: "integrations",
    integration: "jira",
    icon: "🔵",
  },
  {
    id: "jira-create-issue",
    name: "Create issue",
    description: "Creates an issue or, where the option to create subtasks is...",
    category: "integrations",
    integration: "jira",
    icon: "🔵",
  },
  {
    id: "jira-search-issues",
    name: "Search for issues",
    description: "Searches for issues using JQL",
    category: "integrations",
    integration: "jira",
    icon: "🔵",
  },
  {
    id: "jira-get-issue-types",
    name: "Get issue types for project",
    description: "Gets all issue types for a project",
    category: "integrations",
    integration: "jira",
    icon: "🔵",
  },
]

const otherIntegrations: Action[] = [
  {
    id: "airtable-update",
    name: "Update records",
    description: "Update a record in a table",
    category: "integrations",
    integration: "airtable",
    icon: "🟡",
  },
  {
    id: "notion-list",
    name: "List workspaces",
    description: "Get all accessible workspaces",
    category: "integrations",
    integration: "notion",
    icon: "⚫",
  },
  {
    id: "aws-search",
    name: "Search",
    description: "Searches your Kendra index using natural language queries",
    category: "integrations",
    integration: "aws",
    icon: "🟠",
  },
  {
    id: "onedrive-search",
    name: "Search documents",
    description: "Searches the database for the most relevant information...",
    category: "integrations",
    integration: "onedrive",
    icon: "🔵",
  },
  {
    id: "bigquery-list",
    name: "List datasets",
    description: "Lists all datasets in a BigQuery project",
    category: "integrations",
    integration: "bigquery",
    icon: "🔵",
  },
  {
    id: "confluence-search",
    name: "Search",
    description: "Searches for pages by content and title. Searches across all...",
    category: "integrations",
    integration: "confluence",
    icon: "🔵",
  },
  {
    id: "deepl-translate",
    name: "Translate text",
    description: "Translates text from one language to another using...",
    category: "integrations",
    integration: "deepl",
    icon: "🔵",
  },
  {
    id: "tts",
    name: "Text to Speech",
    description: "Convert text into natural-sounding speech using AI...",
    category: "integrations",
    integration: "tts",
    icon: "🔊",
  },
]

export function ActionSelectorModal({ open, onOpenChange, selectedActions, onSelectAction }: ActionSelectorModalProps) {
  const [activeTab, setActiveTab] = useState<"all" | "capabilities" | "integrations" | "knowledge">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAction, setSelectedAction] = useState<Action | null>(null)
  const [showConfigModal, setShowConfigModal] = useState(false)

  const handleActionClick = (action: Action) => {
    if (action.category === "capabilities") {
      onSelectAction(action.id)
      onOpenChange(false)
    } else {
      setSelectedAction(action)
      setShowConfigModal(true)
    }
  }

  const handleAddAction = () => {
    if (selectedAction) {
      onSelectAction(selectedAction.id)
    }
    setShowConfigModal(false)
    onOpenChange(false)
  }

  const filteredActions = [...capabilities, ...hubspotActions, ...jiraActions, ...otherIntegrations].filter(
    (action) => {
      const matchesSearch =
        action.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        action.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTab = activeTab === "all" || action.category === activeTab
      return matchesSearch && matchesTab
    },
  )

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl max-h-[85vh] p-0 gap-0">
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 border-r bg-muted/20 p-4 space-y-2">
              <h3 className="text-sm font-semibold px-3 py-2">Select action</h3>
              <button
                onClick={() => setActiveTab("all")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === "all" ? "bg-background shadow-sm" : "hover:bg-background/50"
                }`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                All actions
              </button>
              <button
                onClick={() => setActiveTab("capabilities")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === "capabilities" ? "bg-background shadow-sm" : "hover:bg-background/50"
                }`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m0-6l4.2-4.2" />
                </svg>
                Capabilities
              </button>
              <button
                onClick={() => setActiveTab("integrations")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === "integrations" ? "bg-background shadow-sm" : "hover:bg-background/50"
                }`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                Integrations
              </button>
              <button
                onClick={() => setActiveTab("knowledge")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === "knowledge" ? "bg-background shadow-sm" : "hover:bg-background/50"
                }`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
                </svg>
                Knowledge folders
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search actions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === "all" && (
                  <div className="space-y-6">
                    {/* Capabilities Section */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold">Capabilities</h3>
                        <button className="text-sm text-blue-600 hover:text-blue-700">See all</button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Activate built-in functionalities.</p>
                      <div className="grid grid-cols-4 gap-3">
                        {capabilities.map((action) => (
                          <button
                            key={action.id}
                            onClick={() => handleActionClick(action)}
                            className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors text-left"
                          >
                            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-2xl mb-3">
                              {action.icon}
                            </div>
                            <h4 className="text-sm font-medium mb-1">{action.name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">{action.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Integrations Section */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold">Integrations</h3>
                        <button className="text-sm text-blue-600 hover:text-blue-700">See all</button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add individual actions from external tools to retrieve data, take actions, and more.
                      </p>
                      <div className="grid grid-cols-4 gap-3">
                        {otherIntegrations.slice(0, 8).map((action) => (
                          <button
                            key={action.id}
                            onClick={() => handleActionClick(action)}
                            className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors text-left"
                          >
                            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-2xl mb-3">
                              {action.icon}
                            </div>
                            <h4 className="text-sm font-medium mb-1">{action.name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">{action.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "capabilities" && (
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Capabilities</h3>
                    <p className="text-sm text-muted-foreground mb-4">Activate built-in functionalities.</p>
                    <div className="grid grid-cols-4 gap-3">
                      {capabilities.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => handleActionClick(action)}
                          className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors text-left"
                        >
                          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-2xl mb-3">
                            {action.icon}
                          </div>
                          <h4 className="text-sm font-medium mb-1">{action.name}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">{action.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "integrations" && (
                  <div className="space-y-6">
                    {/* HubSpot */}
                    <div>
                      <h3 className="text-sm font-semibold mb-4">HubSpot</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {hubspotActions.map((action) => (
                          <button
                            key={action.id}
                            onClick={() => handleActionClick(action)}
                            className="flex items-center gap-3 p-3 rounded-lg border bg-red-50 hover:bg-red-100 transition-colors text-left"
                          >
                            <div className="h-10 w-10 rounded bg-white flex items-center justify-center flex-shrink-0">
                              <span className="text-2xl">{action.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium">{action.name}</h4>
                              <p className="text-xs text-muted-foreground truncate">{action.description}</p>
                            </div>
                            {selectedActions.includes(action.id) && (
                              <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Jira */}
                    <div>
                      <h3 className="text-sm font-semibold mb-4">Jira</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {jiraActions.map((action) => (
                          <button
                            key={action.id}
                            onClick={() => handleActionClick(action)}
                            className="flex items-center gap-3 p-3 rounded-lg border bg-blue-50 hover:bg-blue-100 transition-colors text-left"
                          >
                            <div className="h-10 w-10 rounded bg-white flex items-center justify-center flex-shrink-0">
                              <span className="text-2xl">{action.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium">{action.name}</h4>
                              <p className="text-xs text-muted-foreground truncate">{action.description}</p>
                            </div>
                            {selectedActions.includes(action.id) && (
                              <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "knowledge" && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <h3 className="text-sm font-semibold mb-1">Knowledge folders</h3>
                    <p className="text-sm text-muted-foreground mb-8">Search through data in knowledge folders</p>
                    <div className="text-center max-w-md">
                      <h4 className="text-base font-medium mb-2">No knowledge folders found</h4>
                      <p className="text-sm text-muted-foreground">
                        You do not have any knowledge folders available currently. You can create a new knowledge folder
                        to store documents{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-700">
                          here
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Action Config Modal */}
      <ActionConfigModal
        action={selectedAction}
        open={showConfigModal}
        onOpenChange={setShowConfigModal}
        onAddAction={handleAddAction}
      />
    </>
  )
}

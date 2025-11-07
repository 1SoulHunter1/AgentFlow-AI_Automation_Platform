"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

interface AgentConfigModalProps {
  agent: AgentTemplate | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUseTemplate?: (agent: AgentTemplate) => void
  onDuplicate?: (agent: AgentTemplate) => void
  onChat?: (agent: AgentTemplate) => void
}

const getActionsForApp = (appId: string) => {
  const actionsByApp: Record<string, Array<{ name: string; description: string }>> = {
    slack: [
      { name: "Send message", description: "Send a message to a channel or user" },
      { name: "Create channel", description: "Create a new Slack channel" },
      { name: "List channels", description: "Get all channels in workspace" },
      { name: "Get user info", description: "Retrieve user profile information" },
      { name: "Upload file", description: "Upload a file to Slack" },
      { name: "Set channel topic", description: "Update channel topic or description" },
      { name: "Invite user to channel", description: "Add a user to a channel" },
    ],
    jira: [
      { name: "Create Jira ticket", description: "Create a new Jira issue or ticket" },
      { name: "Update Jira issue", description: "Update an existing issue" },
      { name: "Get Jira issue", description: "Retrieve issue details" },
      { name: "Search Jira issues", description: "Search for issues using JQL" },
      { name: "Add comment to issue", description: "Add a comment to an issue" },
      { name: "Assign Jira issue", description: "Assign an issue to a user" },
      { name: "Transition issue status", description: "Move issue to different status" },
      { name: "Create Jira subtask", description: "Create a subtask under an issue" },
      { name: "Link Jira issues", description: "Create a link between two issues" },
      { name: "Get project details", description: "Retrieve Jira project information" },
    ],
    confluence: [
      { name: "Create Confluence page", description: "Create a new Confluence page" },
      { name: "Update Confluence page", description: "Update page content" },
      { name: "Get page content", description: "Retrieve page content and metadata" },
      { name: "Search Confluence", description: "Search across Confluence spaces" },
      { name: "Add page comment", description: "Add a comment to a page" },
      { name: "Create space", description: "Create a new Confluence space" },
      { name: "Get space details", description: "Retrieve space information" },
      { name: "Attach file to page", description: "Upload and attach a file to a page" },
    ],
    notion: [
      { name: "Create Notion page", description: "Create a new Notion page" },
      { name: "Update Notion page", description: "Update page content" },
      { name: "Search Notion pages", description: "Search across workspace" },
      { name: "Create database", description: "Create a new database" },
      { name: "Query database", description: "Query database entries" },
      { name: "Add database item", description: "Add a new item to a database" },
      { name: "Update database item", description: "Update an existing database item" },
    ],
    airtable: [
      { name: "Create Airtable record", description: "Create a new record in a table" },
      { name: "Update Airtable record", description: "Update an existing record" },
      { name: "Get Airtable records", description: "Retrieve records from a table" },
      { name: "Delete Airtable record", description: "Delete a record from a table" },
      { name: "List bases", description: "Get all Airtable bases" },
      { name: "List tables", description: "Get all tables in a base" },
    ],
    gmail: [
      { name: "Send Gmail email", description: "Send an email message" },
      { name: "Search Gmail emails", description: "Search emails by query" },
      { name: "Get email details", description: "Retrieve email details" },
      { name: "Create draft", description: "Create a draft email" },
      { name: "List Gmail labels", description: "Get all email labels" },
      { name: "Mark as read", description: "Mark email as read" },
      { name: "Add label to email", description: "Add a label to an email" },
    ],
    "google-calendar": [
      { name: "Create calendar event", description: "Create a calendar event" },
      { name: "Update calendar event", description: "Update an existing event" },
      { name: "List calendar events", description: "Get events in date range" },
      { name: "Delete calendar event", description: "Delete a calendar event" },
      { name: "Get event details", description: "Retrieve event information" },
      { name: "List calendars", description: "Get all calendars" },
    ],
    "google-drive": [
      { name: "Upload file to Drive", description: "Upload a file to Google Drive" },
      { name: "Create Drive folder", description: "Create a new folder" },
      { name: "List Drive files", description: "List files and folders" },
      { name: "Share Drive file", description: "Share a file with users" },
      { name: "Download Drive file", description: "Download a file from Drive" },
      { name: "Delete Drive file", description: "Delete a file or folder" },
    ],
    "microsoft-teams": [
      { name: "Send Teams message", description: "Send a message to a channel or chat" },
      { name: "Create Teams channel", description: "Create a new channel in a team" },
      { name: "List Teams channels", description: "Get all channels in a team" },
      { name: "Schedule Teams meeting", description: "Schedule a Teams meeting" },
      { name: "Get team members", description: "Retrieve team member list" },
    ],
    outlook: [
      { name: "Send Outlook email", description: "Send an email via Outlook" },
      { name: "Search Outlook emails", description: "Search emails in mailbox" },
      { name: "Create Outlook event", description: "Create a calendar event" },
      { name: "Get email details", description: "Retrieve email information" },
      { name: "Create Outlook folder", description: "Create a new mail folder" },
    ],
    "office-365": [
      { name: "Create Office document", description: "Create a new Office document" },
      { name: "Edit Office document", description: "Edit an existing document" },
      { name: "Share Office document", description: "Share a document with users" },
      { name: "Get document content", description: "Retrieve document content" },
    ],
    sharepoint: [
      { name: "Upload to SharePoint", description: "Upload a file to SharePoint" },
      { name: "Create SharePoint list", description: "Create a new list" },
      { name: "Add list item", description: "Add an item to a list" },
      { name: "Get SharePoint files", description: "Retrieve files from a site" },
      { name: "Create SharePoint site", description: "Create a new SharePoint site" },
    ],
    salesforce: [
      { name: "Create Salesforce lead", description: "Create a new lead" },
      { name: "Update opportunity", description: "Update opportunity details" },
      { name: "Search Salesforce accounts", description: "Search for accounts" },
      { name: "Get contact details", description: "Retrieve contact information" },
      { name: "Create Salesforce case", description: "Create a support case" },
      { name: "Update Salesforce record", description: "Update any Salesforce record" },
    ],
    hubspot: [
      { name: "Create HubSpot contact", description: "Create a new contact" },
      { name: "Update HubSpot deal", description: "Update deal information" },
      { name: "Get HubSpot company", description: "Retrieve company details" },
      { name: "Create HubSpot ticket", description: "Create a support ticket" },
      { name: "Log HubSpot activity", description: "Log an activity or note" },
    ],
    zendesk: [
      { name: "Create Zendesk ticket", description: "Create a new support ticket" },
      { name: "Update Zendesk ticket", description: "Update ticket details" },
      { name: "Add ticket comment", description: "Add a comment to a ticket" },
      { name: "Search Zendesk tickets", description: "Search for tickets" },
      { name: "Get ticket details", description: "Retrieve ticket information" },
      { name: "Assign Zendesk ticket", description: "Assign a ticket to an agent" },
    ],
  }
  return actionsByApp[appId] || []
}

export function AgentConfigModal({
  agent,
  open,
  onOpenChange,
  onUseTemplate,
  onDuplicate,
  onChat,
}: AgentConfigModalProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [expandedInstructions, setExpandedInstructions] = useState(true)
  const [selectedProject, setSelectedProject] = useState("sales")
  const [selectedLanguage, setSelectedLanguage] = useState("english")

  if (!agent) return null

  const allActions = agent.tools.flatMap((tool) =>
    getActionsForApp(tool).map((action) => ({
      ...action,
      appId: tool,
      appName: tool.charAt(0).toUpperCase() + tool.slice(1).replace(/-/g, " "),
    })),
  )

  const getAppIcon = (appId: string) => {
    const iconMap: Record<string, string> = {
      slack: "https://cdn.simpleicons.org/slack/4A154B",
      jira: "https://cdn.simpleicons.org/jira/0052CC",
      notion: "https://cdn.simpleicons.org/notion/000000",
      gmail: "https://cdn.simpleicons.org/gmail/EA4335",
      "google-calendar": "https://cdn.simpleicons.org/googlecalendar/4285F4",
      "google-drive": "https://cdn.simpleicons.org/googledrive/4285F4",
      salesforce: "https://cdn.simpleicons.org/salesforce/00A1E0",
      "microsoft-teams": "https://cdn.simpleicons.org/microsoftteams/6264A7",
      confluence: "https://cdn.simpleicons.org/confluence/172B4D",
      airtable: "https://cdn.simpleicons.org/airtable/18BFFF",
      outlook: "https://cdn.simpleicons.org/microsoftoutlook/0078D4",
      "office-365": "https://cdn.simpleicons.org/microsoft/D83B01",
      sharepoint: "https://cdn.simpleicons.org/microsoftsharepoint/0078D4",
      hubspot: "https://cdn.simpleicons.org/hubspot/FF7A59",
      zendesk: "https://cdn.simpleicons.org/zendesk/03363D",
    }
    return iconMap[appId] || `https://cdn.simpleicons.org/${appId}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[1200px] max-w-[1200px] sm:max-w-[1200px] h-[85vh] max-h-[85vh] p-0 gap-0 overflow-hidden font-sans">
        <div className="grid grid-cols-[1fr_400px] h-full">
          <div className="flex flex-col min-w-0 overflow-hidden">
            {/* Header */}
            <div className="flex items-start gap-4 p-6 border-b flex-shrink-0">
              <div
                className={`h-12 w-12 rounded-lg bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-2xl flex-shrink-0`}
              >
                {agent.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-foreground mb-1">{agent.name}</h2>
                <p className="text-sm text-muted-foreground">By Agentflow</p>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Instructions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">Instructions</Label>
                  <button
                    onClick={() => setExpandedInstructions(!expandedInstructions)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {expandedInstructions ? (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </button>
                </div>
                {expandedInstructions && (
                  <div className="space-y-4">
                    <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                      <ol className="list-decimal list-inside space-y-2 text-sm text-foreground">
                        <li>Generate high-level dashboard images</li>
                        <li>Extract key metrics and summaries</li>
                        <li>Highlight critical insights and trends</li>
                        <li>Prepare executive-ready insights and recommendations</li>
                      </ol>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Format</h4>
                      <div className="rounded-lg border bg-muted/30 p-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Structure your responses based on the analysis type: For workbook exploration, provide
                          organized lists with descriptions and recommendations. For visual analysis, lead with key
                          insights, then supporting details from the visualization. For data analysis, start with
                          executive summary, then key findings with supporting data. Always include relevant context
                          about the data source, time periods, and business implications. When presenting multiple
                          insights, use clear headings and bullet points for easy consumption.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Conversation starters */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Conversation starters</Label>
                <div className="grid grid-cols-2 gap-3">
                  {agent.conversationStarters.map((starter, idx) => (
                    <button
                      key={idx}
                      className="p-3 rounded-lg border bg-background hover:bg-accent transition-colors text-left text-sm text-muted-foreground"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions & Capabilities */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Actions & Capabilities</Label>
                <div className="rounded-lg border divide-y max-h-96 overflow-y-auto">
                  {allActions.length > 0 ? (
                    allActions.map((action, idx) => (
                      <button
                        key={idx}
                        className="w-full flex items-center gap-3 p-3 hover:bg-accent transition-colors text-left"
                      >
                        <div className="h-8 w-8 rounded bg-white border flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5">
                          <img
                            src={getAppIcon(action.appId) || "/placeholder.svg"}
                            alt={action.appName}
                            className="h-full w-full object-contain"
                            onError={(e) => {
                              const target = e.currentTarget
                              target.style.display = "none"
                              const parent = target.parentElement
                              if (parent) {
                                parent.textContent = action.appName.charAt(0)
                                parent.classList.add("text-xs", "font-semibold", "text-muted-foreground")
                              }
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground">{action.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{action.description}</div>
                        </div>
                        <svg
                          className="h-4 w-4 text-muted-foreground flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No actions available. Connect integrations to enable actions.
                    </div>
                  )}
                </div>
              </div>

              {/* Model */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Model</Label>
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-background">
                  <div className="h-8 w-8 rounded bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-orange-700">AI</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">{agent.defaultModel}</div>
                    <div className="text-xs text-muted-foreground">
                      Anthropic's flagship model for complex tasks. Excels at coding, authentic human-sounding text, and
                      nuanced content creation.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l bg-muted/20 flex flex-col overflow-hidden">
            {/* Close button */}
            <div className="flex justify-end p-4 border-b flex-shrink-0">
              <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </Button>
            </div>

            {/* Scrollable sidebar content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Title */}
              <h3 className="text-lg font-semibold">Use template</h3>

              {/* Action buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    onUseTemplate?.(agent)
                    onOpenChange(false)
                  }}
                >
                  Use this Template
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-muted/20 px-2 text-muted-foreground">or</span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  className="w-full justify-center bg-foreground hover:bg-foreground/90 text-background"
                  onClick={() => {
                    onChat?.(agent)
                    onOpenChange(false)
                  }}
                >
                  Chat with Agent
                </Button>
              </div>

              {/* Project and Language selectors */}
              <div className="flex gap-2">
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  {showFullDescription ? agent.description : agent.description.slice(0, 120) + "..."}
                </div>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showFullDescription ? "Show less" : "Show more"}
                </button>
              </div>

              {/* Integrations */}
              <div className="space-y-3">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Integrations</Label>
                <div className="flex flex-wrap gap-2">
                  {agent.tools.map((tool) => (
                    <div
                      key={tool}
                      className="h-10 w-10 rounded-lg bg-white border flex items-center justify-center overflow-hidden p-2"
                    >
                      <img
                        src={getAppIcon(tool) || "/placeholder.svg"}
                        alt={tool}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          const target = e.currentTarget
                          target.style.display = "none"
                          const parent = target.parentElement
                          if (parent) {
                            parent.textContent = tool.charAt(0).toUpperCase()
                            parent.classList.add("text-xs", "font-semibold", "text-muted-foreground")
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Tags</Label>
                <div>
                  <Badge variant="outline" className="rounded-md">
                    {agent.category}
                  </Badge>
                </div>
              </div>

              {/* Last updated */}
              <div className="text-xs text-muted-foreground pt-4 border-t">Last updated: 09/03/2025</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

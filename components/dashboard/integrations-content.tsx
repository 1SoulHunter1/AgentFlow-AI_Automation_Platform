"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Trash2, Plus, Folder } from "lucide-react"
import { AVAILABLE_APPS, type ComposioApp } from "@/lib/composio-client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CreateKnowledgeFolderModal } from "./create-knowledge-folder-modal"
import { useRouter } from "next/navigation"

const KNOWLEDGE_FOLDER = {
  id: "knowledge-folder",
  name: "Knowledge folder",
  description: "Create a folder with up to 1,000 files and use it in assistants",
  isSpecial: true,
}

export function IntegrationsContent() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "connected">("all")
  const [connectedApps, setConnectedApps] = useState<Set<string>>(new Set())
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)
  const [connectingApp, setConnectingApp] = useState<string | null>(null)
  const [configDialog, setConfigDialog] = useState<ComposioApp | null>(null)
  const [showKnowledgeFolderModal, setShowKnowledgeFolderModal] = useState(false)

  const entityId = "user-123"

  useEffect(() => {
    loadConnections()
  }, [])

  const loadConnections = async () => {
    try {
      const response = await fetch(`/api/integrations/list?entityId=${entityId}`)
      const data = await response.json()

      if (data.connections) {
        const connected = new Set(data.connections.map((c: any) => c.appId))
        setConnectedApps(connected)
      }
    } catch (error) {
      console.error("Error loading connections:", error)
    }
  }

  const handleConnect = async (app: ComposioApp) => {
    if (app.requiresConfig) {
      setConfigDialog(app)
      return
    }

    setConnectingApp(app.id)

    try {
      const response = await fetch("/api/integrations/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId: app.id, entityId }),
      })

      const data = await response.json()

      if (data.redirectUrl) {
        const popup = window.open(data.redirectUrl, "oauth", "width=600,height=700")

        const checkConnection = setInterval(async () => {
          if (popup?.closed) {
            clearInterval(checkConnection)
            await loadConnections()
            setConnectingApp(null)
          }
        }, 1000)
      }
    } catch (error) {
      console.error("Error connecting app:", error)
      setConnectingApp(null)
    }
  }

  const handleDisconnect = async (appId: string) => {
    try {
      const response = await fetch(`/api/integrations/list?entityId=${entityId}`)
      const data = await response.json()
      const connection = data.connections?.find((c: any) => c.appId === appId)

      if (connection) {
        await fetch("/api/integrations/disconnect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ connectionId: connection.id }),
        })

        setConnectedApps((prev) => {
          const next = new Set(prev)
          next.delete(appId)
          return next
        })
      }
    } catch (error) {
      console.error("Error disconnecting app:", error)
    }
  }

  const filteredApps = AVAILABLE_APPS.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || (filter === "connected" && connectedApps.has(app.id))
    return matchesSearch && matchesFilter
  })

  const renderAppIcon = (app: ComposioApp | typeof KNOWLEDGE_FOLDER) => {
    if ("isSpecial" in app && app.isSpecial) {
      return (
        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
          <Folder className="h-5 w-5 text-muted-foreground" />
        </div>
      )
    }

    const logoMap: Record<string, string> = {
      slack: "https://logo.clearbit.com/slack.com",
      "microsoft-teams": "https://logo.clearbit.com/microsoft.com",
      jira: "https://logo.clearbit.com/atlassian.com",
      confluence: "https://logo.clearbit.com/atlassian.com",
      airtable: "https://logo.clearbit.com/airtable.com",
      notion: "https://logo.clearbit.com/notion.so",
      gmail: "https://logo.clearbit.com/google.com",
      "google-calendar": "https://logo.clearbit.com/google.com",
      "google-drive": "https://logo.clearbit.com/google.com",
      outlook: "https://logo.clearbit.com/microsoft.com",
      "office-365": "https://logo.clearbit.com/microsoft.com",
      sharepoint: "https://logo.clearbit.com/microsoft.com",
      salesforce: "https://logo.clearbit.com/salesforce.com",
      hubspot: "https://logo.clearbit.com/hubspot.com",
      zendesk: "https://logo.clearbit.com/zendesk.com",
    }

    const logoUrl = logoMap[app.id]

    return (
      <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
        <img
          src={logoUrl || "/placeholder.svg"}
          alt={`${app.name} logo`}
          className="w-6 h-6 object-contain"
          onError={(e) => {
            const target = e.currentTarget
            const parent = target.parentElement
            if (parent) {
              parent.innerHTML = `<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-semibold text-white">${app.name[0]}</div>`
            }
          }}
        />
      </div>
    )
  }

  const handleCreateKnowledgeFolder = (name: string, description: string) => {
    console.log("[v0] Creating knowledge folder:", { name, description })
    // In a real app, save to database and get the ID
    const folderId = "folder-1"
    router.push(`/dashboard/integrations/knowledge-folder/${folderId}`)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col items-center justify-center px-8 py-8 border-b border-border">
        <div className="w-full max-w-5xl flex items-start justify-between">
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-semibold">Integrations</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Connect external tools to retrieve data, take actions, and more.
            </p>
          </div>
          <Button variant="outline" className="ml-4 bg-background">
            <Plus className="h-4 w-4 mr-2" />
            Add integration
          </Button>
        </div>
      </div>

      <div className="px-8 py-6 flex justify-center">
        <div className="w-full max-w-5xl space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-11 text-sm border-border"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "outline" : "ghost"}
              onClick={() => setFilter("all")}
              size="sm"
              className={filter === "all" ? "border-foreground" : "text-muted-foreground"}
            >
              All
            </Button>
            <Button
              variant={filter === "connected" ? "outline" : "ghost"}
              onClick={() => setFilter("connected")}
              size="sm"
              className={filter === "connected" ? "border-foreground" : "text-muted-foreground"}
            >
              Connected
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8 flex justify-center">
        <div className="w-full max-w-5xl space-y-0 border border-border rounded-lg overflow-hidden bg-card">
          <div className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {renderAppIcon(KNOWLEDGE_FOLDER)}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm">{KNOWLEDGE_FOLDER.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{KNOWLEDGE_FOLDER.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <Button
                size="sm"
                className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setShowKnowledgeFolderModal(true)}
              >
                Create
              </Button>
            </div>
          </div>

          {filteredApps.map((app, index) => {
            const isConnected = connectedApps.has(app.id)
            const isHovered = hoveredApp === app.id
            const isConnecting = connectingApp === app.id

            return (
              <div
                key={app.id}
                className={`flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors ${
                  index !== filteredApps.length - 1 ? "border-b border-border" : ""
                }`}
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {renderAppIcon(app)}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm">{app.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{app.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {isConnected && isHovered && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDisconnect(app.id)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}

                  {isConnected && app.requiresConfig && (
                    <Button variant="outline" size="sm" onClick={() => setConfigDialog(app)} className="h-8 text-xs">
                      Configure
                    </Button>
                  )}

                  <Button
                    onClick={() => (isConnected ? handleDisconnect(app.id) : handleConnect(app))}
                    disabled={isConnecting}
                    size="sm"
                    className={
                      isConnected
                        ? "h-8 text-xs bg-muted text-foreground hover:bg-muted/80"
                        : "h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                    }
                  >
                    {isConnecting ? "Connecting..." : isConnected ? "Connected" : "Connect"}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Dialog open={!!configDialog} onOpenChange={() => setConfigDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure {configDialog?.name}</DialogTitle>
            <DialogDescription>This integration requires additional configuration before connecting.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <Input placeholder="Enter your API key" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Workspace URL</label>
              <Input placeholder="https://your-workspace.example.com" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfigDialog(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (configDialog) {
                  handleConnect(configDialog)
                  setConfigDialog(null)
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Connect
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <CreateKnowledgeFolderModal
        open={showKnowledgeFolderModal}
        onOpenChange={setShowKnowledgeFolderModal}
        onCreateFolder={handleCreateKnowledgeFolder}
      />
    </div>
  )
}

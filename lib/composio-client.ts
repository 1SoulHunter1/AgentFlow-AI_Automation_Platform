// Mock Composio API Client — Offline & Instant Response

export interface ComposioApp {
  id: string
  name: string
  description: string
  logo: string
  category: string
  requiresConfig?: boolean
}

export interface ComposioConnection {
  id: string
  appId: string
  status: "active" | "pending" | "error"
  connectedAt?: string
  entityId: string
}

export class ComposioClient {
  // Mock getConnections: returns 2 demo integrations
  async getConnections(entityId: string): Promise<ComposioConnection[]> {
    console.log("[mock] Returning fake integrations for", entityId)
    return [
      {
        id: "mock-slack-1",
        appId: "slack",
        status: "active",
        connectedAt: new Date().toISOString(),
        entityId,
      },
      {
        id: "mock-notion-1",
        appId: "notion",
        status: "active",
        connectedAt: new Date().toISOString(),
        entityId,
      },
    ]
  }

  async initiateConnection(appId: string, entityId: string, redirectUrl?: string) {
    console.log("[mock] Pretending to connect app:", appId)
    return {
      connectionId: `mock-${appId}-${Date.now()}`,
      redirectUrl: redirectUrl || "http://localhost:3000/dashboard/integrations/callback",
    }
  }

  async deleteConnection(connectionId: string) {
    console.log("[mock] Pretending to delete:", connectionId)
    return true
  }

  async getActionsForApp(appId: string): Promise<any[]> {
    console.log("[mock] Returning dummy actions for app:", appId)
    return [
      { id: `${appId}-send-message`, name: "Send Message", description: "Simulated action" },
      { id: `${appId}-create-task`, name: "Create Task", description: "Simulated task creation" },
    ]
  }

  async getAllActions(): Promise<any[]> {
    console.log("[mock] Returning all dummy actions")
    return [
      { id: "slack-send-message", name: "Send Slack Message" },
      { id: "notion-create-page", name: "Create Notion Page" },
    ]
  }
}

// Local “Available Apps” list
export const AVAILABLE_APPS: ComposioApp[] = [
  {
    id: "slack",
    name: "Slack",
    description: "Team communication and collaboration platform",
    logo: "/integrations/slack.svg",
    category: "Communication",
  },
  {
    id: "notion",
    name: "Notion",
    description: "All-in-one workspace for notes and docs",
    logo: "/integrations/notion.svg",
    category: "Productivity",
  },
  {
    id: "jira",
    name: "Jira",
    description: "Project management for agile teams",
    logo: "/integrations/jira.svg",
    category: "Project Management",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Cloud storage service",
    logo: "/integrations/google-drive.svg",
    category: "Storage",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "CRM platform for managing customers",
    logo: "/integrations/salesforce.svg",
    category: "CRM",
  },
]

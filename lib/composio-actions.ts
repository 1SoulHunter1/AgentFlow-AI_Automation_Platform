// Composio actions/tools for different integrations
export interface ComposioAction {
  id: string
  name: string
  description: string
  appId: string
  appName: string
}

// Sample actions for each integration - in production, these would be fetched from Composio API
export const COMPOSIO_ACTIONS: Record<string, ComposioAction[]> = {
  slack: [
    {
      id: "slack_send_message",
      name: "Send message",
      description: "Send a message to a channel or user",
      appId: "slack",
      appName: "Slack",
    },
    {
      id: "slack_list_channels",
      name: "List channels",
      description: "Get all channels in workspace",
      appId: "slack",
      appName: "Slack",
    },
    {
      id: "slack_create_channel",
      name: "Create channel",
      description: "Create a new channel",
      appId: "slack",
      appName: "Slack",
    },
    { id: "slack_get_user", name: "Get user", description: "Get user information", appId: "slack", appName: "Slack" },
    {
      id: "slack_list_users",
      name: "List users",
      description: "Get all users in workspace",
      appId: "slack",
      appName: "Slack",
    },
  ],
  "microsoft-teams": [
    {
      id: "teams_send_message",
      name: "Send message",
      description: "Send a message to a channel",
      appId: "microsoft-teams",
      appName: "Microsoft Teams",
    },
    {
      id: "teams_create_meeting",
      name: "Create meeting",
      description: "Schedule a new meeting",
      appId: "microsoft-teams",
      appName: "Microsoft Teams",
    },
    {
      id: "teams_list_channels",
      name: "List channels",
      description: "Get all channels in a team",
      appId: "microsoft-teams",
      appName: "Microsoft Teams",
    },
  ],
  jira: [
    {
      id: "jira_create_issue",
      name: "Create issue",
      description: "Create a new issue in a project",
      appId: "jira",
      appName: "Jira",
    },
    {
      id: "jira_update_issue",
      name: "Update issue",
      description: "Update an existing issue",
      appId: "jira",
      appName: "Jira",
    },
    { id: "jira_get_issue", name: "Get issue", description: "Get issue details", appId: "jira", appName: "Jira" },
    {
      id: "jira_list_issues",
      name: "List issues",
      description: "Search and list issues",
      appId: "jira",
      appName: "Jira",
    },
    {
      id: "jira_add_comment",
      name: "Add comment",
      description: "Add a comment to an issue",
      appId: "jira",
      appName: "Jira",
    },
    {
      id: "jira_assign_issue",
      name: "Assign issue",
      description: "Assign an issue to a user",
      appId: "jira",
      appName: "Jira",
    },
  ],
  confluence: [
    {
      id: "confluence_create_page",
      name: "Create page",
      description: "Create a new page in a space",
      appId: "confluence",
      appName: "Confluence",
    },
    {
      id: "confluence_update_page",
      name: "Update page",
      description: "Update an existing page",
      appId: "confluence",
      appName: "Confluence",
    },
    {
      id: "confluence_get_page",
      name: "Get page",
      description: "Get page content",
      appId: "confluence",
      appName: "Confluence",
    },
    {
      id: "confluence_search",
      name: "Search",
      description: "Search for content",
      appId: "confluence",
      appName: "Confluence",
    },
  ],
  airtable: [
    {
      id: "airtable_create_record",
      name: "Create record",
      description: "Create a new record in a table",
      appId: "airtable",
      appName: "Airtable",
    },
    {
      id: "airtable_update_record",
      name: "Update record",
      description: "Update an existing record",
      appId: "airtable",
      appName: "Airtable",
    },
    {
      id: "airtable_list_records",
      name: "List records",
      description: "Get records from a table",
      appId: "airtable",
      appName: "Airtable",
    },
    {
      id: "airtable_delete_record",
      name: "Delete record",
      description: "Delete a record",
      appId: "airtable",
      appName: "Airtable",
    },
  ],
  notion: [
    {
      id: "notion_create_page",
      name: "Create page",
      description: "Create a new page",
      appId: "notion",
      appName: "Notion",
    },
    {
      id: "notion_update_page",
      name: "Update page",
      description: "Update page content",
      appId: "notion",
      appName: "Notion",
    },
    {
      id: "notion_query_database",
      name: "Query database",
      description: "Query a database",
      appId: "notion",
      appName: "Notion",
    },
    {
      id: "notion_create_database",
      name: "Create database",
      description: "Create a new database",
      appId: "notion",
      appName: "Notion",
    },
  ],
  gmail: [
    { id: "gmail_send_email", name: "Send email", description: "Send an email", appId: "gmail", appName: "Gmail" },
    {
      id: "gmail_list_emails",
      name: "List emails",
      description: "Get emails from inbox",
      appId: "gmail",
      appName: "Gmail",
    },
    { id: "gmail_get_email", name: "Get email", description: "Get email details", appId: "gmail", appName: "Gmail" },
    {
      id: "gmail_search_emails",
      name: "Search emails",
      description: "Search for emails",
      appId: "gmail",
      appName: "Gmail",
    },
    {
      id: "gmail_create_draft",
      name: "Create draft",
      description: "Create an email draft",
      appId: "gmail",
      appName: "Gmail",
    },
  ],
  "google-calendar": [
    {
      id: "gcal_create_event",
      name: "Create event",
      description: "Create a new calendar event",
      appId: "google-calendar",
      appName: "Google Calendar",
    },
    {
      id: "gcal_update_event",
      name: "Update event",
      description: "Update an existing event",
      appId: "google-calendar",
      appName: "Google Calendar",
    },
    {
      id: "gcal_list_events",
      name: "List events",
      description: "Get calendar events",
      appId: "google-calendar",
      appName: "Google Calendar",
    },
    {
      id: "gcal_delete_event",
      name: "Delete event",
      description: "Delete a calendar event",
      appId: "google-calendar",
      appName: "Google Calendar",
    },
  ],
  "google-drive": [
    {
      id: "gdrive_upload_file",
      name: "Upload file",
      description: "Upload a file to Drive",
      appId: "google-drive",
      appName: "Google Drive",
    },
    {
      id: "gdrive_list_files",
      name: "List files",
      description: "Get files from Drive",
      appId: "google-drive",
      appName: "Google Drive",
    },
    {
      id: "gdrive_download_file",
      name: "Download file",
      description: "Download a file",
      appId: "google-drive",
      appName: "Google Drive",
    },
    {
      id: "gdrive_create_folder",
      name: "Create folder",
      description: "Create a new folder",
      appId: "google-drive",
      appName: "Google Drive",
    },
    {
      id: "gdrive_share_file",
      name: "Share file",
      description: "Share a file with others",
      appId: "google-drive",
      appName: "Google Drive",
    },
  ],
  outlook: [
    {
      id: "outlook_send_email",
      name: "Send email",
      description: "Send an email",
      appId: "outlook",
      appName: "Outlook",
    },
    {
      id: "outlook_list_emails",
      name: "List emails",
      description: "Get emails from inbox",
      appId: "outlook",
      appName: "Outlook",
    },
    {
      id: "outlook_create_event",
      name: "Create event",
      description: "Create a calendar event",
      appId: "outlook",
      appName: "Outlook",
    },
    {
      id: "outlook_list_events",
      name: "List events",
      description: "Get calendar events",
      appId: "outlook",
      appName: "Outlook",
    },
  ],
  "office-365": [
    {
      id: "o365_create_document",
      name: "Create document",
      description: "Create a new document",
      appId: "office-365",
      appName: "Office 365",
    },
    {
      id: "o365_edit_document",
      name: "Edit document",
      description: "Edit an existing document",
      appId: "office-365",
      appName: "Office 365",
    },
    {
      id: "o365_list_documents",
      name: "List documents",
      description: "Get all documents",
      appId: "office-365",
      appName: "Office 365",
    },
  ],
  sharepoint: [
    {
      id: "sharepoint_upload_file",
      name: "Upload file",
      description: "Upload a file to SharePoint",
      appId: "sharepoint",
      appName: "SharePoint",
    },
    {
      id: "sharepoint_list_files",
      name: "List files",
      description: "Get files from a site",
      appId: "sharepoint",
      appName: "SharePoint",
    },
    {
      id: "sharepoint_create_list",
      name: "Create list",
      description: "Create a new list",
      appId: "sharepoint",
      appName: "SharePoint",
    },
    {
      id: "sharepoint_update_item",
      name: "Update item",
      description: "Update a list item",
      appId: "sharepoint",
      appName: "SharePoint",
    },
  ],
  salesforce: [
    {
      id: "sf_create_lead",
      name: "Create lead",
      description: "Create a new lead",
      appId: "salesforce",
      appName: "Salesforce",
    },
    {
      id: "sf_update_lead",
      name: "Update lead",
      description: "Update an existing lead",
      appId: "salesforce",
      appName: "Salesforce",
    },
    {
      id: "sf_get_lead",
      name: "Get lead",
      description: "Get lead details",
      appId: "salesforce",
      appName: "Salesforce",
    },
    {
      id: "sf_create_opportunity",
      name: "Create opportunity",
      description: "Create a new opportunity",
      appId: "salesforce",
      appName: "Salesforce",
    },
    {
      id: "sf_list_accounts",
      name: "List accounts",
      description: "Get all accounts",
      appId: "salesforce",
      appName: "Salesforce",
    },
  ],
  hubspot: [
    {
      id: "hs_create_contact",
      name: "Create contact",
      description: "Create a new contact",
      appId: "hubspot",
      appName: "HubSpot",
    },
    {
      id: "hs_update_contact",
      name: "Update contact",
      description: "Update a contact",
      appId: "hubspot",
      appName: "HubSpot",
    },
    {
      id: "hs_create_deal",
      name: "Create deal",
      description: "Create a new deal",
      appId: "hubspot",
      appName: "HubSpot",
    },
    {
      id: "hs_list_contacts",
      name: "List contacts",
      description: "Get all contacts",
      appId: "hubspot",
      appName: "HubSpot",
    },
  ],
  zendesk: [
    {
      id: "zd_create_ticket",
      name: "Create ticket",
      description: "Create a new support ticket",
      appId: "zendesk",
      appName: "Zendesk",
    },
    {
      id: "zd_update_ticket",
      name: "Update ticket",
      description: "Update a ticket",
      appId: "zendesk",
      appName: "Zendesk",
    },
    {
      id: "zd_list_tickets",
      name: "List tickets",
      description: "Get all tickets",
      appId: "zendesk",
      appName: "Zendesk",
    },
    {
      id: "zd_add_comment",
      name: "Add comment",
      description: "Add a comment to a ticket",
      appId: "zendesk",
      appName: "Zendesk",
    },
  ],
}

// Get actions for specific tools
export function getActionsForTools(tools: string[]): ComposioAction[] {
  const actions: ComposioAction[] = []

  tools.forEach((tool) => {
    const toolId = tool.toLowerCase().replace(/\s+/g, "-")
    const toolActions = COMPOSIO_ACTIONS[toolId] || []
    actions.push(...toolActions)
  })

  return actions
}

const integrations = [
  { name: "Slack", category: "Communication" },
  { name: "Microsoft Teams", category: "Communication" },
  { name: "Google Drive", category: "Storage" },
  { name: "Salesforce", category: "CRM" },
  { name: "Jira", category: "Project Management" },
  { name: "GitHub", category: "Development" },
  { name: "Notion", category: "Documentation" },
  { name: "HubSpot", category: "Marketing" },
  { name: "Zendesk", category: "Support" },
  { name: "Asana", category: "Project Management" },
  { name: "Confluence", category: "Documentation" },
  { name: "Linear", category: "Project Management" },
]

export function Integrations() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Integrations</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Connect your entire tech stack</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Native integrations with 50+ business tools. Sync data in real-time and automate workflows across your
            organization.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center gap-2"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="font-medium text-sm">{integration.name}</div>
              <div className="text-xs text-muted-foreground">{integration.category}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Don't see your tool? Build custom integrations with our API.</p>
          <a href="/integrations" className="text-primary font-medium hover:underline">
            View all integrations →
          </a>
        </div>
      </div>
    </section>
  )
}

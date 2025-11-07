import { Card } from "@/components/ui/card"

export function TwoAudiences() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">The Platform</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">One platform. Two audiences.</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Enterprise-ready solution for rolling out AI to all employees while enabling developers to build custom
            workflows.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 border-2">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                For Everyone
              </div>
              <h3 className="text-2xl font-bold mb-3">For everyone in the company</h3>
              <p className="text-muted-foreground leading-relaxed">
                Roll out powerful AI chat and use-case-specific assistants to everyone. Model-agnostic and data privacy
                compliant.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <svg
                  className="w-5 h-5 text-primary flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 6L8 15L4 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-medium">AI Chat - Powerful multi-model interface</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <svg
                  className="w-5 h-5 text-primary flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 6L8 15L4 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-medium">Assistants - Use-case specific AI</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <svg
                  className="w-5 h-5 text-primary flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 6L8 15L4 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-medium">Integrations - Connect your tools</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg border bg-card">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-primary"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M16 16C16 13.2386 13.3137 11 10 11C6.68629 11 4 13.2386 4 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground italic">
                    "How can I speed up the design phase of my engineering project?"
                  </p>
                  <p className="text-sm mt-2">
                    Consider using CAD software templates for standard components to accelerate Project Caroso's design
                    phase.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-2">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                For Developers
              </div>
              <h3 className="text-2xl font-bold mb-3">For your developers</h3>
              <p className="text-muted-foreground leading-relaxed">
                Automate repetitive tasks with human-in-the-loop. Build custom AI applications and distribute them
                company-wide.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <svg
                  className="w-5 h-5 text-primary flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 6L8 15L4 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-medium">Workflows - Automate repetitive tasks</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <svg
                  className="w-5 h-5 text-primary flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 6L8 15L4 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-medium">API - All models, one unified API</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg border bg-card">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Enrich support requests</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium">
                    Completed
                  </span>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>New support request • 1m ago</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Thought for 15 seconds • 44s ago</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Called action "New spreadsheet row" • 28s ago</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>Task completed • 2s ago</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

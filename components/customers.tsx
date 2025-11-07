import { Card } from "@/components/ui/card"

const stats = [
  { value: "25K+", label: "Active Users", company: "Global Pharma" },
  { value: "700+", label: "Team Members", company: "TravelTech Co" },
  { value: "75%", label: "Adoption Rate", company: "Beauty Brand" },
  { value: "1500+", label: "Employees", company: "HR Platform" },
]

export function Customers() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Customers</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Measurable impact on hundreds of organizations globally
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple to get started but flexible enough to accommodate your most custom workflows.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm font-medium mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.company}</div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-6">Trusted by 1500+ companies worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {["Acme Corp", "TechStart", "DataFlow", "CloudSync", "InnovateLab", "NextGen"].map((company) => (
              <div key={company} className="text-lg font-semibold">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

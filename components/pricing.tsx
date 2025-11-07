import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out AgentFlow",
    features: [
      "10 messages per day",
      "1 custom assistant",
      "Basic integrations",
      "Community support",
      "Access to GPT-3.5",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$29",
    period: "per user/month",
    description: "For individuals and small teams",
    features: [
      "Unlimited messages",
      "10 custom assistants",
      "All integrations",
      "5 workflows",
      "Email support",
      "100K tokens/month included",
      "Access to all models",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$49",
    period: "per user/month",
    description: "For growing teams and companies",
    features: [
      "Everything in Professional",
      "Unlimited assistants & workflows",
      "Advanced analytics",
      "SSO & MFA",
      "Priority support",
      "500K tokens/month included",
      "API access",
      "Custom model training",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    description: "For large organizations",
    features: [
      "Everything in Business",
      "Private deployment options",
      "Dedicated support team",
      "SLA guarantees",
      "Unlimited tokens",
      "Volume discounts",
      "Custom contracts",
      "On-premises deployment",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Pricing</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Simple, <span className="text-gradient">transparent pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free, scale as you grow. All plans include 7-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-6 flex flex-col transition-all duration-300 hover:shadow-xl ${
                plan.highlighted
                  ? "border-2 border-transparent shadow-lg scale-105 relative overflow-hidden before:absolute before:inset-0 before:gradient-ai-primary before:-z-10 before:p-[2px] before:rounded-lg before:content-['']"
                  : "hover:border-primary/20"
              }`}
            >
              {plan.highlighted && (
                <div className="text-xs font-semibold gradient-ai-accent text-white px-3 py-1 rounded-full mb-4 uppercase tracking-wide w-fit">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/{plan.period}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2 text-sm">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 6L7.5 15L3.5 11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full" variant={plan.highlighted ? "default" : "outline"} size="lg">
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            All plans include access to our API and developer tools.{" "}
            <a href="/pricing" className="text-primary font-medium hover:underline">
              View detailed pricing →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

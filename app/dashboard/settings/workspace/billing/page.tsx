"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Check, Info } from "lucide-react"

export default function BillingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")

  const trialEndDate = "10/22/25"
  const usedCredits = 0.04
  const totalCredits = 5.0
  const userCount = 1

  const plans = [
    {
      name: "Trial",
      price: "Free",
      period: "",
      description: `Active until the ${trialEndDate}`,
      features: ["10 messages per day", "1 custom agent", "Basic integrations", "Community support"],
      cta: "Current plan",
      current: true,
    },
    {
      name: "Professional",
      price: billingPeriod === "monthly" ? "€29" : "€278",
      period: billingPeriod === "monthly" ? "Per user / month" : "Per user / year",
      description: "For individuals and small teams",
      features: ["Unlimited messages", "10 custom agents", "All integrations", "Email support", "Access to all models"],
      cta: "Upgrade",
      highlighted: true,
      aiModelsIncluded: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Per user / month",
      description: "For large organizations",
      features: [
        "Everything in Professional",
        "Unlimited agents",
        "Advanced analytics",
        "Priority support",
        "Custom contracts",
      ],
      cta: "Contact us",
      dark: true,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Billing</h1>
        <p className="text-muted-foreground">See your plan, how much you pay and more.</p>
      </div>

      {/* Cost overview */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-foreground">Cost overview</h2>
          <Badge variant="outline" className="text-xs">
            Trial
          </Badge>
        </div>

        <div>
          <div className="text-4xl font-bold mb-2">Free</div>
          <p className="text-sm text-muted-foreground">
            Trial: €{usedCredits.toFixed(2)} / €{totalCredits.toFixed(2)} model credits used.{" "}
            <a href="#" className="text-primary hover:underline">
              Learn more
            </a>
          </p>
        </div>

        <div className="flex items-center justify-between py-3 border-t">
          <span className="text-sm text-muted-foreground">Chat & Agents ({userCount} User)</span>
          <span className="text-sm font-medium">Used €{usedCredits.toFixed(2)} model credits</span>
        </div>
      </div>

      {/* Current plan card */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
              <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-foreground">Trial</div>
              <div className="text-sm text-muted-foreground">Ends on {trialEndDate}</div>
            </div>
          </div>
          <Button>
            Upgrade
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Chat & Agents product section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Chat & Agents</h3>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-sm">
              <span className="font-medium">{userCount} User</span>
            </div>
            <Button variant="ghost" size="sm">
              Manage members
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Billing period toggle */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Billing:</span>
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                billingPeriod === "monthly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                billingPeriod === "annual"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                20% off
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-6 flex flex-col ${
                plan.highlighted ? "border-2 border-primary" : ""
              } ${plan.dark ? "bg-foreground text-background" : ""}`}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <div className="text-3xl font-bold mb-1">{plan.price}</div>
                  {plan.period && (
                    <div className={`text-sm ${plan.dark ? "text-background/70" : "text-muted-foreground"}`}>
                      {plan.period}
                    </div>
                  )}
                </div>
                {plan.aiModelsIncluded && (
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    <span>AI Models included</span>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
                {plan.description && !plan.aiModelsIncluded && (
                  <p className={`text-sm ${plan.dark ? "text-background/70" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                )}
              </div>

              <div className="flex-1" />

              <Button
                variant={plan.current ? "outline" : plan.dark ? "secondary" : "default"}
                className="w-full"
                disabled={plan.current}
              >
                {plan.cta}
                {!plan.current && plan.cta !== "Contact us" && <ArrowUpRight className="ml-2 h-4 w-4" />}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

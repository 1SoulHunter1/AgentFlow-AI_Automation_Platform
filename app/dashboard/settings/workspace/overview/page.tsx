"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Bot, Search, Check, ChevronRight, Sparkles } from "lucide-react"

export default function WorkspaceOverviewPage() {
  const products = [
    {
      icon: MessageSquare,
      title: "Chat",
      description: "Empower your employees with LLMs while staying in full control of your data.",
      active: true,
      color: "text-blue-600",
    },
    {
      icon: Bot,
      title: "Agents",
      description: "Build use-case specific agents with special knowledge and instructions.",
      active: true,
      color: "text-purple-600",
    },
    {
      icon: Search,
      title: "Deep research",
      description: "Conduct multi-step research on the internet for complex tasks.",
      active: true,
      color: "text-indigo-600",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Overview</h1>
        <p className="text-sm text-muted-foreground">Quick overview about your workspace</p>
      </div>

      {/* Explore products section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-foreground mb-4">Explore products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => {
            const Icon = product.icon
            return (
              <Card key={product.title} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-muted ${product.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-medium text-foreground">{product.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="gap-1">
                    <Check className="h-3 w-3" />
                    Active
                  </Badge>
                  <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                    Learn more
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Plan section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-foreground mb-4">Plan</h2>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <Sparkles className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-base font-medium text-foreground">Trial</h3>
                <p className="text-sm text-muted-foreground">Ends on 10/22/25</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
              Manage billing & invoices
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Usage section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-foreground">Usage</h2>
          <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
            See more
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-foreground mb-1">Active Users</h3>
              <p className="text-xs text-muted-foreground">1 in the past 30 days</p>
            </div>
            <div className="h-24 flex items-end">
              <div className="w-full h-16 bg-muted rounded-sm relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-3/4 bg-blue-600 rounded-sm" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-foreground mb-1">Users in Workspace</h3>
              <p className="text-xs text-muted-foreground">Users</p>
            </div>
            <div className="flex items-center justify-center h-24">
              <p className="text-5xl font-semibold text-foreground">1</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-foreground mb-1">All-time Messages</h3>
              <p className="text-xs text-muted-foreground">Chat + Agents</p>
            </div>
            <div className="flex items-center justify-center h-24">
              <p className="text-5xl font-semibold text-foreground">9</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

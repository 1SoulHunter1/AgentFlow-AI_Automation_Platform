"use client"

import type React from "react"

import {
  ChevronLeft,
  User,
  SettingsIcon,
  Users,
  Building2,
  CreditCard,
  LayoutGrid,
  Bot,
  BarChart3,
  Sliders,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface SettingsLayoutProps {
  children: React.ReactNode
}

const settingsNav = [
  {
    title: "Account",
    items: [
      { name: "Profile", href: "/dashboard/settings/profile", icon: User },
      { name: "Preferences", href: "/dashboard/settings/preferences", icon: SettingsIcon },
    ],
  },
  {
    title: "Workspace",
    items: [
      { name: "Overview", href: "/dashboard/settings/workspace/overview", icon: LayoutGrid },
      { name: "General", href: "/dashboard/settings/workspace/general", icon: SettingsIcon },
      { name: "Billing", href: "/dashboard/settings/workspace/billing", icon: CreditCard },
      {
        name: "User management",
        href: "/dashboard/settings/workspace/user-management",
        icon: Users,
        subItems: [
          { name: "Members", href: "/dashboard/settings/workspace/user-management/members" },
          { name: "Roles", href: "/dashboard/settings/workspace/user-management/roles" },
        ],
      },
      {
        name: "Products",
        href: "/dashboard/settings/workspace/products",
        icon: Building2,
        subItems: [
          { name: "Chat", href: "/dashboard/settings/workspace/products/chat" },
          { name: "Agents", href: "/dashboard/settings/workspace/products/agents" },
          { name: "API", href: "/dashboard/settings/workspace/products/api" },
          { name: "Integrations", href: "/dashboard/settings/workspace/products/integrations" },
          { name: "Deep research", href: "/dashboard/settings/workspace/products/deep-research" },
        ],
      },
      { name: "Models", href: "/dashboard/settings/workspace/models", icon: Bot },
      { name: "Analytics", href: "/dashboard/settings/workspace/analytics", icon: BarChart3 },
      { name: "Customizations", href: "/dashboard/settings/workspace/customizations", icon: Sliders },
    ],
  },
]

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-full">
      {/* Settings Sidebar */}
      <div className="w-56 border-r border-border bg-background p-4">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="font-semibold text-foreground">Settings</span>
          </Link>
        </div>

        <nav className="space-y-6">
          {settingsNav.map((section) => (
            <div key={section.title}>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                {section.title === "Account" ? <User className="h-3 w-3" /> : <Building2 className="h-3 w-3" />}
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                          isActive
                            ? "bg-secondary font-medium text-foreground"
                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                      {item.subItems && (
                        <div className="ml-6 mt-1 space-y-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={cn(
                                "block rounded-md px-2 py-1 text-sm transition-colors",
                                pathname === subItem.href
                                  ? "bg-secondary font-medium text-foreground"
                                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                              )}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl p-8">{children}</div>
      </div>
    </div>
  )
}

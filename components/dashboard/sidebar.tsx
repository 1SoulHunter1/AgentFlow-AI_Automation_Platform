"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
}

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const router = useRouter()

  const navItems = [
    { icon: "pencil", label: "New chat", href: "/dashboard" },
    { icon: "search", label: "Chat History", href: "/dashboard/search" },
  ]

  const mainItems = [
    { icon: "assistants", label: "Agents", href: "/dashboard/assistants" },
    { icon: "library", label: "Prompt library", href: "/dashboard/prompts" },
    { icon: "integrations", label: "Integrations", href: "/dashboard/integrations" },
  ]

  const recentChats: Array<{ id: string; title: string; date: string }> = []
  // To show chats, uncomment: [{ id: "1", title: "How are you", date: "Last 7 days" }]

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-muted/30 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-border px-3">
        {!collapsed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted/50 transition-colors">
                <Logo size="sm" showText />
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem
                className="cursor-pointer py-2.5"
                onClick={() => router.push("/dashboard/settings/profile")}
              >
                <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Account settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer py-2.5"
                onClick={() => router.push("/dashboard/settings/workspace/overview")}
              >
                <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H5m13.2 5.2l-4.2-4.2m0-6l4.2-4.2" />
                </svg>
                <span>Workspace settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer py-2.5"
                onClick={() => router.push("/dashboard/settings/workspace/user-management")}
              >
                <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75" />
                </svg>
                <span>Add team members</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer py-2.5">
                <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 3 21 3 21 8" />
                  <line x1="4" y1="20" x2="21" y2="3" />
                  <polyline points="21 16 21 21 16 21" />
                  <line x1="15" y1="15" x2="21" y2="21" />
                  <line x1="4" y1="4" x2="9" y2="9" />
                </svg>
                <span>Switch workspace</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2.5">
                <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <button
          onClick={onToggleCollapse}
          className="rounded-md p-1.5 hover:bg-muted/50 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground">
            <path
              d="M3 2h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M6 2v12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-3 px-2">
        {/* Quick Actions */}
        <nav className="space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-normal text-foreground/70 hover:bg-muted/50 hover:text-foreground transition-colors"
            >
              <NavIcon icon={item.icon} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Main Items */}
        <nav className="mt-4 space-y-0.5">
          {mainItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-normal text-foreground/70 hover:bg-muted/50 hover:text-foreground transition-colors"
            >
              <NavIcon icon={item.icon} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Projects Section */}
        {!collapsed && (
          <>
            <div className="mt-6 mb-2 px-3">
              <h3 className="text-xs font-medium text-muted-foreground">Projects</h3>
            </div>
            <Link
              href="/dashboard/projects/new"
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-normal text-foreground/70 hover:bg-muted/50 hover:text-foreground transition-colors"
            >
              <NavIcon icon="folder" />
              <span>New project</span>
            </Link>

            {/* Recent Chats - Only show if there are chats */}
            {recentChats.length > 0 && (
              <>
                <div className="mt-6 mb-2 px-3">
                  <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <span>Last 7 days</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-0.5">
                  {recentChats.map((chat) => (
                    <Link
                      key={chat.id}
                      href={`/dashboard/chat/${chat.id}`}
                      className="block rounded-md px-3 py-2.5 text-sm font-normal text-foreground/70 hover:bg-muted/50 hover:text-foreground transition-colors truncate"
                    >
                      {chat.title}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </aside>
  )
}

function NavIcon({ icon }: { icon: string }) {
  const icons = {
    pencil: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    search: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    assistants: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    library: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    integrations: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    folder: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  }

  return icons[icon as keyof typeof icons] || null
}

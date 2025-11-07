"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { getAllChats, deleteChat, formatRelativeTime, type Chat } from "@/lib/chat-storage"

export default function ChatHistoryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [chatHistory, setChatHistory] = useState<Chat[]>([])
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null)

  // Load chats on mount
  useEffect(() => {
    loadChats()
  }, [])

  const loadChats = () => {
    const chats = getAllChats()
    setChatHistory(chats)
  }

  const filteredChats = chatHistory.filter((chat) => chat.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleChatClick = (chatId: string) => {
    router.push(`/dashboard?chat=${chatId}`)
  }

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation()
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(chatId)
      loadChats()
    }
  }

  const handleNewChat = () => {
    router.push("/dashboard")
  }

  return (
    <DashboardLayout>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-8 py-6">
          <h1 className="text-3xl font-semibold text-foreground">Your chat history</h1>
          <Button
            onClick={handleNewChat}
            className="gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0"
          >
            <Plus className="h-4 w-4" />
            New chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search your chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 text-base"
            />
          </div>

          {/* Chat List */}
          <div className="space-y-3">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleChatClick(chat.id)}
                onMouseEnter={() => setHoveredChatId(chat.id)}
                onMouseLeave={() => setHoveredChatId(null)}
                className="w-full rounded-lg border border-border bg-card p-5 text-left transition-colors hover:bg-muted/50 relative group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-foreground mb-1.5 truncate">{chat.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Last message {formatRelativeTime(chat.updatedAt)}</span>
                      {chat.shared && (
                        <>
                          <span className="text-muted-foreground/50">•</span>
                          <span className="text-xs font-medium text-muted-foreground">Shared</span>
                        </>
                      )}
                    </div>
                  </div>
                  {hoveredChatId === chat.id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDeleteChat(e, chat.id)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </button>
            ))}
          </div>

          {filteredChats.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground">
                {searchQuery ? `No chats found matching "${searchQuery}"` : "No chat history yet. Start a new chat!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

// Chat storage utilities for managing chat history
export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  toolsUsed?: Array<{
    name: string
    action: string
    status: "loading" | "complete"
  }>
  sources?: Array<{
    domain: string
    title: string
    snippet: string
    url: string
  }>
}

export interface Chat {
  id: string
  title: string
  model: string
  createdAt: Date
  updatedAt: Date
  messages: ChatMessage[]
  shared?: boolean
}

// Local storage key
const CHATS_STORAGE_KEY = "agentflow_chats"

// Get all chats from localStorage
export function getAllChats(): Chat[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(CHATS_STORAGE_KEY)
    if (!stored) return []

    const chats = JSON.parse(stored)
    // Convert date strings back to Date objects
    return chats.map((chat: any) => ({
      ...chat,
      createdAt: new Date(chat.createdAt),
      updatedAt: new Date(chat.updatedAt),
      messages: chat.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })),
    }))
  } catch (error) {
    console.error("Error loading chats:", error)
    return []
  }
}

// Get a single chat by ID
export function getChatById(id: string): Chat | null {
  const chats = getAllChats()
  return chats.find((chat) => chat.id === id) || null
}

// Save a new chat or update existing
export function saveChat(chat: Chat): void {
  if (typeof window === "undefined") return

  try {
    const chats = getAllChats()
    const existingIndex = chats.findIndex((c) => c.id === chat.id)

    if (existingIndex >= 0) {
      chats[existingIndex] = chat
    } else {
      chats.unshift(chat) // Add to beginning
    }

    localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(chats))
  } catch (error) {
    console.error("Error saving chat:", error)
  }
}

// Delete a chat
export function deleteChat(id: string): void {
  if (typeof window === "undefined") return

  try {
    const chats = getAllChats()
    const filtered = chats.filter((chat) => chat.id !== id)
    localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error("Error deleting chat:", error)
  }
}

// Generate a title from the first user message
export function generateChatTitle(firstMessage: string): string {
  // Take first 50 characters and clean up
  const title = firstMessage.slice(0, 50).trim()
  return title.length < firstMessage.length ? `${title}...` : title
}

// Format relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`

  return date.toLocaleDateString()
}

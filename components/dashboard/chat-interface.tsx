"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { saveChat, getChatById, generateChatTitle, type Chat } from "@/lib/chat-storage"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: Date
}

interface Source {
  domain: string
  title: string
  snippet: string
  url: string
  favicon?: string
}

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n")
  return (
    <div className="text-sm leading-relaxed text-foreground space-y-2">
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  )
}

export function ChatInterface() {
  const searchParams = useSearchParams()
  const chatId = searchParams?.get("chat")

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sources, setSources] = useState<Source[]>([])
  const [deepResearchEnabled, setDeepResearchEnabled] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (chatId) {
      const existingChat = getChatById(chatId)
      if (existingChat) {
        setMessages(
          existingChat.messages.map((msg) => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
            createdAt: msg.timestamp,
          })),
        )
      }
    }
  }, [chatId])

  const detectTools = (prompt: string) => ({
    webSearch: /search|find|discover|latest|news/i.test(prompt),
    summarization: /summarize|summary|overview/i.test(prompt),
  })

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input.trim(),
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    if (deepResearchEnabled) {
      await runDeepResearch(userMessage)
    } else {
      await runNormalAgent(userMessage)
    }

    setIsLoading(false)
  }

  const runNormalAgent = async (userMessage: Message) => {
    const tools = detectTools(userMessage.content)

    try {
      const response = await fetch("/api/agents/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          tools,
        }),
      })

      if (!response.ok) throw new Error(`API error: ${response.status}`)

      const data = await response.json()
      const resultText = data.result || data.text || ""
      const parsedSources = parseSourcesFromText(resultText)

      setSources(parsedSources)

      const assistantMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: "assistant",
        content: cleanSummaryText(resultText),
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error("[AgentFlow] Normal Agent Error:", err)
      setError(err instanceof Error ? err.message : "Agent failed.")
    }
  }

  // 🧠 Deep Research Mode → Iteratively search & summarize multiple times
  const runDeepResearch = async (userMessage: Message) => {
    const query = userMessage.content
    const subQueries = [
      `${query} latest insights 2025`,
      `${query} funding or investors`,
      `${query} technology stack or architecture`,
      `${query} use cases or impact`,
    ]

    let aggregatedText = ""
    let allSources: Source[] = []

    for (let i = 0; i < subQueries.length; i++) {
      const q = subQueries[i]
      console.log(`[DeepResearch] Round ${i + 1} → ${q}`)

      const response = await fetch("/api/agents/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: q }],
          tools: { webSearch: true, summarization: true },
        }),
      })

      const data = await response.json()
      const textChunk = data.result || data.text || ""
      aggregatedText += `\n\n## 🔍 ${q}\n${cleanSummaryText(textChunk)}`
      allSources = [...allSources, ...parseSourcesFromText(textChunk)]

      // Progressive assistant update
      setMessages((prev) => [
        ...prev.filter((m) => m.role !== "assistant"),
        {
          id: `deep-${i}-msg`,
          role: "assistant",
          content: aggregatedText,
          createdAt: new Date(),
        },
      ])
    }

    // Final aggregation summary
    const finalResponse = await fetch("/api/agents/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "Combine all research findings below into one cohesive expert summary." },
          { role: "user", content: aggregatedText },
        ],
        tools: { summarization: true },
      }),
    })

    const finalData = await finalResponse.json()
    const finalSummary = finalData.result || finalData.text || aggregatedText

    setMessages((prev) => [
      ...prev,
      {
        id: `deep-final-${Date.now()}`,
        role: "assistant",
        content: `🧠 **Final Deep Research Summary:**\n\n${finalSummary}`,
        createdAt: new Date(),
      },
    ])
    setSources(allSources)
  }

  // Extract sources from text
  function parseSourcesFromText(text: string): Source[] {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const urls = text.match(urlRegex) || []
    return urls.slice(0, 8).map((url) => {
      const domain = new URL(url).hostname.replace("www.", "")
      return {
        domain,
        title: domain.split(".")[0].toUpperCase(),
        snippet: "Referenced in web research.",
        url,
      }
    })
  }

  // Clean up unwanted text
  function cleanSummaryText(text: string) {
    if (!text) return "No summary available."
    return text
      .replace(/🌐 Top search results[^]+?(?=📝|$)/, "")
      .replace(/https?:\/\/\S+/g, "")
      .trim()
  }

  return (
    <div className="flex flex-col h-full font-sans">
      {/* Error Banner */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Empty State */}
      {messages.length === 0 && (
        <div className="flex flex-1 items-center justify-center text-center">
          <div>
            <Logo size="lg" showText />
            <p className="mt-4 text-muted-foreground">
              Ask anything — toggle 🌐 Web Search or 🧠 Deep Research.
            </p>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8">
                  {msg.role === "user" ? (
                    <div className="h-8 w-8 rounded-full bg-muted border flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="7" r="4" />
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      </svg>
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <Logo size="sm" className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">{renderMarkdown(msg.content)}</div>
              </div>
            ))}

            {/* Source cards */}
            {sources.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">🔗 Sources</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sources.slice(0, 8).map((src, idx) => (
                    <a
                      key={idx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl border border-border bg-muted/30 p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${src.domain}&sz=64`}
                          alt=""
                          className="h-5 w-5 mt-1"
                        />
                        <div>
                          <h4 className="text-sm font-medium line-clamp-1 text-foreground">
                            {src.title}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">{src.snippet}</p>
                          <p className="text-xs text-blue-600 mt-1 truncate">{src.domain}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div className="border-t border-border bg-background p-4">
        <div className="mx-auto max-w-4xl flex items-center gap-2">
          <form onSubmit={handleFormSubmit} className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your question..."
              disabled={isLoading}
              className="w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm focus:outline-none disabled:opacity-50"
            />
            <Button
              type="submit"
              size="sm"
              disabled={isLoading}
              className={cn(
                "absolute right-3 top-2.5 h-9 w-9 rounded-full flex items-center justify-center transition-all",
                input.trim()
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-muted/50 text-muted-foreground",
              )}
            >
              {isLoading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              )}
            </Button>
          </form>

          {/* Deep Research Toggle */}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setDeepResearchEnabled(!deepResearchEnabled)}
            className={cn(
              "h-9 px-3 rounded-xl text-xs font-medium border transition-colors",
              deepResearchEnabled
                ? "bg-blue-600 text-white border-blue-700"
                : "border-border hover:bg-muted/50 text-muted-foreground",
            )}
          >
            🧠 Deep Research
          </Button>
        </div>
      </div>
    </div>
  )
}

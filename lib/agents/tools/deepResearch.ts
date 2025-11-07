// lib/agents/tools/deepResearch.ts
import Groq from "groq-sdk"
import { summarizeText } from "./summarize" // re-use your existing Groq summarizer

const TAVILY_API_KEY = process.env.TAVILY_API_KEY || ""
const GROQ_API_KEY = process.env.GROQ_API_KEY || ""

// Safe default; you can override with GROQ_MODEL in .env
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile"

type TavilyResult = {
  query: string
  results: Array<{
    title: string
    url: string
    content: string
  }>
}

const groq = new Groq({ apiKey: GROQ_API_KEY })

async function tavilySearch(query: string): Promise<TavilyResult> {
  if (!TAVILY_API_KEY) {
    // Offline/mock fallback so the UI doesn’t break during demos
    return {
      query,
      results: [
        {
          title: `Mock: ${query}`,
          url: "https://example.com",
          content:
            "This is a mock Tavily result because TAVILY_API_KEY is not set. Add TAVILY_API_KEY to .env.local for real results.",
        },
      ],
    }
  }

  const resp = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: TAVILY_API_KEY,
      query,
      search_depth: "advanced",
      include_answer: false,
      include_images: false,
      max_results: 5,
    }),
  })

  if (!resp.ok) {
    const text = await resp.text().catch(() => "")
    throw new Error(`Tavily search failed (${resp.status}): ${text}`)
  }

  const data = await resp.json()
  const results =
    (data?.results || []).map((r: any) => ({
      title: r.title || "Untitled",
      url: r.url || "",
      content: r.content || r.snippet || "",
    })) ?? []

  return { query, results }
}

async function expandQueries(userPrompt: string): Promise<string[]> {
  if (!GROQ_API_KEY) {
    // Keep working without Groq (fallback)
    return [
      userPrompt,
      `${userPrompt} funding and investors`,
      `${userPrompt} market size and trends`,
      `${userPrompt} key players and competitors`,
    ]
  }

  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content:
          "You expand a research question into 3–5 highly specific sub-queries. Return one per line, no numbering.",
      },
      { role: "user", content: userPrompt },
    ],
  })

  const text = completion.choices?.[0]?.message?.content?.trim() || ""
  const lines = text
    .split("\n")
    .map((l) => l.replace(/^\s*[-*\d.]+\s*/, "").trim())
    .filter(Boolean)

  // Ensure we always have at least a couple
  return lines.length ? lines.slice(0, 5) : [userPrompt, `${userPrompt} recent`, `${userPrompt} key insights`]
}

function formatSources(results: TavilyResult[]): string {
  const seen = new Set<string>()
  const lines: string[] = []
  for (const block of results) {
    for (const r of block.results) {
      if (!r.url || seen.has(r.url)) continue
      seen.add(r.url)
      const domain = (() => {
        try {
          return new URL(r.url).hostname.replace(/^www\./, "")
        } catch {
          return r.url
        }
      })()
      lines.push(`- **${r.title || domain}** — ${r.url}`)
    }
  }
  return lines.length ? lines.join("\n") : "_No sources available._"
}

export async function runDeepResearch(userPrompt: string): Promise<string> {
  // 1) Expand into focused sub-queries
  const subQueries = await expandQueries(userPrompt)

  // 2) Run searches (in parallel)
  const searchBlocks = await Promise.all(subQueries.map((q) => tavilySearch(q)))

  // 3) Build a research packet for summarization
  const researchPacket = searchBlocks
    .map((b) => {
      const items = b.results
        .map((r) => `• ${r.title}\n  URL: ${r.url}\n  Notes: ${r.content?.slice(0, 400)}…`)
        .join("\n")
      return `### Query: ${b.query}\n${items || "• No results"}`
    })
    .join("\n\n")

  const sourcesMarkdown = formatSources(searchBlocks)

  // 4) Summarize & synthesize via existing summarizer (Groq)
  const synthesisPrompt = `You are an expert research analyst. Merge and synthesize the findings below into a concise, truthful brief with sections:
- Executive Summary (5–8 bullet points)
- Key Insights
- Risks / Unknowns
- Trends & Outlook
- Recommended Next Steps

Strict rules:
- Cite by hyperlink only in a "Sources" section (do not inline number them).
- Do NOT hallucinate. If uncertain, say so.

--- BEGIN FINDINGS ---
${researchPacket}
--- END FINDINGS ---`

  const summary =
    (await summarizeText(synthesisPrompt).catch(() => "")) ||
    `**Summary (offline mock)**\n\n- Could not reach Groq. Provide GROQ_API_KEY for full synthesis.`

  // 5) Final formatted report
  return [
    `# Deep Research: ${userPrompt}`,
    "",
    "## Executive Brief",
    summary.trim(),
    "",
    "## Sources",
    sourcesMarkdown,
  ].join("\n")
}

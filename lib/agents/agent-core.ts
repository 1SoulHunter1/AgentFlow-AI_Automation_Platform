// lib/agents/agent-core.ts
import { performWebSearch } from "./tools/websearch"
import { summarizeText } from "./tools/summarize"
import { generateImage } from "./tools/imagegen"
import { runDeepResearch } from "./tools/deepResearch"

type AgentBody = {
  messages?: Array<{ role: "user" | "assistant"; content: string }>
  tools?: {
    webSearch?: boolean
    summarization?: boolean
    imageGeneration?: boolean
    deepResearch?: boolean
  }
  files?: Array<{ name: string; type: string; size: string; content?: string }>
}

export async function runAgent(body: AgentBody): Promise<string> {
  const userPrompt =
    body?.messages?.slice().reverse().find((m) => m.role === "user")?.content?.trim() || "Hello"
  const tools = body?.tools || {}

  console.log("[agent] running with:", userPrompt)
  console.log("[agent] tools:", tools)

  // 1) Deep Research supersedes other tools when enabled
  if (tools.deepResearch) {
    console.log("[agent] → deep research")
    return await runDeepResearch(userPrompt)
  }

  // 2) Simple toolchain: search -> summarize
  if (tools.webSearch && /search|find|look\s?up/i.test(userPrompt)) {
    console.log("[agent] → web search")
    const searchText = await performWebSearch(userPrompt)

    if (tools.summarization) {
      console.log("[agent] → summarization")
      const prompt = `Summarize the following search notes into a crisp brief with bullet points and a short conclusion:\n\n${searchText}`
      const summary = await summarizeText(prompt)
      return `🌐 **Search Results for:** ${userPrompt}\n\n${searchText}\n\n---\n\n📝 **Summary**\n\n${summary}`
    }

    return `🌐 **Top search results for:** ${userPrompt}\n\n${searchText}`
  }

  // 3) Image generation path (optional)
  if (tools.imageGeneration && /image|picture|photo|draw|generate/i.test(userPrompt)) {
    console.log("[agent] → image")
    const url = await generateImage(userPrompt)
    return `🖼️ **Generated Image**\n\n${url}`
  }

  // 4) Fallback – pass to LLM (your /api/chat or Groq)
  console.log("[agent] → fallback")
  return `I can research, summarize, and run deep-research. Try: "search X and summarize" or toggle Deep Research.`
}

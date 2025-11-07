export async function performWebSearch(query: string): Promise<string> {
  try {
    const apiKey = process.env.TAVILY_API_KEY
    if (!apiKey) {
      console.log("[mock] Tavily key missing — returning fake results.")
      return `1. OpenAI launches new AI startups accelerator.
2. Mistral AI raises $400M.
3. Anthropic expands Claude 3 research.`
    }

    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ query, max_results: 5 }),
    })

    const data = await response.json()
    if (!data.results) throw new Error("No results returned")

    return data.results
      .map((r: any, i: number) => `${i + 1}. ${r.title} — ${r.url}`)
      .join("\n")
  } catch (err) {
    console.error("[tavily] Web search failed:", err)
    return "No results found."
  }
}

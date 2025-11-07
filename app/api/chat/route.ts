import Groq from "groq-sdk"

export const maxDuration = 60

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
})

// List of preferred models (fallback order)
const PREFERRED_MODELS = [
  process.env.GROQ_MODEL,          // .env override
  "llama-3.3-70b-versatile",       // ✅ confirmed working
  "llama-3.1-8b-instant",          // fast fallback
  "moonshotai/kimi-k2-instruct-0905", // advanced instruct fallback
  "groq/compound",                 // Groq experimental fallback
].filter(Boolean)

async function tryGroqChat(messages: any[]) {
  let lastError: any

  for (const model of PREFERRED_MODELS) {
    try {
      console.log(`[Groq] trying model: ${model}`)

      const completion = await groq.chat.completions.create({
        model,                      // ✅ use current loop model
        messages,                   // ✅ use passed messages
        temperature: 0.7,
        max_tokens: 2000,
        stream: true,
      })

      // Stream text output back to client
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        async start(controller) {
          for await (const chunk of completion) {
            const content = chunk.choices?.[0]?.delta?.content
            if (content) controller.enqueue(encoder.encode(content))
          }
          controller.close()
        },
      })

      console.log(`[Groq] model succeeded: ${model}`)
      return new Response(stream, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      })
    } catch (err: any) {
      lastError = err
      console.warn(`[Groq] model failed (${model}):`, err.message)
    }
  }

  throw lastError
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const messages = body.messages || [{ role: "user", content: "Hello!" }]
    console.log("[v0] Chat request via Groq:", { messageCount: messages.length })

    if (!process.env.GROQ_API_KEY) {
      console.log("[mock] No GROQ_API_KEY. Returning dummy response.")
      return new Response(
        JSON.stringify({ text: "Hi! (offline mock reply)" }),
        { headers: { "Content-Type": "application/json" } }
      )
    }

    // Try the models in order
    return await tryGroqChat(messages)
  } catch (error) {
    console.error("[v0] Chat route fatal error:", error)
    return new Response(
      JSON.stringify({ error: "Chat failed. Check API key or model list." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}

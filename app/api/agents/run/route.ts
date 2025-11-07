import { runAgent } from "@/lib/agents/agent-core"

export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body || !body.messages || !Array.isArray(body.messages)) {
      console.warn("[agent] Invalid or empty request body")
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const response = await runAgent(body)

    return new Response(
      JSON.stringify({ result: response }),
      { headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error("[agent] error:", err)
    return new Response(
      JSON.stringify({ error: "Agent execution failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}

export async function GET() {
  console.log("[agent] Ignored stray GET request")
  return new Response(
    JSON.stringify({
      message:
        "This endpoint only supports POST. Please send a JSON payload.",
    }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  )
}

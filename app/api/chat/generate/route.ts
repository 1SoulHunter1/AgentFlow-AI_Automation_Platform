import { generateText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { prompt, model } = await req.json()

  const { text, usage, finishReason } = await generateText({
    model: model || "anthropic/claude-sonnet-4.5",
    prompt,
    maxOutputTokens: 2000,
    temperature: 0.7,
  })

  return Response.json({
    text,
    usage,
    finishReason,
  })
}

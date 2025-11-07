import Groq from "groq-sdk"

export async function summarizeText(text: string): Promise<string> {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" })

  try {
    console.log("[groq] Summarizing text with length:", text.length)

    const response = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a concise summarizer. Provide a clear, short, structured summary of the content below.",
        },
        { role: "user", content: text },
      ],
      temperature: 0.6,
      max_tokens: 400,
    })

    const summary = response.choices?.[0]?.message?.content || "No summary generated."
    console.log("[groq] Summary:", summary)
    return summary
  } catch (err) {
    console.error("[groq] Summarization failed:", err)
    return "Summary unavailable due to an error."
  }
}

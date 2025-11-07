export async function sendToSlack({ text }: { text: string }) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) throw new Error("Missing Slack webhook URL")

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })

  if (!res.ok) throw new Error(`Slack webhook failed: ${res.statusText}`)
  return { success: true }
}

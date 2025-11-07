export async function sendToNotion(payload: { title: string; content: string }) {
  const { title, content } = payload

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.NOTION_API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Name: {
          title: [
            {
              text: { content: title },
            },
          ],
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: { content },
              },
            ],
          },
        },
      ],
    }),
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error("Notion error response:", errorText)
    throw new Error(`Notion API failed: ${res.statusText}`)
  }

  return await res.json()
}

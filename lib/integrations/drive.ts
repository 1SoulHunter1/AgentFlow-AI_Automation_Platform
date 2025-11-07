export async function uploadToDrive({ filename, content }: { filename: string; content: string }) {
  const token = process.env.GOOGLE_DRIVE_ACCESS_TOKEN
  if (!token) throw new Error("Missing Google Drive token")

  const res = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=media", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename=\"${filename}\"`,
    },
    body: content,
  })

  if (!res.ok) throw new Error(`Drive upload failed: ${res.statusText}`)
  return await res.json()
}

import { type NextRequest, NextResponse } from "next/server"
import { ComposioClient } from "@/lib/composio-client"

export async function POST(request: NextRequest) {
  try {
    const { connectionId } = await request.json()

    if (!connectionId) {
      return NextResponse.json({ error: "Missing connection ID" }, { status: 400 })
    }

    const composio = new ComposioClient()
    await composio.deleteConnection(connectionId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error disconnecting integration:", error)
    return NextResponse.json({ error: "Failed to disconnect" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { ComposioClient } from "@/lib/composio-client"

export async function POST(request: NextRequest) {
  try {
    const { appId, entityId } = await request.json()

    if (!appId || !entityId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const composio = new ComposioClient()
    const result = await composio.initiateConnection(appId, entityId)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error connecting integration:", error)
    return NextResponse.json({ error: "Failed to initiate connection" }, { status: 500 })
  }
}

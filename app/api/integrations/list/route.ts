import { type NextRequest, NextResponse } from "next/server"
import { ComposioClient } from "@/lib/composio-client"

export const maxDuration = 30 // 30 seconds max

export async function GET(request: NextRequest) {
  try {
    const entityId = request.nextUrl.searchParams.get("entityId")

    if (!entityId) {
      return NextResponse.json({ error: "Missing entity ID" }, { status: 400 })
    }

    console.log("[v0] API route: Fetching connections for entity:", entityId)
    const composio = new ComposioClient()

    const connections = await composio.getConnections(entityId)

    console.log("[v0] API route: Returning", connections.length, "connections")
    return NextResponse.json({ connections })
  } catch (error) {
    if (error instanceof Error) {
      console.error("[v0] API route error:", error.message)
    } else {
      console.error("[v0] API route unknown error:", error)
    }
    // Always return 200 with empty connections to prevent client-side errors
    return NextResponse.json({ connections: [] }, { status: 200 })
  }
}

import { NextResponse } from "next/server"
import { runIntegration } from "@/lib/integrations"

export async function POST(req: Request) {
  try {
    const { app, payload } = await req.json()
    const result = await runIntegration(app, payload)
    return NextResponse.json({ success: true, result })
  } catch (err: any) {
    console.error("[integration error]", err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

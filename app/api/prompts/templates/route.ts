import { NextResponse } from "next/server"
import { BUILT_IN_TEMPLATES, searchTemplates } from "@/lib/prompt-templates"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const category = searchParams.get("category")

  try {
    let templates = BUILT_IN_TEMPLATES

    if (query) {
      templates = searchTemplates(query)
    } else if (category) {
      templates = templates.filter((t) => t.category === category)
    }

    return NextResponse.json({ templates })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (replace with database in production)
const prompts = new Map()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const folderId = searchParams.get("folderId")

  try {
    const allPrompts = Array.from(prompts.values())

    if (folderId) {
      const filtered = allPrompts.filter((p) => p.folderId === folderId)
      return NextResponse.json({ prompts: filtered })
    }

    return NextResponse.json({ prompts: allPrompts })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch prompts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, visibility, folderId, variables } = body

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const prompt = {
      id: `prompt-${Date.now()}`,
      title,
      content,
      visibility: visibility || "only-you",
      folderId: folderId || "private",
      variables: variables || [],
      createdBy: {
        name: "Shashank Singh",
        avatar: undefined,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    prompts.set(prompt.id, prompt)

    return NextResponse.json({ prompt }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create prompt" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, content, visibility, folderId, variables } = body

    if (!id) {
      return NextResponse.json({ error: "Prompt ID is required" }, { status: 400 })
    }

    const existingPrompt = prompts.get(id)
    if (!existingPrompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 })
    }

    const updatedPrompt = {
      ...existingPrompt,
      title: title || existingPrompt.title,
      content: content || existingPrompt.content,
      visibility: visibility || existingPrompt.visibility,
      folderId: folderId || existingPrompt.folderId,
      variables: variables || existingPrompt.variables,
      updatedAt: new Date().toISOString(),
    }

    prompts.set(id, updatedPrompt)

    return NextResponse.json({ prompt: updatedPrompt })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update prompt" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Prompt ID is required" }, { status: 400 })
    }

    if (!prompts.has(id)) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 })
    }

    prompts.delete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete prompt" }, { status: 500 })
  }
}

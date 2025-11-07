import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (replace with database in production)
const folders = new Map([
  ["private", { id: "private", name: "Private", type: "private", createdAt: new Date().toISOString() }],
  ["workspace", { id: "workspace", name: "Workspace", type: "workspace", createdAt: new Date().toISOString() }],
])

export async function GET() {
  try {
    const allFolders = Array.from(folders.values())
    return NextResponse.json({ folders: allFolders })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch folders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, type } = body

    if (!name) {
      return NextResponse.json({ error: "Folder name is required" }, { status: 400 })
    }

    const folder = {
      id: `folder-${Date.now()}`,
      name,
      type: type || "private",
      createdAt: new Date().toISOString(),
    }

    folders.set(folder.id, folder)

    return NextResponse.json({ folder }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create folder" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Folder ID is required" }, { status: 400 })
    }

    // Prevent deletion of default folders
    if (id === "private" || id === "workspace") {
      return NextResponse.json({ error: "Cannot delete default folders" }, { status: 400 })
    }

    if (!folders.has(id)) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 })
    }

    folders.delete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete folder" }, { status: 500 })
  }
}

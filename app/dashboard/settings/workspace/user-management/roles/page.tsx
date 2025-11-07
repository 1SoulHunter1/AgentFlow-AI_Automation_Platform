"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type Role = "member" | "editor" | "admin"

type Permission = {
  id: string
  title: string
  description: string
  defaultPermissions: Record<Role, boolean>
}

const permissions: Permission[] = [
  {
    id: "manage-workspace",
    title: "Manage workspace settings",
    description: "Access and manage the workspace settings",
    defaultPermissions: { member: false, editor: false, admin: true },
  },
  {
    id: "create-agents",
    title: "Create agents",
    description: "Create new agents",
    defaultPermissions: { member: true, editor: true, admin: true },
  },
  {
    id: "share-agents",
    title: "Share agents with workspace",
    description: "Share agents with the workspace",
    defaultPermissions: { member: true, editor: true, admin: true },
  },
  {
    id: "share-prompts",
    title: "Share prompts",
    description: "Share prompts with everyone in the workspace",
    defaultPermissions: { member: true, editor: true, admin: true },
  },
  {
    id: "share-knowledge",
    title: "Share knowledge folder",
    description: "Share a knowledge folder with the entire workspace",
    defaultPermissions: { member: true, editor: true, admin: true },
  },
  {
    id: "create-groups",
    title: "Create groups",
    description: "Create a group and invite everyone to that group",
    defaultPermissions: { member: true, editor: true, admin: true },
  },
  {
    id: "create-public-groups",
    title: "Create public groups",
    description: "Create a public group which can be joined by everyone in the workspace",
    defaultPermissions: { member: true, editor: true, admin: true },
  },
  {
    id: "upload-documents",
    title: "Upload documents",
    description: "Use documents in chats, agents and knowledge folders",
    defaultPermissions: { member: true, editor: true, admin: true },
  },
  {
    id: "create-integrations",
    title: "Create integrations",
    description: "Create custom integrations and share them",
    defaultPermissions: { member: false, editor: true, admin: true },
  },
  {
    id: "configure-tracing",
    title: "Configure analytics tracing",
    description: "Configure analytics tracing for agents",
    defaultPermissions: { member: false, editor: true, admin: true },
  },
  {
    id: "share-oauth",
    title: "Share OAuth connections",
    description:
      "Configure who is allowed to share OAuth 2.0 connections as pre-selected connections for actions in agents",
    defaultPermissions: { member: false, editor: true, admin: true },
  },
  {
    id: "attach-integration-folders",
    title: "Attach integration folders",
    description: "Synchronize folders from integrations with agents",
    defaultPermissions: { member: true, editor: true, admin: true },
  },
]

export default function RolesPage() {
  const [rolePermissions, setRolePermissions] = useState<Record<string, Record<Role, boolean>>>(
    permissions.reduce(
      (acc, permission) => {
        acc[permission.id] = permission.defaultPermissions
        return acc
      },
      {} as Record<string, Record<Role, boolean>>,
    ),
  )

  const togglePermission = (permissionId: string, role: Role) => {
    setRolePermissions((prev) => ({
      ...prev,
      [permissionId]: {
        ...prev[permissionId],
        [role]: !prev[permissionId][role],
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Roles</h1>
        <p className="text-sm text-muted-foreground mt-1">Customize the specific permissions for each role</p>
      </div>

      <div className="border rounded-lg bg-card">
        {/* Header Row */}
        <div className="grid grid-cols-[1fr,140px,140px,140px] gap-4 p-4 border-b bg-muted/30">
          <div></div>
          <div className="text-center">
            <span className="text-sm font-medium">Member</span>
          </div>
          <div className="text-center">
            <span className="text-sm font-medium">Editor</span>
          </div>
          <div className="text-center">
            <span className="text-sm font-medium">Admin</span>
          </div>
        </div>

        {/* Permission Rows */}
        {permissions.map((permission, index) => (
          <div
            key={permission.id}
            className={`grid grid-cols-[1fr,140px,140px,140px] gap-4 p-4 ${
              index !== permissions.length - 1 ? "border-b" : ""
            }`}
          >
            <div>
              <h3 className="font-medium text-sm">{permission.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{permission.description}</p>
            </div>

            {/* Member Checkbox */}
            <div className="flex flex-col items-center justify-center">
              <Checkbox
                id={`${permission.id}-member`}
                checked={rolePermissions[permission.id]?.member}
                onCheckedChange={() => togglePermission(permission.id, "member")}
              />
              <Label htmlFor={`${permission.id}-member`} className="text-xs text-muted-foreground mt-1 cursor-pointer">
                {rolePermissions[permission.id]?.member ? "Allowed" : "Not allowed"}
              </Label>
            </div>

            {/* Editor Checkbox */}
            <div className="flex flex-col items-center justify-center">
              <Checkbox
                id={`${permission.id}-editor`}
                checked={rolePermissions[permission.id]?.editor}
                onCheckedChange={() => togglePermission(permission.id, "editor")}
              />
              <Label htmlFor={`${permission.id}-editor`} className="text-xs text-muted-foreground mt-1 cursor-pointer">
                {rolePermissions[permission.id]?.editor ? "Allowed" : "Not allowed"}
              </Label>
            </div>

            {/* Admin Checkbox */}
            <div className="flex flex-col items-center justify-center">
              <Checkbox
                id={`${permission.id}-admin`}
                checked={rolePermissions[permission.id]?.admin}
                onCheckedChange={() => togglePermission(permission.id, "admin")}
              />
              <Label htmlFor={`${permission.id}-admin`} className="text-xs text-muted-foreground mt-1 cursor-pointer">
                {rolePermissions[permission.id]?.admin ? "Allowed" : "Not allowed"}
              </Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

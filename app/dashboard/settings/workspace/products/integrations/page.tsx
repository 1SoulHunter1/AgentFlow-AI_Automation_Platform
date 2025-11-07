"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Info, Search, ExternalLink } from "lucide-react"
import Image from "next/image"

// Sample integrations data
const availableIntegrations = [
  {
    id: "slack",
    name: "Slack",
    description: "Use AgentFlow inside of Slack",
    icon: "/slack-communication.png",
    connected: false,
    info: "The AgentFlow Slack App can be used by users who have an AgentFlow license.",
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    description: "Integrate AgentFlow with Microsoft Teams",
    icon: "/teams.jpg",
    connected: false,
    info: "Connect your workspace to Microsoft Teams for seamless collaboration.",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Sync knowledge folders with Google Drive",
    icon: "/google-drive.jpg",
    connected: true,
    info: "Access and manage your Google Drive files directly from AgentFlow.",
  },
]

export default function IntegrationsPage() {
  const [permissionMode, setPermissionMode] = useState("enable-all")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Integrations</h1>
        <p className="text-muted-foreground mt-1">Manage what Integrations your users can use</p>
      </div>

      {/* Alert Banner */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Stay up-to-date with critical integration updates requiring admin action via our newsletter:{" "}
          <a href="#" className="text-primary hover:underline">
            Subscribe here
          </a>
        </AlertDescription>
      </Alert>

      {/* Permissions Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Permissions for integrations "Built by AgentFlow"</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Admins always see all integrations. Select which integrations should be enabled for members and editors in
            your workspace
          </p>
        </div>

        <RadioGroup value={permissionMode} onValueChange={setPermissionMode}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="enable-all" id="enable-all" />
            <Label htmlFor="enable-all" className="font-normal cursor-pointer">
              Enable all <span className="text-muted-foreground">(Default)</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="customize" id="customize" />
            <Label htmlFor="customize" className="font-normal cursor-pointer">
              Customize integrations
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Available Integrations */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Available Integrations</h2>
        <div className="space-y-3">
          {availableIntegrations.map((integration) => (
            <Card key={integration.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg border bg-background flex items-center justify-center flex-shrink-0">
                      <Image
                        src={integration.icon || "/placeholder.svg"}
                        alt={integration.name}
                        width={32}
                        height={32}
                        className="rounded"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{integration.name}</h3>
                        {integration.connected && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Connected
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {integration.description}.{" "}
                        <a href="#" className="text-primary hover:underline inline-flex items-center gap-1">
                          Learn more
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">{integration.info}</p>
                    </div>
                  </div>
                  <Button variant={integration.connected ? "outline" : "default"}>
                    {integration.connected ? "Manage" : "Connect"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Knowledge Folders Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Manage knowledge folders</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage and organize knowledge folders in your workspace.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="shared-workspace">Shared in workspace</TabsTrigger>
                <TabsTrigger value="shared-api">Shared with API</TabsTrigger>
                <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search knowledge folders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>Files</TableHead>
                  <TableHead>Updated at</TableHead>
                  <TableHead>Created at</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    No knowledge folders found
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

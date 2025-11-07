"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"

export default function DeepResearchPage() {
  const [generalAccess, setGeneralAccess] = useState(true)
  const [specificAccess, setSpecificAccess] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Deep research</h1>
        <p className="mt-2 text-muted-foreground">Set up models and limits for your deep research agent.</p>
      </div>

      <div className="space-y-6">
        {/* General Access */}
        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label htmlFor="general-access" className="text-base font-medium">
                General access
              </Label>
              <p className="text-sm text-muted-foreground">Every member of the workspace can use deep research</p>
            </div>
            <Switch id="general-access" checked={generalAccess} onCheckedChange={setGeneralAccess} />
          </div>
        </Card>

        {/* Specific Access */}
        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <Label htmlFor="specific-access" className="text-base font-medium">
                Allow specific members or groups to use deep research
              </Label>
              <p className="text-sm text-muted-foreground">Only specific members can use deep research</p>
            </div>
            <Switch id="specific-access" checked={specificAccess} onCheckedChange={setSpecificAccess} />
          </div>
        </Card>

        {/* Models Information */}
        <Card className="p-6">
          <div className="space-y-1">
            <h3 className="text-base font-medium">Models</h3>
            <p className="text-sm text-muted-foreground">
              The deep research agent is using the o3 and o4 Mini models under the hood to perform its tasks.
            </p>
          </div>
        </Card>

        {/* Usage Limit Information */}
        <Card className="p-6">
          <div className="space-y-1">
            <h3 className="text-base font-medium">Usage limit</h3>
            <p className="text-sm text-muted-foreground">Users in your workspace can run 15 tasks/month.</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

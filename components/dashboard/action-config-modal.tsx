"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronLeft } from "lucide-react"

interface Action {
  id: string
  name: string
  description: string
  integration?: string
}

interface ActionConfigModalProps {
  action: Action | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddAction: () => void
}

export function ActionConfigModal({ action, open, onOpenChange, onAddAction }: ActionConfigModalProps) {
  const [connectionType, setConnectionType] = useState("user")

  if (!action) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold">
                {action.integration
                  ? `${action.integration.charAt(0).toUpperCase() + action.integration.slice(1)}: `
                  : ""}
                {action.name}
              </h2>
            </div>
          </div>

          {/* Connection Settings */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">Connection</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Should users of this assistant use their own {action.integration || "service"} connection for this
                action?
              </p>
            </div>

            <RadioGroup value={connectionType} onValueChange={setConnectionType} className="space-y-3">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="user" id="user" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="user" className="text-sm font-medium cursor-pointer">
                    Yes, users will need to connect their {action.integration || "service"} account.{" "}
                    <span className="text-muted-foreground">(Default)</span>
                  </Label>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="shared" id="shared" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="shared" className="text-sm font-medium cursor-pointer">
                    No, all users should use the same, preselected connection.{" "}
                    <span className="text-muted-foreground">(Advanced)</span>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={onAddAction} className="bg-blue-600 hover:bg-blue-700">
              Add action
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

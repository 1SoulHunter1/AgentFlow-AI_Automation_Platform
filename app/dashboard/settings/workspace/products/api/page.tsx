"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar, Download, Key, Copy, Trash2, Eye, EyeOff } from "lucide-react"
import { Card } from "@/components/ui/card"

interface APIKey {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsed: string | null
}

export default function APISettingsPage() {
  const [timePeriod, setTimePeriod] = useState("last-30-days")
  const [tokensPerMinute, setTokensPerMinute] = useState("60000")
  const [requestsPerMinute, setRequestsPerMinute] = useState("500")
  const [monthlyLimit, setMonthlyLimit] = useState("100.00")
  const [isEditingLimit, setIsEditingLimit] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [apiKeys, setApiKeys] = useState<APIKey[]>([])
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return

    const newKey: APIKey = {
      id: Math.random().toString(36).substr(2, 9),
      name: newKeyName,
      key: `sk-${Math.random().toString(36).substr(2, 48)}`,
      createdAt: new Date().toISOString(),
      lastUsed: null,
    }

    setApiKeys([...apiKeys, newKey])
    setNewKeyName("")
    setIsCreateDialogOpen(false)
  }

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id))
  }

  const toggleKeyVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys)
    if (newVisible.has(id)) {
      newVisible.delete(id)
    } else {
      newVisible.add(id)
    }
    setVisibleKeys(newVisible)
  }

  const copyToClipboard = (key: string, id: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const maskKey = (key: string) => {
    return `${key.substring(0, 7)}${"•".repeat(32)}${key.substring(key.length - 4)}`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">API</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create and manage your API Keys, and view analytics in your local time (America/Los Angeles)
        </p>
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Usage</h2>
          <div className="flex items-center gap-2">
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Sep 16 - Oct 15
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Prompt tokens */}
          <Card className="p-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Prompt tokens</h3>
              <p className="text-2xl font-semibold">0</p>
              <p className="text-xs text-muted-foreground">Total tokens</p>
            </div>
          </Card>

          {/* Completion tokens */}
          <Card className="p-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Completion tokens</h3>
              <p className="text-2xl font-semibold">0</p>
              <p className="text-xs text-muted-foreground">Total tokens</p>
            </div>
          </Card>

          {/* API Requests */}
          <Card className="p-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">API Requests</h3>
              <p className="text-2xl font-semibold">0</p>
              <p className="text-xs text-muted-foreground">Requests</p>
            </div>
          </Card>

          {/* Costs */}
          <Card className="p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Costs for period</h3>
                {!isEditingLimit ? (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditingLimit(true)}>
                    Edit
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditingLimit(false)}>
                    Save
                  </Button>
                )}
              </div>
              {isEditingLimit ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm">Monthly limit: €</span>
                  <Input
                    type="number"
                    value={monthlyLimit}
                    onChange={(e) => setMonthlyLimit(e.target.value)}
                    className="w-24"
                  />
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Monthly limit: €{monthlyLimit}</p>
              )}
              <p className="text-3xl font-semibold">€0.00</p>
            </div>
          </Card>
        </div>

        <p className="text-xs text-muted-foreground">
          Prices converted from USD. Latest exchange rate of 1 USD = 0.8587 EUR fetched at 06:11 PM.
        </p>
      </div>

      {/* Rate Limits */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium">Rate Limits</h2>
          <p className="text-sm text-muted-foreground">Limits for accessing the API</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tokens-per-minute">Tokens per Minute</Label>
            <Input
              id="tokens-per-minute"
              type="number"
              value={tokensPerMinute}
              onChange={(e) => setTokensPerMinute(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requests-per-minute">Requests per Minute</Label>
            <Input
              id="requests-per-minute"
              type="number"
              value={requestsPerMinute}
              onChange={(e) => setRequestsPerMinute(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Cost breakdown</h2>
            <p className="text-sm text-muted-foreground">Download a complete record of your API usage</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download CSV
          </Button>
        </div>
      </div>

      {/* API Keys */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">API Keys</h2>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Key className="h-4 w-4 mr-2" />
            Create API key
          </Button>
        </div>

        {apiKeys.length === 0 ? (
          <Card className="p-8">
            <p className="text-center text-muted-foreground">No active API keys</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {apiKeys.map((apiKey) => (
              <Card key={apiKey.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{apiKey.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        Created {new Date(apiKey.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                      <Button variant="ghost" size="sm" onClick={() => toggleKeyVisibility(apiKey.id)}>
                        {visibleKeys.has(apiKey.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(apiKey.key, apiKey.id)}>
                        <Copy className="h-4 w-4" />
                        {copiedKey === apiKey.id && <span className="ml-1 text-xs">Copied!</span>}
                      </Button>
                    </div>
                    {apiKey.lastUsed ? (
                      <p className="text-xs text-muted-foreground">
                        Last used: {new Date(apiKey.lastUsed).toLocaleString()}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Never used</p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteKey(apiKey.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create API Key Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
            <DialogDescription>
              Create a new API key to access the API. Make sure to copy your key as you won't be able to see it again.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="key-name">Key Name</Label>
              <Input
                id="key-name"
                placeholder="My API Key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateKey} disabled={!newKeyName.trim()}>
              Create Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

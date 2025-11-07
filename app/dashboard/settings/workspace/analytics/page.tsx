"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, MessageSquare, Users, Bot, Calendar } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for charts
const activeUsersData = [
  { date: "Sep 16", users: 0 },
  { date: "Sep 20", users: 0 },
  { date: "Sep 24", users: 0 },
  { date: "Sep 28", users: 0 },
  { date: "Oct 2", users: 0 },
  { date: "Oct 6", users: 0 },
  { date: "Oct 10", users: 0 },
  { date: "Oct 15", users: 1 },
]

const messagesData = [
  { date: "Sep 16", messages: 0 },
  { date: "Sep 20", messages: 0 },
  { date: "Sep 24", messages: 0 },
  { date: "Sep 28", messages: 0 },
  { date: "Oct 2", messages: 0 },
  { date: "Oct 6", messages: 0 },
  { date: "Oct 10", messages: 0 },
  { date: "Oct 15", messages: 9 },
]

const members = [
  {
    id: 1,
    name: "Shashank Singh",
    email: "shashank295@gmail.com",
    avatar: "/abstract-profile.png",
    messages: 9,
    chats: 5,
    agents: 2,
  },
]

export default function AnalyticsPage() {
  const [groupBy, setGroupBy] = useState("day")
  const [timePeriod, setTimePeriod] = useState("30")
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleExport = () => {
    // Export analytics data as CSV
    console.log("[v0] Exporting analytics data...")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Usage insights from your workspace in your local time (America/Los Angeles)
          </p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users in Workspace</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Agents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Groups</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Groups</p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Usage</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Group by</span>
              <Select value={groupBy} onValueChange={setGroupBy}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Sep 16 - Oct 15
            </Button>
          </div>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Active Users Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
              <CardDescription>1 Unique users</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  users: {
                    label: "Users",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activeUsersData}>
                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="users" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* All Messages Chart */}
          <Card>
            <CardHeader>
              <CardTitle>All messages</CardTitle>
              <CardDescription>9 Messages</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  messages: {
                    label: "Messages",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={messagesData}>
                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="messages" fill="var(--color-messages)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Members Section */}
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tabs */}
          <div className="flex items-center gap-4 border-b">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              All
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors ${
                activeTab === "chat"
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Chat
            </button>
            <button
              onClick={() => setActiveTab("agents")}
              className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors ${
                activeTab === "agents"
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Bot className="h-4 w-4" />
              Agents
            </button>
          </div>

          {/* Search */}
          <Input
            placeholder="Search members"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />

          {/* Members List */}
          <div className="space-y-4">
            {filteredMembers.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">No members found</p>
            ) : (
              filteredMembers.map((member, index) => (
                <div key={member.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground w-6">{index + 1}</span>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activeTab === "all" && `${member.messages} Messages`}
                    {activeTab === "chat" && `${member.chats} Chats`}
                    {activeTab === "agents" && `${member.agents} Agents`}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

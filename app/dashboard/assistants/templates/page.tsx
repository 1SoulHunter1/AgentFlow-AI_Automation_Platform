import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AgentTemplatesContent } from "@/components/dashboard/agent-templates-content"

export default function AgentTemplatesPage() {
  return (
    <DashboardLayout pageTitle="Agents / Templates">
      <AgentTemplatesContent />
    </DashboardLayout>
  )
}

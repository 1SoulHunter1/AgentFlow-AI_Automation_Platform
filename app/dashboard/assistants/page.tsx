import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AgentsContent } from "@/components/dashboard/agents-content"

export default function AgentsPage() {
  return (
    <DashboardLayout pageTitle="Agents">
      <AgentsContent />
    </DashboardLayout>
  )
}

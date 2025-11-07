import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AgentCreationForm } from "@/components/dashboard/agent-creation-form"

export default function NewAssistantPage() {
  return (
    <DashboardLayout pageTitle="Assistants / New assistant">
      <AgentCreationForm />
    </DashboardLayout>
  )
}

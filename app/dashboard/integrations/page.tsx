import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { IntegrationsContent } from "@/components/dashboard/integrations-content"

export default function IntegrationsPage() {
  return (
    <DashboardLayout pageTitle="Integrations">
      <IntegrationsContent />
    </DashboardLayout>
  )
}

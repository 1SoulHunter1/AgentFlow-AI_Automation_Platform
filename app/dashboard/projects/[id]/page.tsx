import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ProjectDetailContent } from "@/components/dashboard/project-detail-content"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <ProjectDetailContent projectId={params.id} />
    </DashboardLayout>
  )
}

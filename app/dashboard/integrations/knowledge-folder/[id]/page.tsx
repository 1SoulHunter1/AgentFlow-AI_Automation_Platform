import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { KnowledgeFolderDetail } from "@/components/dashboard/knowledge-folder-detail"

export default function KnowledgeFolderPage({ params }: { params: { id: string } }) {
  // In a real app, fetch folder data based on params.id
  const folderName = params.id === "folder-1" ? "Folder 1" : `Folder ${params.id}`

  return (
    <DashboardLayout
      pageTitle={folderName}
      breadcrumbs={[
        { label: "Integrations", href: "/dashboard/integrations" },
        { label: "Knowledge folder", href: "/dashboard/integrations" },
        { label: folderName },
      ]}
    >
      <KnowledgeFolderDetail folderId={params.id} folderName={folderName} />
    </DashboardLayout>
  )
}

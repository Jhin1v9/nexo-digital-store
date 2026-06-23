import { AppDetailPageClient } from "@/components/app-detail-page";
import { mockApps } from "@/lib/mock-data";

export function generateStaticParams() {
  return mockApps
    .filter((app) => app.source === "manual" || app.source === "generated" || app.source === "mined")
    .map((app) => ({ slug: app.slug }));
}

export default function TemplateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <TemplateDetailPageAsync params={params} />;
}

async function TemplateDetailPageAsync({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AppDetailPageClient slug={slug} />;
}

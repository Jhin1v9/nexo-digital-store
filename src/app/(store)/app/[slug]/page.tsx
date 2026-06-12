import { AppDetailPageClient } from "@/components/app-detail-page";
import { mockApps } from "@/lib/mock-data";

export function generateStaticParams() {
  return mockApps.map((app) => ({ slug: app.slug }));
}

export default async function AppDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AppDetailPageClient slug={slug} />;
}

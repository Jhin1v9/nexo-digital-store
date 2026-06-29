import { notFound } from "next/navigation";
import { AppDetailPageClient } from "@/components/app-detail-page";
import { mockApi } from "@/lib/api-client";

export default async function AppDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = await mockApi.getApp(slug);
  if (!app) {
    notFound();
  }
  return <AppDetailPageClient slug={slug} />;
}

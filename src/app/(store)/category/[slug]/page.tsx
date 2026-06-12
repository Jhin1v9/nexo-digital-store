import { CategoryDetailPageClient } from "@/components/category-detail-page";
import { mockCategories } from "@/lib/mock-data";

export function generateStaticParams() {
  return mockCategories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CategoryDetailPageClient slug={slug} />;
}

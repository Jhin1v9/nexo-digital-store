import { CategoryDetailPageClient } from "@/components/category-detail-page";
import { mockCategories } from "@/lib/mock-data";

const EXTRA_CATEGORY_SLUGS = ["clinics", "retail", "food"];

export function generateStaticParams() {
  return [
    ...mockCategories.map((category) => ({ slug: category.slug })),
    ...EXTRA_CATEGORY_SLUGS.map((slug) => ({ slug })),
  ];
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CategoryDetailPageClient slug={slug} />;
}

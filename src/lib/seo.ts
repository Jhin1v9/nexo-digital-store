import { Metadata } from "next";
import { APP_NAME, APP_DESCRIPTION, APP_URL, APP_AUTHOR } from "@/lib/constants";
import { AppProduct } from "@/types/app";

interface PageSEOOptions {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
  canonical?: string;
}

export function generatePageMetadata(options: PageSEOOptions): Metadata {
  const { title, description, image, noindex, canonical } = options;

  return {
    title: `${title} | ${APP_NAME}`,
    description,
    ...(canonical && { alternates: { canonical: `${APP_URL}${canonical}` } }),
    ...(noindex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: `${title} | ${APP_NAME}`,
      description,
      url: canonical ? `${APP_URL}${canonical}` : APP_URL,
      siteName: APP_NAME,
      locale: "pt_BR",
      type: "website",
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${APP_NAME}`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function generateAppMetadata(app: AppProduct): Metadata {
  return generatePageMetadata({
    title: app.metaTitle,
    description: app.metaDescription,
    image: app.thumbnail,
    canonical: `/app/${app.slug}`,
  });
}

export function generateCategoryMetadata(slug: string, name: string): Metadata {
  return generatePageMetadata({
    title: `Apps para ${name}`,
    description: `Descubra as melhores apps e solucoes para ${name.toLowerCase()}. Software profissional para impulsionar seu negocio.`,
    canonical: `/category/${slug}`,
  });
}

export const defaultMetadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  authors: [{ name: APP_AUTHOR }],
  keywords: ["app", "TPV", "SaaS", "software", "negocio", "empresa", "NEXO", "digital"],
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: APP_NAME,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

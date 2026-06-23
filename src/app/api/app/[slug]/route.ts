import { NextResponse } from "next/server";
import { mockApi } from "@/lib/api-client";
import { mockApps } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return mockApps.map((app) => ({ slug: app.slug }));
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;

  try {
    const app = await mockApi.getApp(slug);
    if (!app) {
      return NextResponse.json(
        { error: "App nao encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(app);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar app" },
      { status: 500 }
    );
  }
}

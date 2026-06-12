// Force static generation for output: export
import { NextRequest, NextResponse } from "next/server";
import { mockApi } from "@/lib/api-client";
import { AppFilter } from "@/types/app";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const filters: AppFilter & { page?: number; limit?: string } = {
    search: searchParams.get("search") ?? undefined,
    type: (searchParams.get("type") as AppFilter["type"]) ?? "all",
    framework: (searchParams.get("framework") as AppFilter["framework"]) ?? "all",
    industry: (searchParams.get("industry") as AppFilter["industry"]) ?? "all",
    sense: (searchParams.get("sense") as AppFilter["sense"]) ?? "all",
    status: (searchParams.get("status") as AppFilter["status"]) ?? "all",
    pricing: (searchParams.get("pricing") as AppFilter["pricing"]) ?? "all",
    sortBy: (searchParams.get("sortBy") as AppFilter["sortBy"]) ?? "relevance",
    page: parseInt(searchParams.get("page") ?? "1", 10),
    limit: searchParams.get("limit") ?? "20",
  };

  try {
    const result = await mockApi.getApps(filters);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar apps" },
      { status: 500 }
    );
  }
}
export const dynamic = "force-static";

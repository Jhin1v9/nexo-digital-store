import { NextRequest, NextResponse } from "next/server";
import { getReviewStore } from "@/lib/review-store";

function isAuthorized(request: NextRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return true; // Dev mode: no key required
  const header = request.headers.get("x-admin-key");
  return header === adminKey;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as "all" | "unanswered" | "answered" | null;
    const appId = searchParams.get("appId") ?? undefined;
    const sortBy = searchParams.get("sortBy") as "newest" | "oldest" | null;

    const reviews = await getReviewStore().getReviews({
      status: status ?? "all",
      appId,
      sortBy: sortBy ?? "newest",
    });

    return NextResponse.json({
      count: reviews.length,
      status: status ?? "all",
      reviews,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao listar reviews";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
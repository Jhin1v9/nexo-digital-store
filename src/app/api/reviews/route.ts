import { NextRequest, NextResponse } from "next/server";
import { mockApi } from "@/lib/api-client";
import { reviewFormSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const appId = searchParams.get("appId");

  try {
    const reviews = await mockApi.getReviews(appId ?? undefined);
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar avaliacoes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = reviewFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados invalidos", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { appId } = body;
    if (!appId) {
      return NextResponse.json(
        { error: "appId e obrigatorio" },
        { status: 400 }
      );
    }

    const review = await mockApi.createReview({ ...parsed.data, appId });
    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao criar avaliacao" },
      { status: 500 }
    );
  }
}

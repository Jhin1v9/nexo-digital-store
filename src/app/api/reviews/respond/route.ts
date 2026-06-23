import { NextRequest, NextResponse } from "next/server";
import { mockApi } from "@/lib/api-client";
import { reviewReplySchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = reviewReplySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados invalidos", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { reviewId } = body;
    if (!reviewId || typeof reviewId !== "string") {
      return NextResponse.json(
        { error: "reviewId e obrigatorio" },
        { status: 400 }
      );
    }

    const review = await mockApi.createReviewReply(reviewId, parsed.data);
    return NextResponse.json(review);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao responder avaliacao";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { getReviewStore } from "@/lib/review-store";
import { reviewReplySchema } from "@/lib/validators";

function isAuthorized(request: NextRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return true; // Dev mode: no key required
  const header = request.headers.get("x-admin-key");
  return header === adminKey;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

    const review = await getReviewStore().createReply({
      reviewId,
      responder: parsed.data.responder,
      name: parsed.data.name,
      content: parsed.data.content,
      chatId: parsed.data.chatId,
    });

    return NextResponse.json(review);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao responder review";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
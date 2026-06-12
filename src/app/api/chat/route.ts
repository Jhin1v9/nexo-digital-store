// Force static generation for output: export
import { NextRequest, NextResponse } from "next/server";
import { mockApi } from "@/lib/api-client";
import { chatMessageSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = chatMessageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados invalidos", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const response = await mockApi.sendChatMessage(parsed.data.content);
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar mensagem" },
      { status: 500 }
    );
  }
}
export const dynamic = "force-static";

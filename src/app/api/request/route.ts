// Force static generation for output: export
import { NextRequest, NextResponse } from "next/server";
import { mockApi } from "@/lib/api-client";
import { whiteLabelConfigSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = whiteLabelConfigSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados invalidos", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const result = await mockApi.submitRequest(parsed.data);
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao enviar solicitacao" },
      { status: 500 }
    );
  }
}
export const dynamic = "force-static";

// Force static generation for output: export
import { NextRequest, NextResponse } from "next/server";
import { mockApi } from "@/lib/api-client";

export async function GET() {
  try {
    const requests = await mockApi.getLunaRequests();
    return NextResponse.json(requests);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar solicitacoes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await mockApi.submitLunaResult(body);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Erro ao enviar resultado" },
      { status: 500 }
    );
  }
}
export const dynamic = "force-static";

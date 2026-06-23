import { NextResponse } from "next/server";
import { mockApi } from "@/lib/api-client";

export async function GET() {
  try {
    const categories = await mockApi.getCategories();
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}

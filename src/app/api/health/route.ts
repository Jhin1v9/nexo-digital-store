// Force static generation for output: export
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    uptime: "stable",
  });
}
export const dynamic = "force-static";

import { NextRequest, NextResponse } from "next/server";
import { AppProduct } from "@/types/app";
import { getApps, updateApp, deleteApp, saveAppsToDisk } from "@/lib/apps-data";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function checkAuth(req: NextRequest) {
  const key = req.headers.get("x-admin-key");
  return key === process.env.ADMIN_API_KEY;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) return unauthorized();

  const { id } = await params;
  try {
    const body = (await req.json()) as Partial<AppProduct>;
    const updated = updateApp(id, body);
    if (!updated) {
      return NextResponse.json({ error: "App not found" }, { status: 404 });
    }
    saveAppsToDisk();
    return NextResponse.json({ app: updated });
  } catch (err) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) return unauthorized();

  const { id } = await params;
  const ok = deleteApp(id);
  if (!ok) {
    return NextResponse.json({ error: "App not found" }, { status: 404 });
  }
  saveAppsToDisk();
  return NextResponse.json({ success: true });
}

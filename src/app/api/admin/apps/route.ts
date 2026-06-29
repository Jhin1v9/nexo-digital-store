import { NextRequest, NextResponse } from "next/server";
import { AppProduct } from "@/types/app";
import { getApps, addApp, saveAppsToDisk } from "@/lib/apps-data";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function checkAuth(req: NextRequest) {
  const key = req.headers.get("x-admin-key");
  return key === process.env.ADMIN_API_KEY;
}

export async function GET() {
  return NextResponse.json({ apps: getApps() });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();

  try {
    const body = (await req.json()) as AppProduct;
    if (!body.id || !body.slug || !body.name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (getApps().some((a) => a.id === body.id || a.slug === body.slug)) {
      return NextResponse.json({ error: "App already exists" }, { status: 409 });
    }
    addApp(body);
    saveAppsToDisk();
    return NextResponse.json({ app: body }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
}

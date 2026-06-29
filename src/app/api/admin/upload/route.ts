import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function checkAuth(req: NextRequest) {
  const key = req.headers.get("x-admin-key");
  return key === process.env.ADMIN_API_KEY;
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const slug = form.get("slug") as string | null;

    if (!file || !slug) {
      return NextResponse.json({ error: "Missing file or slug" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const thumbsDir = join(process.cwd(), "public", "thumbnails");
    const sourcesDir = join(thumbsDir, "_sources");
    mkdirSync(thumbsDir, { recursive: true });
    mkdirSync(sourcesDir, { recursive: true });

    const filename = `${slug}.jpg`;
    const destPath = join(thumbsDir, filename);
    const sourcePath = join(sourcesDir, filename);

    writeFileSync(destPath, buffer);
    writeFileSync(sourcePath, buffer);

    return NextResponse.json({ path: `/thumbnails/${filename}` });
  } catch (err) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

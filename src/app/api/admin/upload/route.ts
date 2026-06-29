import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, mkdirSync } from "fs";
import { join, extname } from "path";

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
    const folder = (form.get("folder") as string | null) || "thumbnails";

    if (!file || !slug) {
      return NextResponse.json({ error: "Missing file or slug" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const targetDir = join(process.cwd(), "public", folder);
    const sourcesDir = join(process.cwd(), "public", "thumbnails", "_sources");
    mkdirSync(targetDir, { recursive: true });
    mkdirSync(sourcesDir, { recursive: true });

    const originalExt = extname(file.name) || ".jpg";
    const filename = `${slug}${originalExt}`;
    const destPath = join(targetDir, filename);

    writeFileSync(destPath, buffer);

    // Keep a source copy for thumbnails only
    if (folder === "thumbnails") {
      writeFileSync(join(sourcesDir, filename), buffer);
    }

    return NextResponse.json({ path: `/${folder}/${filename}` });
  } catch (err) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

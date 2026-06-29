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

    const originalExt = extname(file.name) || ".jpg";
    const filename = `${slug}${originalExt}`;

    // In standalone mode Next.js serves files from process.cwd()/public,
    // which is .next/standalone/public. We also persist to the project root
    // so files survive the next build.
    const runtimeDir = join(process.cwd(), "public", folder);
    const isStandalone = runtimeDir.includes(join(".next", "standalone", "public"));
    const projectDir = isStandalone
      ? join(process.cwd(), "..", "..")
      : process.cwd();
    const projectTargetDir = join(projectDir, "public", folder);
    const projectSourcesDir = join(projectDir, "public", "thumbnails", "_sources");

    mkdirSync(runtimeDir, { recursive: true });
    mkdirSync(projectTargetDir, { recursive: true });
    mkdirSync(projectSourcesDir, { recursive: true });

    writeFileSync(join(runtimeDir, filename), buffer);
    writeFileSync(join(projectTargetDir, filename), buffer);

    // Keep a source copy for thumbnails only
    if (folder === "thumbnails") {
      const runtimeSourcesDir = join(process.cwd(), "public", "thumbnails", "_sources");
      mkdirSync(runtimeSourcesDir, { recursive: true });
      writeFileSync(join(runtimeSourcesDir, filename), buffer);
      writeFileSync(join(projectSourcesDir, filename), buffer);
    }

    return NextResponse.json({ path: `/${folder}/${filename}` });
  } catch (err) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

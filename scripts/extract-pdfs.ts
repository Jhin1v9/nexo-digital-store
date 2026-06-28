import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import AdmZip from "adm-zip";
import { slugify, cleanFolderName, isManualPdf, isExecutable, isCredentialFile, isPrintFile } from "./drive-utils";

const DRIVE_DIR = "/home/jhin/Documentos/apps driv";
const OUTPUT_DIR = path.resolve(__dirname, "../docs/drive-apps-md");
const TEMP_DIR = path.resolve(__dirname, "../.tmp-drive-extract");

interface DiscoveredApp {
  sourceZip: string;
  folderPath: string;
  appName: string;
  slug: string;
  pdfName?: string;
  pdfBuffer?: Buffer;
}

function findAppsInZip(zipPath: string): DiscoveredApp[] {
  const zip = new AdmZip(zipPath);
  const entries = zip.getEntries();
  const apps = new Map<string, DiscoveredApp>();

  for (const entry of entries) {
    const entryName = entry.entryName;
    if (entry.isDirectory) continue;
    if (isExecutable(entryName) && !isManualPdf(entryName) && !isPrintFile(entryName)) continue;
    if (isCredentialFile(entryName)) continue;

    const parts = entryName.split("/").map(cleanFolderName);
    if (parts.length < 2) continue;

    const appFolderParts = parts.slice(0, -1);
    const fileName = parts[parts.length - 1];
    const appName = appFolderParts[appFolderParts.length - 1];
    const folderPath = appFolderParts.join("/");
    const slug = slugify(appName);
    const key = `${zipPath}::${folderPath}`;

    if (!appName || appName.length < 2) continue;

    if (!apps.has(key)) {
      apps.set(key, {
        sourceZip: zipPath,
        folderPath,
        appName,
        slug,
      });
    }

    const app = apps.get(key)!;
    const data = entry.getData();

    if (isManualPdf(fileName) && (!app.pdfBuffer || data.length > app.pdfBuffer.length)) {
      app.pdfName = fileName;
      app.pdfBuffer = data;
    }
  }

  return Array.from(apps.values()).filter((a) => a.pdfBuffer && a.pdfBuffer.length > 1024);
}

function extractTextWithPdftotext(pdfPath: string): string {
  try {
    const output = execSync(`pdftotext "${pdfPath}" -`, { encoding: "utf-8", maxBuffer: 10 * 1024 * 1024 });
    return output;
  } catch (err) {
    throw new Error(`pdftotext failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}

async function extractPdfs(): Promise<void> {
  if (!fs.existsSync(DRIVE_DIR)) {
    throw new Error(`Drive directory not found: ${DRIVE_DIR}`);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  const zips = fs
    .readdirSync(DRIVE_DIR)
    .filter((f) => f.toLowerCase().endsWith(".zip"))
    .map((f) => path.join(DRIVE_DIR, f));

  if (zips.length === 0) {
    throw new Error(`No zip files found in ${DRIVE_DIR}`);
  }

  let total = 0;
  const report: string[] = [];

  for (const zipPath of zips) {
    console.log(`Processing ${path.basename(zipPath)}...`);
    const apps = findAppsInZip(zipPath);
    console.log(`  Found ${apps.length} apps with manuals.`);

    for (const app of apps) {
      const tempPdfPath = path.join(TEMP_DIR, `${app.slug}.pdf`);
      try {
        fs.writeFileSync(tempPdfPath, app.pdfBuffer!);
        const text = extractTextWithPdftotext(tempPdfPath).slice(0, 8000).trim();

        if (!text || text.length < 50) {
          report.push(`⚠ ${app.slug}: ${app.appName} — extracted text too short`);
          continue;
        }

        const appDir = path.join(OUTPUT_DIR, app.slug);
        fs.mkdirSync(appDir, { recursive: true });

        const mdContent = `# ${app.appName}\n\n**Fonte:** ${path.basename(app.sourceZip)} > ${app.folderPath}\n\n**PDF:** ${app.pdfName}\n\n---\n\n${text}\n`;
        fs.writeFileSync(path.join(appDir, "README.md"), mdContent);

        total++;
        report.push(`✓ ${app.slug}: ${app.appName}`);
      } catch (err) {
        report.push(`✗ ${app.slug}: ${app.appName} — ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        if (fs.existsSync(tempPdfPath)) {
          fs.rmSync(tempPdfPath, { force: true });
        }
      }
    }
  }

  fs.rmSync(TEMP_DIR, { recursive: true, force: true });

  const reportPath = path.resolve(__dirname, "../docs/pdf-extraction-report.md");
  fs.writeFileSync(
    reportPath,
    `# PDF Extraction Report\n\nTotal de PDFs convertidos: ${total}\n\n${report.join("\n")}\n`
  );

  console.log(`Done. Converted ${total} PDFs to markdown.`);
  console.log(`Report: ${reportPath}`);
}

extractPdfs().catch((err) => {
  console.error(err);
  process.exit(1);
});

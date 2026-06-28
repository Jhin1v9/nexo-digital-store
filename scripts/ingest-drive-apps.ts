import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";
import {
  slugify,
  cleanFolderName,
  inferTypeFromPath,
  inferFrameworkFromPath,
  inferIndustryAndSense,
  isPrintFile,
  isCredentialFile,
  isExecutable,
  isInstallerFolder,
} from "./drive-utils";

const DRIVE_DIR = "/home/jhin/Documentos/apps driv";
const MD_DIR = path.resolve(__dirname, "../docs/drive-apps-md");
const THUMBNAILS_DIR = path.resolve(__dirname, "../public/thumbnails");
const MOCK_DATA_PATH = path.resolve(__dirname, "../src/lib/mock-data.ts");

interface DriveApp {
  id: string;
  slug: string;
  name: string;
  type: ReturnType<typeof inferTypeFromPath>;
  framework: ReturnType<typeof inferFrameworkFromPath>;
  industry: ReturnType<typeof inferIndustryAndSense>["industry"];
  sense: ReturnType<typeof inferIndustryAndSense>["sense"];
  description: string;
  shortDescription: string;
  features: string[];
  techStack: string[];
  requirements: string[];
  printBuffer?: Buffer;
  mdText?: string;
}

function escapeString(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
}

function extractFeaturesFromMd(text: string, type: string): string[] {
  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  const bullets = lines
    .filter((l) => /^[-•*\d]+[.)]?\s+/.test(l))
    .map((l) => l.replace(/^[-•*\d]+[.)]?\s+/, "").trim())
    .filter((l) => l.length > 5 && l.length < 120)
    .slice(0, 8);

  if (bullets.length >= 4) return bullets;

  const defaults: Record<string, string[]> = {
    tpv: ["Gestão de vendas", "Controle de estoque", "Multi-usuário", "Relatórios"],
    saas: ["Dashboard web", "Gestão centralizada", "Relatórios", "Multi-usuário"],
    site: ["Design responsivo", "SEO otimizado", "Fácil instalação", "Personalizável"],
    app: ["Interface moderna", "Design responsivo", "Fácil instalação", "Personalizável"],
    program: ["Interface desktop", "Processamento local", "Relatórios", "Multi-usuário"],
    custom: ["Sob medida", "Requisitos customizados", "Suporte contínuo", "Escalável"],
  };
  return defaults[type] || defaults.site;
}

function extractTechStackFromMd(text: string, framework: string): string[] {
  const techs = [
    "React",
    "Next.js",
    "Node.js",
    "PHP",
    "Python",
    "Django",
    "Tailwind CSS",
    "TypeScript",
    "Laravel",
    "PostgreSQL",
    "MySQL",
    "Supabase",
    "Firebase",
  ];
  const found = techs.filter((t) => text.toLowerCase().includes(t.toLowerCase()));
  const frameworkLabel = framework === "nextjs" ? "Next.js" : framework.charAt(0).toUpperCase() + framework.slice(1);
  if (found.length > 0) return [...new Set([frameworkLabel, ...found])].slice(0, 6);
  return [frameworkLabel, "React", "Tailwind CSS"];
}

function readMdForApp(slug: string): string {
  const mdPath = path.join(MD_DIR, slug, "README.md");
  if (!fs.existsSync(mdPath)) return "";
  return fs.readFileSync(mdPath, "utf-8");
}

function findAppsInAllZips(): DriveApp[] {
  const zips = fs
    .readdirSync(DRIVE_DIR)
    .filter((f) => f.toLowerCase().endsWith(".zip"))
    .map((f) => path.join(DRIVE_DIR, f));

  const appsMap = new Map<string, DriveApp>();
  let counter = 0;

  for (const zipPath of zips) {
    const zip = new AdmZip(zipPath);
    const entries = zip.getEntries();

    for (const entry of entries) {
      if (entry.isDirectory) continue;
      const entryName = entry.entryName;
      if (isCredentialFile(entryName)) continue;
      if (isExecutable(entryName) && !isPrintFile(entryName)) continue;

      const parts = entryName.split("/").map(cleanFolderName);
      if (parts.length < 2) continue;

      const appFolderParts = parts.slice(0, -1);
      const fileName = parts[parts.length - 1];
      const name = appFolderParts[appFolderParts.length - 1];
      const folderPath = appFolderParts.join("/");
      const slug = slugify(name);

      if (!name || name.length < 2) continue;
      if (isInstallerFolder(folderPath)) continue;

      if (!appsMap.has(slug)) {
        const type = inferTypeFromPath(folderPath);
        const framework = inferFrameworkFromPath(folderPath);
        const { industry, sense } = inferIndustryAndSense(folderPath);
        appsMap.set(slug, {
          id: `gd-${String(100 + counter++).slice(-3)}`,
          slug,
          name,
          type,
          framework,
          industry,
          sense,
          description: `${name} — Solução profissional da NEXO Digital para o seu negócio.`,
          shortDescription: `Solução ${type} para ${sense === "outro" ? "seu negócio" : sense}.`,
          features: [],
          techStack: [],
          requirements: ["Navegador moderno", "Conexão internet"],
        });
      }

      const app = appsMap.get(slug)!;
      const data = entry.getData();

      if (isPrintFile(fileName) && (!app.printBuffer || data.length > app.printBuffer.length)) {
        app.printBuffer = data;
      }
    }
  }

  return Array.from(appsMap.values());
}

function enrichApps(apps: DriveApp[]): DriveApp[] {
  return apps.map((app) => {
    const mdText = readMdForApp(app.slug);
    const features = mdText ? extractFeaturesFromMd(mdText, app.type) : extractFeaturesFromMd("", app.type);
    const techStack = extractTechStackFromMd(mdText, app.framework);

    let description = `${app.name} — Solução profissional da NEXO Digital para o seu negócio.`;
    if (mdText) {
      // Remove header do markdown (tudo antes do primeiro ---)
      const body = mdText.split("---").slice(1).join("---").trim();
      const paragraphs = body
        .split("\n\n")
        .map((p) => p.replace(/^#+\s+.*$/m, "").trim())
        .filter((p) => p.length > 20);
      const firstParagraph = paragraphs[0];
      if (firstParagraph) {
        description = `${app.name}. ${firstParagraph.slice(0, 400)}`;
      }
    }

    return {
      ...app,
      description,
      shortDescription: `Solução ${app.type} para ${app.sense === "outro" ? "seu negócio" : app.sense}.`,
      features,
      techStack,
      mdText,
    };
  });
}

function saveThumbnails(apps: DriveApp[]): void {
  fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
  for (const app of apps) {
    if (app.printBuffer) {
      fs.writeFileSync(path.join(THUMBNAILS_DIR, `${app.slug}.jpg`), app.printBuffer);
    }
  }
}

function generateMakeAppCalls(apps: DriveApp[]): string {
  return apps
    .map((app) => {
      const pricing = `CATEGORY_PRICING.${app.type}`;
      const screenshots = "[\"/screenshot-placeholder.jpg\", \"/screenshot-placeholder.jpg\", \"/screenshot-placeholder.jpg\"]";
      const featuresArray = `[${app.features.map((f) => `"${escapeString(f)}"`).join(", ")}]`;
      const techStackArray = `[${app.techStack.map((t) => `"${escapeString(t)}"`).join(", ")}]`;
      const requirementsArray = `[${app.requirements.map((r) => `"${escapeString(r)}"`).join(", ")}]`;
      const tagsArray = `["${app.slug}", "${app.type}", "${app.industry}", "${app.sense}"]`;

      return `  makeApp(
    "${app.id}", "${app.slug}", "${escapeString(app.name)}", "${escapeString(app.shortDescription)}",
    "${escapeString(app.description)}",
    "${escapeString(app.shortDescription)}",
    "${app.type}", "${app.framework}", "${app.industry}", "${app.sense}", "available", "1.0.0",
    ${pricing}.pricing, ${pricing}.price, ${pricing}.currency, 4.5, 120,
    ${featuresArray},
    ${techStackArray},
    ${requirementsArray},
    undefined,
    undefined,
    ${screenshots},
    ${tagsArray}
  ),`;
    })
    .join("\n");
}

function updateMockData(apps: DriveApp[]): void {
  let content = fs.readFileSync(MOCK_DATA_PATH, "utf-8");

  const driveAppsStart = content.indexOf("// ===== Google Drive Apps");
  const nextSection = content.indexOf("// ===== LP Creator", driveAppsStart);

  if (driveAppsStart === -1 || nextSection === -1) {
    throw new Error("Could not locate driveApps section in mock-data.ts");
  }

  content =
    content.slice(0, driveAppsStart) +
    "// ===== Google Drive Apps (ingested from Drive)\nconst driveApps: AppProduct[] = [\n" +
    generateMakeAppCalls(apps) +
    "\n];\n\n" +
    content.slice(nextSection);

  fs.writeFileSync(MOCK_DATA_PATH, content);
}

async function runIngestion(): Promise<void> {
  if (!fs.existsSync(DRIVE_DIR)) {
    throw new Error(`Drive directory not found: ${DRIVE_DIR}`);
  }

  const apps = findAppsInAllZips();
  console.log(`Found ${apps.length} apps in zips.`);

  const enriched = enrichApps(apps);
  saveThumbnails(enriched);
  updateMockData(enriched);

  const report = [
    `# Ingest Report`,
    ``,
    `Total apps ingested: ${enriched.length}`,
    ``,
    `| Slug | Nome | Tipo | Industry | Sense |`,
    `|---|---|---|---|---|`,
    ...enriched.map((a) => `| ${a.slug} | ${a.name} | ${a.type} | ${a.industry} | ${a.sense} |`),
    ``,
    `## Apps sem thumbnail`,
    ...(enriched.filter((a) => !a.printBuffer).length
      ? enriched.filter((a) => !a.printBuffer).map((a) => `- ${a.slug}`)
      : ["Nenhum"]),
    ``,
    `## Apps sem manual (MD)`,
    ...(enriched.filter((a) => !a.mdText).length
      ? enriched.filter((a) => !a.mdText).map((a) => `- ${a.slug}`)
      : ["Nenhum"]),
  ].join("\n");

  fs.writeFileSync(path.resolve(__dirname, "../docs/ingest-report.md"), report);
  console.log("Ingestion complete. See docs/ingest-report.md");
}

runIngestion().catch((err) => {
  console.error(err);
  process.exit(1);
});

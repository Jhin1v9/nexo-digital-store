# Ingestão de Apps do Google Drive na Nexo Store

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extrair os ~50 apps dos zips do Google Drive, converter seus manuais PDF para markdown, e adicioná-los na Nexo Digital Store mantendo o padrão dos apps existentes.

**Architecture:** Dois scripts Node/TS operam sobre os zips sem extrair tudo: um converte PDFs para `docs/drive-apps-md/{slug}/README.md` e outro gera objetos `makeApp()` no `src/lib/mock-data.ts`, copiando as imagens de capa para `public/thumbnails/`. O wizard de `/request` é modificado para pré-preencher dados a partir do app passado por `?app={slug}`.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Zustand, `adm-zip` (leitura de zips), `pdf-parse` (extração de PDFs), `tsx` (execução de scripts TS).

---

### Task 1: Instalar dependências dos scripts

**Files:**
- Modify: `package.json`
- Test: `npm ls adm-zip pdf-parse tsx`

- [ ] **Step 1: Adicionar dependências de dev**

```bash
cd /home/jhin/Documentos/nexo-digital-store
npm install -D adm-zip pdf-parse tsx @types/adm-zip
```

- [ ] **Step 2: Verificar instalação**

```bash
npm ls adm-zip pdf-parse tsx
```

Expected: todas as dependências listadas sem `UNMET`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add adm-zip, pdf-parse and tsx for drive ingestion scripts"
```

---

### Task 2: Criar utilitários compartilhados

**Files:**
- Create: `scripts/drive-utils.ts`

- [ ] **Step 1: Criar arquivo com funções de slug, categorização e sanitização**

```ts
import { AppType, Framework, Industry, Sense } from "@/types/app";

export function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

export function inferTypeFromPath(path: string): AppType {
  const p = path.toLowerCase();
  if (p.includes("tpv - 2026")) return "tpv";
  if (p.includes("saas - 2026")) return "saas";
  if (p.includes("negocios apps")) return "app";
  if (p.includes("facturacion dev")) return "saas";
  if (p.includes("portafolio aplicaciones crm y erp")) return "saas";
  if (p.includes("apps-webs") || p.includes("app web portafolio")) return "site";
  return "site";
}

export function inferFrameworkFromPath(path: string): Framework {
  const p = path.toLowerCase();
  if (p.includes("php")) return "php";
  if (p.includes("python") || p.includes("django") || p.includes("flask")) return "python";
  if (p.includes("node")) return "node";
  if (p.includes("flutter")) return "flutter";
  return "nextjs";
}

export function inferIndustryAndSense(path: string): { industry: Industry; sense: Sense } {
  const p = path.toLowerCase();
  if (p.includes("clinica") || p.includes("medico") || p.includes("odontologia") || p.includes("botica") || p.includes("farmacia") || p.includes("gimnasio") || p.includes("academia") || p.includes("fitness")) {
    return { industry: "health", sense: p.includes("barbearia") || p.includes("peluqueria") || p.includes("estetica") || p.includes("spa") ? "barbearia" : "clinica" };
  }
  if (p.includes("restaurante") || p.includes("cafeteria") || p.includes("panaderia") || p.includes("hamburgueria") || p.includes("food") || p.includes("fastfood") || p.includes("hosteleria")) {
    return { industry: "food", sense: p.includes("sorveteria") || p.includes("gelato") ? "sorveteria" : "restaurante" };
  }
  if (p.includes("tienda") || p.includes("moda") || p.includes("zapateria") || p.includes("libreria") || p.includes("minimarket") || p.includes("papeleria") || p.includes("ferreteria") || p.includes("boutique") || p.includes("brinquedos")) {
    return { industry: "retail", sense: "loja" };
  }
  if (p.includes("barbearia") || p.includes("peluqueria") || p.includes("estetica") || p.includes("spa") || p.includes("belleza")) {
    return { industry: "health", sense: "barbearia" };
  }
  if (p.includes("hotel") || p.includes("hospedaje")) {
    return { industry: "other", sense: "escritorio" };
  }
  if (p.includes("constructor") || p.includes("obra") || p.includes("construccion")) {
    return { industry: "construction", sense: "outro" };
  }
  if (p.includes("educacion") || p.includes("escuela") || p.includes("academia")) {
    return { industry: "education", sense: "outro" };
  }
  if (p.includes("finanza") || p.includes("facturacion") || p.includes("contable") || p.includes("banco") || p.includes("prestamo")) {
    return { industry: "finance", sense: "escritorio" };
  }
  return { industry: "other", sense: "outro" };
}

export function cleanFolderName(name: string): string {
  return name
    .replace(/\s+/g, " ")
    .replace(/[\/\\:*?"<>|]/g, "")
    .trim();
}

export function isCredentialFile(name: string): boolean {
  const lower = name.toLowerCase();
  return lower.includes("credenciales") || lower.includes("credentials") || lower.includes("password") || lower.includes("senha");
}

export function isExecutable(name: string): boolean {
  const lower = name.toLowerCase();
  return lower.endsWith(".exe") || lower.endsWith(".msi") || lower.endsWith(".zip") || lower.endsWith(".rar") || lower.endsWith(".7z");
}

export function isPrintFile(name: string): boolean {
  const lower = name.toLowerCase();
  return (lower.includes("print") || lower.includes("captura") || lower.includes("screenshot")) && /\.(jpg|jpeg|png|webp)$/i.test(lower);
}

export function isManualPdf(name: string): boolean {
  const lower = name.toLowerCase();
  return lower.endsWith(".pdf") && (lower.includes("manual") || lower.includes("guia") || lower.includes("documentacion") || lower.includes("readme"));
}
```

- [ ] **Step 2: Verificar compilação do utilitário**

```bash
npx tsc --noEmit scripts/drive-utils.ts
```

Expected: nenhum erro (pode ignorar warnings de `tsconfig.json` paths se houver, desde que não sejam do arquivo criado).

- [ ] **Step 3: Commit**

```bash
git add scripts/drive-utils.ts
git commit -m "feat(drive-ingest): add shared utilities for slug, category and file detection"
```

---

### Task 3: Criar script de extração de PDFs

**Files:**
- Create: `scripts/extract-pdfs.ts`

- [ ] **Step 1: Criar script que lê zips e converte PDFs para MD**

```ts
import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";
import pdfParse from "pdf-parse";
import { slugify, cleanFolderName, isManualPdf, isExecutable, isCredentialFile } from "./drive-utils";

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
  printName?: string;
  printBuffer?: Buffer;
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

  return Array.from(apps.values()).filter((a) => a.pdfBuffer);
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

  let total = 0;
  const report: string[] = [];

  for (const zipPath of zips) {
    console.log(`Processing ${path.basename(zipPath)}...`);
    const apps = findAppsInZip(zipPath);

    for (const app of apps) {
      try {
        const pdfData = await pdfParse(app.pdfBuffer!);
        const text = pdfData.text?.slice(0, 8000).trim() || "";

        const appDir = path.join(OUTPUT_DIR, app.slug);
        fs.mkdirSync(appDir, { recursive: true });

        const mdContent = `# ${app.appName}\n\n**Fonte:** ${path.basename(app.sourceZip)} > ${app.folderPath}\n\n**PDF:** ${app.pdfName}\n\n---\n\n${text}\n`;
        fs.writeFileSync(path.join(appDir, "README.md"), mdContent);

        total++;
        report.push(`✓ ${app.slug}: ${app.appName}`);
      } catch (err) {
        report.push(`✗ ${app.slug}: ${app.appName} — ${err instanceof Error ? err.message : String(err)}`);
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
```

- [ ] **Step 2: Rodar o script**

```bash
npx tsx scripts/extract-pdfs.ts
```

Expected: mensagens de progresso e, ao final, `Done. Converted N PDFs to markdown.`

- [ ] **Step 3: Verificar arquivos gerados**

```bash
ls docs/drive-apps-md | head -20
wc -l docs/pdf-extraction-report.md
```

Expected: lista de pastas com slugs e relatório com contagem.

- [ ] **Step 4: Commit**

```bash
git add scripts/extract-pdfs.ts docs/drive-apps-md docs/pdf-extraction-report.md
git commit -m "feat(drive-ingest): extract PDF manuals to markdown"
```

---

### Task 4: Adicionar variáveis de preço no mock-data

**Files:**
- Modify: `src/lib/mock-data.ts`

- [ ] **Step 1: Adicionar constantes de preço após a linha do `developer`**

Localize no `src/lib/mock-data.ts`:

```ts
const developer = "NEXO Digital S.L.";
```

Adicione logo abaixo:

```ts
const CATEGORY_PRICING = {
  site: { pricing: "fixed" as const, price: 299, currency: "EUR" as const },
  saas: { pricing: "subscription" as const, price: 49, currency: "EUR" as const },
  tpv: { pricing: "subscription" as const, price: 79, currency: "EUR" as const },
  app: { pricing: "free" as const, currency: "EUR" as const },
  program: { pricing: "subscription" as const, price: 59, currency: "EUR" as const },
  custom: { pricing: "quote" as const, currency: "EUR" as const },
};
```

- [ ] **Step 2: Garantir que makeApp aceite undefined em price**

A assinatura de `makeApp` já aceita `price: number | undefined`, então nenhuma mudança é necessária.

- [ ] **Step 3: Commit**

```bash
git add src/lib/mock-data.ts
git commit -m "feat(drive-ingest): add category pricing constants"
```

---

### Task 5: Criar script de ingestão principal

**Files:**
- Create: `scripts/ingest-drive-apps.ts`
- Modify: `src/lib/mock-data.ts`

- [ ] **Step 1: Criar script de ingestão**

```ts
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

function extractFeaturesFromMd(text: string, type: string): string[] {
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
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
  const techs = ["React", "Next.js", "Node.js", "PHP", "Python", "Tailwind CSS", "TypeScript", "Laravel", "Django", "PostgreSQL", "MySQL", "Supabase", "Firebase"];
  const found = techs.filter((t) => text.toLowerCase().includes(t.toLowerCase()));
  if (found.length > 0) return [...new Set([framework, ...found])].slice(0, 6);
  return [framework === "nextjs" ? "Next.js" : framework.charAt(0).toUpperCase() + framework.slice(1), "React", "Tailwind CSS"];
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
      const firstParagraph = mdText.split("\n\n").find((p) => p.trim().length > 20);
      if (firstParagraph) {
        description = `${app.name}. ${firstParagraph.replace(/^#+\s+.*$/m, "").trim().slice(0, 400)}`;
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
      const screenshots = `[/screenshot-placeholder.jpg, /screenshot-placeholder.jpg, /screenshot-placeholder.jpg]`;
      const featuresArray = `[${app.features.map((f) => `"${f.replace(/"/g, "'")}"`).join(", ")}]`;
      const techStackArray = `[${app.techStack.map((t) => `"${t}"`).join(", ")}]`;
      const requirementsArray = `[${app.requirements.map((r) => `"${r}"`).join(", ")}]`;
      const tagsArray = `["${app.slug}", "${app.type}", "${app.industry}", "${app.sense}"]`;

      return `  makeApp(
    "${app.id}", "${app.slug}", "${app.name.replace(/"/g, "'")}", "${app.shortDescription.replace(/"/g, "'")}",
    "${app.description.replace(/"/g, "'")}",
    "${app.shortDescription.replace(/"/g, "'")}",
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

  // Remove antigo array driveApps
  const driveAppsStart = content.indexOf("// ===== Google Drive Apps");
  const nextSection = content.indexOf("// ===== LP Creator", driveAppsStart);
  if (driveAppsStart !== -1 && nextSection !== -1) {
    content = content.slice(0, driveAppsStart) + "// ===== Google Drive Apps (ingested from Drive)\nconst driveApps: AppProduct[] = [\n" + generateMakeAppCalls(apps) + "\n];\n\n" + content.slice(nextSection);
  } else {
    throw new Error("Could not locate driveApps section in mock-data.ts");
  }

  fs.writeFileSync(MOCK_DATA_PATH, content);
}

function runIngestion(): void {
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
    ...enriched.filter((a) => !a.printBuffer).map((a) => `- ${a.slug}`),
    ``,
    `## Apps sem manual (MD)`,
    ...enriched.filter((a) => !a.mdText).map((a) => `- ${a.slug}`),
  ].join("\n");

  fs.writeFileSync(path.resolve(__dirname, "../docs/ingest-report.md"), report);
  console.log("Ingestion complete. See docs/ingest-report.md");
}

runIngestion().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Executar ingestão**

```bash
npx tsx scripts/ingest-drive-apps.ts
```

Expected: `Found N apps in zips.` e `Ingestion complete. See docs/ingest-report.md`.

- [ ] **Step 3: Verificar mock-data.ts**

```bash
grep -n "Google Drive Apps" src/lib/mock-data.ts
ls public/thumbnails | wc -l
```

Expected: seção `driveApps` atualizada e thumbnails correspondentes em `public/thumbnails/`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/mock-data.ts scripts/ingest-drive-apps.ts public/thumbnails docs/ingest-report.md
git commit -m "feat(drive-ingest): ingest drive apps into mock-data"
```

---

### Task 6: Compilar e corrigir TypeScript

**Files:**
- Modify: `src/lib/mock-data.ts` (se houver erros)

- [ ] **Step 1: Rodar type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 2: Corrigir erros de compilação**

Se houver erros de string escaping, tipo ou assinatura, abra `src/lib/mock-data.ts` e ajuste manualmente os objetos `makeApp` gerados.

- [ ] **Step 3: Commit**

```bash
git add src/lib/mock-data.ts
git commit -m "fix(drive-ingest): resolve typescript errors in generated apps"
```

---

### Task 7: Pré-preencher wizard de solicitação

**Files:**
- Modify: `src/stores/request-store.ts`
- Modify: `src/app/(store)/request/page.tsx`

- [ ] **Step 1: Criar utilitário de mapeamento app → wizard**

Crie o arquivo `src/lib/request-utils.ts`:

```ts
import { AppProduct } from "@/types/app";
import { WhiteLabelConfig } from "@/types/form";

export function mapAppToRequestDefaults(app: AppProduct): Partial<WhiteLabelConfig> {
  const industryMap: Record<string, string> = {
    health: "Saude",
    food: "Alimentacao",
    retail: "Varejo",
    finance: "Servicos",
    construction: "Servicos",
    education: "Outro",
    entertainment: "Outro",
    other: "Outro",
  };

  const businessTypeMap: Record<string, string> = {
    sorveteria: "Sorveteria",
    barbearia: "Barbearia",
    clinica: "Clinica",
    restaurante: "Restaurante",
    loja: "Loja",
    escritorio: "Escritorio",
    outro: "Outro",
  };

  const typeFeatures: Record<string, string[]> = {
    tpv: ["Vendas", "Controle de Estoque", "Multi-usuario", "Relatorios"],
    saas: ["Relatorios", "Multi-usuario", "Integracao WhatsApp"],
    site: ["Vendas", "Agendamento", "Fidelidade"],
    app: ["Vendas", "Fidelidade"],
    program: ["Relatorios", "Multi-usuario"],
    custom: ["Vendas", "Agendamento", "Controle de Estoque", "Relatorios", "Multi-usuario", "Delivery", "Integracao WhatsApp"],
  };

  return {
    businessType: businessTypeMap[app.sense] ?? "Outro",
    industry: industryMap[app.industry] ?? "Outro",
    features: typeFeatures[app.type] ?? [],
  };
}
```

- [ ] **Step 2: Modificar request page para ler ?app=slug**

No arquivo `src/app/(store)/request/page.tsx`, substitua a inicialização do `useRequestStore` para considerar o app:

Localize:

```tsx
export default function RequestPage() {
  const { t } = useI18n();
  const router = useRouter();
  const { step, formData, setField, nextStep, prevStep, submit, isSubmitting, isComplete, requestId, setStep } = useRequestStore();
  const [submitted, setSubmitted] = useState(false);
```

Substitua por:

```tsx
export default function RequestPage() {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { step, formData, setField, setFields, nextStep, prevStep, submit, isSubmitting, isComplete, requestId, setStep } = useRequestStore();
  const [submitted, setSubmitted] = useState(false);
  const [appName, setAppName] = useState<string | null>(null);

  useEffect(() => {
    const appSlug = searchParams.get("app");
    if (appSlug) {
      import("@/lib/mock-data").then(({ getAppBySlug }) => {
        const { mapAppToRequestDefaults } = require("@/lib/request-utils");
        const app = getAppBySlug(appSlug);
        if (app) {
          setAppName(app.name);
          setFields(mapAppToRequestDefaults(app));
        }
      });
    }
  }, [searchParams, setFields]);
```

Observação: `useSearchParams` já está importado no topo do arquivo.

- [ ] **Step 3: Exibir contexto do app no header**

Localize o header do wizard:

```tsx
<h1 className="text-base font-semibold text-text-primary">{t("request.title")}</h1>
```

Substitua por:

```tsx
<h1 className="text-base font-semibold text-text-primary">
  {appName ? `${t("request.title")}: ${appName}` : t("request.title")}
</h1>
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/request-utils.ts src/app/(store)/request/page.tsx
git commit -m "feat(request): pre-fill wizard from selected app"
```

---

### Task 8: Criar checklist de demos pendentes

**Files:**
- Create: `docs/demo-urls.md`

- [ ] **Step 1: Gerar checklist**

Após a ingestão, execute:

```bash
node -e "
const { mockApps } = require('./src/lib/mock-data.ts');
const fs = require('fs');
const apps = mockApps.filter(a => a.id.startsWith('gd-') && !a.demoUrl?.startsWith('http'));
const lines = ['# Demos pendentes', '', '| App | Slug |', '|---|---|', ...apps.map(a => \`| \${a.name} | \${a.slug} |\`), ''];
fs.writeFileSync('docs/demo-urls.md', lines.join('\n'));
"
```

- [ ] **Step 2: Commit**

```bash
git add docs/demo-urls.md
git commit -m "docs: add demo urls checklist for ingested apps"
```

---

### Task 9: Build e testes finais

**Files:**
- Modify: qualquer arquivo com erros de build

- [ ] **Step 1: Rodar lint**

```bash
npm run lint
```

Expected: sem erros (warnings são aceitáveis).

- [ ] **Step 2: Rodar build**

```bash
npm run build
```

Expected: build completo sem erros.

- [ ] **Step 3: Testar wizard localmente**

```bash
npm run dev
```

Acesse `http://localhost:3000/app/{slug-de-um-app-novo}` e clique em **Instalar**. Verifique se o wizard abre com `?app={slug}` e campos pré-preenchidos.

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "feat(drive-ingest): finalize drive apps ingestion and request wizard integration"
```

---

## Self-Review

- **Spec coverage:**
  - Preços por categoria variáveis → Task 4
  - Extração de PDFs para MD → Task 3
  - Ingestão de apps no mock-data → Task 5
  - Imagens de capa → Task 5
  - Wizard pré-preenchido → Task 7
  - Demo desabilitado sem URL → já comportamento existente, checklist Task 8
  - Duplicatas por slug → Task 5 (substitui driveApps inteiro)

- **Placeholder scan:** nenhum TBD/TODO no plano.

- **Type consistency:**
  - `CATEGORY_PRICING` usado consistentemente no script de ingestão e no `mock-data.ts`.
  - `mapAppToRequestDefaults` retorna `Partial<WhiteLabelConfig>` e é consumido por `setFields`.

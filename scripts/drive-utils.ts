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

  if (
    p.includes("clinica") ||
    p.includes("medico") ||
    p.includes("odontologia") ||
    p.includes("botica") ||
    p.includes("farmacia") ||
    p.includes("gimnasio") ||
    p.includes("academia") ||
    p.includes("fitness")
  ) {
    const isBarbearia =
      p.includes("barbearia") ||
      p.includes("peluqueria") ||
      p.includes("estetica") ||
      p.includes("spa");
    return { industry: "health", sense: isBarbearia ? "barbearia" : "clinica" };
  }

  if (
    p.includes("restaurante") ||
    p.includes("cafeteria") ||
    p.includes("panaderia") ||
    p.includes("hamburgueria") ||
    p.includes("food") ||
    p.includes("fastfood") ||
    p.includes("hosteleria")
  ) {
    return {
      industry: "food",
      sense: p.includes("sorveteria") || p.includes("gelato") ? "sorveteria" : "restaurante",
    };
  }

  if (
    p.includes("tienda") ||
    p.includes("moda") ||
    p.includes("zapateria") ||
    p.includes("libreria") ||
    p.includes("minimarket") ||
    p.includes("papeleria") ||
    p.includes("ferreteria") ||
    p.includes("boutique") ||
    p.includes("brinquedos")
  ) {
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
  return name.replace(/\s+/g, " ").replace(/[\/\\:*?"<>|]/g, "").trim();
}

export function isCredentialFile(name: string): boolean {
  const lower = name.toLowerCase();
  return lower.includes("credenciales") || lower.includes("credentials") || lower.includes("password") || lower.includes("senha");
}

export function isExecutable(name: string): boolean {
  const lower = name.toLowerCase();
  return (
    lower.endsWith(".exe") ||
    lower.endsWith(".msi") ||
    lower.endsWith(".zip") ||
    lower.endsWith(".rar") ||
    lower.endsWith(".7z")
  );
}

export function isPrintFile(name: string): boolean {
  const lower = name.toLowerCase();
  return (lower.includes("print") || lower.includes("captura") || lower.includes("screenshot") || lower.includes("negocio")) && /\.(jpg|jpeg|png|webp)$/i.test(lower);
}

export function isManualPdf(name: string): boolean {
  const lower = name.toLowerCase();
  return lower.endsWith(".pdf") && (lower.includes("manual") || lower.includes("guia") || lower.includes("documentacion") || lower.includes("readme"));
}

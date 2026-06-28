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
  const p = path
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const isHealth =
    p.includes("clinica") ||
    p.includes("medico") ||
    p.includes("odontologia") ||
    p.includes("odontologia") ||
    p.includes("botica") ||
    p.includes("farmacia") ||
    p.includes("veterinaria") ||
    p.includes("laboratorio clinico") ||
    p.includes("salon de belleza") ||
    p.includes("peluqueria") ||
    p.includes("estetica") ||
    p.includes("spa");

  const isFitness = p.includes("gimnasio") || p.includes("academia") || p.includes("fitness");

  if (isHealth || isFitness) {
    const isBarbearia =
      p.includes("barbearia") ||
      p.includes("peluqueria") ||
      p.includes("estetica") ||
      p.includes("spa") ||
      p.includes("salon de belleza");
    return { industry: "health", sense: isBarbearia ? "barbearia" : "clinica" };
  }

  if (
    p.includes("restaurante") ||
    p.includes("cafeteria") ||
    p.includes("panaderia") ||
    p.includes("pasteleria") ||
    p.includes("hamburgueria") ||
    p.includes("food") ||
    p.includes("fastfood") ||
    p.includes("hosteleria") ||
    p.includes("polleria") ||
    p.includes("copas")
  ) {
    return {
      industry: "food",
      sense: p.includes("sorveteria") || p.includes("gelato") || p.includes("heladeria") ? "sorveteria" : "restaurante",
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
    p.includes("brinquedos") ||
    p.includes("joyeria") ||
    p.includes("relojeria") ||
    p.includes("celulares")
  ) {
    return { industry: "retail", sense: "loja" };
  }

  if (p.includes("barbearia") || p.includes("belleza")) {
    return { industry: "health", sense: "barbearia" };
  }

  if (p.includes("hotel") || p.includes("hospedaje")) {
    return { industry: "other", sense: "escritorio" };
  }

  if (p.includes("constructor") || p.includes("construccion") || p.includes("taller automotriz") || p.includes("taller_automotriz") || p.includes("obra ") || p.includes(" obras")) {
    return { industry: "construction", sense: "outro" };
  }

  if (p.includes("educacion") || p.includes("escuela") || p.includes("colegio") || p.includes("universidad") || p.includes("academica") || p.includes("biblioteca")) {
    return { industry: "education", sense: "outro" };
  }

  if (
    p.includes("finanza") ||
    p.includes("facturacion") ||
    p.includes("contable") ||
    p.includes("banco") ||
    p.includes("prestamo") ||
    p.includes("cobranza") ||
    p.includes("cotizacion") ||
    p.includes("encomienda") ||
    p.includes("almacen") ||
    p.includes("inventario")
  ) {
    return { industry: "finance", sense: "escritorio" };
  }

  if (p.includes("parqueo") || p.includes("estacionamiento") || p.includes("delivery") || p.includes("transporte") || p.includes("agencia de viajes")) {
    return { industry: "other", sense: "escritorio" };
  }

  return { industry: "other", sense: "outro" };
}

export function isInstallerFolder(path: string): boolean {
  const p = path.toLowerCase();
  const installerTerms = [
    "instaladores",
    "laragon",
    "postgresql",
    "sql server",
    "microsoft sql",
    "dotnet",
    "sdk .net",
    ".net sdk",
    "xampp",
    "wamp",
    "node_modules",
    "vendor",
  ];
  return installerTerms.some((term) => p.includes(term));
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

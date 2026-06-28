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
    sense: app.sense,
    features: typeFeatures[app.type] ?? [],
  };
}

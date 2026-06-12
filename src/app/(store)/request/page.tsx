"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Check } from "lucide-react";
import { useRequestStore } from "@/stores/request-store";
import { cn } from "@/lib/utils";
import { useState } from "react";

const steps = [
  { num: 1, title: "Negocio", desc: "Tipo e nome" },
  { num: 2, title: "Contato", desc: "Suas informacoes" },
  { num: 3, title: "Marca", desc: "Cores e logo" },
  { num: 4, title: "Funcoes", desc: "O que precisa" },
  { num: 5, title: "Revisar", desc: "Confirmar" },
];

const businessTypes = ["Sorveteria", "Barbearia", "Restaurante", "Clinica", "Loja", "Escritorio", "Outro"];
const industries = ["Alimentacao", "Saude", "Varejo", "Servicos", "Educacao", "Outro"];
const featuresList = [
  "Controle de Estoque", "Vendas", "Agendamento", "Fidelidade",
  "Relatorios", "Multi-usuario", "Delivery", "Integracao WhatsApp",
];
const timelines = ["1-2 semanas", "1 mes", "2-3 meses", "Flexivel"];

export default function RequestPage() {
  const router = useRouter();
  const { step, formData, setField, nextStep, prevStep, submit, isSubmitting, isComplete, requestId, setStep } = useRequestStore();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const result = await submit();
    if (result.success) setSubmitted(true);
  };

  if (isComplete || submitted) {
    return (
      <div className="w-full px-4 pt-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-16 h-16 rounded-full bg-[#10B981]/20 flex items-center justify-center mb-4"
        >
          <Check className="w-8 h-8 text-[#10B981]" />
        </motion.div>
        <h1 className="text-xl font-bold text-[#F1F5F9]">Solicitacao Enviada!</h1>
        <p className="text-sm text-[#94A3B8] mt-2 max-w-xs">
          Recebemos sua solicitacao. Nossa equipe entrara em contato em breve.
        </p>
        {requestId && (
          <p className="text-xs text-[#475569] mt-3 font-mono">ID: {requestId}</p>
        )}
        <button
          onClick={() => router.push("/")}
          className="mt-6 h-11 px-6 rounded-2xl bg-[#3B82F6] text-white font-medium text-sm"
        >
          Voltar ao inicio
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-[#2A2A35]">
        <button onClick={() => router.push("/")} className="w-10 h-10 flex items-center justify-center -ml-2">
          <ArrowLeft className="w-5 h-5 text-[#94A3B8]" />
        </button>
        <h1 className="text-base font-semibold text-[#F1F5F9]">Solicitar App</h1>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-1 px-4 py-4">
        {steps.map((s) => (
          <button
            key={s.num}
            onClick={() => s.num < step && setStep(s.num as 1 | 2 | 3 | 4 | 5)}
            className={cn(
              "flex flex-col items-center gap-1 px-2",
              s.num <= step ? "opacity-100" : "opacity-40"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                s.num === step
                  ? "bg-[#3B82F6] text-white"
                  : s.num < step
                  ? "bg-[#10B981] text-white"
                  : "bg-[#1E1E24] text-[#475569]"
              )}
            >
              {s.num < step ? <Check className="w-4 h-4" /> : s.num}
            </div>
            <span className="text-[9px] font-medium text-[#94A3B8]">{s.title}</span>
          </button>
        ))}
      </div>

      {/* Step content */}
      <div className="px-4 pb-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#F1F5F9]">Sobre seu negocio</h2>
            <div>
              <label className="text-xs font-medium text-[#94A3B8] mb-1 block">Nome do negocio</label>
              <input
                type="text"
                value={formData.businessName ?? ""}
                onChange={(e) => setField("businessName", e.target.value)}
                placeholder="Ex: Gelato Artesanal"
                className="w-full h-11 px-3 rounded-xl bg-[#141419] border border-[#2A2A35] text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#94A3B8] mb-1 block">Tipo de negocio</label>
              <div className="grid grid-cols-2 gap-2">
                {businessTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setField("businessType", t)}
                    className={cn(
                      "h-10 rounded-xl text-xs font-medium border transition-colors",
                      formData.businessType === t
                        ? "bg-[#3B82F6] border-[#3B82F6] text-white"
                        : "bg-[#141419] border-[#2A2A35] text-[#94A3B8] hover:border-[#3B82F6]/40"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-[#94A3B8] mb-1 block">Industria</label>
              <div className="grid grid-cols-2 gap-2">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setField("industry", ind)}
                    className={cn(
                      "h-10 rounded-xl text-xs font-medium border transition-colors",
                      formData.industry === ind
                        ? "bg-[#3B82F6] border-[#3B82F6] text-white"
                        : "bg-[#141419] border-[#2A2A35] text-[#94A3B8] hover:border-[#3B82F6]/40"
                    )}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#F1F5F9]">Seus dados</h2>
            <div>
              <label className="text-xs font-medium text-[#94A3B8] mb-1 block">Nome completo</label>
              <input
                type="text"
                value={formData.contactName ?? ""}
                onChange={(e) => setField("contactName", e.target.value)}
                placeholder="Seu nome"
                className="w-full h-11 px-3 rounded-xl bg-[#141419] border border-[#2A2A35] text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#94A3B8] mb-1 block">Email</label>
              <input
                type="email"
                value={formData.email ?? ""}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="seu@email.com"
                className="w-full h-11 px-3 rounded-xl bg-[#141419] border border-[#2A2A35] text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#94A3B8] mb-1 block">Telefone (opcional)</label>
              <input
                type="tel"
                value={formData.phone ?? ""}
                onChange={(e) => setField("phone", e.target.value)}
                placeholder="+55 11 99999-9999"
                className="w-full h-11 px-3 rounded-xl bg-[#141419] border border-[#2A2A35] text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#F1F5F9]">Marca e identidade</h2>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs font-medium text-[#94A3B8] mb-1 block">Cor primaria</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.primaryColor ?? "#3B82F6"}
                    onChange={(e) => setField("primaryColor", e.target.value)}
                    className="w-10 h-10 rounded-xl border border-[#2A2A35] bg-transparent cursor-pointer"
                  />
                  <span className="text-xs text-[#94A3B8] font-mono">{formData.primaryColor ?? "#3B82F6"}</span>
                </div>
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium text-[#94A3B8] mb-1 block">Cor secundaria</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.secondaryColor ?? "#10B981"}
                    onChange={(e) => setField("secondaryColor", e.target.value)}
                    className="w-10 h-10 rounded-xl border border-[#2A2A35] bg-transparent cursor-pointer"
                  />
                  <span className="text-xs text-[#94A3B8] font-mono">{formData.secondaryColor ?? "#10B981"}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#F1F5F9]">Funcionalidades</h2>
            <div className="grid grid-cols-2 gap-2">
              {featuresList.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    const current = formData.features ?? [];
                    const updated = current.includes(f) ? current.filter((x) => x !== f) : [...current, f];
                    setField("features", updated);
                  }}
                  className={cn(
                    "h-10 rounded-xl text-xs font-medium border transition-colors",
                    formData.features?.includes(f)
                      ? "bg-[#3B82F6] border-[#3B82F6] text-white"
                      : "bg-[#141419] border-[#2A2A35] text-[#94A3B8] hover:border-[#3B82F6]/40"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#F1F5F9]">Revisar e enviar</h2>
            <div className="space-y-3 rounded-2xl bg-[#141419] border border-[#2A2A35] p-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Negocio:</span>
                <span className="text-[#F1F5F9] font-medium">{formData.businessName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Tipo:</span>
                <span className="text-[#F1F5F9]">{formData.businessType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Contato:</span>
                <span className="text-[#F1F5F9]">{formData.contactName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Email:</span>
                <span className="text-[#F1F5F9]">{formData.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Funcionalidades:</span>
                <span className="text-[#F1F5F9]">{(formData.features ?? []).length} selecionadas</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-[#94A3B8] mb-1 block">Prazo desejado</label>
              <div className="grid grid-cols-2 gap-2">
                {timelines.map((t) => (
                  <button
                    key={t}
                    onClick={() => setField("timeline", t)}
                    className={cn(
                      "h-10 rounded-xl text-xs font-medium border transition-colors",
                      formData.timeline === t
                        ? "bg-[#3B82F6] border-[#3B82F6] text-white"
                        : "bg-[#141419] border-[#2A2A35] text-[#94A3B8] hover:border-[#3B82F6]/40"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex-1 h-11 rounded-2xl border border-[#2A2A35] text-sm font-medium text-[#94A3B8] hover:bg-[#141419] transition-colors"
            >
              Voltar
            </button>
          )}
          {step < 5 ? (
            <button
              onClick={nextStep}
              className="flex-1 h-11 rounded-2xl bg-[#3B82F6] text-white text-sm font-medium hover:bg-[#2563EB] transition-colors"
            >
              Continuar
              <ChevronRight className="w-4 h-4 inline ml-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.timeline}
              className={cn(
                "flex-1 h-11 rounded-2xl text-sm font-medium transition-colors",
                isSubmitting || !formData.timeline
                  ? "bg-[#1E1E24] text-[#475569]"
                  : "bg-[#10B981] text-white hover:bg-[#059669]"
              )}
            >
              {isSubmitting ? "Enviando..." : "Enviar Solicitacao"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Check } from "lucide-react";
import { useRequestStore } from "@/stores/request-store";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useI18n } from "@/i18n";
import { mapAppToRequestDefaults } from "@/lib/request-utils";
import { getAppBySlug } from "@/lib/mock-data";

const businessTypes = ["Sorveteria", "Barbearia", "Restaurante", "Clinica", "Loja", "Escritorio", "Outro"];
const industries = ["Alimentacao", "Saude", "Varejo", "Servicos", "Educacao", "Outro"];
const featuresList = [
  "Controle de Estoque", "Vendas", "Agendamento", "Fidelidade",
  "Relatorios", "Multi-usuario", "Delivery", "Integracao WhatsApp",
];
const timelines = ["1-2 semanas", "1 mes", "2-3 meses", "Flexivel"];

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
      const app = getAppBySlug(appSlug);
      if (app) {
        setAppName(app.name);
        setFields(mapAppToRequestDefaults(app));
      }
    }
  }, [searchParams, setFields]);

  const steps = [
    { num: 1, title: t("request.business"), desc: t("request.business") },
    { num: 2, title: t("request.contact"), desc: t("request.contact") },
    { num: 3, title: t("request.brand"), desc: t("request.brand") },
    { num: 4, title: t("request.features"), desc: t("request.features") },
    { num: 5, title: t("request.review"), desc: t("request.review") },
  ];

  const handleSubmit = async () => {
    const result = await submit();
    if (result.success) setSubmitted(true);
  };

  if (isComplete || submitted) {
    return (
      <div className="w-full min-h-[calc(100dvh-3.5rem)] px-4 pt-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4"
        >
          <Check className="w-8 h-8 text-success" />
        </motion.div>
        <h1 className="text-xl font-bold text-text-primary">{t("request.successTitle")}</h1>
        <p className="text-sm text-text-secondary mt-2 max-w-xs">
          {t("request.successMessage")}
        </p>
        {requestId && (
          <p className="text-xs text-text-muted mt-3 font-mono">{t("request.requestId")}: {requestId}</p>
        )}
        <button
          onClick={() => router.push("/")}
          className={cn(
            "mt-6 h-11 px-6 rounded-2xl text-sm font-medium",
            "bg-primary text-on-primary hover:bg-primary-hover transition-colors"
          )}
        >
          {t("request.backHome")}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 h-14 border-b border-border-default">
        <button
          onClick={() => router.push("/")}
          className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full hover:bg-surface-tertiary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-text-secondary" />
        </button>
        <h1 className="text-base font-semibold text-text-primary">
          {appName ? `${t("request.title")}: ${appName}` : t("request.title")}
        </h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Step indicator */}
        <div className="flex items-center justify-between gap-1 mb-8">
          {steps.map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => s.num < step && setStep(s.num as 1 | 2 | 3 | 4 | 5)}
                disabled={s.num >= step}
                className={cn(
                  "flex flex-col items-center gap-1.5",
                  s.num <= step ? "opacity-100" : "opacity-40"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors border",
                    s.num === step
                      ? "bg-primary border-primary text-on-primary"
                      : s.num < step
                      ? "bg-success border-success text-on-primary"
                      : "bg-surface-secondary border-border-default text-text-muted"
                  )}
                >
                  {s.num < step ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className="text-[9px] font-medium text-text-secondary hidden sm:block">{s.title}</span>
              </button>
              {idx < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 mx-2 rounded-full",
                  s.num < step ? "bg-success" : "bg-border-default"
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="space-y-5">
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-text-primary">{t("request.businessStepTitle")}</h2>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1.5 block">{t("request.businessName")}</label>
                <input
                  type="text"
                  value={formData.businessName ?? ""}
                  onChange={(e) => setField("businessName", e.target.value)}
                  placeholder={t("request.businessNamePlaceholder")}
                  className={cn(
                    "w-full h-11 px-3 rounded-xl border bg-background text-sm text-text-primary placeholder:text-text-muted",
                    "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  )}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1.5 block">{t("request.businessType")}</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {businessTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setField("businessType", t)}
                      className={cn(
                        "h-10 rounded-xl text-xs font-medium border transition-colors",
                        formData.businessType === t
                          ? "bg-primary border-primary text-on-primary"
                          : "bg-surface-secondary border-border-default text-text-secondary hover:border-primary/40"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1.5 block">{t("request.industry")}</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {industries.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setField("industry", ind)}
                      className={cn(
                        "h-10 rounded-xl text-xs font-medium border transition-colors",
                        formData.industry === ind
                          ? "bg-primary border-primary text-on-primary"
                          : "bg-surface-secondary border-border-default text-text-secondary hover:border-primary/40"
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
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-text-primary">{t("request.contactStepTitle")}</h2>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1.5 block">{t("request.contactName")}</label>
                <input
                  type="text"
                  value={formData.contactName ?? ""}
                  onChange={(e) => setField("contactName", e.target.value)}
                  placeholder={t("request.contactNamePlaceholder")}
                  className={cn(
                    "w-full h-11 px-3 rounded-xl border bg-background text-sm text-text-primary placeholder:text-text-muted",
                    "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  )}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1.5 block">{t("request.email")}</label>
                <input
                  type="email"
                  value={formData.email ?? ""}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder={t("request.emailPlaceholder")}
                  className={cn(
                    "w-full h-11 px-3 rounded-xl border bg-background text-sm text-text-primary placeholder:text-text-muted",
                    "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  )}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1.5 block">{t("request.phone")}</label>
                <input
                  type="tel"
                  value={formData.phone ?? ""}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder={t("request.phonePlaceholder")}
                  className={cn(
                    "w-full h-11 px-3 rounded-xl border bg-background text-sm text-text-primary placeholder:text-text-muted",
                    "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  )}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-text-primary">{t("request.brandStepTitle")}</h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-medium text-text-secondary mb-1.5 block">{t("request.primaryColor")}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.primaryColor ?? "#3B82F6"}
                      onChange={(e) => setField("primaryColor", e.target.value)}
                      className="w-10 h-10 rounded-xl border border-border-default bg-transparent cursor-pointer"
                    />
                    <span className="text-xs text-text-secondary font-mono">{formData.primaryColor ?? "#3B82F6"}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-text-secondary mb-1.5 block">{t("request.secondaryColor")}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.secondaryColor ?? "#10B981"}
                      onChange={(e) => setField("secondaryColor", e.target.value)}
                      className="w-10 h-10 rounded-xl border border-border-default bg-transparent cursor-pointer"
                    />
                    <span className="text-xs text-text-secondary font-mono">{formData.secondaryColor ?? "#10B981"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-text-primary">{t("request.featuresStepTitle")}</h2>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1.5 block">{t("request.featuresLabel")}</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                          ? "bg-primary border-primary text-on-primary"
                          : "bg-surface-secondary border-border-default text-text-secondary hover:border-primary/40"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-text-primary">{t("request.reviewStepTitle")}</h2>
              <div className="space-y-3 rounded-2xl bg-surface-secondary border border-border-default p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">{t("request.reviewBusiness")}</span>
                  <span className="text-text-primary font-medium">{formData.businessName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">{t("request.reviewType")}</span>
                  <span className="text-text-primary">{formData.businessType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">{t("request.reviewContact")}</span>
                  <span className="text-text-primary">{formData.contactName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">{t("request.reviewEmail")}</span>
                  <span className="text-text-primary">{formData.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">{t("request.reviewFeatures")}</span>
                  <span className="text-text-primary">{t("request.selectedCount", { count: (formData.features ?? []).length })}</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1.5 block">{t("request.timeline")}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timelines.map((t) => (
                    <button
                      key={t}
                      onClick={() => setField("timeline", t)}
                      className={cn(
                        "h-10 rounded-xl text-xs font-medium border transition-colors",
                        formData.timeline === t
                          ? "bg-primary border-primary text-on-primary"
                          : "bg-surface-secondary border-border-default text-text-secondary hover:border-primary/40"
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
          <div className="flex gap-3 pt-2">
            {step > 1 && (
              <button
                onClick={prevStep}
                className={cn(
                  "flex-1 h-11 rounded-2xl border text-sm font-medium transition-colors",
                  "border-border-default text-text-secondary hover:bg-surface-secondary"
                )}
              >
                {t("request.back")}
              </button>
            )}
            {step < 5 ? (
              <button
                onClick={nextStep}
                className={cn(
                  "flex-1 h-11 rounded-2xl bg-primary text-on-primary text-sm font-medium hover:bg-primary-hover transition-colors"
                )}
              >
                {t("request.continue")}
                <ChevronRight className="w-4 h-4 inline ml-1" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.timeline}
                className={cn(
                  "flex-1 h-11 rounded-2xl text-sm font-medium transition-colors",
                  isSubmitting || !formData.timeline
                    ? "bg-surface-tertiary text-text-muted"
                    : "bg-success text-on-primary hover:bg-success-hover"
                )}
              >
                {isSubmitting ? t("request.submitting") : t("request.submit")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

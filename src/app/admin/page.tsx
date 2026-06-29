"use client";

import { useEffect, useMemo, useState } from "react";
import { AppProduct, AppType, Framework, Industry, AppStatus, Pricing, Sense } from "@/types/app";
import { AppCard } from "@/components/AppCard";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  ArrowLeft,
  Save,
  Trash2,
  Upload,
  LogOut,
  LayoutGrid,
  Package,
  Shield,
  Tags,
  Settings,
  FileText,
  ImageIcon,
  DollarSign,
  Box,
} from "lucide-react";

const APP_TYPES: AppType[] = ["app", "saas", "site", "program", "tpv", "custom"];
const FRAMEWORKS: Framework[] = ["nextjs", "react", "flutter", "node", "php", "python", "swift", "kotlin", "other"];
const INDUSTRIES: Industry[] = ["retail", "food", "health", "construction", "education", "entertainment", "finance", "other"];
const SENSES: Sense[] = ["sorveteria", "barbearia", "clinica", "restaurante", "loja", "escritorio", "outro"];
const STATUSES: AppStatus[] = ["available", "beta", "coming_soon", "deprecated"];
const PRICINGS: Pricing[] = ["free", "fixed", "subscription", "quote"];
const CURRENCIES: Array<"EUR" | "USD" | "BRL"> = ["EUR", "USD", "BRL"];

const TABS = [
  { key: "basic", label: "Básico", icon: Box },
  { key: "media", label: "Mídia", icon: ImageIcon },
  { key: "pricing", label: "Preço", icon: DollarSign },
  { key: "content", label: "Conteúdo", icon: FileText },
  { key: "meta", label: "SEO", icon: Tags },
  { key: "advanced", label: "Avançado", icon: Settings },
];

const emptyApp = (): AppProduct => ({
  id: "",
  slug: "",
  name: "",
  subtitle: "",
  description: "",
  shortDescription: "",
  icon: "",
  thumbnail: "",
  screenshots: ["/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg", "/screenshot-placeholder.jpg"],
  type: "saas",
  framework: "nextjs",
  industry: "other",
  sense: "outro",
  status: "available",
  version: "1.0.0",
  releaseDate: new Date().toISOString().split("T")[0],
  lastUpdate: new Date().toISOString().split("T")[0],
  hasDemo: false,
  demoUrl: "",
  requestUrl: "",
  pricing: "subscription",
  price: 49,
  currency: "EUR",
  rating: 4.5,
  reviewCount: 0,
  downloadCount: 0,
  developer: "NEXO Digital S.L.",
  techStack: [],
  features: [],
  requirements: ["Navegador moderno", "Conexão internet"],
  metaTitle: "",
  metaDescription: "",
  keywords: [],
  tags: [],
});

function generateId() {
  return `app-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [apps, setApps] = useState<AppProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AppProduct | null>(null);
  const [form, setForm] = useState<AppProduct>(emptyApp());
  const [activeTab, setActiveTab] = useState("basic");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (authenticated) loadApps();
  }, [authenticated]);

  async function loadApps() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/apps/");
      const data = await res.json();
      setApps(data.apps || []);
    } catch {
      showMessage("error", "Erro ao carregar apps");
    } finally {
      setLoading(false);
    }
  }

  function showMessage(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/apps/", { headers: { "x-admin-key": key } });
      if (res.ok) {
        setAuthenticated(true);
        localStorage.setItem("nexo-admin-key", key);
      } else {
        showMessage("error", "Chave inválida");
      }
    } catch {
      showMessage("error", "Erro ao validar chave");
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem("nexo-admin-key");
    if (saved) {
      setKey(saved);
      fetch("/api/admin/apps/", { headers: { "x-admin-key": saved } })
        .then((r) => {
          if (r.ok) setAuthenticated(true);
          else localStorage.removeItem("nexo-admin-key");
        })
        .catch(() => localStorage.removeItem("nexo-admin-key"));
    }
  }, []);

  function openNew() {
    setForm(emptyApp());
    setEditing(null);
    setActiveTab("basic");
    setFormOpen(true);
  }

  function openEdit(app: AppProduct) {
    setForm({ ...app });
    setEditing(app);
    setActiveTab("basic");
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  async function saveApp(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...form };
    if (!payload.id) payload.id = generateId();
    if (!payload.icon) payload.icon = `/icons/${payload.slug}.svg`;
    if (!payload.thumbnail) payload.thumbnail = `/thumbnails/${payload.slug}.jpg`;
    if (!payload.metaTitle) payload.metaTitle = payload.name;
    if (!payload.metaDescription) payload.metaDescription = payload.shortDescription;
    if (!payload.requestUrl) payload.requestUrl = `#solicitar-${payload.slug}`;

    const url = editing ? `/api/admin/apps/${editing.id}/` : "/api/admin/apps/";
    const method = editing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showMessage("success", editing ? "App atualizado" : "App criado");
        closeForm();
        await loadApps();
      } else {
        const data = await res.json();
        showMessage("error", data.error || "Erro ao salvar");
      }
    } catch {
      showMessage("error", "Erro ao salvar app");
    }
  }

  async function removeApp(app: AppProduct) {
    if (!confirm(`Tem certeza que deseja excluir "${app.name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/apps/${app.id}/`, {
        method: "DELETE",
        headers: { "x-admin-key": key },
      });
      if (res.ok) {
        showMessage("success", "App removido");
        await loadApps();
      } else {
        showMessage("error", "Erro ao remover");
      }
    } catch {
      showMessage("error", "Erro ao remover app");
    }
  }

  async function uploadImage(file: File, slug: string, field: "thumbnail") {
    setUploading(true);
    try {
      const filename = field === "thumbnail" ? slug : `${slug}-${field}`;
      const fd = new FormData();
      fd.append("file", file);
      fd.append("slug", filename);
      const res = await fetch("/api/admin/upload/", {
        method: "POST",
        headers: { "x-admin-key": key },
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setForm((f) => ({ ...f, thumbnail: data.path }));
        showMessage("success", "Thumbnail enviada");
      } else {
        showMessage("error", data.error || "Erro no upload");
      }
    } catch {
      showMessage("error", "Erro no upload");
    } finally {
      setUploading(false);
    }
  }

  async function uploadScreenshots(files: File[], slug: string) {
    setUploading(true);
    const newPaths: string[] = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const fd = new FormData();
        fd.append("file", files[i]);
        fd.append("slug", `${slug}-screenshot-${Date.now()}-${i + 1}`);
        const res = await fetch("/api/admin/upload/", {
          method: "POST",
          headers: { "x-admin-key": key },
          body: fd,
        });
        const data = await res.json();
        if (res.ok) newPaths.push(data.path);
      } catch {
        showMessage("error", `Erro no upload da imagem ${i + 1}`);
      }
    }
    if (newPaths.length) {
      setForm((f) => ({ ...f, screenshots: [...f.screenshots, ...newPaths] }));
      showMessage("success", `${newPaths.length} screenshot(s) adicionado(s)`);
    }
    setUploading(false);
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return apps.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.slug.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q)
    );
  }, [apps, search]);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-surface border border-border-default rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mx-auto mb-6">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary text-center tracking-tight">Administrador</h1>
          <p className="text-sm text-text-secondary text-center mt-2 mb-8">Acesso restrito ao painel NEXO</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Chave de acesso</label>
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="ADMIN_API_KEY"
                className="w-full h-11 px-4 rounded-xl bg-background border border-border-default text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <button type="submit" className="w-full h-11 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-hover transition-colors">
              Entrar
            </button>
          </form>
          {message && <p className={cn("text-xs text-center mt-4", message.type === "success" ? "text-success" : "text-error")}>{message.text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-text-primary tracking-tight">NEXO Admin</h1>
              <p className="text-[10px] text-text-muted leading-none">{apps.length} apps publicados</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" className="hidden sm:flex items-center gap-2 h-9 px-4 rounded-full text-sm font-medium text-text-secondary hover:bg-surface-secondary transition-colors">
              <Package className="w-4 h-4" /> Ver loja
            </a>
            <button onClick={() => { setAuthenticated(false); localStorage.removeItem("nexo-admin-key"); }} className="flex items-center gap-2 h-9 px-4 rounded-full text-sm font-medium text-text-secondary hover:bg-surface-secondary transition-colors">
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar apps..."
              className="w-full h-10 pl-10 pr-4 rounded-full bg-surface-secondary border border-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:bg-background focus:border-border-default transition-all"
            />
          </div>
          <button onClick={openNew} className="flex items-center gap-2 h-10 px-5 rounded-full bg-primary text-on-primary text-sm font-semibold hover:bg-primary-hover transition-colors">
            <Plus className="w-4 h-4" /> Novo app
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-surface border border-border-default overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-surface-tertiary" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-28 bg-surface-tertiary rounded" />
                  <div className="h-3 w-20 bg-surface-tertiary rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-base font-medium text-text-primary">Nenhum app encontrado</p>
            <p className="text-sm text-text-secondary mt-1">Tente outro termo ou adicione um novo app.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((app, i) => (
              <div key={app.id} className="group relative">
                <AppCard app={app} index={i} />
                <div className="absolute inset-x-0 top-0 p-2 flex items-start justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); openEdit(app); }} className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm hover:scale-105 transition-transform" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                  </button>
                  <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeApp(app); }} className="w-8 h-8 rounded-full bg-error text-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform" title="Excluir">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          {/* Modal Header */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border-default px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button type="button" onClick={closeForm} className="w-10 h-10 rounded-full hover:bg-surface-secondary flex items-center justify-center text-text-secondary transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-lg font-bold text-text-primary tracking-tight">{editing ? form.name || "Editar app" : "Novo app"}</h2>
                <p className="text-[10px] text-text-muted leading-none">{editing ? `slug: ${form.slug}` : "Preencha todos os campos"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {editing && (
                <button type="button" onClick={() => removeApp(form)} className="flex items-center gap-2 h-10 px-4 rounded-full text-sm font-medium text-error hover:bg-error/10 transition-colors">
                  <Trash2 className="w-4 h-4" /> Excluir
                </button>
              )}
              <button type="submit" form="admin-app-form" className="flex items-center gap-2 h-10 px-5 rounded-full bg-primary text-on-primary text-sm font-semibold hover:bg-primary-hover transition-colors">
                <Save className="w-4 h-4" /> Salvar
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border-default overflow-x-auto scrollbar-hide">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 h-12">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "flex items-center gap-2 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                      active ? "border-primary text-primary" : "border-transparent text-text-secondary hover:text-text-primary"
                    )}
                  >
                    <Icon className="w-4 h-4" /> {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <form id="admin-app-form" onSubmit={saveApp} className="space-y-6">
                {activeTab === "basic" && (
                  <section className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Nome do app" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                      <Field label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: slugify(v) })} required />
                    </div>
                    <Field label="Subtítulo" value={form.subtitle} onChange={(v) => setForm({ ...form, subtitle: v })} />
                    <Area label="Descrição curta" value={form.shortDescription} onChange={(v) => setForm({ ...form, shortDescription: v })} rows={2} />
                    <Area label="Descrição completa" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={5} />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <Select label="Tipo" value={form.type} onChange={(v) => setForm({ ...form, type: v as AppType })} options={APP_TYPES} />
                      <Select label="Framework" value={form.framework} onChange={(v) => setForm({ ...form, framework: v as Framework })} options={FRAMEWORKS} />
                      <Select label="Indústria" value={form.industry} onChange={(v) => setForm({ ...form, industry: v as Industry })} options={INDUSTRIES} />
                      <Select label="Sense" value={form.sense} onChange={(v) => setForm({ ...form, sense: v as Sense })} options={SENSES} />
                      <Select label="Status" value={form.status} onChange={(v) => setForm({ ...form, status: v as AppStatus })} options={STATUSES} />
                      <Field label="Versão" value={form.version} onChange={(v) => setForm({ ...form, version: v })} />
                    </div>
                  </section>
                )}

                {activeTab === "media" && (
                  <section className="space-y-6">
                    <div className="space-y-3">
                      <label className="block text-xs font-semibold text-text-secondary">Thumbnail</label>
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="w-full sm:w-64 aspect-[16/10] rounded-2xl bg-surface overflow-hidden border border-border-default shadow-sm">
                          {form.thumbnail ? <img src={form.thumbnail} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-text-muted text-sm">Sem imagem</div>}
                        </div>
                        <div className="space-y-3 w-full sm:w-auto">
                          <label className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-hover transition-colors cursor-pointer shadow-sm">
                            <Upload className="w-4 h-4" /> {uploading ? "Enviando..." : "Enviar thumbnail"}
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file && form.slug) uploadImage(file, form.slug, "thumbnail"); }} disabled={uploading || !form.slug} />
                          </label>
                          {!form.slug && <p className="text-xs text-text-muted">Preencha o slug antes de enviar.</p>}
                          <Field label="Ou URL da thumbnail" value={form.thumbnail} onChange={(v) => setForm({ ...form, thumbnail: v })} />
                        </div>
                      </div>
                    </div>

                    <Field label="URL do ícone" value={form.icon} onChange={(v) => setForm({ ...form, icon: v })} />

                    <div className="space-y-3">
                      <label className="block text-xs font-semibold text-text-secondary">Screenshots</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {form.screenshots.map((src, idx) => (
                          <div key={idx} className="aspect-video rounded-2xl bg-surface overflow-hidden border border-border-default shadow-sm relative group">
                            <img src={src} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setForm((f) => ({ ...f, screenshots: f.screenshots.filter((_, i) => i !== idx) }))}
                              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-error text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-sm"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        <label className="aspect-video rounded-2xl bg-surface border-2 border-dashed border-border-default hover:border-primary/40 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors">
                          <Upload className="w-5 h-5 text-text-muted" />
                          <span className="text-xs text-text-muted">Adicionar</span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              if (files.length && form.slug) uploadScreenshots(files, form.slug);
                            }}
                            disabled={uploading || !form.slug}
                          />
                        </label>
                      </div>
                      {!form.slug && <p className="text-xs text-text-muted">Preencha o slug antes de enviar screenshots.</p>}
                    </div>
                  </section>
                )}

                {activeTab === "pricing" && (
                  <section className="space-y-5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <Select label="Modelo de cobrança" value={form.pricing} onChange={(v) => setForm({ ...form, pricing: v as Pricing })} options={PRICINGS} />
                      <Field label="Preço" type="number" value={form.price?.toString() || ""} onChange={(v) => setForm({ ...form, price: v ? Number(v) : undefined })} />
                      <Select label="Moeda" value={form.currency} onChange={(v) => setForm({ ...form, currency: v as "EUR" | "USD" | "BRL" })} options={CURRENCIES} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Rating" type="number" step="0.1" value={form.rating.toString()} onChange={(v) => setForm({ ...form, rating: Number(v) })} />
                      <Field label="Reviews" type="number" value={form.reviewCount.toString()} onChange={(v) => setForm({ ...form, reviewCount: Number(v) })} />
                      <Field label="Downloads" type="number" value={form.downloadCount.toString()} onChange={(v) => setForm({ ...form, downloadCount: Number(v) })} />
                      <Field label="Desenvolvedor" value={form.developer} onChange={(v) => setForm({ ...form, developer: v })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center gap-3 h-12 px-4 rounded-xl bg-surface-secondary cursor-pointer">
                        <input type="checkbox" checked={form.hasDemo} onChange={(e) => setForm({ ...form, hasDemo: e.target.checked })} className="w-4 h-4 accent-primary" />
                        <span className="text-sm text-text-primary">Tem demo?</span>
                      </label>
                    </div>
                    <Field label="URL do demo" value={form.demoUrl} onChange={(v) => setForm({ ...form, demoUrl: v })} />
                    <Field label="URL de solicitação" value={form.requestUrl} onChange={(v) => setForm({ ...form, requestUrl: v })} />
                  </section>
                )}

                {activeTab === "content" && (
                  <section className="space-y-5">
                    <Area label="Funcionalidades (uma por linha)" value={form.features.join("\n")} onChange={(v) => setForm({ ...form, features: v.split("\n").filter(Boolean) })} rows={6} />
                    <Area label="Stack tecnológica (uma por linha)" value={form.techStack.join("\n")} onChange={(v) => setForm({ ...form, techStack: v.split("\n").filter(Boolean) })} rows={4} />
                    <Area label="Requisitos (um por linha)" value={form.requirements.join("\n")} onChange={(v) => setForm({ ...form, requirements: v.split("\n").filter(Boolean) })} rows={3} />
                    <Area label="Tags (uma por linha)" value={form.tags.join("\n")} onChange={(v) => setForm({ ...form, tags: v.split("\n").filter(Boolean) })} rows={4} />
                  </section>
                )}

                {activeTab === "meta" && (
                  <section className="space-y-5">
                    <Field label="Meta título" value={form.metaTitle} onChange={(v) => setForm({ ...form, metaTitle: v })} />
                    <Area label="Meta descrição" value={form.metaDescription} onChange={(v) => setForm({ ...form, metaDescription: v })} rows={3} />
                    <Area label="Palavras-chave (uma por linha)" value={form.keywords.join("\n")} onChange={(v) => setForm({ ...form, keywords: v.split("\n").filter(Boolean) })} rows={4} />
                  </section>
                )}

                {activeTab === "advanced" && (
                  <section className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Data de lançamento" type="date" value={form.releaseDate} onChange={(v) => setForm({ ...form, releaseDate: v })} />
                      <Field label="Última atualização" type="date" value={form.lastUpdate} onChange={(v) => setForm({ ...form, lastUpdate: v })} />
                    </div>
                    <Field label="URL do repositório" value={form.repoUrl || ""} onChange={(v) => setForm({ ...form, repoUrl: v })} />
                  </section>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {message && (
        <div className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-2xl text-sm font-medium shadow-lg", message.type === "success" ? "bg-success text-white" : "bg-error text-white")}>
          {message.text}
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", step, required }: { label: string; value: string; onChange: (v: string) => void; type?: string; step?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-text-secondary mb-1.5">{label}</label>
      <input
        type={type}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full h-11 px-4 rounded-xl bg-surface border border-border-default text-sm text-text-primary placeholder:text-text-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
      />
    </div>
  );
}

function Area({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-text-secondary mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl bg-surface border border-border-default text-sm text-text-primary placeholder:text-text-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-text-secondary mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 px-4 rounded-xl bg-surface border border-border-default text-sm text-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
        >
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-xs">▼</span>
      </div>
    </div>
  );
}

# AGENTS.md — Nexo Digital Store

> Contexto mestral de execução para agentes de código. Leia este arquivo antes de qualquer mudança no projeto.

## 1. O que é este projeto

A **Nexo Digital Store** (`/home/jhin/Documentos/nexo-digital-store`) é a loja unificada do ecossistema NEXO. Ela vende/exibe:

- **Apps e sistemas** desenvolvidos pela NEXO (TPVs, SaaS, sites, programas, apps mobile, soluções personalizadas).
- **Templates** criados pelos usuários no **Nexo LP Creator**.

A loja é pública, deve ter visual **Apple/clean** (light, espaçado, hierarquia clara) e ser **multilíngue** (inglês padrão, pt-BR, espanhol).

## 2. Stack e Convenções

- **Next.js 16.2.9** com App Router.
- **React 19.2.4**.
- **Tailwind CSS v4** configurado em `src/app/globals.css` via `@theme inline`.
- **TypeScript strict**.
- **Zustand** para estado global.
- **Framer Motion** para animações sutis.
- **Lucide React** para ícones.
- **Zod** para validação.
- **Deploy em VPS** com `next start` (modo Node.js/server). Build gera as páginas estáticas e mantém API routes dinâmicas.

### Regras de código

- Use **Server Components por padrão**. `"use client"` apenas para interatividade direta, stores, animações ou hooks do browser.
- Componentes devem ser **pequenos, focados e reutilizáveis**.
- **Não use cores hard-coded** — use os tokens de `src/lib/design-tokens.ts` (e futuramente CSS vars).
- **Não duplique estado** — prefira server fetch + Zustand quando necessário.
- **Não remova funcionalidades existentes** sem explicitar e validar com o usuário.
- **Acessibilidade**: botões devem ser `<button>`, links `<a>`, imagens com `alt`, foco visível.
- **i18n**: todo texto novo deve vir dos arquivos `messages/*.json`, nunca hard-coded.

## 3. Funcionalidades Críticas a Preservar

Nenhuma destas funcionalidades pode ser perdida em um redesign:

### Navegação
- Navbar fixa com logo, busca, notificações.
- Bottom nav mobile: Home, Discover, Categories, Chat, Profile.
- Comportamento de hide/show da navbar baseado em scroll direction (`use-scroll-direction`).

### Home
- Hero com CTA.
- Pills/categorias rápidas.
- Seção "Destacados".
- Carrossel "Novos Lançamentos".
- Carrossel "Populares".
- CTA "Solicitar app personalizada".
- Footer com links institucionais e sociais.

### Descoberta
- `/discover`: lista/grid de produtos com filtros (usar `FilterStore` existente).
- `/categories`: grid de categorias.
- `/category/[slug]`: produtos filtrados por categoria (respeitar lógica cross-industry de `getAppsByCategory`).
- `/search`: busca com debounce.

### Detalhe do Produto (`/app/[slug]`)
- Header com voltar.
- Ícone/nome/subtítulo/rating/reviews/downloads.
- Carrossel de screenshots.
- Sobre, funcionalidades, tecnologias.
- Botões "Ver Demo" e "Instalar".
- **Reviews devem ser renderizadas** (modelo e API já existem).

### Chat
- Chat flutuante (FAB) e página `/chat` compartilham `chat-store`. Sempre mantenha sincronizados.

### Solicitação de App
- Wizard de 5 passos em `/request` (`request-store` persiste step e formData).
- Campos: negócio, contato, marca/cores, funcionalidades, revisão.

### Perfil e Configurações
- `/profile`: menu de configurações.
- Seletor de idioma (EN/PT/ES).
- Seletor de tema (light/dark/system) — o store já suporta.

### Outros
- PWA/manifest, offline indicator, toasts, bottom sheets.
- `/contact`, `/about`, `/terms`, `/privacy`.
- Analytics (`src/lib/analytics.ts`) — eventos já estão definidos; wire-up em novos componentes.

## 4. Modelo de Dados

O tipo principal é `AppProduct` em `src/types/app.ts`. Durante o redesign ele será estendido para suportar templates:

```ts
export type ProductKind = "app" | "template";

export interface AppProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  // ... existing fields ...
  kind: ProductKind;
  templateMeta?: TemplateMetadata; // only when kind === "template"
}
```

Use helpers para não poluir componentes com lógica de `kind`:

```ts
isTemplate(product) / isApp(product)
getProductCta(product) // "Install", "Use Template", "View Demo", etc.
```

## 5. Integração com LP Creator

- O LP Creator tem uma loja interna simples (modal de templates).
- Quando o usuário clica em **"View in Nexo Store"** no modal do LP Creator, ele é redirecionado para:
  `https://nexodigital.store/template/{slug}?source=lp-creator`
- A Nexo Store detecta `?source=lp-creator` e mostra um banner discreto "Voltar ao editor".
- A loja interna do LP Creator permanece simples; a vitrine principal fica na Nexo Store.

## 6. i18n

- Usar `next-intl` (recomendado) ou implementação equivalente.
- Idiomas: `en` (padrão), `pt`, `es`.
- Arquivos: `messages/en.json`, `messages/pt.json`, `messages/es.json`.
- Roteamento com locale prefix opcional (`/`, `/pt`, `/es`).

## 7. Design System (em evolução)

### Tema light (padrão)
- Background: `#FFFFFF` ou `#F9FAFB`.
- Surface: `#FFFFFF`.
- Border: `#E5E7EB`.
- Text primary: `#111827`.
- Text secondary: `#4B5563` / `#6B7280`.
- Primary: `#3B82F6`.
- Success: `#10B981`.
- Warning: `#F59E0B`.
- Error: `#EF4444`.

### Cards
- Bordas arredondadas grandes (`16px-24px`).
- Sombras sutis (`0 1px 3px rgba(0,0,0,0.05)`, `0 4px 12px rgba(0,0,0,0.08)`).
- Thumbnail em destaque.

### Tipografia
- Fonte: Inter (já configurada).
- Headings com tracking tight e peso semibold/bold.
- Body legível, cores suaves.

## 8. O que NÃO fazer

- Não crie uma segunda loja dentro da Nexo Store.
- Não remova `generateStaticParams` das rotas dinâmicas de página; API routes podem permanecer dinâmicas.
- Não ignore o `FilterStore` existente — ele já sincroniza filtros com URL.
- Não perca a lógica cross-industry de categorias (`clinics`/`retail`/`food` filtram por `industry`).
- Não remova campos de formulário do request wizard sem migrar dados persistidos.
- Não use `user-scalable=no` no viewport.
- Não hard-code textos — use i18n.
- Não exagere em animações (Apple = sutileza).

## 9. Checklist antes de commit

- [ ] `npm run build` passa sem erros.
- [ ] `npm run lint` passa.
- [ ] Nenhuma funcionalidade da seção 3 foi removida.
- [ ] Novos textos usam i18n.
- [ ] Cores vêm dos tokens.
- [ ] Responsivo testado em desktop e mobile.
- [ ] Build (`next build`) e start (`next start`) funcionam para deploy em VPS.

## 10. Links Úteis

- Repo: `https://github.com/Jhin1v9/nexo-digital-store`
- Local: `/home/jhin/Documentos/nexo-digital-store`
- Deploy atual: `https://app-nu-rose-42.vercel.app/`
- Plano de redesign: `/home/jhin/.kimi-code/sessions/wd_jhin_eb5986ffdf8e/session_f1de5972-45a3-414e-a489-7d6a5085655f/agents/main/plans/deadpool-domino-static.md`
- Relatório de auditoria da loja LP Creator: `/root/nexo-projects-abner/nexo-lp-creator/docs/superpowers/specs/2026-06-22-loja-audit-report.md`

## 11. Decisões do Usuário (registradas)

- Visual: **Light / clean / Apple-style**.
- Estrutura: **Modal simples no LP Creator + Nexo Store bonita**.
- Escopo: **Redesign completo** (não evolução mínima).
- i18n: **EN principal, PT, ES**.
- Reusar base da Nexo Store existente.

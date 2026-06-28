# Ingestão de Apps do Google Drive na Nexo Store

> Design aprovado em 2026-06-28. Fonte dos apps: `/home/jhin/Documentos/apps driv/` (zips do Drive).

## Contexto

A Nexo Digital Store (`/home/jhin/Documentos/nexo-digital-store`) exibe apps/produtos definidos em `src/lib/mock-data.ts`. Já existe um array `driveApps` com placeholders genéricos adicionados anteriormente. O objetivo é substituir/enriquecer esses placeholders com os apps reais baixados do Google Drive.

## Estrutura real dos zips

Cada zip contém pastas organizadas por categoria:

```
Negocios Apps - 2026/
  GESTOR DOCUMENTAL CONTABLE/
    print.jpg
    Credenciales del Sistema.txt
    ContaDoc-Guia-Tecnica-e-Instalacion.pdf
  SISTEMA DE CONSULTORIO MÉDICO/
    negociomedico.jpg
    Credenciales del Sistema.txt
    Manual_MediCare.pdf

Apps-Webs - 2026/
  TPV - 2026/
    TPV Cafeteria/
      print.jpg
      Credenciales del Sistema.txt
    TPV Panadería/
      ...
  FACTURACION DEV/
    PERÚ - APPS WEBS FACTURACIÓN/
      SISTEMA DE RESTAURANTE/
        ...
    MEXICO - APPS WEBS FACTURACION/
      ...
  PORTAFOLIO APLICACIONES CRM Y ERP - 2026/
    APLICACIONES CRM Y ERP/
      CRM_AGENCIA_VIAJES/
        ...

Saas - 2026/
  SaaS Gimnasio/
    print.jpg
    Manual_GymSaaS_Pro.pdf
    Credenciales del Sistema.txt
```

**Observações importantes:**
- Não há arquivos `.agents`, `README.md` ou `info.txt`.
- O nome da pasta do app é a principal fonte de identificação.
- `Credenciales del Sistema.txt` contém dados de acesso e **nunca deve ser lido/exposto publicamente**.
- `Manual_*.pdf` contém informações úteis sobre funcionalidades, tecnologias e requisitos. Serão extraídos para `.md` e usados para enriquecer a descrição do app.
- `Credenciales del Sistema.txt` contém dados de acesso e **nunca deve ser lido/exposto publicamente**.
- A imagem de capa pode se chamar `print.jpg`, `negociomedico.jpg` ou qualquer outro nome contendo `"print"`.

## Decisões de design

### 1. Preços por categoria (variáveis)

Criar constantes no topo de `src/lib/mock-data.ts` para facilitar ajustes globais:

```ts
const CATEGORY_PRICING = {
  site: { pricing: "fixed", price: 299, currency: "EUR" },
  saas: { pricing: "subscription", price: 49, currency: "EUR" },
  tpv: { pricing: "subscription", price: 79, currency: "EUR" },
  app: { pricing: "free" },
  program: { pricing: "subscription", price: 59, currency: "EUR" },
  custom: { pricing: "quote" },
} as const;
```

### 2. Mapeamento de categoria pelo caminho da pasta

A categoria do app é inferida a partir do caminho dentro do zip:

| Padrão no caminho | AppType | Industry padrão | Sense padrão |
|---|---|---|---|
| `TPV - 2026/` | `tpv` | `food` | `restaurante` |
| `Saas - 2026/` | `saas` | `other` | `escritorio` |
| `Negocios Apps - 2026/` | `app` | `other` | `escritorio` |
| `Apps-Webs - 2026/` | `site` | `other` | `outro` |
| `FACTURACION DEV/` | `saas` | `finance` | `escritorio` |
| `PORTAFOLIO APLICACIONES CRM Y ERP/` | `saas` | `other` | `escritorio` |
| `App web portafolio/` | `site` | `other` | `outro` |

O nome da pasta do app é usado para refinar `industry` e `sense` por palavras-chave:
- `clinica`, `medico`, `odontologia`, `botica`, `farmacia` → `health` / `clinica`
- `restaurante`, `cafeteria`, `panaderia`, `hamburgueria`, `food` → `food` / `restaurante`
- `tienda`, `moda`, `zapateria`, `libreria`, `minimarket` → `retail` / `loja`
- `barbearia`, `peluqueria`, `estetica`, `spa` → `health` / `barbearia`
- `academia`, `gimnasio`, `fitness` → `health` / `clinica`
- `hotel`, `hospedaje` → `other` / `escritorio`
- `sorveteria`, `gelato` → `food` / `sorveteria`

### 3. Geração de slug

O slug é gerado a partir do nome da pasta do app:
- Remove acentos e caracteres especiais
- Converte para lowercase
- Substitui espaços e underscores por hífen
- Remove múltiplos hífens

Exemplo: `SISTEMA DE CONSULTORIO MÉDICO` → `sistema-de-consultorio-medico`

### 4. Imagens

- A imagem de capa (`print.jpg` ou similar) é copiada para `public/thumbnails/{slug}.jpg`.
- Se não houver imagem, usa `public/screenshot-placeholder.jpg`.
- Screenshots do carrossel usam placeholder por padrão.

### 5. Demo

- Se não houver `demoUrl` começando com `http`, o botão "Ver Demo" fica desabilitado.
- Criar e manter `docs/demo-urls.md` com lista de apps sem demo, para facilitar atualizações futuras.

### 6. Wizard pré-preenchido

Ao clicar em "Instalar" (`/request?app={slug}`), o wizard será pré-preenchido com:
- `businessType` derivado do `sense` do app
- `industry` derivado do `industry` do app
- `features` sugeridas com base no `type`
- Título/contexto mostrando "Solicitar: {app.name}"

### 7. Tratamento de duplicatas

- Comparar por **slug exato**.
- Se o slug já existe em `tpvs`, `saasApps`, `sites`, `apps`, `programs` ou `custom`: manter o original, não duplicar.
- Se o slug existe apenas em `driveApps` (os placeholders antigos): substituir pelo novo app.
- Apps do mesmo nicho (ex: vários TPVs de café) são considerados diferentes desde que o slug seja único.

### 8. Extração de PDFs para Markdown

Antes da ingestão dos apps, os manuais em PDF serão convertidos para `.md` em `docs/drive-apps-md/{slug}/README.md`:

- Usar biblioteca `pdf-parse` (Node.js) para extrair texto.
- Ignorar PDFs menores que 1KB (provavelmente corrompidos ou vazios).
- Limitar cada `.md` a ~5000 caracteres para não inflar o contexto.
- O MD resultante será usado pelo script de ingestão para extrair:
  - Descrição longa (primeiros parágrafos)
  - Lista de funcionalidades (tópicos, bullets)
  - Tecnologias mencionadas (React, Node, PHP, etc.)
  - Requisitos do sistema

### 9. Script de ingestão

Criar `scripts/ingest-drive-apps.ts` (executado via `tsx` ou `ts-node`) que:
1. Lê todos os zips em `/home/jhin/Documentos/apps driv/`
2. Extrai seletivamente `print.jpg` e `Manual_*.pdf` para uma pasta temporária
3. Converte cada PDF para `docs/drive-apps-md/{slug}/README.md`
4. Ignora `Credenciales del Sistema.txt` e executáveis grandes
5. Gera o objeto `makeApp()` para cada app, usando o MD para enriquecer descrição/features/techStack
6. Atualiza `src/lib/mock-data.ts`
7. Gera `docs/ingest-report.md` com estatísticas

## Arquivos que serão alterados/criados

- `src/lib/mock-data.ts` — variáveis de preço, novos apps no `driveApps`
- `src/app/(store)/request/page.tsx` — pré-preenchimento via `?app={slug}`
- `src/stores/request-store.ts` — função auxiliar `initializeFromApp(app)`
- `scripts/ingest-drive-apps.ts` — script de ingestão
- `scripts/extract-pdfs.ts` — script de extração de PDFs para MD
- `public/thumbnails/*.jpg` — imagens de capa dos apps
- `docs/drive-apps-md/{slug}/README.md` — manuais convertidos
- `docs/demo-urls.md` — checklist de demos pendentes
- `docs/ingest-report.md` — relatório gerado pelo script

## Checklist de sucesso

- [ ] PDFs dos manuais extraídos para `docs/drive-apps-md/`
- [ ] Script lê todos os zips sem extrair executáveis grandes
- [ ] Cada app gera um slug único
- [ ] Imagens de capa copiadas para `public/thumbnails/`
- [ ] `mock-data.ts` compila sem erros
- [ ] Build da loja passa (`npm run build`)
- [ ] Wizard pré-preenche dados quando `?app={slug}` está presente
- [ ] Botão "Ver Demo" desabilitado quando não há URL

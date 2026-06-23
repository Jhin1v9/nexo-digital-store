# NEXO Digital Store

Vitrine pública do ecossistema NEXO: apps, SaaS, sites, jogos e templates da comunidade.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- Zustand, Framer Motion, Lucide, Zod
- Supabase (opcional, para persistência de comentários)

## Rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Deploy na VPS

### 1. Clone e configure

```bash
git clone https://github.com/Jhin1v9/nexo-digital-store.git
cd nexo-digital-store
cp .env.example .env
# edite .env com suas chaves (Supabase, Telegram, admin key)
```

### 2. Opção A — PM2 (recomendado)

Requisitos: Node.js 22+, PM2 instalado globalmente (`npm i -g pm2`).

```bash
npm run deploy
```

Isso instala dependências, builda e inicia/reinicia o app na porta 3000.

### 3. Opção B — Docker

```bash
docker build -t nexo-store .
docker run -d -p 3000:3000 --env-file .env --name nexo-store nexo-store
```

### 4. Banco de dados

Se for usar Supabase para os comentários, rode o schema em:

```bash
docs/reviews-schema.sql
```

E preencha as variáveis no `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_API_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

## Documentação

- `AGENTS.md` — contexto mestral para agentes de código.
- `docs/luna-tutorial.md` — tutorial da Luna para gerenciar comentários.
- `docs/reviews-schema.sql` — schema do Supabase.

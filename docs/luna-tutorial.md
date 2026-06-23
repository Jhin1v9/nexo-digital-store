# Tutorial da Luna — Gerenciamento de Comentários na Nexo Store

> Este guia é para a Luna (ou qualquer operador) acompanhar, listar e responder os comentários/reviews deixados pelos usuários na Nexo Digital Store.

---

## 1. O que acontece quando alguém comenta

1. O usuário preenche o formulário na página de detalhe de um app (`/app/{slug}`).
2. O comentário é salvo no backend (Supabase quando configurado; em memória no desenvolvimento local).
3. A Luna recebe uma notificação no Telegram com um resumo do comentário e o comando para responder.

---

## 2. Variáveis de ambiente necessárias

No projeto Nexo Store:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_API_KEY=change-me-in-production
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

- `SUPABASE_SERVICE_ROLE_KEY` → usada pelo servidor para salvar/listar sem restrições.
- `ADMIN_API_KEY` → protege os endpoints admin da Luna. Em dev, se estiver vazia, os endpoints ficam abertos.
- `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` → enviam as notificações para você/Luna.

---

## 3. Endpoints disponíveis

### 3.1 Listar comentários

```
GET /api/admin/reviews?status=unanswered&sortBy=newest
```

Parâmetros opcionais:

| Parâmetro | Valores possíveis | Descrição |
|-----------|-------------------|-----------|
| `status` | `all` (padrão), `unanswered`, `answered` | Filtra respondidos ou pendentes |
| `appId`  | ex: `tpv-001`, `saas-001` | Filtra por app específico |
| `sortBy` | `newest` (padrão), `oldest` | Ordem de chegada |

Exemplo com `curl`:

```bash
curl -H "x-admin-key: change-me-in-production" \
  "https://app-nu-rose-42.vercel.app/api/admin/reviews?status=unanswered"
```

Resposta:

```json
{
  "count": 3,
  "status": "unanswered",
  "reviews": [
    {
      "id": "rev-123",
      "appId": "tpv-001",
      "author": "Ana Silva",
      "rating": 5,
      "title": "Perfeito",
      "body": "Adorei o pack completo.",
      "date": "2026-06-22",
      "helpful": 0,
      "replies": []
    }
  ]
}
```

### 3.2 Responder um comentário

```
POST /api/admin/reviews/respond
```

Body:

```json
{
  "reviewId": "rev-123",
  "responder": "developer",
  "name": "NEXO Digital",
  "content": "Obrigado, Ana! Qualquer dúvida é só chamar.",
  "chatId": "chat-xyz"
}
```

- `responder`: `developer` (você) ou `luna` (a Luna).
- `chatId` opcional: linka a resposta a uma conversa do chat da loja, para contexto futuro.

Exemplo com `curl`:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-admin-key: change-me-in-production" \
  -d '{
    "reviewId": "rev-123",
    "responder": "luna",
    "content": "Oi! Posso te ajudar a customizar o cardápio. Me chama no chat da loja.",
    "chatId": "chat-tpv-ana"
  }' \
  "https://app-nu-rose-42.vercel.app/api/admin/reviews/respond"
```

---

## 4. Comandos sugeridos para a Luna no Telegram

Você pode ensinar a Luna a reconhecer estes padrões e chamar os endpoints acima.

### `LUNA, verifica se alguém enviou comentário`

A Luna deve chamar:

```
GET /api/admin/reviews?status=unanswered&sortBy=newest
```

E responder com a lista formatada, ex:

```
📝 Comentários pendentes: 3

1. Ana Silva em TPV Sorveteria — ⭐ 5
   "Adorei o pack completo."
   Responder: /responder rev-123

2. Pedro Costa em TPV Sorveteria — ⭐ 5
   "Kiosk touch é show."
   Responder: /responder rev-124
```

### `LUNA, lista respondidos`

A Luna deve chamar:

```
GET /api/admin/reviews?status=answered&sortBy=newest
```

### `/responder {reviewId} {mensagem}`

Quando você ou a Luna digitar:

```
/responder rev-123 Obrigado pelo feedback, Ana!
```

A Luna deve chamar:

```
POST /api/admin/reviews/respond
{
  "reviewId": "rev-123",
  "responder": "luna",
  "content": "Obrigado pelo feedback, Ana!"
}
```

---

## 5. Como acessar direto no banco (Supabase)

Caso a Luna precise de mais contexto, as tabelas são:

- `public.reviews` — comentários principais.
- `public.review_replies` — respostas do desenvolvedor/Luna.

Consultas úteis:

```sql
-- Pendentes de resposta, mais recentes primeiro
SELECT * FROM public.reviews
WHERE answered = false
ORDER BY created_at DESC;

-- Comentários de um app específico
SELECT * FROM public.reviews
WHERE app_id = 'tpv-001'
ORDER BY created_at DESC;

-- Respostas de um comentário
SELECT * FROM public.review_replies
WHERE review_id = 'uuid-aqui'
ORDER BY created_at ASC;
```

---

## 6. Fluxo resumido

```
Usuário comenta na loja
        ↓
Salvo no Supabase (ou memória local)
        ↓
Notificação no Telegram para a Luna
        ↓
Luna lista pendentes via /api/admin/reviews?status=unanswered
        ↓
Luna responde via /api/admin/reviews/respond
        ↓
Resposta aparece na página do app automaticamente
```

---

## 7. Arquivos importantes no código

- `src/lib/review-store.ts` — lógica de persistência (interface + implementações).
- `src/lib/supabase-client.ts` — cliente Supabase e conversão de tipos.
- `src/lib/telegram.ts` — envio de notificações Telegram.
- `src/app/api/admin/reviews/route.ts` — endpoint de listagem.
- `src/app/api/admin/reviews/respond/route.ts` — endpoint de resposta.
- `src/app/api/reviews/route.ts` — endpoint público de criação/leitura.
- `docs/reviews-schema.sql` — schema do Supabase.

---

## 8. Dicas

- Em desenvolvimento local, sem Supabase configurado, os comentários ficam em memória e são perdidos ao reiniciar o servidor. Use isso apenas para testes.
- Sempre proteja `ADMIN_API_KEY` e `SUPABASE_SERVICE_ROLE_KEY`; nunca exponha no frontend.
- O `chatId` é útil para ligar uma resposta à conversa do chat da loja. Exemplo: `chat-tpv-ana`.

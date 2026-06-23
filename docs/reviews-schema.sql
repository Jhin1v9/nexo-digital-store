-- Schema Supabase para a seção de comentários/reviews da Nexo Store
-- Execute no SQL Editor do Supabase (New query -> Run)

-- Tabela principal de comentários/reviews
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id TEXT NOT NULL,
  author TEXT NOT NULL,
  avatar TEXT,
  rating INTEGER NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  title TEXT,
  body TEXT NOT NULL,
  date TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),
  helpful INTEGER NOT NULL DEFAULT 0,
  answered BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de respostas (developer ou luna)
CREATE TABLE IF NOT EXISTS public.review_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  responder TEXT NOT NULL CHECK (responder IN ('developer', 'luna')),
  name TEXT,
  content TEXT NOT NULL,
  date TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),
  chat_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices úteis
CREATE INDEX IF NOT EXISTS idx_reviews_app_id ON public.reviews(app_id);
CREATE INDEX IF NOT EXISTS idx_reviews_answered ON public.reviews(answered);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_review_replies_review_id ON public.review_replies(review_id);

-- Atualiza updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_reviews_updated_at ON public.reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Políticas RLS (Row Level Security)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_replies ENABLE ROW LEVEL SECURITY;

-- Leitura pública
CREATE POLICY "Allow public read" ON public.reviews
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow public read replies" ON public.review_replies
  FOR SELECT TO anon, authenticated USING (true);

-- Inserção pública de comentários (pode ser restrito por app_id no futuro)
CREATE POLICY "Allow public insert review" ON public.reviews
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Respostas apenas via service role (não expor para anon/auth)
-- O service role bypassa RLS por padrão.

import { createClient } from "@supabase/supabase-js";
import { Review, ReviewReply } from "@/types/app";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/** Cliente anônimo para uso no browser (leitura pública, inserção com RLS). */
export const supabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

/** Cliente de serviço para uso server-only (bypass RLS). */
export const supabaseAdmin = isSupabaseConfigured && supabaseServiceKey
  ? createClient(supabaseUrl!, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : null;

// ===== Database row types =====

export interface ReviewRow {
  id: string;
  app_id: string;
  author: string;
  avatar?: string | null;
  rating: number;
  title?: string | null;
  body: string;
  date: string;
  helpful: number;
  created_at: string;
  updated_at: string;
  answered: boolean;
}

export interface ReviewReplyRow {
  id: string;
  review_id: string;
  responder: "developer" | "luna";
  name?: string | null;
  content: string;
  date: string;
  chat_id?: string | null;
  created_at: string;
}

export function rowToReview(row: ReviewRow, replies: ReviewReply[] = []): Review {
  return {
    id: row.id,
    appId: row.app_id,
    author: row.author,
    avatar: row.avatar ?? undefined,
    rating: row.rating,
    title: row.title ?? undefined,
    body: row.body,
    date: row.date,
    helpful: row.helpful,
    replies,
  };
}

export function replyRowToReply(row: ReviewReplyRow): ReviewReply {
  return {
    id: row.id,
    reviewId: row.review_id,
    responder: row.responder,
    name: row.name ?? undefined,
    content: row.content,
    date: row.date,
    chatId: row.chat_id ?? undefined,
  };
}

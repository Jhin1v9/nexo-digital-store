import { Review, ReviewReply } from "@/types/app";
import { mockReviews } from "./mock-data";
import { supabaseAdmin, ReviewRow, ReviewReplyRow, rowToReview, replyRowToReply } from "./supabase-client";

export interface CreateReviewInput {
  appId: string;
  author: string;
  avatar?: string;
  rating?: number;
  title?: string;
  body: string;
}

export interface CreateReplyInput {
  reviewId: string;
  responder: "developer" | "luna";
  name?: string;
  content: string;
  chatId?: string;
}

export interface ReviewFilters {
  appId?: string;
  status?: "all" | "unanswered" | "answered";
  sortBy?: "newest" | "oldest";
}

export interface ReviewStore {
  getReviews(filters?: ReviewFilters): Promise<Review[]>;
  createReview(input: CreateReviewInput): Promise<Review>;
  createReply(input: CreateReplyInput): Promise<Review>;
  markAnswered(reviewId: string, answered: boolean): Promise<void>;
}

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function today(): string {
  return new Date().toISOString().split("T")[0];
}

// ===== In-memory implementation (dev / fallback) =====

class MemoryReviewStore implements ReviewStore {
  private reviews: Review[] = [];

  constructor(seed: Review[] = []) {
    this.reviews = [...seed];
  }

  async getReviews(filters?: ReviewFilters): Promise<Review[]> {
    let result = [...this.reviews];

    if (filters?.appId) {
      result = result.filter((r) => r.appId === filters.appId);
    }

    if (filters?.status === "unanswered") {
      result = result.filter((r) => !this.isAnswered(r));
    } else if (filters?.status === "answered") {
      result = result.filter((r) => this.isAnswered(r));
    }

    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (filters?.sortBy === "oldest") {
      result.reverse();
    }

    return result;
  }

  async createReview(input: CreateReviewInput): Promise<Review> {
    const review: Review = {
      id: generateId("rev"),
      appId: input.appId,
      author: input.author,
      avatar: input.avatar,
      rating: input.rating ?? 0,
      title: input.title,
      body: input.body,
      date: today(),
      helpful: 0,
      replies: [],
    };
    this.reviews.unshift(review);
    return review;
  }

  async createReply(input: CreateReplyInput): Promise<Review> {
    const review = this.reviews.find((r) => r.id === input.reviewId);
    if (!review) throw new Error("Review not found");

    const reply: ReviewReply = {
      id: generateId("rep"),
      reviewId: input.reviewId,
      responder: input.responder,
      name: input.name,
      content: input.content,
      date: today(),
      chatId: input.chatId,
    };

    if (!review.replies) review.replies = [];
    review.replies.push(reply);
    return review;
  }

  async markAnswered(): Promise<void> {
    // No-op in memory; answered state is derived from replies.
  }

  private isAnswered(review: Review): boolean {
    if (review.developerResponse) return true;
    return Boolean(review.replies && review.replies.length > 0);
  }
}

// ===== Supabase implementation =====

class SupabaseReviewStore implements ReviewStore {
  async getReviews(filters?: ReviewFilters): Promise<Review[]> {
    if (!supabaseAdmin) throw new Error("Supabase admin client not configured");

    let query = supabaseAdmin
      .from("reviews")
      .select("*, review_replies(*)")
      .order("created_at", { ascending: false });

    if (filters?.appId) {
      query = query.eq("app_id", filters.appId);
    }

    if (filters?.status === "unanswered") {
      query = query.eq("answered", false);
    } else if (filters?.status === "answered") {
      query = query.eq("answered", true);
    }

    if (filters?.sortBy === "oldest") {
      query = query.order("created_at", { ascending: true });
    }

    const { data, error } = await query;
    if (error) throw error;

    return (data ?? []).map((row: ReviewRow & { review_replies?: ReviewReplyRow[] }) => {
      const replies = (row.review_replies ?? []).map(replyRowToReply);
      return rowToReview(row, replies);
    });
  }

  async createReview(input: CreateReviewInput): Promise<Review> {
    if (!supabaseAdmin) throw new Error("Supabase admin client not configured");

    const { data, error } = await supabaseAdmin
      .from("reviews")
      .insert({
        app_id: input.appId,
        author: input.author,
        avatar: input.avatar,
        rating: input.rating ?? 0,
        title: input.title,
        body: input.body,
        date: today(),
        helpful: 0,
        answered: false,
      })
      .select()
      .single();

    if (error) throw error;
    return rowToReview(data);
  }

  async createReply(input: CreateReplyInput): Promise<Review> {
    if (!supabaseAdmin) throw new Error("Supabase admin client not configured");

    const { error: replyError } = await supabaseAdmin.from("review_replies").insert({
      review_id: input.reviewId,
      responder: input.responder,
      name: input.name,
      content: input.content,
      date: today(),
      chat_id: input.chatId,
    });

    if (replyError) throw replyError;

    const { error: updateError } = await supabaseAdmin
      .from("reviews")
      .update({ answered: true, updated_at: new Date().toISOString() })
      .eq("id", input.reviewId);

    if (updateError) throw updateError;

    return this.getReviews({ appId: input.reviewId }).then((rows) => {
      const review = rows.find((r) => r.id === input.reviewId);
      if (!review) throw new Error("Review not found after reply");
      return review;
    });
  }

  async markAnswered(reviewId: string, answered: boolean): Promise<void> {
    if (!supabaseAdmin) throw new Error("Supabase admin client not configured");
    const { error } = await supabaseAdmin
      .from("reviews")
      .update({ answered, updated_at: new Date().toISOString() })
      .eq("id", reviewId);
    if (error) throw error;
  }
}

// ===== Factory =====

let memoryStore: MemoryReviewStore | null = null;

export function getReviewStore(): ReviewStore {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return new SupabaseReviewStore();
  }

  // Fallback to in-memory store seeded with mock reviews.
  if (!memoryStore) {
    memoryStore = new MemoryReviewStore(mockReviews);
  }
  return memoryStore;
}

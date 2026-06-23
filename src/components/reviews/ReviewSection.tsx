"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquarePlus, Send, Star, X } from "lucide-react";
import { Review } from "@/types/app";
import { mockApi } from "@/lib/api-client";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { ReviewCard } from "./ReviewCard";
import { StarRating } from "./StarRating";

interface ReviewSectionProps {
  appId: string;
  appRating: number;
  reviewCount: number;
}

export function ReviewSection({ appId, appRating, reviewCount }: ReviewSectionProps) {
  const { t } = useI18n();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    author: "",
    rating: 0,
    title: "",
    body: "",
  });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    mockApi.getReviews(appId).then((data) => {
      if (mounted) {
        setReviews(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [appId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0 || !form.author.trim() || !form.title.trim() || !form.body.trim()) return;

    setSubmitting(true);
    try {
      const newReview = await mockApi.createReview({
        appId,
        author: form.author.trim(),
        rating: form.rating,
        title: form.title.trim(),
        body: form.body.trim(),
      });
      setReviews((prev) => [newReview, ...prev]);
      setForm({ author: "", rating: 0, title: "", body: "" });
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  };

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  const maxCount = Math.max(...distribution.map((d) => d.count), 1);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-text-primary">{t("product.reviews")}</h3>
        <button
          onClick={() => setShowForm((s) => !s)}
          className={cn(
            "inline-flex items-center gap-1.5 text-sm font-medium",
            "text-primary hover:text-primary-hover transition-colors"
          )}
        >
          {showForm ? <X className="w-4 h-4" /> : <MessageSquarePlus className="w-4 h-4" />}
          {showForm ? t("reviews.cancel") : t("reviews.writeReview")}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-text-primary">{appRating.toFixed(1)}</span>
          <div className="pb-1">
            <StarRating rating={appRating} size="md" />
            <p className="text-xs text-text-muted mt-0.5">
              {reviewCount} {t("product.reviews")}
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-1.5">
          {distribution.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-2 text-xs">
              <span className="w-3 text-text-muted">{star}</span>
              <Star className="w-3 h-3 text-star-filled fill-star-filled" />
              <div className="flex-1 h-1.5 rounded-full bg-surface-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-star-filled"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
              <span className="w-6 text-right text-text-muted">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="overflow-hidden bg-surface-secondary rounded-2xl p-4 space-y-4 border border-border-default"
          >
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                {t("reviews.yourRating")} — {t("reviews.optional")}
              </label>
              <StarRating
                rating={form.rating}
                size="lg"
                interactive
                onChange={(rating) => setForm((f) => ({ ...f, rating }))}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("reviews.yourName")}</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                placeholder={t("reviews.namePlaceholder")}
                className={cn(
                  "w-full rounded-xl border border-border-default bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-muted",
                  "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                )}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                {t("reviews.title")} — {t("reviews.optional")}
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder={t("reviews.titlePlaceholder")}
                className={cn(
                  "w-full rounded-xl border border-border-default bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-muted",
                  "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                )}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("reviews.review")}</label>
              <textarea
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                placeholder={t("reviews.reviewPlaceholder")}
                rows={4}
                className={cn(
                  "w-full rounded-xl border border-border-default bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-muted",
                  "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                )}
              />
            </div>

            <button
              type="submit"
              disabled={
                submitting ||
                !form.author.trim() ||
                !form.body.trim()
              }
              className={cn(
                "w-full h-11 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm",
                "bg-primary text-on-primary hover:bg-primary-hover active:scale-[0.98] transition-all",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {submitting ? (
                <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {t("reviews.submit")}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-9 h-9 rounded-full bg-surface-tertiary" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-surface-tertiary rounded" />
                <div className="h-3 w-full bg-surface-tertiary rounded" />
                <div className="h-3 w-2/3 bg-surface-tertiary rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-10 bg-surface-secondary rounded-2xl border border-border-default">
          <MessageSquarePlus className="w-8 h-8 text-text-muted mx-auto mb-2" />
          <p className="text-sm font-medium text-text-primary">{t("reviews.noReviews")}</p>
          <p className="text-xs text-text-muted mt-1">{t("reviews.beFirst")}</p>
        </div>
      ) : (
        <div className="divide-y divide-border-default">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}

"use client";

import { ThumbsUp, User } from "lucide-react";
import { Review } from "@/types/app";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";
import { StarRating } from "./StarRating";
import { ReviewReplyCard } from "./ReviewReplyCard";

interface ReviewCardProps {
  review: Review;
  onHelpful?: (id: string) => void;
}

export function ReviewCard({ review, onHelpful }: ReviewCardProps) {
  const { t } = useI18n();
  const initials = review.author
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const replies = review.replies ?? [];
  const hasLegacyResponse = Boolean(review.developerResponse);

  return (
    <article className="py-5 border-b border-border-default last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-surface-secondary border border-border-default flex items-center justify-center shrink-0">
          {review.avatar ? (
            <img src={review.avatar} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-xs font-semibold text-text-secondary">{initials || <User className="w-4 h-4" />}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-text-primary">{review.author}</span>
            <span className="text-xs text-text-muted">{review.date}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {review.rating > 0 && <StarRating rating={review.rating} size="sm" />}
            {review.title ? (
              <h4 className="text-sm font-semibold text-text-primary">{review.title}</h4>
            ) : review.rating > 0 ? null : (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-surface-tertiary text-text-muted font-medium">
                {t("reviews.comment")}
              </span>
            )}
          </div>
          <p className="text-sm text-text-secondary leading-relaxed mt-2">{review.body}</p>

          <button
            onClick={() => onHelpful?.(review.id)}
            className={cn(
              "mt-3 inline-flex items-center gap-1.5 text-xs font-medium",
              "text-text-muted hover:text-primary transition-colors"
            )}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            {t("reviews.helpful")} ({review.helpful})
          </button>
        </div>
      </div>

      {hasLegacyResponse && (
        <div className="mt-4 ml-8 sm:ml-10 pl-4 border-l-2 border-primary/40">
          <p className="text-xs font-semibold text-text-primary mb-1">{t("reviews.developer")}</p>
          <p className="text-sm text-text-secondary leading-relaxed">{review.developerResponse}</p>
        </div>
      )}

      {replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {replies.map((reply) => (
            <ReviewReplyCard key={reply.id} reply={reply} />
          ))}
        </div>
      )}
    </article>
  );
}

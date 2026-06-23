"use client";

import { Bot, Briefcase } from "lucide-react";
import { ReviewReply } from "@/types/app";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

interface ReviewReplyCardProps {
  reply: ReviewReply;
}

export function ReviewReplyCard({ reply }: ReviewReplyCardProps) {
  const { t } = useI18n();
  const isLuna = reply.responder === "luna";

  return (
    <div
      className={cn(
        "ml-8 sm:ml-10 pl-4 border-l-2",
        isLuna ? "border-luna/40" : "border-primary/40"
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        <div
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center",
            isLuna ? "bg-luna/10" : "bg-primary/10"
          )}
        >
          {isLuna ? (
            <Bot className="w-3 h-3 text-luna" />
          ) : (
            <Briefcase className="w-3 h-3 text-primary" />
          )}
        </div>
        <span className="text-sm font-semibold text-text-primary">
          {reply.name ?? (isLuna ? "Luna" : t("reviews.developer"))}
        </span>
        {isLuna && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-luna/10 text-luna font-medium">
            {t("reviews.luna")}
          </span>
        )}
        {reply.chatId && (
          <span className="text-[10px] text-text-muted font-mono truncate max-w-[120px]">
            #{reply.chatId.slice(0, 8)}
          </span>
        )}
      </div>
      <p className="text-sm text-text-secondary leading-relaxed">{reply.content}</p>
      <p className="text-xs text-text-muted mt-1">{reply.date}</p>
    </div>
  );
}

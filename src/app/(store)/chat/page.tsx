"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, ArrowLeft } from "lucide-react";
import { useChatStore } from "@/stores/chat-store";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const { t } = useI18n();
  const router = useRouter();
  const { sendMessage, isLoading, getMessages, createSession } = useChatStore();
  const messages = getMessages();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    createSession();
  }, [createSession]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const content = input.trim();
    setInput("");
    await sendMessage(content);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-border-default shrink-0 bg-surface-secondary/50">
        <button
          onClick={() => router.push("/")}
          className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full hover:bg-surface-tertiary transition-colors"
          aria-label={t("chat.back")}
        >
          <ArrowLeft className="w-5 h-5 text-text-secondary" />
        </button>
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">{t("chat.title")}</p>
          <p className="text-[10px] text-success font-medium">{t("chat.online")}</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex gap-2", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
            <div className={cn("w-7 h-7 rounded-full flex items-center justify-center shrink-0", msg.role === "user" ? "bg-surface-tertiary" : "bg-primary/10")}>
              {msg.role === "user" ? <User className="w-3.5 h-3.5 text-text-secondary" /> : <Bot className="w-3.5 h-3.5 text-primary" />}
            </div>
            <div className={cn("max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm", msg.role === "user" ? "bg-primary text-on-primary rounded-br-md" : "bg-surface-secondary text-text-primary rounded-bl-md border border-border-default")}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-primary animate-pulse" />
            </div>
            <div className="bg-surface-secondary border border-border-default rounded-2xl rounded-bl-md px-3.5 py-2.5">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="shrink-0 p-3 border-t border-border-default flex gap-2 bg-surface-secondary/50">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("chat.placeholder")}
          className={cn(
            "flex-1 bg-background border border-border-default rounded-xl px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted",
            "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          )}
        />
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="submit"
          disabled={!input.trim() || isLoading}
          className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors", input.trim() ? "bg-primary text-on-primary hover:bg-primary-hover" : "bg-surface-tertiary text-text-muted")}
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </form>
    </div>
  );
}

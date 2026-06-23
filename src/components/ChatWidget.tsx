"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { useChatStore } from "@/stores/chat-store";
import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const { t } = useI18n();
  const { isOpen, toggleChat, sendMessage, isLoading, getMessages, createSession } = useChatStore();
  const messages = getMessages();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <>
      {/* Floating button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            createSession();
            toggleChat();
          }}
          className={cn(
            "fixed bottom-24 right-4 z-[60] w-14 h-14 rounded-full",
            "bg-primary text-on-primary shadow-lg shadow-primary/25",
            "flex items-center justify-center",
            "hover:bg-primary-hover transition-colors"
          )}
          aria-label={t("chat.open")}
        >
          <MessageSquare className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed bottom-24 right-4 z-[60] w-[calc(100vw-2rem)] max-w-sm",
              "bg-background border border-border-default rounded-3xl shadow-2xl shadow-black/10",
              "flex flex-col overflow-hidden"
            )}
            style={{ height: "min(520px, 65vh)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-default shrink-0 bg-surface-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t("chat.title")}</p>
                  <p className="text-[10px] text-success font-medium">{t("chat.online")}</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-tertiary transition-colors"
                aria-label={t("chat.close")}
              >
                <X className="w-4 h-4 text-text-secondary" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-2",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                      msg.role === "user"
                        ? "bg-surface-tertiary"
                        : "bg-primary/10"
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5 text-text-secondary" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                      msg.role === "user"
                        ? "bg-primary text-on-primary rounded-br-md"
                        : "bg-surface-secondary text-text-primary rounded-bl-md border border-border-default"
                    )}
                  >
                    {msg.content}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {msg.suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => sendMessage(s)}
                            className={cn(
                              "text-xs px-2.5 py-1 rounded-full border transition-colors",
                              "border-border-default bg-background hover:bg-surface-tertiary text-text-primary"
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
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
            <form
              onSubmit={handleSubmit}
              className="shrink-0 p-3 border-t border-border-default flex gap-2 bg-surface-secondary/50"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chat.placeholder")}
                className={cn(
                  "flex-1 bg-background border border-border-default rounded-xl px-3 py-2 text-sm",
                  "text-text-primary placeholder:text-text-muted",
                  "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                )}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                  input.trim()
                    ? "bg-primary text-on-primary hover:bg-primary-hover"
                    : "bg-surface-tertiary text-text-muted"
                )}
                aria-label={t("chat.send")}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

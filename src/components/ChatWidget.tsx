"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { useChatStore } from "@/stores/chat-store";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function ChatWidget() {
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
            "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/20",
            "flex items-center justify-center",
            "hover:bg-[#2563EB] transition-colors"
          )}
          aria-label="Abrir chat"
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
              "bg-[#141419] border border-[#2A2A35] rounded-2xl shadow-2xl",
              "flex flex-col overflow-hidden"
            )}
            style={{ height: "min(480px, 60vh)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A35] shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#3B82F6]/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F1F5F9]">NEXO AI</p>
                  <p className="text-[10px] text-[#10B981]">Online</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
                aria-label="Fechar chat"
              >
                <X className="w-4 h-4 text-[#94A3B8]" />
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
                        ? "bg-[#1E1E24]"
                        : "bg-[#3B82F6]/20"
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5 text-[#94A3B8]" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-[#3B82F6]" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-[#3B82F6] text-white rounded-br-md"
                        : "bg-[#1E1E24] text-[#F1F5F9] rounded-bl-md border border-[#2A2A35]"
                    )}
                  >
                    {msg.content}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {msg.suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => sendMessage(s)}
                            className="text-xs px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
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
                  <div className="w-7 h-7 rounded-full bg-[#3B82F6]/20 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-[#3B82F6] animate-pulse" />
                  </div>
                  <div className="bg-[#1E1E24] border border-[#2A2A35] rounded-2xl rounded-bl-md px-3 py-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-[#475569] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-[#475569] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-[#475569] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="shrink-0 p-3 border-t border-[#2A2A35] flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className={cn(
                  "flex-1 bg-[#1E1E24] border border-[#2A2A35] rounded-xl px-3 py-2 text-sm",
                  "text-[#F1F5F9] placeholder:text-[#475569]",
                  "focus:outline-none focus:border-[#3B82F6] transition-colors"
                )}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                  input.trim()
                    ? "bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                    : "bg-[#1E1E24] text-[#475569]"
                )}
                aria-label="Enviar"
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

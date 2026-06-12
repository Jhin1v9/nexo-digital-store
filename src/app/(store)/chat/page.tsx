"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, ArrowLeft } from "lucide-react";
import { useChatStore } from "@/stores/chat-store";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ChatPage() {
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
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0A0A0F]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-[#2A2A35] shrink-0">
        <button onClick={() => router.push("/")} className="w-10 h-10 flex items-center justify-center -ml-2">
          <ArrowLeft className="w-5 h-5 text-[#94A3B8]" />
        </button>
        <div className="w-8 h-8 rounded-full bg-[#3B82F6]/20 flex items-center justify-center">
          <Bot className="w-4 h-4 text-[#3B82F6]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#F1F5F9]">NEXO AI</p>
          <p className="text-[10px] text-[#10B981]">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex gap-2", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
            <div className={cn("w-7 h-7 rounded-full flex items-center justify-center shrink-0", msg.role === "user" ? "bg-[#1E1E24]" : "bg-[#3B82F6]/20")}>
              {msg.role === "user" ? <User className="w-3.5 h-3.5 text-[#94A3B8]" /> : <Bot className="w-3.5 h-3.5 text-[#3B82F6]" />}
            </div>
            <div className={cn("max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed", msg.role === "user" ? "bg-[#3B82F6] text-white rounded-br-md" : "bg-[#141419] text-[#F1F5F9] rounded-bl-md border border-[#2A2A35]")}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-[#3B82F6]/20 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-[#3B82F6] animate-pulse" />
            </div>
            <div className="bg-[#141419] border border-[#2A2A35] rounded-2xl rounded-bl-md px-3 py-2">
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
      <form onSubmit={handleSubmit} className="shrink-0 p-3 border-t border-[#2A2A35] flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-[#1E1E24] border border-[#2A2A35] rounded-xl px-3 py-2.5 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:outline-none focus:border-[#3B82F6] transition-colors"
        />
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="submit"
          disabled={!input.trim() || isLoading}
          className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors", input.trim() ? "bg-[#3B82F6] text-white" : "bg-[#1E1E24] text-[#475569]")}
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </form>
    </div>
  );
}

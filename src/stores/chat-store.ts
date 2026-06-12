import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChatSession, ChatMessage } from "@/types/chat";
import { mockApi } from "@/lib/api-client";

function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

interface ChatStore {
  sessions: ChatSession[];
  currentSessionId: string | null;
  isOpen: boolean;
  isLoading: boolean;

  createSession: () => string;
  sendMessage: (content: string) => Promise<void>;
  clearHistory: () => void;
  toggleChat: () => void;
  setOpen: (open: boolean) => void;
  selectSession: (id: string) => void;
  deleteSession: (id: string) => void;
  getCurrentSession: () => ChatSession | undefined;
  getMessages: () => ChatMessage[];
}

const defaultSession = (): ChatSession => ({
  id: generateId(),
  title: "Nova conversa",
  messages: [
    {
      id: generateId(),
      role: "assistant",
      content: "Ola! Sou o assistente NEXO. Como posso ajudar voce hoje? Posso tirar duvidas sobre nossos apps, ajudar a escolher a melhor solucao ou guiar voce no processo de solicitacao.",
      timestamp: new Date().toISOString(),
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isActive: true,
});

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [defaultSession()],
      currentSessionId: null,
      isOpen: false,
      isLoading: false,

      createSession: () => {
        const session = defaultSession();
        set((state) => ({
          sessions: [session, ...state.sessions],
          currentSessionId: session.id,
        }));
        return session.id;
      },

      sendMessage: async (content: string) => {
        const state = get();
        let sessionId = state.currentSessionId;

        // Create session if none exists
        if (!sessionId) {
          sessionId = get().createSession();
        }

        const userMessage: ChatMessage = {
          id: generateId(),
          role: "user",
          content,
          timestamp: new Date().toISOString(),
        };

        // Add user message
        set((s) => ({
          sessions: s.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  messages: [...session.messages, userMessage],
                  updatedAt: new Date().toISOString(),
                  title:
                    session.title === "Nova conversa"
                      ? content.slice(0, 30) + (content.length > 30 ? "..." : "")
                      : session.title,
                }
              : session
          ),
          isLoading: true,
        }));

        try {
          const response = await mockApi.sendChatMessage(content);

          const assistantMessage: ChatMessage = {
            id: generateId(),
            role: "assistant",
            content: response.content,
            timestamp: new Date().toISOString(),
            suggestions: response.suggestions,
          };

          set((s) => ({
            sessions: s.sessions.map((session) =>
              session.id === sessionId
                ? {
                    ...session,
                    messages: [...session.messages, assistantMessage],
                    updatedAt: new Date().toISOString(),
                  }
                : session
            ),
            isLoading: false,
          }));
        } catch {
          const errorMessage: ChatMessage = {
            id: generateId(),
            role: "assistant",
            content: "Desculpe, ocorreu um erro. Tente novamente mais tarde.",
            timestamp: new Date().toISOString(),
          };

          set((s) => ({
            sessions: s.sessions.map((session) =>
              session.id === sessionId
                ? { ...session, messages: [...session.messages, errorMessage] }
                : session
            ),
            isLoading: false,
          }));
        }
      },

      clearHistory: () => {
        const session = defaultSession();
        set({
          sessions: [session],
          currentSessionId: session.id,
        });
      },

      toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
      setOpen: (open) => set({ isOpen: open }),

      selectSession: (id) => set({ currentSessionId: id }),

      deleteSession: (id) =>
        set((state) => {
          const sessions = state.sessions.filter((s) => s.id !== id);
          return {
            sessions,
            currentSessionId:
              state.currentSessionId === id
                ? sessions[0]?.id ?? null
                : state.currentSessionId,
          };
        }),

      getCurrentSession: () => {
        const { sessions, currentSessionId } = get();
        return sessions.find((s) => s.id === currentSessionId);
      },

      getMessages: () => {
        const session = get().getCurrentSession();
        return session?.messages ?? [];
      },
    }),
    {
      name: "nexo-chat",
      partialize: (state) => ({
        sessions: state.sessions,
        currentSessionId: state.currentSessionId,
      }),
    }
  )
);

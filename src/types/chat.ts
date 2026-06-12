export type ChatMessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  content: string;
  timestamp: string;
  isLoading?: boolean;
  suggestions?: string[];
  sources?: string[];
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface ChatResponse {
  message: ChatMessage;
  sessionId: string;
}

export interface ChatStreamChunk {
  content?: string;
  isComplete: boolean;
  suggestions?: string[];
}

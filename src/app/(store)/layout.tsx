"use client";

import { useViewportHeight } from "@/hooks/use-viewport-height";
import { useOffline } from "@/hooks/use-offline";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { ChatWidget } from "@/components/ChatWidget";
import { Toaster } from "@/components/Toaster";
import { cn } from "@/lib/utils";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useViewportHeight();
  const { isOffline } = useOffline();

  return (
    <div className="relative min-h-[100dvh] bg-[#0A0A0F]">
      {/* Offline indicator */}
      {isOffline && (
        <div
          className={cn(
            "fixed top-14 left-0 right-0 z-40 h-9 flex items-center justify-center gap-2",
            "bg-purple-600 text-white text-xs font-medium animate-pulse"
          )}
        >
          <span className="inline-block w-2 h-2 bg-white rounded-full" />
          Sem conexao — modo offline ativado
        </div>
      )}

      {/* Sticky Header */}
      <Navbar />

      {/* Main content */}
      <main
        className={cn(
          "pt-14 pb-20 min-h-[100dvh]",
          isOffline && "pt-[4.25rem]"
        )}
      >
        {children}
      </main>

      {/* Toast notifications */}
      <Toaster />

      {/* Floating chat widget */}
      <ChatWidget />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

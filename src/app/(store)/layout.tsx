"use client";

import { useViewportHeight } from "@/hooks/use-viewport-height";
import { useOffline } from "@/hooks/use-offline";
import { useI18n } from "@/i18n";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
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
  const { t } = useI18n();

  return (
    <div className="relative min-h-[100dvh] bg-background">
      {/* Offline indicator */}
      {isOffline && (
        <div
          className={cn(
            "fixed top-16 left-0 right-0 z-40 h-9 flex items-center justify-center gap-2",
            "bg-warning text-on-warning text-xs font-medium animate-pulse"
          )}
        >
          <span className="inline-block w-2 h-2 bg-text-inverse rounded-full" />
          {t("offline")}
        </div>
      )}

      {/* Sticky Header */}
      <Navbar />

      {/* Main content */}
      <main
        className={cn(
          "pt-16 md:pt-[4.5rem] pb-16 md:pb-0 min-h-[100dvh]",
          isOffline && "pt-[4.25rem]"
        )}
      >
        {children}
      </main>

      {/* Toast notifications */}
      <Toaster />

      {/* Floating chat widget */}
      <ChatWidget />

      {/* Footer */}
      <Footer />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

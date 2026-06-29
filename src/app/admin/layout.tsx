import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — NEXO Digital Store",
  description: "Painel administrativo da NEXO Store",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full bg-background text-foreground font-sans">
      {children}
    </div>
  );
}

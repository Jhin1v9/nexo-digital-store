"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

interface SectionHeaderProps {
  title: string;
  href?: string;
  actionLabel?: string;
  className?: string;
}

export function SectionHeader({ title, href, actionLabel, className }: SectionHeaderProps) {
  const { t } = useI18n();

  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <h2 className="text-xl font-semibold text-text-primary tracking-tight">{title}</h2>
      {href && (
        <Link
          href={href}
          className="group flex items-center gap-0.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          {actionLabel ?? t("home.viewAll")}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}

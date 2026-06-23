"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryPillProps {
  href: string;
  label: string;
  icon: LucideIcon;
  index?: number;
}

export function CategoryPill({ href, label, icon: Icon, index = 0 }: CategoryPillProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={href}
        className={cn(
          "flex items-center gap-2 h-10 px-4 rounded-full shrink-0",
          "bg-surface-secondary text-text-secondary",
          "border border-border-default",
          "hover:bg-surface-tertiary hover:text-text-primary hover:border-border-strong",
          "transition-colors duration-200"
        )}
      >
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium whitespace-nowrap">{label}</span>
      </Link>
    </motion.div>
  );
}

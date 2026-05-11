import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type CardProps = {
  as?: "article" | "div" | "li";
  className?: string;
  children: ReactNode;
  variant?: "default" | "ghost" | "brand";
};

const variants: Record<NonNullable<CardProps["variant"]>, string> = {
  default: "bg-surface-card border border-surface-line shadow-xs",
  ghost: "bg-transparent",
  brand: "bg-brand-teal text-white border-transparent"
};

export function Card({ as: Tag = "article", className, children, variant = "default" }: CardProps) {
  return (
    <Tag className={cn("rounded-2xl p-6 md:p-8 transition-shadow", variants[variant], className)}>
      {children}
    </Tag>
  );
}

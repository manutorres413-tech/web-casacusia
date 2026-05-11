import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-teal-soft text-brand-teal-dark px-3 py-1 text-xs font-medium",
        className
      )}
    >
      {children}
    </span>
  );
}

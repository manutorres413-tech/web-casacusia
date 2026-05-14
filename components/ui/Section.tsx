import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Background = "default" | "warm" | "tint" | "card" | "dark" | "verde" | "violeta";

type SectionProps = {
  id?: string;
  as?: "section" | "div" | "article";
  background?: Background;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  ariaLabelledBy?: string;
};

const bgClasses: Record<Background, string> = {
  default:  "bg-surface-bg",
  warm:     "bg-surface-warm",
  tint:     "bg-surface-tint",
  card:     "bg-surface-card",
  dark:     "bg-ink text-white",
  verde:    "bg-verde text-white",
  violeta:  "bg-violeta text-white"
};

export function Section({
  id, as: Tag = "section", background = "default",
  className, children, ariaLabel, ariaLabelledBy
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn("py-16 md:py-24", bgClasses[background], className)}
    >
      <div className="container">{children}</div>
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn(
      "text-sm font-semibold uppercase tracking-[0.2em] text-[#F44475]",
      className
    )}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow, title, body, className
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("max-w-3xl mb-10 md:mb-14", className)}>
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
      {body && (
        <p className="mt-5 text-lg leading-relaxed text-ink-soft md:text-xl">{body}</p>
      )}
    </header>
  );
}

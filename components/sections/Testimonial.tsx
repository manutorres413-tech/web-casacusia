"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/Section";
import { Filamento } from "@/components/ui/Filamento";
import type { Testimonio } from "@/lib/content";

/* Avatar colors cycling through brand palette */
const avatarCycle = [
  { bg: "bg-verde-soft",    text: "text-verde-dark" },
  { bg: "bg-violeta-soft",  text: "text-violeta-dark" },
  { bg: "bg-rosa-soft",     text: "text-rosa-dark" },
  { bg: "bg-amarillo-soft", text: "text-ink-soft" }
];

export function Testimonial({ testimonios }: { testimonios: Testimonio[] }) {
  const t = useTranslations("home.testimonios");
  const [index, setIndex] = useState(0);
  const total = testimonios.length;
  const current = testimonios[index];

  if (!current || total === 0) return null;

  const av = avatarCycle[index % avatarCycle.length] ?? avatarCycle[0]!;

  return (
    <Section background="warm" ariaLabelledBy="testimonial-title" className="relative overflow-hidden">
      {/* Filamentos decorativos sobre crema */}
      <Filamento name="rosa"    className="-top-10 -right-10 w-44 rotate-[15deg]"  opacity={10} />
      <Filamento name="verde"   className="-bottom-10 -left-10 w-44 rotate-[-20deg]" opacity={10} />
      <Filamento name="punto-magenta" className="top-16 left-[40%] w-6" opacity={35} />

      <SectionHeading
        eyebrow={t("eyebrow")}
        title={<span id="testimonial-title">{t("title")}</span>}
      />

      <figure className="relative max-w-3xl">
        {/* Comillas decorativas en Fuzzy Bubbles */}
        <span
          aria-hidden
          className="absolute -top-6 -left-2 font-bubbles text-[7rem] leading-none text-verde opacity-20 select-none"
        >
          &quot;
        </span>

        <blockquote className="relative font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">
          &quot;{current.texto}&quot;
        </blockquote>

        <figcaption className="mt-7 flex items-center gap-4">
          <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${av.bg} ${av.text}`}>
            {current.autor[0]}
          </span>
          <div>
            <p className="font-semibold text-ink">{current.autor}</p>
            {(current.contexto ?? current.ubicacion) && (
              <p className="text-sm text-ink-muted">{current.contexto ?? current.ubicacion}</p>
            )}
          </div>
        </figcaption>
      </figure>

      {total > 1 && (
        <div className="mt-10 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + total) % total)}
            aria-label="Testimonio anterior"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-line bg-surface-card hover:border-verde hover:text-verde-dark transition-colors"
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % total)}
            aria-label="Testimonio siguiente"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-line bg-surface-card hover:border-verde hover:text-verde-dark transition-colors"
          >
            <ChevronRight size={18} aria-hidden />
          </button>
          <span className="ml-2 text-sm text-ink-muted" aria-live="polite">
            {index + 1} / {total}
          </span>
        </div>
      )}
    </Section>
  );
}

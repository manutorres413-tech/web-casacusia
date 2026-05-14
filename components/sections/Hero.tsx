"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

const REVEAL_DELAY = 3000;

export function Hero() {
  const t = useTranslations("home.hero");
  const [revealed, setRevealed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    timerRef.current = setTimeout(() => setRevealed(true), REVEAL_DELAY);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setRevealed(false);
  }, []);

  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      aria-label="CASACUSIA: bienvenida"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background photo */}
      <Image
        src="/fotos/propuestas/Casacusia_GZ-21.jpg"
        alt="Comunidad Casacusia reunida"
        fill
        className={`object-cover transition-transform duration-1000 ${revealed ? "scale-105" : "scale-100"}`}
        priority
        quality={85}
      />

      {/* Overlay: siempre presente, se aclara al revelar */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          revealed ? "bg-black/10" : "bg-black/40"
        }`}
      />

      {/* Panel de texto con fondo sólido redondeado */}
      <div
        className={`container relative z-10 py-20 md:py-28 transition-all duration-700 ${
          revealed ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="max-w-2xl">
          <div className="rounded-[2rem] bg-[#143642]/90 backdrop-blur-sm p-8 md:p-12 shadow-2xl">
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.2rem]">
              {t("title")}
              <span className="mt-2 block text-[#00B980]">{t("titleLine2")}</span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-[#FFF9F2]/90 md:text-lg max-w-lg">
              {t("subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/sumate" size="lg">
                {t("ctaPrimary")} <ArrowRight size={18} aria-hidden />
              </Button>
              <Button href="/programas" size="lg" variant="secondary" className="border-white/40 text-white hover:bg-white/15">
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

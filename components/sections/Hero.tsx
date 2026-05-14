"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

const IDLE_TIMEOUT = 800;

export function Hero() {
  const t = useTranslations("home.hero");
  const [isMoving, setIsMoving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = useCallback(() => {
    setIsMoving(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsMoving(false), IDLE_TIMEOUT);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setIsMoving(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#143642]"
      aria-label="CASACUSIA: bienvenida"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background photo */}
      <Image
        src="/fotos/propuestas/Casacusia_GZ-21.jpg"
        alt="Comunidad Casacusia reunida"
        fill
        className={`object-cover transition-all duration-700 ${
          isMoving ? "opacity-100 scale-105" : "opacity-15"
        }`}
        priority
        quality={85}
      />

      {/* Texto — pointer-events-none para que el mouse pase a la sección */}
      <div
        className={`relative z-10 w-full max-w-4xl mx-auto px-6 py-20 md:py-28 text-center pointer-events-none transition-all duration-500 ${
          isMoving ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        <h1 className="font-display font-extrabold leading-[1.1] tracking-tight text-[#FFC001] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
        <p className="mt-3 font-display font-extrabold leading-[1.1] tracking-tight text-[#00B980] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          {t("titleLine2")}
        </p>

        <p className="mt-6 text-base leading-relaxed text-white/90 md:text-lg max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        {/* Botones — pointer-events-auto para que sigan siendo clickeables */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 pointer-events-auto">
          <Button href="/sumate" size="lg">
            {t("ctaPrimary")} <ArrowRight size={18} aria-hidden />
          </Button>
          <Button href="/calendario" size="lg" variant="secondary" className="border-white text-white hover:bg-white hover:text-[#143642]">
            {t("ctaSecondary")}
          </Button>
        </div>
      </div>
    </section>
  );
}

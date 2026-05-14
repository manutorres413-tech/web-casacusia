"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

const IDLE_TIMEOUT = 800; // ms after mouse stops moving to show text again

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
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      aria-label="CASACUSIA: bienvenida"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background photo */}
      <Image
        src="/fotos/propuestas/Casacusia_GZ-21.jpg"
        alt="Comunidad Casacusia reunida"
        fill
        className={`object-cover transition-all duration-700 ${isMoving ? "scale-105" : "scale-100"}`}
        priority
        quality={85}
      />

      {/* Overlay — se aclara cuando se mueve el mouse */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isMoving ? "bg-black/5" : "bg-black/30"
        }`}
      />

      {/* Texto con fondo inline por línea */}
      <div
        className={`container relative z-10 py-20 md:py-28 transition-all duration-500 ${
          isMoving ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="max-w-3xl">
          {/* Título — cada línea con su propio fondo redondeado */}
          <h1 className="font-display text-4xl font-extrabold leading-[1.3] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.2rem]">
            <span className="hero-text-bg text-white bg-[#143642]/85">
              {t("title")}
            </span>
            <br />
            <span className="hero-text-bg text-[#00B980] bg-[#143642]/85 mt-2 inline">
              {t("titleLine2")}
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="mt-6 text-base leading-[1.8] md:text-lg max-w-lg">
            <span className="hero-text-bg bg-[#143642]/85 text-[#FFF9F2]">
              {t("subtitle")}
            </span>
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/sumate" size="lg">
              {t("ctaPrimary")} <ArrowRight size={18} aria-hidden />
            </Button>
            <Button href="/programas" size="lg" variant="secondary" className="border-white/40 text-white hover:bg-white/15 backdrop-blur-sm">
              {t("ctaSecondary")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

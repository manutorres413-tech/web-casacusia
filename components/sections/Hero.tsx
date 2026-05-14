import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section
      className="group/hero relative min-h-[85vh] flex items-center overflow-hidden"
      aria-label="CASACUSIA: bienvenida"
    >
      {/* Background photo */}
      <Image
        src="/fotos/propuestas/Casacusia_GZ-21.jpg"
        alt="Comunidad Casacusia reunida"
        fill
        className="object-cover transition-transform duration-1000 group-hover/hero:scale-105"
        priority
        quality={85}
      />

      {/* Overlay oscuro global */}
      <div className="absolute inset-0 bg-black/50 transition-opacity duration-700 group-hover/hero:bg-black/20" />

      {/* Contenido con panel blur para legibilidad */}
      <div className="container relative z-10 py-20 md:py-28 transition-opacity duration-700 group-hover/hero:opacity-0">
        <div className="max-w-2xl">
          {/* Panel con blur detrás del texto */}
          <div className="rounded-3xl bg-black/40 backdrop-blur-md p-8 md:p-10 ring-1 ring-white/10">
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.2rem]">
              {t("title")}
              <span className="mt-2 block text-verde">{t("titleLine2")}</span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/90 md:text-lg max-w-lg">
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

      {/* Hint */}
      <div className="absolute bottom-6 right-6 z-10 text-white/50 text-xs font-medium tracking-wider uppercase transition-opacity duration-700 group-hover/hero:opacity-0 hidden md:block">
        hover para ver la foto →
      </div>
    </section>
  );
}

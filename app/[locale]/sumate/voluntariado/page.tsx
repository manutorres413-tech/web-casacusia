import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Info } from "lucide-react";

import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { VolunteerGrid } from "@/components/sections/VolunteerGrid";
import { Button } from "@/components/ui/Button";
import { getVoluntarios, getComisionesConConteo } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sumate.voluntariado" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/sumate/voluntariado",
    locale: locale as Locale
  });
}

export default async function VoluntariadoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "sumate.voluntariado" });

  const voluntarios = getVoluntarios();
  const comisiones = getComisionesConConteo();

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("heading")} subtitle={t("subtitle")} />

      <Section background="default" ariaLabelledBy="vol-count">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={
            <span id="vol-count">
              {t("voluntariosCount", { count: voluntarios.length })} · {t("comisionesCount", { count: comisiones.length })}
            </span>
          }
        />
        <VolunteerGrid voluntarios={voluntarios} comisiones={comisiones} />
      </Section>

      <Section background="dark" ariaLabelledBy="waitlist-title" className="relative py-24 md:py-32 overflow-hidden mt-10">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/fotos/propuestas/casacusia_kids_alta_169.jpg"
            alt={t("heading")}
            fill
            className="object-cover"
            quality={85}
          />
        </div>
        
        {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-ink/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 text-xs uppercase tracking-widest font-bold shadow-sm">
            <Info size={14} aria-hidden /> {t("cupoCompleto")}
          </div>
          <h2 id="waitlist-title" className="mt-8 font-display text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-md">
            {t("equipoCompleto")}
          </h2>
          <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed drop-shadow-sm">
            {t("waitlistDesc")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contacto" className="bg-white text-ink hover:bg-white/90 shadow-lg">
              {t("ctaDatos")}
            </Button>
            <Button href="/sumate" variant="secondary" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20">
              {t("ctaOtrasFormas")}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

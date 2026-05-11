import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Heart, Target, Lightbulb, Users, ShieldCheck, Sparkles, MessageSquare } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nosotros" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/nosotros",
    locale: locale as Locale
  });
}

export default async function NosotrosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nosotros" });

  return (
    <>
      <PageHero 
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* 2. ¿Qué es la hipoacusia? (Stats Cards) */}
      <Section background="default" ariaLabelledBy="que-es-title" className="pt-10">
        <SectionHeading
          title={<span id="que-es-title">{t("stats.title")}</span>}
          body={t("stats.body")}
          className="mx-auto text-center"
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {[
            { key: "world", bg: "bg-rosa/10", text: "text-rosa-dark" },
            { key: "argentina", bg: "bg-verde/10", text: "text-verde-dark" },
            { key: "oms", bg: "bg-violeta/10", text: "text-violeta-dark" }
          ].map((it) => (
            <li key={it.key} className={`rounded-3xl p-8 border border-surface-line transition-transform hover:-translate-y-1 ${it.bg}`}>
              <p className={`font-display text-4xl md:text-5xl font-extrabold ${it.text}`}>
                {t(`stats.items.${it.key}.n`)}
              </p>
              <p className="mt-4 text-ink-soft text-lg font-medium">
                {t(`stats.items.${it.key}.l`)}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. La Brecha (Editorial Layout) */}
      <Section background="tint" ariaLabelledBy="brecha-title" className="overflow-hidden">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-surface-line order-last lg:order-first">
            <Image
              src="/fotos/propuestas/Casacusia_GZ-21.jpg"
              alt={t("brecha.title")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow={t("brecha.eyebrow")}
              title={<span id="brecha-title">{t("brecha.title")}</span>}
            />
            <div className="space-y-6 text-lg text-ink-soft leading-relaxed">
              <p>{t("brecha.p1")}</p>
              <p>{t("brecha.p2")}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Misión y Visión (Gradients) */}
      <Section background="default" ariaLabelledBy="mv-title">
        <SectionHeading title={<span id="mv-title">{t("horizonte.title")}</span>} className="mx-auto text-center" />
        <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Misión */}
          <div className="relative overflow-hidden rounded-3xl p-10 shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-br from-verde to-verde-dark" />
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 text-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md mb-6 shadow-sm border border-white/30">
                <Target size={24} aria-hidden />
              </div>
              <h3 className="text-sm uppercase tracking-widest font-bold text-white/80 mb-4">{t("horizonte.mision.label")}</h3>
              <div className="space-y-4">
                <p className="font-display text-2xl md:text-3xl leading-tight font-bold drop-shadow-sm">
                  {t("horizonte.mision.title")}
                </p>
                <p className="text-lg text-white/90 leading-relaxed font-medium">
                  {t("horizonte.mision.body")}
                </p>
              </div>
            </div>
          </div>
          {/* Visión */}
          <div className="relative overflow-hidden rounded-3xl p-10 shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-br from-violeta to-violeta-dark" />
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 text-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md mb-6 shadow-sm border border-white/30">
                <Lightbulb size={24} aria-hidden />
              </div>
              <h3 className="text-sm uppercase tracking-widest font-bold text-white/80 mb-4">{t("horizonte.vision.label")}</h3>
              <p className="font-display text-2xl md:text-3xl leading-tight font-bold drop-shadow-sm">
                {t("horizonte.vision.title")}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. Valores (Grilla con íconos) */}
      <Section background="tint" ariaLabelledBy="valores-title">
        <SectionHeading
          title={<span id="valores-title">{t("valores.title")}</span>}
          body={t("valores.body")}
          className="mx-auto text-center"
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[
            { key: "apoyo", icon: <Heart size={20} />, color: "text-rosa" },
            { key: "empatia", icon: <MessageSquare size={20} />, color: "text-violeta" },
            { key: "simpleza", icon: <Sparkles size={20} />, color: "text-verde" },
            { key: "transparencia", icon: <ShieldCheck size={20} />, color: "text-verde" },
            { key: "respeto", icon: <Users size={20} />, color: "text-amarillo" },
            { key: "pureza", icon: <Sparkles size={20} />, color: "text-ink" },
            { key: "innovacion", icon: <Lightbulb size={20} />, color: "text-verde" }
          ].map((v) => (
            <li key={v.key} className="group rounded-3xl bg-surface-card border border-surface-line p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className={`mb-4 w-12 h-12 rounded-full bg-surface-tint flex items-center justify-center ${v.color}`}>
                {v.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-ink">{t(`valores.items.${v.key}.name`)}</h3>
              <p className="mt-2 text-ink-soft">{t(`valores.items.${v.key}.desc`)}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. CTA Inmersivo */}
      <Section background="dark" ariaLabelledBy="cta-title" className="relative py-24 md:py-32 overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/fotos/propuestas/casacusia_kids_alta_252.jpg"
            alt={t("cta.title")}
            fill
            className="object-cover"
            quality={85}
          />
        </div>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-ink/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <h2 id="cta-title" className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
            {t("cta.title")}
          </h2>
          <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed drop-shadow-md">
            {t("cta.body")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/sumate" className="bg-white text-ink hover:bg-white/90 shadow-lg text-lg px-8 py-4">
              {t("cta.primary")}
            </Button>
            <Button href="/nosotros/equipo" variant="secondary" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 text-lg px-8 py-4">
              {t("cta.secondary")}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

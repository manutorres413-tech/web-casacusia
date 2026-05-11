import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/Hero";
import { PathCards } from "@/components/sections/PathCards";
import { Esencia } from "@/components/sections/Esencia";
import { TrustBar } from "@/components/sections/TrustBar";
import { AllyGrid } from "@/components/sections/AllyGrid";
import { EjesYProgramas } from "@/components/sections/EjesYProgramas";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { Testimonial } from "@/components/sections/Testimonial";
import { ProximoEncuentro } from "@/components/sections/ProximoEncuentro";
import { PodcastDestacado } from "@/components/sections/PodcastDestacado";
import { CuatroCaminos } from "@/components/sections/CuatroCaminos";
import { VoluntariadoDestacado } from "@/components/sections/VoluntariadoDestacado";
import { Newsletter } from "@/components/sections/Newsletter";

import { buildMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { getTestimonios } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/",
    locale: locale as Locale
  });
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const testimonios = getTestimonios({ destacados: true });

  return (
    <>
      <Hero />
      <Esencia />
      <TrustBar />
      <EjesYProgramas />
      <ImpactStats />
      <Testimonial testimonios={testimonios} />
      <ProximoEncuentro />
      <PodcastDestacado />
      <AllyGrid />
      <CuatroCaminos />
      <VoluntariadoDestacado />
      <Newsletter />
    </>
  );
}

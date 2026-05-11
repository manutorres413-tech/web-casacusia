import type { Metadata } from "next";
import { Clock, Headphones } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PodcastGrid } from "@/components/sections/PodcastGrid";
import { getEpisodios, getCategoriasPodcastConConteo } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "podcast" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/podcast",
    locale: locale as Locale
  });
}

export default async function PodcastPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "podcast" });
  const episodios = getEpisodios();
  const categorias = getCategoriasPodcastConConteo();

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        tone="brand"
      />

      <Section background="default">
        <PodcastGrid episodios={episodios} categorias={categorias} />
      </Section>
    </>
  );
}

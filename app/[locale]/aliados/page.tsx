import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { AllyGrid } from "@/components/sections/AllyGrid";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aliados" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/aliados",
    locale: locale as Locale
  });
}

export default async function AliadosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "aliados" });
  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />
      <AllyGrid variant="full" />
    </>
  );
}

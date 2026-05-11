import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nosotros.historia" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/nosotros/historia",
    locale: locale as Locale
  });
}

const hitos = [
  { año: "A los 15", text: "Lucas Adlerstein pierde la audición. Atraviesa en primera persona el impacto emocional y social de la hipoacusia." },
  { año: "2022", text: "Lucas empieza a hablar públicamente sobre hipoacusia en redes sociales. Descubre que su historia resuena en miles de personas." },
  { año: "2023", text: "Primeros encuentros presenciales informales. Nacen los espacios para compartir entre pares." },
  { año: "2024", text: "Se forma la Red de Padres y Madres. Se lanza el podcast _Sordo pero no mudo_." },
  { año: "Enero 2025", text: "Se constituye formalmente la Fundación CASACUSIA. Se obtienen las primeras alianzas institucionales." },
  { año: "2025", text: "ARCA aprueba la deducción de Ganancias. Misiones, Posadas y Mendoza declaran a CASACUSIA de interés social." },
  { año: "2026", text: "Se lanza la nueva web y se inicia la expansión a Argentina y la diáspora." }
];

export default async function HistoriaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        eyebrow="Historia"
        title="De una experiencia personal a una Fundación"
        subtitle="Lucas perdió la audición a los 15. Años después, desde esa historia nace CASACUSIA."
      />
      <Section background="default">
        <ol className="relative border-l-2 border-surface-line pl-6 space-y-8 max-w-3xl">
          {hitos.map((h) => (
            <li key={h.año}>
              <div className="absolute -left-[11px] h-5 w-5 rounded-full bg-brand-teal border-4 border-surface-bg" />
              <p className="text-xs uppercase tracking-wider text-brand-teal-dark font-semibold">{h.año}</p>
              <p className="mt-2 text-lg text-ink leading-relaxed">{h.text}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}

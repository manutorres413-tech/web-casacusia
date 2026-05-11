import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { getFAQs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Preguntas frecuentes sobre hipoacusia",
    description:
      "Respuestas concretas a las preguntas más frecuentes sobre hipoacusia, dispositivos, obra social, donaciones y CASACUSIA.",
    path: "/recursos/faq",
    locale: locale as Locale
  });
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const faqs = getFAQs();

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.pregunta,
      acceptedAnswer: { "@type": "Answer", text: f.respuesta }
    }))
  };

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Preguntas frecuentes"
        subtitle="Respuestas concretas a las consultas más comunes sobre hipoacusia, dispositivos, cobertura y cómo donar."
      />
      <Section background="default">
        <ul className="space-y-6 max-w-3xl">
          {faqs.map((f) => (
            <li key={f.id} className="rounded-2xl bg-surface-card border border-surface-line p-6 md:p-8">
              <h2 className="font-display text-xl md:text-2xl font-semibold">{f.pregunta}</h2>
              <p className="mt-3 text-ink-soft leading-relaxed">{f.respuesta}</p>
            </li>
          ))}
        </ul>
      </Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}

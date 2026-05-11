import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";
import { getReconocimientos } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nosotros.legal" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/nosotros/legal",
    locale: locale as Locale
  });
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nosotros.legal" });
  const reconocimientos = getReconocimientos();

  return (
    <>
      <PageHero eyebrow="Legal" title={t("heading")} subtitle={t("subtitle")} />

      <Section background="default">
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
          <dl className="rounded-2xl bg-surface-card border border-surface-line p-8 space-y-4">
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink-muted font-semibold">Nombre legal</dt>
              <dd className="mt-1 font-medium">{site.legalName}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink-muted font-semibold">CUIT</dt>
              <dd className="mt-1 font-medium">{site.legal.cuit}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink-muted font-semibold">Personería</dt>
              <dd className="mt-1">{site.legal.personeria}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink-muted font-semibold">Dirección</dt>
              <dd className="mt-1">{site.legal.address}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink-muted font-semibold">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>

          <div className="rounded-2xl bg-brand-teal text-white p-8">
            <p className="text-xs uppercase tracking-wider text-white/70 font-semibold">ARCA</p>
            <p className="mt-3 font-display text-xl leading-snug">{site.legal.arca}</p>
            <p className="mt-4 text-white/80 text-sm">
              Las empresas que donan a CASACUSIA pueden deducir los aportes del Impuesto a las Ganancias dentro de los topes vigentes.
            </p>
          </div>
        </div>
      </Section>

      <Section background="tint" ariaLabelledBy="rec-title">
        <h2 id="rec-title" className="font-display text-3xl font-bold">Reconocimientos institucionales</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {reconocimientos.map((r) => (
            <li key={`${r.titulo}-${r.organismo}`} className="rounded-2xl bg-surface-card border border-surface-line p-6">
              <p className="text-xs uppercase tracking-wider text-brand-teal-dark font-semibold">{r.organismo}</p>
              <p className="mt-2 font-display text-lg font-semibold">{r.titulo}</p>
              <p className="mt-2 text-sm text-ink-soft">{r.descripcion}</p>
              <p className="mt-3 text-xs text-ink-muted">{r.fecha}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

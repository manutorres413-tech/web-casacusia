import type { Metadata } from "next";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PersonSchema } from "@/components/schema/PersonSchema";
import { getEquipo } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nosotros.equipo" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/nosotros/equipo",
    locale: locale as Locale
  });
}

export default async function EquipoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const equipo = getEquipo();

  return (
    <>
      <PageHero
        eyebrow="Equipo"
        title="Las personas detrás de la Fundación"
        subtitle="Somos un equipo multidisciplinario unido por una misma misión: transformar la realidad de la hipoacusia en Argentina."
      />

      <Section background="default" ariaLabelledBy="team-grid">
        <h2 id="team-grid" className="sr-only">Nuestro Equipo</h2>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {equipo.map((m) => (
            <li key={m.slug} className="rounded-[2.5rem] bg-surface-card border border-surface-line p-8 md:p-10 flex flex-col hover:shadow-2xl hover:shadow-brand-teal/5 transition-all duration-500 group">
              <div className="relative h-28 w-28 mb-6">
                {m.foto && !m.foto.includes("placeholder") ? (
                  <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-surface-line group-hover:border-brand-teal transition-colors">
                    <Image
                      src={m.foto}
                      alt={`${m.nombre} ${m.apellido}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-full w-full rounded-full bg-brand-teal-soft flex items-center justify-center text-brand-teal-dark font-display font-bold text-4xl border-2 border-surface-line">
                    {m.nombre.charAt(0)}
                  </div>
                )}
                
                {m.esFundador && (
                  <div className="absolute -bottom-2 -right-2 bg-verde text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md shadow-sm">
                    Fundador
                  </div>
                )}
              </div>
              <h3 className="font-display text-2xl font-bold text-ink">
                {m.nombre} {m.apellido}
              </h3>
              <p className="text-brand-teal-dark text-sm font-medium mt-0.5">
                {m.rol}
              </p>
              <p className="mt-3 text-ink-soft leading-relaxed flex-1 text-sm">
                {m.bioCorta}
              </p>
              {m.quotePersonal && (
                <blockquote className="mt-4 pl-4 border-l-2 border-brand-teal italic text-ink-soft text-sm">
                  “{m.quotePersonal}”
                </blockquote>
              )}
              {m.linkedin && (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-brand-teal"
                  aria-label={`LinkedIn de ${m.nombre}`}
                >
                  <Linkedin size={16} aria-hidden /> LinkedIn
                </a>
              )}
              <PersonSchema miembro={m} />
            </li>
          ))}
        </ul>
      </Section>

      <Section background="tint">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">¿Querés ser parte?</h2>
            <p className="mt-2 text-ink-soft">Buscamos personas que quieran poner su talento al servicio de la comunidad.</p>
          </div>
          <Button href="/sumate/voluntariado" variant="secondary">Sumarme como voluntario</Button>
        </div>
      </Section>
    </>
  );
}

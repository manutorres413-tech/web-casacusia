import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock, Music } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { getEpisodios } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";

export async function generateStaticParams() {
  return getEpisodios().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const ep = getEpisodios().find((e) => e.slug === slug);
  if (!ep) return {};
  return buildMetadata({
    title: `${ep.titulo} · Sordo pero no mudo`,
    description: ep.descripcion.slice(0, 160),
    path: `/podcast/${ep.slug}`,
    locale: locale as Locale
  });
}

export default async function EpisodePage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const ep = getEpisodios().find((e) => e.slug === slug);
  if (!ep) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: ep.titulo,
    episodeNumber: ep.numero,
    datePublished: ep.fechaPublicacion,
    timeRequired: `PT${ep.duracion.replace(":", "M")}S`,
    description: ep.descripcion,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "Sordo pero no mudo",
      url: `${site.url}/podcast`
    }
  };

  return (
    <>
      <PageHero
        eyebrow={`Episodio ${ep.numero}`}
        title={ep.titulo}
        subtitle={ep.invitado ? `con ${ep.invitado.nombre}` : undefined}
        tone="brand"
      />

      <Section background="default">
        <div className="max-w-3xl">
          <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted mb-8">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} aria-hidden />{" "}
              <time dateTime={ep.fechaPublicacion}>
                {new Date(ep.fechaPublicacion).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden /> {ep.duracion}
            </span>
          </p>

          <p className="text-lg text-ink-soft leading-relaxed">{ep.descripcion}</p>

          {ep.youtubeId ? (
            <div className="mt-10 aspect-video w-full rounded-2xl overflow-hidden bg-surface-bg border border-surface-line shadow-sm">
              <iframe
                src={`https://www.youtube.com/embed/${ep.youtubeId}`}
                title={ep.titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : null}
          
          {ep.spotifyUrl || ep.applePodcastsUrl ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {ep.spotifyUrl && (
                <a 
                  href={ep.spotifyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/20 text-[#1DB954] hover:bg-[#1DB954] hover:text-white transition-all text-sm font-bold shadow-sm"
                >
                  <Music size={18} /> Escuchar en Spotify
                </a>
              )}
              {ep.applePodcastsUrl && (
                <a 
                  href={ep.applePodcastsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#872ec4]/10 border border-[#872ec4]/20 text-[#872ec4] hover:bg-[#872ec4] hover:text-white transition-all text-sm font-bold shadow-sm"
                >
                  <Music size={18} /> Escuchar en Apple Podcasts
                </a>
              )}
            </div>
          ) : null}

          <div className="mt-12 rounded-2xl bg-surface-tint border border-surface-line p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-ink">Transcripción completa</h2>
            {ep.transcripcion ? (
              <div className="mt-6 text-ink-soft leading-relaxed whitespace-pre-wrap font-medium">
                {ep.transcripcion}
              </div>
            ) : (
              <p className="mt-3 text-ink-soft italic">
                La transcripción completa del episodio estará disponible en Ola 2. Mientras tanto, podés escuchar el episodio en tu plataforma favorita.
              </p>
            )}
          </div>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}

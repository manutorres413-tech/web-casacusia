import Image from "next/image";
import { useTranslations } from "next-intl";
import { Clock, Headphones, ArrowUpRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Filamento } from "@/components/ui/Filamento";
import { Link } from "@/lib/i18n/navigation";
import { getEpisodios } from "@/lib/content";

/* Acento visual de cada episodio — rota los 3 filamentos */
const accentCycle = [
  { dot: "bg-verde",    label: "text-verde-dark",    border: "hover:border-verde" },
  { dot: "bg-violeta",  label: "text-violeta-dark",  border: "hover:border-violeta" },
  { dot: "bg-rosa",     label: "text-rosa-dark",     border: "hover:border-rosa" }
] as const;

export function PodcastDestacado() {
  const t = useTranslations("home.podcast");
  const episodios = getEpisodios({ limit: 6 });

  return (
    <Section background="warm" ariaLabelledBy="podcast-title" className="relative overflow-hidden cursor-megaphone">
      {/* Filamentos decorativos */}
      <Filamento name="rosa"    className="top-[-40px] right-[-60px] w-48 rotate-[20deg]" opacity={12} />
      <Filamento name="morado"  className="bottom-[-40px] left-[-40px] w-40 rotate-[-15deg]" opacity={10} />
      <Filamento name="punto-naranja" className="top-20 left-[30%] w-6" opacity={40} />

      <div className="relative grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start">

        {/* ── Episodios ── */}
        <div>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={<span id="podcast-title">{t("title")}</span>}
            body={t("body")}
          />

          <ul className="grid gap-4 md:gap-5 sm:grid-cols-2">
            {episodios.map((ep, i) => {
              const ac = accentCycle[i % accentCycle.length] ?? accentCycle[0]!;
              return (
                <li key={ep.slug}>
                  <Link
                    href={`/podcast/${ep.slug}`}
                    className={[
                      "group flex h-full flex-col rounded-2xl bg-surface-card border border-surface-line p-5",
                      "hover:shadow-card-hover transition-all",
                      ac.border
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${ac.dot}`} aria-hidden />
                      <p className={`text-[11px] font-bold uppercase tracking-wider ${ac.label}`}>
                        Ep. {ep.numero}
                      </p>
                    </div>
                    <h3 className="mt-2.5 font-display text-base font-semibold leading-snug text-ink group-hover:text-verde-dark transition-colors">
                      {ep.titulo}
                    </h3>
                    {ep.invitado && (
                      <p className="mt-1 text-xs text-ink-muted">con {ep.invitado.nombre}</p>
                    )}
                    <p className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-4 text-[11px] text-ink-muted">
                      <span className="inline-flex items-center gap-1"><Clock size={12} aria-hidden />{ep.duracion}</span>
                      <span className="inline-flex items-center gap-1"><Headphones size={12} aria-hidden />transcripción</span>
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8">
            <Button href="/podcast" variant="secondary">
              {t("cta")} <ArrowUpRight size={16} aria-hidden />
            </Button>
          </div>
        </div>

        {/* ── Arte del podcast ── */}
        <div className="hidden lg:block sticky top-24">
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/brand/podcast/spnm-alta.jpg"
              alt="Sordo pero no mudo — Podcast de CASACUSIA"
              width={340}
              height={340}
              className="w-full object-cover"
            />
          </div>
          <div className="mt-5 rounded-2xl bg-surface-card border border-surface-line p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              Escuchalo en
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href="https://open.spotify.com/show/6zYhA2pOjN0pxW2XcC8eM5" target="_blank" rel="noopener noreferrer" className="rounded-full border border-surface-line px-3 py-1 text-xs font-medium text-ink-soft hover:bg-[#1DB954] hover:text-white hover:border-[#1DB954] transition-colors">
                Spotify
              </a>
              <a href="https://podcasts.apple.com/us/podcast/sordo-pero-no-mudo-hablando-desde-mi-hipoacusia/id1695485167" target="_blank" rel="noopener noreferrer" className="rounded-full border border-surface-line px-3 py-1 text-xs font-medium text-ink-soft hover:bg-[#872ec4] hover:text-white hover:border-[#872ec4] transition-colors">
                Apple Podcasts
              </a>
              <a href="https://www.youtube.com/@hipoacusico" target="_blank" rel="noopener noreferrer" className="rounded-full border border-surface-line px-3 py-1 text-xs font-medium text-ink-soft hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] transition-colors">
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

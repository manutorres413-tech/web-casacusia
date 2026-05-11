"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Clock, Headphones } from "lucide-react";

import type { Episodio, PodcastCategoria } from "@/lib/content";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils/cn";

type Props = {
  episodios: Episodio[];
  categorias: { categoria: PodcastCategoria; count: number }[];
};

export function PodcastGrid({ episodios, categorias }: Props) {
  const t = useTranslations("podcast");
  const [active, setActive] = useState<PodcastCategoria | "destacados">("destacados");

  const filtered = useMemo(() => {
    if (active === "destacados") {
      return episodios.filter((ep) => ep.destacado);
    }
    return episodios.filter((ep) => ep.categoria === active);
  }, [episodios, active]);

  return (
    <div className="cursor-megaphone">
      <div role="group" aria-label={t("filterLabel")} className="flex flex-wrap gap-2">
        <FilterChip active={active === "destacados"} onClick={() => setActive("destacados")}>
          {t("filterDestacados")}
        </FilterChip>
        {categorias.map((c) => (
          <FilterChip
            key={c.categoria}
            active={active === c.categoria}
            onClick={() => setActive(c.categoria)}
          >
            {t(`categorias.${c.categoria}`)} · {c.count}
          </FilterChip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-ink-soft">{t("noResults")}</p>
      ) : (
        <ul className="mt-10 grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ep) => (
            <li key={ep.slug}>
              <Link
                href={`/podcast/${ep.slug}`}
                className="group block rounded-2xl bg-surface-card border border-surface-line p-6 hover:border-brand-teal hover:shadow-sm transition-all h-full"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs uppercase tracking-wider text-brand-teal-dark font-semibold">
                    {t("episodio")} {ep.numero}
                  </p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-bg border border-surface-line text-[10px] uppercase font-bold text-ink-soft tracking-wider">
                    {t(`categorias.${ep.categoria}`)}
                  </span>
                </div>
                
                <h3 className="mt-2 font-display text-xl font-semibold leading-tight group-hover:text-brand-teal-dark transition-colors">
                  {ep.titulo}
                </h3>
                {ep.invitado ? (
                  <p className="mt-2 text-sm text-ink-soft">{t("con")} {ep.invitado.nombre}</p>
                ) : null}
                <p className="mt-3 text-sm text-ink-soft line-clamp-3">{ep.descripcion}</p>
                <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} aria-hidden /> {ep.duracion}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Headphones size={14} aria-hidden /> {t("conTranscripcion")}
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "h-10 px-5 rounded-full text-sm font-bold transition-all duration-300 border shadow-sm",
        active
          ? "bg-ink text-white border-ink scale-105"
          : "bg-surface-card text-ink-soft border-surface-line hover:border-brand-teal hover:text-brand-teal hover:bg-brand-teal/5"
      )}
    >
      {children}
    </button>
  );
}

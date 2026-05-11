"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import type { Voluntario, Comision } from "@/lib/content";
import { cn } from "@/lib/utils/cn";

type Props = {
  voluntarios: Voluntario[];
  comisiones: { comision: Comision; count: number }[];
};

const avatarGradients = [
  "bg-gradient-to-br from-verde to-verde-dark",
  "bg-gradient-to-br from-violeta to-violeta-dark",
  "bg-gradient-to-br from-rosa to-rosa-dark",
  "bg-gradient-to-br from-brand-teal to-brand-teal-dark",
  "bg-gradient-to-br from-blue-500 to-blue-700",
  "bg-gradient-to-br from-amber-400 to-orange-600",
  "bg-gradient-to-br from-fuchsia-500 to-purple-700"
];

export function VolunteerGrid({ voluntarios, comisiones }: Props) {
  const t = useTranslations("sumate.voluntariado");
  const [active, setActive] = useState<Comision | "all">("all");

  const filtered = useMemo(
    () => (active === "all" ? voluntarios : voluntarios.filter((v) => v.comision === active)),
    [voluntarios, active]
  );

  return (
    <div>
      <div role="group" aria-label={t("filterLabel")} className="flex flex-wrap gap-2">
        <FilterChip active={active === "all"} onClick={() => setActive("all")}>
          {t("filterAll")} · {voluntarios.length}
        </FilterChip>
        {comisiones.map((c) => (
          <FilterChip key={c.comision} active={active === c.comision} onClick={() => setActive(c.comision)}>
            {t(`commission.${c.comision}`)} · {c.count}
          </FilterChip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-ink-soft">{t("noResults")}</p>
      ) : (
        <ul className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-0 border-t border-l border-surface-line">
          {filtered.map((v, i) => {
            const grad = avatarGradients[i % avatarGradients.length];
            return (
              <li 
                key={v.slug} 
                className="group relative aspect-square border-r border-b border-surface-line overflow-hidden cursor-default"
              >
                {/* Background / Avatar */}
                <div className={cn(
                  "absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110",
                  grad
                )}>
                  <span className="font-display font-extrabold text-4xl text-white drop-shadow-md opacity-40 group-hover:opacity-20 transition-opacity">
                    {v.nombre.charAt(0)}
                  </span>
                </div>
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-ink/80 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] translate-y-2 group-hover:translate-y-0">
                  <p className="font-bold text-white text-sm md:text-base leading-tight">{v.nombre}</p>
                  <span className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[9px] uppercase font-bold text-white tracking-wider">
                    {t(`commission.${v.comision}`)}
                  </span>
                </div>
              </li>
            );
          })}
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

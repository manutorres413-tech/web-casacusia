import { useTranslations } from "next-intl";
import { getImpacto } from "@/lib/content";
import { Filamento } from "@/components/ui/Filamento";

type Stat = { value: string; label: string; color: string };

export function ImpactStats() {
  const t = useTranslations("home.impacto");
  const impacto = getImpacto();

  const stats: Stat[] = [
    { value: `${impacto.participantesTotales}+`, label: t("items.participantes"), color: "text-verde" },
    { value: `${impacto.encuentrosRealizados}+`, label: t("items.encuentros"),       color: "text-verde" },
    { value: `${impacto.ciudadesAlcanzadas}`,    label: t("items.ciudades"),          color: "text-violeta" },
    { value: `${impacto.padresEnRed}+`,           label: t("items.familias"),           color: "text-violeta" },
    { value: `${impacto.episodiosPodcast}+`,      label: t("items.episodios"),         color: "text-amarillo" }
  ];

  return (
    <section
      className="relative overflow-hidden bg-ink py-20 md:py-28"
      aria-labelledby="impact-title"
    >
      {/* Filamentos del brand sobre fondo oscuro */}
      <Filamento name="morado"  className="-top-10 -right-10 w-64 rotate-[-20deg]" opacity={20} />
      <Filamento name="verde"   className="-bottom-12 -left-12 w-56 rotate-[15deg]" opacity={18} />
      <Filamento name="amarillo" className="top-1/2 left-1/3 w-40 rotate-[5deg]"   opacity={8} />
      <Filamento name="punto-lavanda" className="top-8 right-[35%] w-6" opacity={45} />

      <div className="container relative">
        <div className="mb-12 md:mb-16">
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-verde">
            {t("eyebrow")}
          </p>
          <h2
            id="impact-title"
            className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl"
          >
            {t("title")}
          </h2>
        </div>

        {/* Grid con separadores semi-transparentes */}
        <dl className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2 bg-ink px-6 py-8 md:py-10">
              <dt className="text-xs font-medium text-white/50 leading-snug">{s.label}</dt>
              <dd className={`font-display text-5xl font-extrabold leading-none tracking-tight md:text-6xl ${s.color}`}>
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

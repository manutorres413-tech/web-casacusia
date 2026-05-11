import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Headphones, Users, MapPin } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Filamento } from "@/components/ui/Filamento";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section
      className="relative overflow-hidden bg-surface-bg"
      aria-label="CASACUSIA: bienvenida"
    >
      {/* ── Filamentos decorativos del brand ────────────────── */}
      {/* Verde — arriba derecha */}
      <Filamento
        name="verde"
        className="top-[-60px] right-[-80px] w-72 md:w-96 rotate-[-20deg]"
        opacity={18}
      />
      {/* Morado — abajo izquierda */}
      <Filamento
        name="morado"
        className="bottom-[-60px] left-[-60px] w-48 md:w-64 rotate-[30deg]"
        opacity={14}
      />
      {/* Rosa — mitad derecha */}
      <Filamento
        name="rosa"
        className="top-1/3 right-[5%] w-40 md:w-56 rotate-[15deg]"
        opacity={12}
      />
      {/* Puntos flotantes */}
      <Filamento name="punto-naranja" className="top-16 left-[42%] w-8 md:w-10" opacity={50} />
      <Filamento name="punto-magenta" className="bottom-24 right-[20%] w-6 md:w-8" opacity={45} />
      <Filamento name="punto-lavanda" className="top-28 left-[18%] w-5 md:w-7 hidden md:block" opacity={40} />

      <div className="container relative">
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28">

          {/* ── Left: copy + CTAs ────────────────────────────── */}
          <div className="max-w-xl lg:max-w-none">
            {/* eyebrow pill */}
            <p className="inline-flex items-center gap-2 rounded-full border border-verde/30 bg-verde-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-verde-dark">
              {t("eyebrow")}
            </p>

            {/* H1 */}
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-[4rem] lg:text-[4.5rem]">
              {t("title")}
              <span className="mt-1 block text-verde">{t("titleLine2")}</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-ink-soft md:text-xl">
              {t("subtitle")}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
              <Button href="/sumate" size="lg">
                {t("ctaPrimary")} <ArrowRight size={18} aria-hidden />
              </Button>
              <Button href="/programas" size="lg" variant="secondary">
                {t("ctaSecondary")}
              </Button>
              <Button href="/sumate/donar" size="lg" variant="ghost">
                {t("ctaTertiary")}
              </Button>
            </div>

            {/* Social proof cards */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 md:mt-12">
              <StatCard icon={<Users size={20} className="text-verde-dark" />}      number="600+" label={t("stats.comunidad")} color="verde" />
              <StatCard icon={<MapPin size={20} className="text-violeta-dark" />}     number="7" label={t("stats.ciudades")} color="violeta" />
              <StatCard icon={<Headphones size={20} className="text-rosa-dark" />} number="60+" label={t("stats.episodios")} color="rosa" />
            </div>
          </div>

          {/* ── Right: foto comunidad ───────── */}
          <div className="relative hidden lg:block group" aria-hidden>
            <div className="grid grid-cols-2 gap-4 h-[480px]">
              {/* Foto 1 (Alta a la izquierda) */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg row-span-2 transition-all duration-500 group-hover:opacity-40 group-hover:grayscale-[0.5] hover:!opacity-100 hover:!grayscale-0 hover:scale-[1.03] hover:z-10 hover:shadow-2xl border-4 border-transparent hover:border-white">
                <Image
                  src="/fotos/propuestas/casacusia_kids_alta_246.jpg"
                  alt="Comunidad Casacusia"
                  fill
                  className="object-cover"
                  priority
                  quality={85}
                />
              </div>
              {/* Foto 2 (Arriba derecha) */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg transition-all duration-500 group-hover:opacity-40 group-hover:grayscale-[0.5] hover:!opacity-100 hover:!grayscale-0 hover:scale-[1.03] hover:z-10 hover:shadow-2xl border-4 border-transparent hover:border-white">
                <Image
                  src="/fotos/propuestas/casacusia_kids_alta_169.jpg"
                  alt="Grupo de voluntarios"
                  fill
                  className="object-cover"
                  quality={85}
                />
              </div>
              {/* Foto 3 (Abajo derecha) */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg transition-all duration-500 group-hover:opacity-40 group-hover:grayscale-[0.5] hover:!opacity-100 hover:!grayscale-0 hover:scale-[1.03] hover:z-10 hover:shadow-2xl border-4 border-transparent hover:border-white">
                <Image
                  src="/fotos/propuestas/Casacusia_GZ-21.jpg"
                  alt="Comunidad Casacusia"
                  fill
                  className="object-cover"
                  quality={85}
                />
              </div>
            </div>

            {/* overlay sutil con colores del brand general */}
            <div className="absolute inset-0 bg-gradient-to-tr from-verde/10 via-transparent to-violeta/10 pointer-events-none rounded-3xl" />

            {/* Filamento pequeño sobre la foto */}
            <Filamento
              name="amarillo"
              className="-bottom-8 -right-8 w-32 rotate-[-30deg] -z-10"
              opacity={30}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Tarjetas de social proof ── */
type ChipColor = "verde" | "violeta" | "rosa";

const chipStyles: Record<ChipColor, { bg: string; dot: string; border: string }> = {
  verde:   { bg: "bg-verde-soft/40",    dot: "bg-verde",   border: "border-verde/20" },
  violeta: { bg: "bg-violeta-soft/40",  dot: "bg-violeta", border: "border-violeta/20" },
  rosa:    { bg: "bg-rosa-soft/40",     dot: "bg-rosa",    border: "border-rosa/20" }
};

function StatCard({
  icon,
  number,
  label,
  color
}: {
  icon: React.ReactNode;
  number: string;
  label: string;
  color: ChipColor;
}) {
  const s = chipStyles[color];
  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-white/50 backdrop-blur-xl p-4 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ${s.bg} ${s.border}`}>
      <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-20 blur-2xl ${s.dot}`} aria-hidden />
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        {icon}
      </div>
      <p className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-ink">{number}</p>
      <p className="mt-1 text-[11px] md:text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</p>
    </div>
  );
}

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, HeartHandshake, Users, Handshake, Gift } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/Section";
import { Link } from "@/lib/i18n/navigation";

type Camino = {
  n: string;
  href: string;
  titleKey: "donar" | "voluntariado" | "proyectos" | "servicios";
  descKey: "donarDesc" | "voluntariadoDesc" | "proyectosDesc" | "serviciosDesc";
  icon: React.ReactNode;
  gradient: string;
  accentBorder: string;
  accentText: string;
  photo: string;
};

const caminos: Camino[] = [
  {
    n: "01", href: "/sumate/donar",
    titleKey: "donar", descKey: "donarDesc",
    icon: <HeartHandshake size={24} aria-hidden />,
    gradient: "from-verde/10 via-transparent to-verde/5",
    accentBorder: "border-verde/30 hover:border-verde",
    accentText: "text-verde-dark",
    photo: "/fotos/sumate-donar.jpg"
  },
  {
    n: "02", href: "/sumate/voluntariado",
    titleKey: "voluntariado", descKey: "voluntariadoDesc",
    icon: <Users size={24} aria-hidden />,
    gradient: "from-violeta/10 via-transparent to-violeta/5",
    accentBorder: "border-violeta/30 hover:border-violeta",
    accentText: "text-violeta-dark",
    photo: "/fotos/propuestas/casacusia_kids_alta_169.jpg"
  },
  {
    n: "03", href: "/sumate/proyectos-juntos",
    titleKey: "proyectos", descKey: "proyectosDesc",
    icon: <Handshake size={24} aria-hidden />,
    gradient: "from-amarillo/10 via-transparent to-amarillo/5",
    accentBorder: "border-amarillo/30 hover:border-amarillo",
    accentText: "text-ink-soft",
    photo: "/fotos/taller-ceramica.jpg"
  },
  {
    n: "04", href: "/sumate/donar-servicios",
    titleKey: "servicios", descKey: "serviciosDesc",
    icon: <Gift size={24} aria-hidden />,
    gradient: "from-rosa/10 via-transparent to-rosa/5",
    accentBorder: "border-rosa/30 hover:border-rosa",
    accentText: "text-rosa-dark",
    photo: "/fotos/propuestas/casacusia_kids_alta_245.jpg"
  }
];

export function CuatroCaminos() {
  const t = useTranslations("home.cuatroCaminos");

  return (
    <Section background="tint" ariaLabelledBy="caminos-title">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={<span id="caminos-title">{t("title")}</span>}
        body={t("body")}
      />
      <ul className="grid gap-6 md:gap-8 md:grid-cols-2">
        {caminos.map((c) => (
          <li key={c.n}>
            <Link
              href={c.href}
              className={[
                "group relative flex flex-col overflow-hidden rounded-3xl bg-surface-card border-2",
                "shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                c.accentBorder
              ].join(" ")}
            >
              {/* Foto del encuentro */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={c.photo}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={75}
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${c.gradient} opacity-60`} />
                {/* Número flotante */}
                <span className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm font-display text-sm font-bold text-ink shadow-sm">
                  {c.n}
                </span>
              </div>

              {/* Contenido */}
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 ${c.accentText} -mt-12 relative z-10`}>
                  {c.icon}
                </div>
                <h3 className="mt-4 font-display text-xl md:text-2xl font-bold text-ink">
                  {t(c.titleKey)}
                </h3>
                <p className="mt-2 flex-1 text-sm md:text-base leading-relaxed text-ink-soft">
                  {t(c.descKey)}
                </p>
                <p className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${c.accentText} group-hover:gap-3 transition-all`}>
                  {t("more")}
                  <ArrowUpRight size={16} aria-hidden className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

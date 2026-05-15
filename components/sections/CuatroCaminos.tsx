import { useTranslations } from "next-intl";
import { ArrowUpRight, HeartHandshake, Users, Handshake, Gift } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/Section";
import { Link } from "@/lib/i18n/navigation";

type Camino = {
  href: string;
  titleKey: "donar" | "voluntariado" | "proyectos" | "servicios";
  descKey: "donarDesc" | "voluntariadoDesc" | "proyectosDesc" | "serviciosDesc";
  icon: React.ReactNode;
  accentText: string;
};

const caminos: Camino[] = [
  {
    href: "/sumate/donar",
    titleKey: "donar", descKey: "donarDesc",
    icon: <HeartHandshake size={20} aria-hidden />,
    accentText: "text-verde-dark",
  },
  {
    href: "/sumate/voluntariado",
    titleKey: "voluntariado", descKey: "voluntariadoDesc",
    icon: <Users size={20} aria-hidden />,
    accentText: "text-violeta-dark",
  },
  {
    href: "/sumate/proyectos-juntos",
    titleKey: "proyectos", descKey: "proyectosDesc",
    icon: <Handshake size={20} aria-hidden />,
    accentText: "text-ink-soft",
  },
  {
    href: "/sumate/donar-servicios",
    titleKey: "servicios", descKey: "serviciosDesc",
    icon: <Gift size={20} aria-hidden />,
    accentText: "text-rosa-dark",
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
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {caminos.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="group flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-tint ${c.accentText}`}>
                {c.icon}
              </div>
              <h3 className="mt-4 font-display text-base md:text-lg font-bold text-ink leading-tight">
                {t(c.titleKey)}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {t(c.descKey)}
              </p>
              <p className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold ${c.accentText} group-hover:gap-2 transition-all`}>
                {t("more")}
                <ArrowUpRight size={14} aria-hidden className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

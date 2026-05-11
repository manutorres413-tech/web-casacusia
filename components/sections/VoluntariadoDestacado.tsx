import { useTranslations } from "next-intl";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getVoluntarios, getComisionesConConteo } from "@/lib/content";

export function VoluntariadoDestacado() {
  const t = useTranslations("home.voluntariado");
  const voluntarios = getVoluntarios();
  const comisiones = getComisionesConConteo();

  return (
    <Section background="default" ariaLabelledBy="vol-title">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <h2 id="vol-title" className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            {t("titlePrefix")}
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            {t("subtitle", { count: voluntarios.length, groups: comisiones.length })}
          </p>
          <div className="mt-8">
            <Button href="/sumate/voluntariado" variant="secondary">
              {t("cta")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2" aria-hidden>
          {voluntarios.slice(0, 24).map((v) => (
            <div
              key={v.slug}
              className="aspect-square rounded-xl bg-brand-teal-soft flex items-center justify-center text-sm font-semibold text-brand-teal-dark"
            >
              {v.nombre.charAt(0)}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

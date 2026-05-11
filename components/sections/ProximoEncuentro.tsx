import { useTranslations } from "next-intl";
import { Calendar, MapPin } from "lucide-react";

import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Filamento } from "@/components/ui/Filamento";
import { getProximosEventos } from "@/lib/content";

export function ProximoEncuentro() {
  const t = useTranslations("home.proximoEncuentro");

  return (
    <Section background="default" ariaLabelledBy="proximo-title">
      <div className="relative overflow-hidden rounded-3xl bg-verde-dark p-8 md:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Filamentos decorativos */}
        <Filamento name="amarillo" className="-top-10 -right-10 w-48 rotate-[-20deg]" opacity={18} />
        <Filamento name="morado"   className="-bottom-10 -left-10 w-36 rotate-[15deg]"  opacity={15} />

        {/* Text and CTA */}
        {/* Text and CTA */}
        <div className="relative flex-1 lg:w-1/3 flex flex-col justify-center">
          <Eyebrow className="text-verde-soft/80 mb-3">{t("eyebrow")}</Eyebrow>
          <h2 id="proximo-title" className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl mb-4">
            {t("title")}
          </h2>
          <p className="text-white/85 mb-8 text-lg leading-relaxed">
            {t("body")}
          </p>
          <div>
            <Button
              href="https://lu.ma/hipoacusia"
              variant="secondary"
              size="lg"
              className="bg-white text-verde-dark border-transparent hover:bg-white/90"
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("cta")}
            </Button>
          </div>
        </div>

        {/* Luma Embed */}
        <div className="relative flex-1 lg:w-2/3 bg-white/5 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10" style={{ minHeight: '500px' }}>
          <iframe
            src="https://lu.ma/embed/calendar/hipoacusia"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 'none', minHeight: '500px' }}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
            className="w-full h-full absolute inset-0"
          ></iframe>
        </div>
      </div>
    </Section>
  );
}

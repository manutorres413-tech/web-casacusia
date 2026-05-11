import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Coffee, Beef, CupSoda, Heart, DollarSign, Building2 } from "lucide-react";
import Image from "next/image";

import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sumate.donar" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/sumate/donar",
    locale: locale as Locale
  });
}

export default async function DonarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "sumate.donar" });

  const fotosImpacto = [
    "/fotos/propuestas/casacusia_kids_alta_252.jpg",
    "/fotos/propuestas/Casacusia_GZ-21.jpg",
    "/fotos/propuestas/DSC00009.jpg",
    "/fotos/propuestas/casacusia_kids_alta_186.jpg",
    "/fotos/propuestas/DSC00020.jpg",
    "/fotos/propuestas/DSC00021.jpg"
  ];

  const planes = [
    {
      icon: <Coffee size={32} aria-hidden />,
      titulo: "Plan Café",
      monto: "$4.800",
      frecuencia: "/ mes",
      desc: "Ideal para quienes quieren empezar a colaborar con un aporte mensual simbólico.",
      cta: "Donar $4.800",
      href: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808496e950ee0196ea3b8181008b"
    },
    {
      icon: <CupSoda size={32} aria-hidden />,
      titulo: "Plan Tostón",
      monto: "$12.000",
      frecuencia: "/ mes",
      desc: "Un aporte que nos permite sostener los encuentros mensuales y talleres.",
      cta: "Donar $12.000",
      href: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808496d9dcdf0196ea3c3dfd0733"
    },
    {
      icon: <Beef size={32} aria-hidden />,
      titulo: "Plan Asado",
      monto: "$25.000",
      frecuencia: "/ mes",
      desc: "Un compromiso mayor para escalar el impacto de nuestros programas educativos.",
      cta: "Donar $25.000",
      href: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808497f5fac301980fcc676009d6"
    }
  ];

  return (
    <>
      <header className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-surface-bg">
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-verde/10 px-3 py-1 text-xs uppercase tracking-wider text-verde-dark font-bold mb-6">
                {t("title").split(" · ")[0]}
              </div>
              <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-ink md:text-6xl lg:text-[4rem]">
                {t("heading")}
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-ink-soft max-w-xl">
                {t("subtitle")}
              </p>
            </div>
            
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-surface-line">
              <Image
                src="/fotos/sumate-donar.jpg"
                alt="Donar a Casacusia"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </header>

      <Section id="aportes" background="default" ariaLabelledBy="opciones-title" className="pt-20">
        <SectionHeading
          eyebrow="Cómo colaborar"
          title={<span id="opciones-title">Elegí tu nivel de compromiso</span>}
          body="Podés sumarte con una suscripción mensual o realizar una donación por única vez. Todo suma para nuestra misión."
          className="text-center mx-auto"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto items-center">
          {planes.map((plan) => (
            <div
              key={plan.titulo}
              className="relative overflow-hidden rounded-3xl p-8 border border-surface-line bg-surface-card transition-all duration-300 hover:shadow-lg hover:border-brand-teal/50"
            >
              <div className="mt-2 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-tint text-brand-teal">
                {plan.icon}
              </div>
              
              <h3 className="mt-6 font-display text-2xl font-bold">{plan.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{plan.desc}</p>
              
              <div className="mt-6 mb-8 flex items-baseline gap-1">
                <span className="font-display text-4xl md:text-5xl font-bold">{plan.monto}</span>
                <span className="text-sm font-medium text-ink-muted">{plan.frecuencia}</span>
              </div>

              <Button
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="w-full justify-center"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808496d9dcdf0196ea4156350735" target="_blank" rel="noopener noreferrer" variant="ghost">
            <Heart size={18} className="mr-2" />
            Suscripción personalizada
          </Button>
          <Button href="http://link.mercadopago.com.ar/casacusia" target="_blank" rel="noopener noreferrer" variant="ghost">
            <DollarSign size={18} className="mr-2" />
            Donación por única vez
          </Button>
        </div>
      </Section>

      {/* Galería de Impacto */}
      <Section background="tint" ariaLabelledBy="impact-title">
         <SectionHeading
          title={<span id="impact-title">Impacto en la comunidad</span>}
          body="Tu aporte se traduce en encuentros, talleres y una red de contención que no para de crecer."
          className="text-center"
        />
        
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
          {fotosImpacto.map((foto, index) => (
            <div 
              key={foto} 
              className={`relative rounded-2xl overflow-hidden group ${
                index === 1 || index === 4 ? "md:col-span-2" : ""
              }`}
            >
              <Image
                src={foto}
                alt="Impacto Casacusia"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </Section>

      <Section background="default" className="pt-10 pb-20">
        <div className="max-w-5xl mx-auto rounded-2xl bg-surface-tint p-8 md:p-12 border border-surface-line">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs uppercase tracking-wider text-ink font-semibold shadow-sm mb-4">
                <Building2 size={14} aria-hidden /> Empresa
              </div>
              <h2 id="arca-title" className="font-display text-3xl font-bold leading-tight text-ink">
                Sumá tu empresa a nuestra misión
              </h2>
              <p className="mt-4 text-ink/90 text-lg">
                Creamos alianzas estratégicas con organizaciones que comparten nuestros valores y quieren generar un impacto social real.
              </p>
              <div className="mt-6">
                <Button href="/sumate/proyectos-juntos" variant="secondary" className="bg-white hover:bg-white/80 border-surface-line shadow-sm">
                  Alianzas corporativas
                </Button>
              </div>
            </div>
            <ul className="rounded-xl bg-white p-6 space-y-4 text-sm text-ink border border-surface-line shadow-sm">
              {[
                "Programas de Responsabilidad Social Empresaria.",
                "Voluntariado corporativo y donación de servicios.",
                "Patrocinio de eventos y materiales educativos.",
                "Beneficios fiscales por donaciones a ONGs."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-brand-teal font-bold mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}

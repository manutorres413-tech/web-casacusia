import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Code2, Scale, Calculator, Video, PenTool, BookOpenText, Home, Coffee } from "lucide-react";

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
  const t = await getTranslations({ locale, namespace: "sumate.donarServicios" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/sumate/donar-servicios",
    locale: locale as Locale
  });
}

export default async function DonarServiciosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const necesidades = [
    { icon: <Code2 size={20} aria-hidden />, title: "Tecnología", desc: "Desarrollo web, automatización y herramientas digitales." },
    { icon: <Scale size={20} aria-hidden />, title: "Legal", desc: "Asesoramiento para fundaciones y convenios institucionales." },
    { icon: <Calculator size={20} aria-hidden />, title: "Contable", desc: "Auditoría, balances y gestión administrativa." },
    { icon: <Video size={20} aria-hidden />, title: "Audiovisual", desc: "Edición de video, fotografía y streaming de encuentros." },
    { icon: <PenTool size={20} aria-hidden />, title: "Diseño", desc: "Identidad visual, materiales educativos y UX." },
    { icon: <BookOpenText size={20} aria-hidden />, title: "Editorial", desc: "Redacción, corrección y traducción de contenidos." },
    { icon: <Home size={20} aria-hidden />, title: "Espacios", desc: "Préstamo de salones para encuentros y talleres." },
    { icon: <Coffee size={20} aria-hidden />, title: "Catering", desc: "Servicio de refrigerios para nuestras jornadas presenciales." }
  ];

  return (
    <>
      <PageHero eyebrow="Donar servicios" title="Tu talento al servicio de la comunidad" subtitle="Si sos profesional o tenés una empresa, podés donar tus servicios para potenciar el alcance de la Fundación." />

      <Section background="default" ariaLabelledBy="nec-title">
        <SectionHeading
          eyebrow="Qué necesitamos"
          title={<span id="nec-title">Áreas donde podés aportar</span>}
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {necesidades.map((n) => (
            <li key={n.title} className="rounded-2xl bg-surface-card border border-surface-line p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal-soft text-brand-teal-dark">
                {n.icon}
              </span>
              <p className="mt-4 font-display font-semibold">{n.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{n.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section background="tint" ariaLabelledBy="flow-title">
        <SectionHeading title={<span id="flow-title">¿Cómo es el proceso?</span>} />
        <ol className="grid gap-6 md:grid-cols-4 counter-reset">
          {[
            "Completás el formulario de contacto para empresas/profesionales.",
            "Nos ponemos en contacto para conocer tu propuesta de servicio.",
            "Definimos juntos el alcance y la modalidad de la colaboración.",
            "Formalizamos la alianza y empezamos a trabajar juntos."
          ].map((step, i) => (
            <li key={step} className="rounded-2xl bg-surface-card border border-surface-line p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-white font-bold text-sm">
                {i + 1}
              </span>
              <p className="mt-4 text-ink">{step}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Button href="/contacto?t=empresa">Quiero donar servicios</Button>
        </div>
      </Section>
    </>
  );
}

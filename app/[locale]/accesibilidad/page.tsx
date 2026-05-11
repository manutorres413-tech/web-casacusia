import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: "Accesibilidad · WCAG 2.2 AA",
    description:
      "Cómo CASACUSIA garantiza que esta web sea accesible para personas con hipoacusia y todo tipo de discapacidad.",
    path: "/accesibilidad",
    locale: locale as Locale
  });
}

export default async function AccesibilidadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        eyebrow="Accesibilidad"
        title="Nuestra declaración de accesibilidad"
        subtitle="Como fundación dedicada a una discapacidad, la accesibilidad es para nosotros una promesa y no un extra."
      />
      <Section background="default">
        <div className="prose max-w-3xl space-y-6 text-ink leading-relaxed">
          <p>
            Esta web fue construida siguiendo las <strong>Web Content Accessibility Guidelines (WCAG) 2.2 nivel AA</strong>. Trabajamos para que cualquier persona, con o sin discapacidad, pueda acceder a la información y participar de CASACUSIA.
          </p>
          <h2 className="font-display text-2xl font-semibold">Qué hacemos</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Contraste de color verificado AA en texto y controles.</li>
            <li>Navegación por teclado con foco siempre visible y un enlace de salto al contenido.</li>
            <li>Semántica HTML correcta: encabezados, listas, regiones, formularios etiquetados.</li>
            <li>Tamaños mínimos de toque de 44×44 px en controles.</li>
            <li>Respeto a <code>prefers-reduced-motion</code> para quienes prefieren menos animaciones.</li>
            <li>Textos claros, párrafos cortos, jerga explicada cuando aparece.</li>
            <li>Todos los audios y videos cuentan con subtítulos y transcripción completa.</li>
            <li>Formularios con validación accesible y mensajes anunciados por lectores de pantalla.</li>
          </ul>
          <h2 className="font-display text-2xl font-semibold">Si encontrás una barrera</h2>
          <p>
            Escribinos a <a href="mailto:hola@casacusia.org" className="underline underline-offset-4">hola@casacusia.org</a> y la atendemos lo antes posible. Toda mejora que sugieras nos ayuda a que la web sea más útil para más personas.
          </p>
          <p className="text-sm text-ink-muted">
            Última revisión: {new Date().toLocaleDateString("es-AR", { year: "numeric", month: "long" })}.
          </p>
        </div>
      </Section>
    </>
  );
}

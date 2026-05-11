import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { CheckCircle2, Home, Headphones, ArrowRight } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Filamento } from "@/components/ui/Filamento";

export default async function GraciasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 text-center overflow-hidden">
      {/* Visual background accents */}
      <Filamento name="verde" className="top-20 -right-20 w-80 rotate-[15deg]" opacity={12} />
      <Filamento name="rosa" className="bottom-20 -left-20 w-64 rotate-[-20deg]" opacity={10} />
      <Filamento name="punto-lavanda" className="top-1/3 left-1/4 w-6" opacity={45} />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-verde/10 text-verde shadow-sm border border-verde/20 animate-bounce">
          <CheckCircle2 size={40} />
        </div>
        
        <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-ink leading-tight">
          ¡Gracias por escribirnos!
        </h1>
        
        <p className="mt-8 text-lg md:text-xl text-ink-soft leading-relaxed">
          Recibimos tu mensaje. Somos un equipo pequeño y nos tomamos el tiempo para leer cada consulta con atención. Te responderemos lo antes posible.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/" 
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-8 text-sm font-bold text-white hover:bg-black transition-all shadow-lg active:scale-95 w-full sm:w-auto"
          >
            <Home size={18} />
            Volver al inicio
          </Link>
          
          <Link 
            href="/podcast" 
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-surface-card border border-surface-line px-8 text-sm font-bold text-ink hover:bg-surface-tint transition-all active:scale-95 w-full sm:w-auto"
          >
            <Headphones size={18} />
            Escuchar el podcast
            <ArrowRight size={18} />
          </Link>
        </div>

        <p className="mt-12 text-sm text-ink-muted italic">
          &quot;La hipoacusia no se transita en soledad.&quot;
        </p>
      </div>
    </div>
  );
}

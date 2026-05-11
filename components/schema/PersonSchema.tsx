import type { MiembroEquipo } from "@/lib/content";
import { site } from "@/lib/site";

export function PersonSchema({ miembro }: { miembro: MiembroEquipo }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${miembro.nombre} ${miembro.apellido}`.trim(),
    jobTitle: miembro.rol,
    worksFor: { "@type": "NGO", name: site.legalName, url: site.url },
    ...(miembro.linkedin ? { sameAs: [miembro.linkedin] } : {}),
    ...(miembro.foto ? { image: `${site.url}${miembro.foto}` } : {})
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

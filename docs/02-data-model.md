# Data model · CASACUSIA

Todo el contenido vive como archivos en `content/` del repo. No hay DB. Cada entidad tiene un schema TypeScript en `lib/content.ts` que valida con Zod y un loader que lee los archivos a build-time.

Esto permite:
- SSG completo (súper rápido).
- Versionar contenido con git.
- PRs para editar contenido sin tocar código.
- Bundle chico (solo se cargan los datos que cada página necesita).

---

## Entidades

### Aliado · `content/aliados/[slug].json`

```ts
type Aliado = {
  slug: string;              // "mercadopago"
  nombre: string;            // "MercadoPago"
  logo: string;              // "/images/aliados/mercadopago.svg"
  logoOscuro?: string;       // variante para fondo oscuro
  web?: string;              // "https://mercadopago.com.ar"
  sector: "Fintech" | "Retail" | "Salud" | "Educación" | "Industria" | "Fundación" | "Gobierno" | "Otro";
  tipoAlianza: ("financiera" | "producto" | "servicio" | "institucional" | "comunicacional")[];
  proyectoApoyado: string[]; // slugs de Programa
  impacto: string;           // bullet corto, ej. "Cubrió el equipamiento del podcast en 2025"
  quoteEmpresa?: {
    texto: string;
    autor: string;
    cargo: string;
  };
  quoteCasacusia?: {
    texto: string;
    autor: string;
  };
  fotos?: string[];
  destacado: boolean;        // aparece en hero del hub
  orden: number;
  desde: string;             // "2025-03"
  activo: boolean;
};
```

---

### Episodio de podcast · `content/podcast/[slug].mdx`

MDX con frontmatter.

```ts
type Episodio = {
  slug: string;               // "01-sordo-pero-no-mudo"
  numero: number;
  titulo: string;
  invitado?: {
    nombre: string;
    rol: string;
    linkedin?: string;
    instagram?: string;
  };
  tema: string[];             // tags: ["familia", "diagnóstico", "implante coclear"]
  descripcion: string;        // ~2 párrafos para SEO
  fechaPublicacion: string;   // ISO date
  duracion: string;           // "42:15"
  youtubeId?: string;
  spotifyUrl?: string;
  applePodcastUrl?: string;
  transcripcion: string;      // cuerpo MDX, texto completo
  destacado: boolean;
};
```

---

### Miembro del equipo · `content/equipo/[slug].json`

```ts
type MiembroEquipo = {
  slug: string;
  nombre: string;
  apellido: string;
  rol: string;                // "Directora de Comunicación"
  esFundador: boolean;
  foto: string;
  bioCorta: string;           // 2-3 líneas
  quotePersonal?: string;     // por qué está en CASACUSIA
  linkedin?: string;
  email?: string;
  orden: number;              // para ordenar la grilla
};
```

---

### Voluntario · `content/voluntarios/[slug].json`

```ts
type Voluntario = {
  slug: string;
  nombre: string;             // solo primer nombre ok
  foto: string;
  comision: "comunicacion" | "encuentros" | "podcast" | "red-padres" | "contenido" | "fundraising" | "tecnologia" | "diseno" | "otro";
  rolEnComision?: string;     // "Facilitador de encuentros CABA"
  desde: string;              // ISO date
  ciudad?: string;
};
```

---

### Programa · `content/programas/[slug].json`

```ts
type Programa = {
  slug: string;               // "encuentros"
  titulo: string;
  subtitulo: string;
  resumen: string;            // para cards
  descripcionLarga: string;   // MDX opcional en content/programas/[slug].mdx
  lider?: string;             // slug de MiembroEquipo
  categorias: ("comunidad" | "herramientas" | "sociedad")[];
  cta: {
    label: string;
    href: string;
  };
  imagenHero?: string;
  estadisticas?: { valor: string; etiqueta: string }[];
  destacado: boolean;
  orden: number;
};
```

---

### Evento / encuentro · `content/eventos/[slug].json`

```ts
type Evento = {
  slug: string;
  titulo: string;
  tipo: "presencial" | "virtual";
  programa: string;           // slug de Programa
  ciudad?: string;
  direccion?: string;
  googleMapsUrl?: string;
  fechaInicio: string;        // ISO datetime
  fechaFin: string;
  cupo?: number;
  linkInscripcion?: string;
  linkLuma?: string;
  estado: "proximo" | "realizado" | "cancelado";
};
```

---

### Artículo de blog · `content/blog/[slug].mdx`

```ts
type ArticuloBlog = {
  slug: string;
  titulo: string;
  subtitulo?: string;
  autor: string;              // slug de MiembroEquipo
  fechaPublicacion: string;
  fechaActualizacion?: string;
  categoria: "diagnostico" | "dispositivos" | "comunidad" | "legales" | "familia" | "salud-mental" | "testimonios";
  tags: string[];
  resumen: string;            // 2-3 líneas
  imagenDestacada: string;
  tiempoLectura: number;      // minutos estimados
  cuerpo: string;             // MDX
  pilar: boolean;             // artículos pilar (1500+ palabras)
  destacado: boolean;
};
```

---

### FAQ · `content/faq.json`

```ts
type FAQItem = {
  id: string;
  pregunta: string;
  respuesta: string;          // markdown corto
  categoria: "general" | "hipoacusia" | "dispositivos" | "obras-sociales" | "familia" | "donar";
  orden: number;
  destacada: boolean;         // aparece en home o landings
};
```

---

### Reconocimiento · `content/reconocimientos.json`

```ts
type Reconocimiento = {
  titulo: string;              // "Declarada de interés social"
  organismo: string;           // "Legislatura de Misiones"
  fecha: string;
  descripcion: string;
  documentoUrl?: string;
  logo?: string;
};
```

---

### Testimonio · `content/testimonios.json`

```ts
type Testimonio = {
  id: string;
  texto: string;
  autor: string;               // "Perla" o "Anónimo"
  ubicacion?: string;          // "Chile"
  contexto?: string;           // "Mamá de Emilio, adolescente con hipoacusia bilateral"
  destacado: boolean;
  origen?: "podcast" | "encuentro" | "instagram" | "mail";
};
```

---

### Impacto (stats) · `content/impacto.json`

```ts
type ImpactoStats = {
  participantesTotales: number;
  encuentrosRealizados: number;
  ciudadesAlcanzadas: number;
  padresEnRed: number;
  episodiosPodcast: number;
  voluntariosActivos: number;
  horasDonadasAnuales: number;
  ultimaActualizacion: string; // ISO date
};
```

---

### Translations · `messages/es.json` + `messages/en.json`

Estructura compartida (next-intl):
```ts
{
  "common": { "donar": "Donar", "sumate": "Sumate", ... },
  "nav": { ... },
  "home": { "heroTitle": "...", ... },
  "nosotros": { ... },
  "sumate": { ... },
  "contacto": { ... },
  "a11y": { "skipToContent": "..." }
}
```

---

## Loaders (en `lib/content.ts`)

```ts
// Ejemplos de API
getAliados({ destacados?: boolean }): Aliado[]
getAliadoBySlug(slug: string): Aliado | null
getEpisodios({ limit?: number, destacados?: boolean }): Episodio[]
getEpisodioBySlug(slug: string): Episodio | null
getEquipo(): MiembroEquipo[]
getVoluntarios({ comision?: Comision }): Voluntario[]
getComisionesConConteo(): { comision: Comision; count: number }[]
getProgramas({ categoria?: Categoria }): Programa[]
getProximosEventos({ limit?: number }): Evento[]
getArticulosBlog({ pilar?: boolean, limit?: number }): ArticuloBlog[]
getFAQs({ categoria?: string }): FAQItem[]
getImpactoStats(): ImpactoStats
getTestimonios({ destacados?: boolean }): Testimonio[]
```

Todos los loaders son síncronos (leen JSON/MDX a build time), usan Zod para validar y tiran errores explícitos si el contenido está mal formado.

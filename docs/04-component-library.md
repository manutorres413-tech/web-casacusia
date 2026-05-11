# Component library · CASACUSIA

## Filosofía

- **RSC first**: los componentes de sección son Server Components por default. Solo se marcan `"use client"` los que necesitan interactividad real (filtros, forms, menú mobile, carousels accesibles).
- **Tailwind + tokens**: cero CSS-in-JS. Variables CSS del `styles/tokens.css` + clases Tailwind que las consumen vía `tailwind.config.ts`.
- **Headless primitives**: usamos Radix / Ark-UI donde haga falta semántica y accesibilidad (Accordion, Dialog, Tabs).
- **Sin librerías pesadas**: nada de Framer Motion en páginas de alto tráfico; animaciones con CSS si se pueden.

---

## UI primitivos · `components/ui/`

| Componente | Props clave | Notas de a11y |
|---|---|---|
| `Button` | `variant`, `size`, `asChild`, `href` | focus ring, disabled state, min-height 44px |
| `Card` | `variant`, `as` | `role="article"` cuando aplica |
| `Tag` | `variant`, `children` | | 
| `Accordion` (Radix) | `items[]` | aria nativo de Radix |
| `Dialog` (Radix) | | focus trap nativo |
| `LinkExternal` | `href`, `children` | icono + `rel="noopener"` |
| `VisuallyHidden` | `children` | para labels invisibles |
| `Icon` | `name`, `size`, `label` | lucide-react con aria-label |

---

## Layout · `components/layout/`

### `Header`
- Sticky con `backdrop-blur` opcional (degrada bien sin soporte).
- Logo CASACUSIA + nav primario (Nosotros, Programas, Podcast, Aliados, Impacto, Sumate, Contacto).
- Botón "Donar" **siempre visible** (también en mobile).
- `LangSwitcher` (ES/EN).
- Menú mobile full-screen accesible (Dialog de Radix, focus trap, cierre con Esc).
- Skip-link al contenido principal (primer elemento del DOM).

### `Footer`
- Columna 1: sobre CASACUSIA + misión corta.
- Columna 2: navegación (Programas, Nosotros, Sumate, Impacto, Recursos, Prensa, Contacto).
- Columna 3: canales (Instagram, TikTok, LinkedIn, YouTube, Facebook, WhatsApp, Spotify, Apple Podcasts).
- Columna 4: datos legales (CUIT, personería, ARCA, dirección, mail).
- Fila inferior: © 2026 · link a Accesibilidad · link a Privacidad.
- **Todos los links funcionan**. Nada de `#` o 404.

### `LangSwitcher`
- Links a la misma ruta en el otro locale.
- Usa `useLocale` + `usePathname` de next-intl.
- Marca el locale activo con `aria-current="page"`.

---

## Secciones · `components/sections/`

### `Hero` (Home)
- Título grande: _"No estás solo. En Argentina somos más de 2 millones."_
- Subtítulo: copy de misión.
- 3 CTAs visibles: **Sumate a la comunidad** (primario) · Conocé los programas · Doná.
- Fondo cálido con imagen ligera opcional (con `<Image priority>`).
- Accesible: H1 único en la página, CTAs con texto descriptivo.

### `PathCards`
- 3 cards para Home: "Tengo hipoacusia" · "Acompaño a alguien" · "Quiero aliarme".
- Cada una linkea a su ruta dedicada.
- Cards grandes, clickeables en toda la superficie (`<a>` envolvente).

### `TrustBar`
- Lista horizontal de sellos: ARCA · Misiones · Posadas · Mendoza · medios destacados.
- Tagline: "Declarada de interés social y con ARCA para deducción de Ganancias".
- Degrada a wrap en mobile.

### `AllyGrid`
- Home: grilla de 12-16 logos destacados con link a `/aliados/`.
- Página `/aliados/`: grilla completa de 29, clickeables a `/aliados/[marca]/`.
- Hover: logo pasa de grayscale a color + muestra sector.
- Cada logo `<Image>` con `alt` descriptivo (`"Logo de MercadoPago"`).

### `EjesYProgramas`
- 3 ejes (Comunidad · Herramientas · Sociedad) — cada uno agrupa programas.
- Cards internas linkean a las landings de programa.

### `ImpactStats`
- 5 números grandes con etiqueta: +600 participantes · 20+ encuentros · 7 ciudades · 220 padres · 60 episodios.
- Animación opcional de contador al entrar en viewport (solo si no hay `prefers-reduced-motion`).

### `Testimonial`
- Quote grande + nombre + ubicación + contexto opcional.
- Carousel accesible (Radix / headless) para varios testimonios.
- Fix bug actual de repetición ×3.

### `ProximoEncuentroCard`
- Próximo evento destacado: ciudad · fecha · hora · CTA inscripción.
- Lee de `getProximosEventos({ limit: 1 })`.
- Si no hay evento, esconde la sección entera.

### `EpisodiosUltimos`
- Lista últimos 6 episodios con card: imagen + título + invitado + duración.
- Link a `/podcast/[slug]/` (NO a YouTube).
- CTA global a `/podcast/`.

### `CuatroCaminosSumate`
- 4 cards equivalentes: Donar · Voluntario · Proyectos juntos · Donar servicios.
- No jerarquizar "donar" por encima — son entradas para perfiles distintos.
- En Home aparecen como sección; en `/sumate/` como hub.

### `VoluntariadoDestacado`
- "+X voluntarios en Y equipos" + collage de fotos.
- Link a `/sumate/voluntariado/`.
- Social-proof puro, sin CTA de captación.

### `NewsletterForm`
- Nombre + email + consentimiento.
- Server action con validación Zod + honeypot + rate-limit.
- Mensajes de éxito/error accesibles (`role="status"`).

---

## Página-específicos

### `/sumate/voluntariado/` · `VolunteerGrid` + `ComisionFilter`
- Grid responsive de voluntarios (card con foto + primer nombre + comisión).
- Filtro por comisión (Client Component). Al seleccionar una comisión, filtra sin recargar.
- Indicadores de conteo por comisión.
- Card con nota: "hoy estamos con el equipo completo, dejá tus datos para cuando abramos".

### `/nosotros/equipo/` · `TeamGrid`
- Grid de MiembroEquipo: foto, nombre, rol, bio, LinkedIn.
- Schema JSON-LD Person por cada uno.

### `/aliados/[marca]/` · `AliadoDetailPage`
- Hero con logo + nombre + sector.
- Qué apoyó (lista de programas).
- Quote doble (empresa ↔ CASACUSIA).
- Fotos.
- Link al sitio web del aliado (rel=noopener).
- Mini-grid "otros aliados del mismo sector" al final.

### `/podcast/[slug]/` · `EpisodeDetailPage`
- Hero con título + invitado + fecha + duración.
- Player embebido (Spotify o YouTube — cliente).
- Transcripción completa (MDX renderizado) — clave para GEO y accesibilidad.
- CTAs: escuchar en Spotify · Apple · YouTube.
- Episodios relacionados.
- Schema PodcastEpisode JSON-LD.

---

## Schema · `components/schema/`

Server Components que sueltan `<script type="application/ld+json">`:

- `OrganizationSchema` — root layout. Con `founder`, `member[]`, `sameAs`, `areaServed: AR`, `award[]`.
- `PersonSchema` — páginas de equipo, artículos firmados.
- `FAQSchema` — FAQs de `/recursos/faq/` y landings.
- `PodcastSeriesSchema` — `/podcast/`.
- `PodcastEpisodeSchema` — `/podcast/[slug]/`.
- `BreadcrumbSchema` — todas las páginas no-home.
- `EventSchema` — próximos encuentros.

---

## Performance guardrails

- Imágenes: siempre `next/image` con `sizes` correcto. Hero con `priority`. Logos SVG.
- Fuentes: `next/font` con `display: swap` + subset.
- Evitar librerías client-side pesadas. Animaciones con CSS/Tailwind.
- Carousel solo si es necesario; nunca en el hero.
- Embeds de YouTube con iframe lazy + `loading="lazy"` o `<lite-youtube>` patrón.

---

## Wireframe del Home (resumen · detalle en brief sección 12)

1. Header
2. Hero
3. 3 PathCards por audiencia
4. Esencia (frase fuerza + video Lucas 40")
5. Barra de confianza
6. AllyGrid (12-16 destacados)
7. Ejes + Programas
8. ImpactStats
9. Testimonial
10. Próximo encuentro
11. Últimos 6 episodios del podcast
12. Blog destacado (3 artículos)
13. 4 caminos Sumate
14. Voluntariado destacado
15. Newsletter
16. Footer

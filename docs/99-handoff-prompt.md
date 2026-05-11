# Handoff prompt maestro para Claude Code / otros agentes

> Este es el prompt maestro que se pasa a Claude Code (o cualquier agente) para construir la web de CASACUSIA a partir de las specs de este repo.

---

## Contexto

Vas a construir `casacusia.org` v2, la nueva web de la Fundación CASACUSIA (Argentina). Todas las decisiones estratégicas ya están tomadas y documentadas en `docs/` de este repo. Tu rol es construir el sitio Next.js siguiendo esas specs **sin inventar producto, copy ni estructura**. Si falta información, PREGUNTÁ antes de asumir.

## Fuente de verdad (por orden de prioridad)

1. `docs/00-brief-final.md` — documento maestro.
2. `docs/01-sitemap.json` — estructura del sitio.
3. `docs/02-data-model.md` — entidades y loaders.
4. `docs/03-design-tokens.json` — tokens (hasta recibir el manual de marca oficial).
5. `docs/04-component-library.md` — inventario de componentes.
6. `docs/05-seo-map.md` — title/meta/schema por página.
7. `docs/06-geo-faq.md` — FAQs para schema FAQPage.
8. `docs/pages/*.md` — copy final por página.

## Stack obligatorio (cerrado por Lucas)

- Next.js 15 (App Router, RSC, Server Actions)
- TypeScript estricto
- Tailwind CSS + variables CSS de los tokens
- `next-intl` (ES default, EN estructural; traducciones EN se completan en Ola 3)
- Contenido como JSON + MDX en `content/`. **No usar DB.**
- Formularios: React Hook Form + Zod + Server Actions + honeypot
- Hosting: Vercel
- Lucide-react para iconos

## Convenciones no negociables

- **Server Components por default**. `"use client"` sólo cuando se requiera interactividad real.
- **Accesibilidad WCAG 2.2 AA** desde el día 1. Tests con `axe-core` en CI.
- **SEO + GEO** desde el día 1: sitemap dinámico, robots, llms.txt, JSON-LD Organization en root.
- **Sin comentarios narrativos** en código. Los comentarios sólo explican intención no evidente.
- **Sin `any`**. Todas las props tipadas.
- **No instalar librerías pesadas** sin justificación. Lista aprobada: next, react, next-intl, zod, react-hook-form, @radix-ui/*, lucide-react, clsx, tailwind-merge, gray-matter, remark/rehype plugins específicos.
- **Core Web Vitals**: LCP <2.5s, INP <200ms, CLS <0.1. Imágenes con `next/image`, fuentes con `next/font`.

## Olas de construcción

- **Ola 1 (fundacional)**: Home, Nosotros + Equipo + Legal, Sumate (4), Contacto, Header/Footer, Programas hub con landings básicas, SEO base, i18n base.
- **Ola 2 (contenido + autoridad)**: Podcast integrado con transcripción, Blog con 8–12 pilares, FAQ con FAQPage schema, 29 fichas de Aliados, Impacto (memoria + reconocimientos), Prensa.
- **Ola 3 (escala)**: traducciones EN completas, guías PDF, mapa interactivo de encuentros, `/accesibilidad/`, tuning GEO.

## Lo que NO se muestra

CUSI, Registro Dinámico, Talleres, Comisiones internas, Familia CASACUSIA como programa dedicado, modal de onboarding.

## Flujo de handoff

1. Trabajar en la rama `main` mientras sea Ola 1 inicial y el repo esté vacío.
2. A partir de PRs: rama `feat/*` con commits atómicos.
3. No commitear secretos. Variables en `.env.local` + `.env.example`.
4. Parches Ola 0 documentados en `README.md` para que Lucas los aplique al WordPress actual en paralelo.

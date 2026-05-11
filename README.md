# CASACUSIA · Nueva web 2026

Rediseño de [casacusia.org](https://casacusia.org) sobre **Next.js 15 App Router + TypeScript + Tailwind + next-intl**, con contenido versionado en el repo (JSON/MDX) y despliegue en **Vercel**.

> Este repo reemplaza progresivamente al WordPress actual. Ola 1 es un salto de calidad en UX, accesibilidad y SEO/GEO, sin dependencias de base de datos.

---

## 🗂 Estructura

```
web-casacusia/
├── app/
│   ├── [locale]/              # Rutas localizadas (es default, en como prefijo)
│   │   ├── layout.tsx         # Layout raíz con Header/Footer, i18n, schema Organization
│   │   ├── page.tsx           # Home (wireframe Sección 12)
│   │   ├── nosotros/          # Quiénes somos, equipo, historia, legal
│   │   ├── programas/         # Hub + landings por programa
│   │   ├── podcast/           # Serie + episodios
│   │   ├── aliados/           # Grilla + landings por aliado
│   │   ├── sumate/            # 4 caminos: donar, voluntariado, proyectos, servicios
│   │   ├── impacto/           # Memoria + reconocimientos
│   │   ├── recursos/faq/      # FAQPage con JSON-LD
│   │   ├── contacto/          # Formulario segmentado + server action
│   │   └── accesibilidad/     # Declaración WCAG 2.2 AA
│   ├── api/newsletter/        # Endpoint newsletter con rate-limit
│   ├── sitemap.ts             # Sitemap dinámico con hreflang
│   ├── robots.ts              # robots.txt
│   └── not-found.tsx          # 404 global
├── components/
│   ├── ui/                    # Primitivos (Button, Section, Card, Tag, PageHero…)
│   ├── layout/                # Header, Footer, LangSwitcher, Logo
│   ├── sections/              # Bloques de página (Hero, AllyGrid, ImpactStats…)
│   └── schema/                # JSON-LD (Organization, Person)
├── content/                   # Contenido versionado en JSON/MDX
│   ├── aliados.json           # 29 aliados
│   ├── equipo.json            # Núcleo del equipo
│   ├── voluntarios.json       # Voluntarios por comisión
│   ├── programas.json         # Programas CASACUSIA
│   ├── eventos.json           # Próximos y realizados
│   ├── podcast.json           # Episodios Sordo pero no mudo
│   ├── testimonios.json
│   ├── impacto.json           # KPIs
│   ├── faq.json               # Preguntas frecuentes
│   └── reconocimientos.json
├── docs/                      # Especificación Fase 1 (la fuente de la verdad)
│   ├── 00-brief-final.md
│   ├── 01-sitemap.json
│   ├── 02-data-model.md
│   ├── 03-design-tokens.json
│   ├── 04-component-library.md
│   ├── 05-seo-map.md
│   ├── 06-geo-faq.md
│   ├── pages/                 # Copy final de páginas clave
│   └── 99-handoff-prompt.md   # Prompt master para futuros agentes
├── lib/
│   ├── i18n/                  # next-intl config, request, navigation
│   ├── content.ts             # Zod schemas + loaders del contenido
│   ├── seo.ts                 # buildMetadata helper
│   ├── site.ts                # Configuración global (URLs, emails, legales)
│   └── utils/cn.ts            # clsx + tailwind-merge
├── messages/                  # Traducciones UI
│   ├── es.json
│   └── en.json
├── public/                    # Estáticos
│   └── llms.txt               # Guía para modelos de IA
├── styles/tokens.css          # Variables CSS de diseño
├── middleware.ts              # Middleware de next-intl
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Empezar a desarrollar

### Requisitos

- Node.js **20+** (Cursor ya viene con Node, pero conviene tener `npm` global)
- Un editor con soporte TypeScript (Cursor, VS Code)

### Instalación

```bash
cd web-casacusia
npm install
cp .env.example .env.local     # completar NEXT_PUBLIC_SITE_URL y demás
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

### Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Dev server con hot reload |
| `npm run build` | Build de producción |
| `npm run start` | Levantar el build de producción |
| `npm run lint` | ESLint sobre `app/`, `components/`, `lib/` |
| `npm run typecheck` | `tsc --noEmit` (strict) |

### Variables de entorno

Ver `.env.example`. En Ola 1 solo es obligatorio `NEXT_PUBLIC_SITE_URL`. El resto (email, analytics, anti-spam) se activa en olas posteriores.

---

## 🧱 Estado por olas

### Ola 0 · WordPress actual (parches pendientes)

Mientras sale esta web nueva, el WP legacy queda prolijo con los siguientes parches:

- [ ] Eliminar/ocultar la sección **Voluntariado** con CTA activo (hoy no captamos; redirigir a `/sumate`).
- [ ] Unificar **Partners** en una sola grilla homogénea con logos al mismo tamaño.
- [ ] Reemplazar las tarjetas de **"Proyectos"** por la bajada `Comunidad · Herramientas · Sociedad`.
- [ ] Arreglar enlaces rotos a Instagram/redes y el **Linktree** del podcast.
- [ ] Subir el comprobante ARCA y las declaraciones de interés a una sola página `/impacto/reconocimientos`.
- [ ] Suspender formularios que hoy no se atienden (prensa, charlas) hasta que existan equivalentes en esta web.

Estos parches los aplica el equipo del WP actual. Esta web no depende de ellos.

### Ola 1 · Fundacional (este commit)

**Meta:** que casacusia.org levante con la web nueva.

- [x] Scaffolding Next.js 15, TS strict, Tailwind, ESLint
- [x] Design tokens + fuentes `next/font`
- [x] i18n con `next-intl` (es default, en wave 2)
- [x] Header/Footer accesibles, skip-link, botón Donar siempre a mano
- [x] Home completa (wireframe Sección 12)
- [x] `/nosotros` + `/equipo` + `/historia` + `/legal`
- [x] `/sumate` hub + `donar` + `voluntariado` (sin captación activa) + `proyectos-juntos` + `donar-servicios`
- [x] `/contacto` segmentado con server action, honeypot, rate-limit, zod
- [x] Stubs de `/programas`, `/podcast`, `/aliados`, `/impacto`, `/recursos/faq`, `/accesibilidad`
- [x] Sitemap dinámico, `robots.ts`, `llms.txt`
- [x] JSON-LD Organization NGO global + Person en `/equipo`
- [x] `buildMetadata` con Open Graph y hreflang por página

### Ola 2 · Contenido profundo

- [ ] Blog MDX en `/recursos/blog` (Zod schema ya existe)
- [ ] Episodios de podcast con transcripción completa (página detalle ya hecha, falta contenido)
- [ ] Landings por aliado completas con historias
- [ ] FAQ extendida + pillar articles
- [ ] Memoria anual 2025 + reconocimientos con PDFs
- [ ] Proveedor de newsletter real (Resend / Buttondown)
- [ ] Analytics privacy-friendly (Plausible o Umami)

### Ola 3 · Internacional + afinado

- [ ] Traducciones EN completas (hoy están los strings de UI, falta copy largo)
- [ ] Auditoría Lighthouse 95+ en todas las métricas
- [ ] Declaración de accesibilidad revisada por persona con hipoacusia
- [ ] CI (GitHub Actions) con `lint` + `typecheck` + `build` en cada PR
- [ ] Previews por PR vía Vercel

---

## 🎨 Sistema de diseño

El sistema vive en **tres archivos**, en este orden de autoridad:

1. `docs/03-design-tokens.json` → fuente canónica (todavía **placeholder** hasta que lleguen los tokens oficiales del Manual de Identidad Gráfica de CASACUSIA: [bit.ly/IdentidadGraficaCASACUSIA](https://bit.ly/IdentidadGraficaCASACUSIA)).
2. `styles/tokens.css` → variables CSS `--color-*`, `--radius-*`, `--motion-*`.
3. `tailwind.config.ts` → mapea esas variables a clases utilitarias (`bg-brand-teal`, `text-ink-soft`, etc.).

Cuando entreguen los tokens oficiales: actualizar (1), luego (2), (3) se regenera solo.

### Accesibilidad (WCAG 2.2 AA) — checklist

- [x] `html[lang]` correcto en cada request
- [x] Skip-link al inicio del `<body>`
- [x] Contraste AA en los pares de colores principales (documentado en `docs/03-design-tokens.json → color.contraste`)
- [x] Foco visible con ring sobre todos los interactivos
- [x] Controles con tamaño mínimo 44×44 px
- [x] `aria-label` en nav, botón menú mobile, switcher de idioma
- [x] Formularios con `<label>` explícito, mensajes de error asociados y rate-limit
- [x] `aria-expanded` / `aria-controls` en el menú mobile
- [x] Respeto a `prefers-reduced-motion`
- [x] JSON-LD válido (probar en [Rich Results Test](https://search.google.com/test/rich-results))

Objetivo verificable: **Lighthouse Accessibility ≥ 95** en Home. Correr:

```bash
npm run build && npm run start
npx lighthouse http://localhost:3000 --only-categories=accessibility --view
```

---

## 🧭 Convenciones no negociables

Sacadas de `docs/99-handoff-prompt.md`. Antes de abrir un PR:

1. **RSC first**: solo pasar a `"use client"` cuando hay estado, eventos o APIs de navegador.
2. **Server Actions** para toda escritura. Nada de API routes para forms.
3. **Contenido en `content/*.json` o MDX**, nunca hardcodeado en los componentes.
4. **Tokens de diseño** vía Tailwind + CSS vars. Nada de colores hex sueltos.
5. **Accesibilidad** desde el diseño, no como parche.
6. **SEO/GEO** obligatorio: cada página usa `buildMetadata` y, si aplica, un bloque de JSON-LD.
7. **Sin JS innecesario**: animaciones sutiles, respeto a `prefers-reduced-motion`.
8. **Commits en español**, conventional style (`feat:`, `fix:`, `docs:`, `chore:`).

---

## 🤖 Handoff para futuros agentes (Claude Code u otros)

Si te pasan este repo para trabajar:

1. **Leé primero** `docs/99-handoff-prompt.md`. Ahí está el contexto completo.
2. **Mirá las olas** arriba. No adelantes trabajo de una ola futura sin avisar a Lucas/Manu.
3. **No toques** los archivos de `docs/` salvo para corregir erratas — son el contrato.
4. **Antes de agregar deps** confirmá con el equipo. Preferimos cero dependencias sobre mil.
5. **Si rompés tipos**, rompés el build. No bypasses con `any` o `@ts-ignore`.
6. **Probá en mobile** siempre. El 70%+ del tráfico es celular.

### Stack de decisión rápida

- ¿Necesito estado? → Client Component.
- ¿Es estático o de build? → Server Component + `generateStaticParams`.
- ¿Formulario? → Server Action + Zod + honeypot + rate-limit.
- ¿Nuevo texto? → Agregalo a `messages/*.json`, no lo hardcodees.
- ¿Nuevo contenido? → JSON en `content/` + schema Zod en `lib/content.ts`.

---

## 🔗 Enlaces útiles

- Sitio actual (WP): [casacusia.org](https://casacusia.org)
- Instagram: [@casacusia](https://instagram.com/casacusia)
- Manual de identidad: [bit.ly/IdentidadGraficaCASACUSIA](https://bit.ly/IdentidadGraficaCASACUSIA)
- Repo: [github.com/lucasadlerstein/web-casacusia](https://github.com/lucasadlerstein/web-casacusia)

---

**Transitando juntos la hipoacusia.** 🧡

# Brief final · CASACUSIA · Nueva web 2026

> Versión markdown y accionable del brief v2 (`analisis_web_casacusia.html`) + Info institucional CASACUSIA + Hoja de Proyectos.
> Este es el documento maestro. Todos los demás (sitemap, data model, copy por página, seo-map) derivan de acá.

---

## 1. Quiénes somos

**CASACUSIA** es una Fundación Argentina creada en enero de 2025 para acompañar a personas con hipoacusia desde una mirada centrada en las personas, no en los oídos.

- **Misión**: Mejorar la vida de las personas con pérdida auditiva transformando su relación con la hipoacusia.
- **Visión**: Ser el motor de un movimiento inspirador que acompañe a las personas con pérdida auditiva a mejorar su calidad de vida, promoviendo una sociedad más consciente y solidaria.
- **Frase fuerza**: _"La discapacidad no es el silencio, es la soledad."_
- **Fundador**: Lucas Adlerstein (perdió la audición a los 15 años).
- **Valores**: Apoyo mutuo · Innovación · Simpleza · Transparencia · Respeto · Pureza · Empatía.

### Tres capas del modelo de intervención

1. **Comunidad y pertenencia** — encuentros presenciales y virtuales.
2. **Información y herramientas** — contenidos accesibles, podcast, recursos.
3. **Concientización e incidencia** — charlas, campañas, trabajo con empresas e instituciones.

---

## 2. Objetivo de la nueva web

No es un rediseño cosmético. Es un **reordenamiento** del capital que la web actual ya tiene pero no muestra.

### Metas concretas

1. **Arreglar lo que está roto** (3 CTAs principales fallidos, stats en "0", bug de testimonios x3).
2. **Hacer visible lo oculto** — equipo, voluntariado, 29 aliados corporativos, reconocimientos (ARCA, declaraciones de interés en Misiones, Posadas, Mendoza).
3. **Abrir caminos por audiencia** — persona con hipoacusia, familiar, empresa/institución.
4. **Capturar búsquedas SEO + GEO** (ChatGPT, Claude, Perplexity, Google AI Overviews).
5. **Base escalable** para los próximos 3 años (blog, podcast integrado, press kit, i18n ES/EN).

### KPIs de éxito a 6 meses

| Métrica | Hoy | Meta |
|---|---|---|
| URLs indexadas | 5 | 60+ |
| Posts de blog | 0 | 8–12 pilares |
| Episodios de podcast con URL propia + transcripción | 0 | 60+ |
| Aliados clickeables con ficha | 0 | 29 |
| Core Web Vitals (Home) | no medido | LCP <2.5s · INP <200ms · CLS <0.1 |
| Lighthouse A11y | no medido | ≥ 95 |
| Citas en respuestas de IA al buscar "hipoacusia Argentina" | 0 | ≥ 1 |

---

## 3. Stack técnico (cerrado)

- **Framework**: Next.js 15 (App Router, RSC, Server Actions)
- **Lenguaje**: TypeScript estricto
- **Estilos**: Tailwind CSS + design tokens del manual de marca
- **i18n**: `next-intl` — `es` primario, `en` en olas (sitio bilingüe desde día 1, EN se completa progresivamente)
- **Contenido**: JSON + MDX en el repo (sin DB al arranque). Si después hace falta CMS, evaluamos Sanity headless.
- **Forms**: React Hook Form + Zod + Server Actions + honeypot
- **Hosting**: Vercel (free tier)
- **Analytics**: Plausible o Umami (privacy-friendly) — decisión en Ola 1
- **Optimización imágenes**: `next/image` con WebP/AVIF. Input ya comprimido a <200 KB por pasada previa de optimizilla.
- **Accesibilidad**: WCAG 2.2 AA desde el diseño (no al final).

---

## 4. Alcance · qué entra y qué queda fuera

### Entra en esta versión (Olas 1-3)

| Página / feature | Ola |
|---|---|
| Home rediseñado con caminos por audiencia | 1 |
| `/nosotros/` + `/nosotros/equipo/` + `/nosotros/historia/` + `/nosotros/legal/` | 1 |
| `/sumate/` (donar · voluntariado · proyectos-juntos · donar-servicios) | 1 |
| `/contacto/` segmentado | 1 |
| SEO base + Schema.org + sitemap dinámico + robots + llms.txt | 1 |
| `/programas/` hub + landings enviables por proyecto | 1-2 |
| `/podcast/` integrado al dominio con episodio por URL + transcripción | 2 |
| `/aliados/` hub + ficha por marca (29) | 2 |
| `/impacto/` (memoria, balance, reconocimientos) | 2 |
| `/recursos/blog/` activado con pilares | 2 |
| `/recursos/faq/` con FAQPage schema | 2 |
| `/prensa/` press kit | 2 |
| `/accesibilidad/` declaración WCAG 2.2 AA | 3 |
| `/en/` versión inglés completa | 3 |
| Mapa interactivo de encuentros | 3 |

### Queda fuera (por decisión explícita de Lucas)

- **CUSI** (asistente virtual) — existe internamente, no se comunica aún.
- **Registro Dinámico de Hipoacusia** — en fase interna.
- **Talleres y ciclos** — no listos para exposición pública.
- **Comisiones internas** — no se muestran como organigrama público.
- **Familia CASACUSIA** como programa dedicado.
- **Modal de onboarding por tipo de visitante** — fricciona de entrada, descartado.

---

## 5. Los 4 caminos de "ser parte"

Decisión clave: la web muestra **4 entradas equivalentes**, no solo "donar" o "voluntariado".

| Camino | Para quién | CTA |
|---|---|---|
| 01 · Donar | Particulares y empresas | Mensual + one-off + USD + ARCA deducible |
| 02 · Ser voluntario | Personas que quieren sumarse | Vitrina + lista de espera (hoy sobrecupo) |
| 03 · Hacer proyectos juntos | Empresas, ONGs, instituciones, académicos | Formulario segmentado |
| 04 · Donar servicios | Pro-bono, producto, infraestructura, horas profesionales | Ejemplos de lo que ya donan aliados |

---

## 6. Aliados · activo oculto más grande

29 logos en el carrusel del home de WordPress, hoy sin link ni historia. Estrategia: **`/aliados/` hub + una ficha `/aliados/[marca]/` por cada uno**, con doble narrativa (qué permitió la empresa + qué le dio CASACUSIA de visibilidad por acción social).

Destacados para hero del hub: MercadoPago · Carrefour · Arcos Dorados · Tecnosalud · MEDEL Latam · Marval · Helen Diller Foundation.

Lista completa (29): Marval, Helen Diller Foundation, Instituto Superior de Otorrinolaringología, DoctoRed, FIME Bastidores, ONG Las Ilusiones, Parque de Innovación, Perfect Print, PSA, Via Cotone, Zafran, Arcos Dorados, MODO, Pax Assistance, Infinidad, Amplitone Pediátrico, CALM es simple, Pinturas Eterna, Mimo y Co, MercadoPago, Carrefour, Topper, Filgo, Cabrales, Tecnosalud, MEDEL Latam, PAM Argentina, A20 Indumentaria, Basani, CASSAN Pinceles, CIC.

> Son 31 en la lista; validar con Lucas cuáles son aliados activos vs referencias históricas. El brief habla de 29.

---

## 7. Equipo vs Voluntariado · dos secciones distintas

### `/nosotros/equipo/` (núcleo)
Rama, Ari, Valen, Melu, Toto, Nico, Manu, Shari, Lucas.
Foto + rol + bio 2-3 líneas + LinkedIn + frase personal opcional.
Schema `Person` + Organization con `founder` y `member`.

### `/sumate/voluntariado/` (comunidad más amplia)
Galería con foto + nombre + equipo/comisión + **filtro por comisión** (Comunicación, Encuentros, Podcast, Red de padres, Contenido, etc).
Números: total, por equipo, horas anuales.
**Sin CTA activo de captación** (sobrecupo). Nota aclaratoria + lista de espera opcional.

---

## 8. Parches Ola 0 (sobre el WordPress actual)

Mientras se construye la nueva web, Lucas aplica estos fixes al WP vivo para que dejen de sangrar:

1. CTA "ver proyectos" del hero → apunta hoy a `https://give.cmsmasters.net/ngo/donate-now/` (demo del tema sin reemplazar). Debe ir a `/programas/`.
2. CTA "colaborar" del hero → `/colaborar` 404. Debe ir a `/sumate/` (o nueva landing).
3. Footer "Ser voluntario" → `/voluntarios` 404. Temporalmente a `/contacto/` o sección voluntariado.
4. Footer "Blog" → redirige a `/inicio/blog/` vacía. Ocultar o redirigir a `/contacto/`.
5. `/nosotros/` stats "0 %" y "0" → poner números reales o esconder la sección.
6. `/programas/` bug de testimonios repetidos ×3.

> Estos parches no los tocamos desde este repo. Quedan documentados en `README.md` como checklist para Lucas.

---

## 9. Accesibilidad · coherencia de marca obligatoria

Siendo fundación de discapacidad auditiva, la accesibilidad no es extra:

- WCAG 2.2 AA declarado y verificable.
- Subtítulos obligatorios en todo audio/video.
- Transcripción en texto de episodios y videos (doble valor: accesibilidad + GEO).
- Controles de tamaño de fuente, modo alto contraste (evaluación Ola 3).
- Focus visible, skip-link, aria-labels, contraste AA verificado en tokens.
- Tests con Lighthouse A11y ≥ 95 y `axe-core` en CI.

---

## 10. SEO + GEO

### Errores actuales a corregir
- Solo 5 URLs en sitemap — debería tener 60–120.
- Blog vacío.
- Podcast solo en YouTube, sin URL propia por episodio.
- Sin datos estructurados (Organization, Person, FAQPage, Event, PodcastEpisode).
- URLs inconsistentes (`/inicio/blog/`).
- `lastmod` congelado — sitemap no se regenera automático.

### GEO (citado por IA generativa)

Tácticas:
- FAQ schema en páginas clave con preguntas reales.
- Definiciones al inicio tipo Wikipedia (la IA las extrae literal).
- Artículos pilar largos (1500+ palabras).
- Schema Organization NGO con `founder`, `sameAs`, `areaServed`, `award`.
- Autor identificado (schema Person) en cada artículo.
- Citas a fuentes académicas (OMS, ASHA, PLOS One).
- Transcripciones del podcast (texto es lo indexable).
- `llms.txt` en root.

### Keywords troncales por página
Ver `docs/05-seo-map.md`.

---

## 11. Flujo de trabajo y handoff

```
Claude Project (CASACUSIA · Nueva web 2026)
  └── genera specs (este docs/)
         └── valida Lucas
                └── Claude Code construye Ola 1 (código Next.js)
                       └── push a GitHub (lucasadlerstein/web-casacusia)
                              └── Vercel auto-deploy
```

Check-in con Lucas al cerrar Fase 1 antes de tocar código productivo.

---

## 12. Dependencias externas pendientes

- [ ] Manual de marca (colores, tipos, logos) — `bit.ly/IdentidadGraficaCASACUSIA`
- [ ] Fotos equipo + voluntarios (ya comprimidas <200 KB)
- [ ] Datos reales ImpactStats (participantes, encuentros, ciudades, padres, episodios)
- [ ] Datos legales (CUIT, personería, dirección física)
- [ ] Logos de los 29 aliados en vectorial
- [ ] Deck con textos actualizados — `deck.casacusia.org`
- [ ] Confirmación lista final de aliados activos (hoy la lista tiene 31, el brief dice 29)

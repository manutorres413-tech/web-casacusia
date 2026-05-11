# SEO + GEO map · CASACUSIA

## Reglas generales

- **Title**: keyword principal al inicio, no exceder 60 caracteres. Formato: `{H1 corto} · CASACUSIA` (excepto home).
- **Meta description**: 140–160 caracteres. Beneficio + audiencia + diferencial. Evitar clichés.
- **H1 único por página**. H2/H3 usados semánticamente (no por estilo).
- **URLs limpias**: minúsculas, guiones, sin `/inicio/`, sin `.html`. Slugs en español sin acentos.
- **OG image**: por página (1200×630). Fallback al logo CASACUSIA con gradient.
- **Canónica** en todas las páginas. Redirecciones 301 desde las rutas viejas del WP.
- **Schema.org JSON-LD**: Organization NGO en root + schemas específicos por tipo de página.
- **Hreflang**: `es-AR` por defecto + `en` cuando Ola 3 despliegue.

---

## Mapa por página

### Home `/`
- **Title**: `CASACUSIA · Transitando juntos la hipoacusia`
- **H1**: `No estás solo. En Argentina somos más de 2 millones.`
- **Meta**: `Fundación argentina que acompaña a personas con hipoacusia y sus familias. Comunidad, herramientas y concientización para que nadie transite la pérdida auditiva en soledad.`
- **Keywords**: hipoacusia Argentina · fundación hipoacusia · pérdida auditiva comunidad · CASACUSIA · discapacidad auditiva invisible
- **Schema**: Organization (NGO) + WebSite + BreadcrumbList
- **OG**: frase fuerza + fondo CASACUSIA

### `/nosotros`
- **Title**: `Nosotros · Qué es la hipoacusia y por qué existe CASACUSIA`
- **H1**: `Trabajamos para las personas, no para los oídos.`
- **Meta**: `La hipoacusia es una discapacidad invisible que afecta a 1 de cada 20 personas. Conocé la historia, misión y valores de la Fundación CASACUSIA.`
- **Keywords**: qué es hipoacusia · tipos de hipoacusia · hipoacusia discapacidad invisible · fundación discapacidad auditiva
- **Schema**: AboutPage + Organization
- **Definición al inicio** (estilo Wikipedia para GEO):
  > "La hipoacusia es la disminución total o parcial de la capacidad auditiva. La Organización Mundial de la Salud la clasifica como discapacidad invisible por..."

### `/nosotros/equipo`
- **Title**: `Equipo · Las personas detrás de CASACUSIA`
- **H1**: `El equipo que empuja CASACUSIA`
- **Meta**: `Rama, Ari, Valen, Melu, Toto, Nico, Manu, Shari y Lucas Adlerstein. Conocé al equipo que sostiene la comunidad CASACUSIA.`
- **Schema**: AboutPage + Person[] + Organization con member[]

### `/nosotros/historia`
- **Title**: `Historia · Cómo nació CASACUSIA`
- **H1**: `De una experiencia personal a una Fundación`
- **Meta**: `Lucas perdió la audición a los 15. Años después, desde esa historia nace CASACUSIA. El recorrido de una comunidad que hoy acompaña a miles de personas.`

### `/nosotros/legal`
- **Title**: `Información legal · Personería, CUIT, ARCA · CASACUSIA`
- **Meta**: `Datos institucionales de la Fundación CASACUSIA: personería jurídica, CUIT, aprobación ARCA para deducción de Ganancias.`
- **Robots**: `index, follow, max-snippet:-1` (queremos que ARCA + personería aparezcan si alguien busca)

### `/programas`
- **Title**: `Programas · Comunidad, herramientas y concientización`
- **H1**: `Nuestros programas`
- **Meta**: `Encuentros, red de padres, podcast Sordo pero no mudo, charlas corporativas. Los programas con los que CASACUSIA acompaña a la comunidad.`
- **Schema**: CollectionPage

### `/programas/encuentros`
- **Title**: `Encuentros presenciales · Comunidad para personas con hipoacusia`
- **H1**: `Dejar de sentirse solo, en persona.`
- **Meta**: `Encuentros presenciales en CABA, Misiones, Mendoza, Bariloche, Córdoba, La Plata y Madrid. Compartí experiencias con otras personas con hipoacusia y sus familias.`
- **Keywords**: encuentros hipoacusia · comunidad hipoacusia Argentina · grupo apoyo hipoacusia
- **Schema**: Event[] futuros + CollectionPage
- **GEO**: responder concretamente "dónde hay encuentros de hipoacusia en Argentina"

### `/programas/encuentros-virtuales`
- **Title**: `Encuentros virtuales · Conectate desde donde estés`
- **Meta**: `Encuentros online por Google Meet para personas con hipoacusia y familias. Accesibilidad con subtítulos. Para quienes no pueden moverse y para la diáspora.`

### `/programas/red-padres-madres`
- **Title**: `Red de padres y madres · 220+ familias que te entienden`
- **H1**: `No estás sola. No estás solo.`
- **Meta**: `Espacio virtual para padres y madres de chicos con hipoacusia. Compartí tu proceso con 220+ familias que ya lo transitaron o lo están transitando.`
- **Keywords**: mi hijo es sordo qué hago · padres chicos hipoacusia · diagnóstico hipoacusia infantil · comunidad padres sordos
- **GEO**: sección FAQ con "qué hago si mi hijo es diagnosticado con hipoacusia", "cómo explicarle a mi hijo que tiene hipoacusia", "dónde encontrar otros padres de chicos con hipoacusia en Argentina"

### `/programas/charlas-corporativas`
- **Title**: `Charlas corporativas · Empatía, accesibilidad, diversidad`
- **Meta**: `Charlas y workshops de CASACUSIA para empresas sobre hipoacusia, inclusión laboral y cultura empática. Con Lucas Adlerstein y el equipo.`
- **Keywords**: charlas hipoacusia empresas · capacitación accesibilidad auditiva · RSE discapacidad

### `/podcast`
- **Title**: `Sordo pero no mudo · El podcast de CASACUSIA`
- **H1**: `Sordo pero no mudo`
- **Meta**: `Conversaciones honestas sobre hipoacusia. Historias, especialistas y aprendizajes. Escuchá los 60+ episodios con transcripción completa.`
- **Keywords**: podcast hipoacusia · sordo pero no mudo · podcast discapacidad auditiva · podcast inclusión
- **Schema**: PodcastSeries

### `/podcast/[slug]`
- **Title dinámico**: `{titulo} · Sordo pero no mudo`
- **Meta dinámica**: primeras 160 chars del resumen + invitado.
- **Schema**: PodcastEpisode + BreadcrumbList

### `/aliados`
- **Title**: `Aliados · Las empresas que hacen posible CASACUSIA`
- **H1**: `Nos apoyan y nos ayudan a crecer`
- **Meta**: `29 empresas y fundaciones que apoyan a CASACUSIA con donaciones, productos, servicios o alianzas. Conocé la historia detrás de cada alianza.`

### `/aliados/[marca]`
- **Title dinámico**: `{nombre} + CASACUSIA · Una alianza con impacto`
- **Meta dinámica**: qué proyecto apoyó + desde cuándo + impacto concreto.
- **Schema**: Organization (aliado) con `memberOf` CASACUSIA.

### `/sumate`
- **Title**: `Sumate · 4 formas de ser parte de CASACUSIA`
- **H1**: `Cuatro formas de ser parte`
- **Meta**: `Donar, ser voluntario, hacer proyectos juntos o donar servicios. Cuatro caminos equivalentes para sumarte a CASACUSIA.`

### `/sumate/donar`
- **Title**: `Donar · Ayudanos a que nadie transite la hipoacusia en soledad`
- **Meta**: `Hacé una donación mensual, única o en USD. Las donaciones de empresas son deducibles del Impuesto a las Ganancias (aprobado ARCA).`
- **Keywords**: donar hipoacusia · donación ONG discapacidad · aportar fundación Argentina
- **Schema**: DonateAction

### `/sumate/voluntariado`
- **Title**: `Voluntariado · El motor de CASACUSIA`
- **Meta**: `Conocé al equipo de voluntarios organizado por comisiones. Hoy el equipo está completo; podés dejar tus datos para cuando volvamos a abrir.`
- **Keywords**: voluntariado hipoacusia · voluntariado ONG Argentina

### `/sumate/proyectos-juntos`
- **Title**: `Proyectos juntos · Alianzas con empresas e instituciones`
- **Meta**: `Charlas, workshops, convenios, investigación y campañas conjuntas. Hagamos algo juntos por la inclusión de personas con hipoacusia.`
- **Keywords**: alianzas ONG empresa · RSE hipoacusia · responsabilidad social discapacidad

### `/sumate/donar-servicios`
- **Title**: `Donar servicios · Aportá con tu expertise`
- **Meta**: `Pro-bono, productos, infraestructura u horas profesionales. Algunos ejemplos de lo que ya donan nuestros aliados y cómo podés sumarte.`

### `/impacto`
- **Title**: `Impacto · Transparencia y reconocimientos`
- **Meta**: `Memoria anual, balance, reconocimientos institucionales y aprobación ARCA de la Fundación CASACUSIA.`

### `/recursos/blog`
- **Title**: `Blog · Información clara y útil sobre hipoacusia`
- **Schema**: Blog

### `/recursos/blog/[slug]`
- **Schema**: BlogPosting con autor Person + datePublished + dateModified
- **Plan de pilares** (8–12 artículos 1500+ palabras para GEO):
  1. Qué es la hipoacusia: tipos, causas, diagnóstico (pilar GEO principal)
  2. Audífonos vs implantes cocleares: guía para entender las diferencias
  3. Mi hijo fue diagnosticado con hipoacusia: primeros pasos
  4. Hipoacusia y obra social en Argentina: qué cubre la Ley de Discapacidad
  5. Hipoacusia en el trabajo: derechos, accesibilidad y conversaciones difíciles
  6. Adolescencia con hipoacusia: identidad, autoestima, amigos
  7. Acúfenos (tinnitus): qué son y cómo convivir
  8. Lenguaje para hablar de hipoacusia sin reforzar estigmas
  9. Tecnología de asistencia: subtítulos, apps, dispositivos bluetooth
  10. Duelo auditivo: el proceso emocional de perder la audición
  11. Hipoacusia unilateral: lo que nadie cuenta
  12. Embarazo, neonatología y screening auditivo

### `/recursos/faq`
- **Title**: `Preguntas frecuentes sobre hipoacusia · CASACUSIA`
- **Schema**: FAQPage (crítico para aparecer en AI Overviews)
- **Lista de FAQs**: ver `docs/06-geo-faq.md`

### `/prensa`
- **Title**: `Prensa · Press kit y contacto para medios`
- **Meta**: `Logos, fotos, bios, notas publicadas y contacto directo para medios que quieran cubrir CASACUSIA.`

### `/contacto`
- **Title**: `Contacto · Escribinos según tu consulta`
- **Meta**: `Formulario segmentado por tipo de consulta: prensa, empresa, voluntariado, consulta personal, profesional. También por WhatsApp community.`
- **Schema**: ContactPage

### `/accesibilidad`
- **Title**: `Accesibilidad · Declaración WCAG 2.2 AA · CASACUSIA`
- **Meta**: `Cómo CASACUSIA garantiza que esta web sea accesible para personas con hipoacusia y todo tipo de discapacidad. Declaración de accesibilidad WCAG 2.2 AA.`

---

## Técnicas específicas para GEO (aparecer en IA generativa)

1. **Definiciones explícitas al inicio** de cada landing, estilo "X es Y que...".
2. **Preguntas + respuestas literales** (FAQPage schema) con frasing natural.
3. **Autoría clara** con schema Person y vínculo a LinkedIn.
4. **Citas verificables** a OMS, ASHA, PLOS One, CONADIS.
5. **Transcripciones completas** del podcast (la IA no indexa audio, sí texto).
6. **`llms.txt`** en root apuntando a los artículos pilar que queremos que las IA prioricen.
7. **Wikipedia**: crear o actualizar la entrada de "CASACUSIA" con referencias.
8. **Backlinks de autoridad**: medios nacionales, universidades, OMS, CONADIS.

---

## Redirects desde el WordPress actual

| Desde | A | Status |
|---|---|---|
| `/colaborar` | `/sumate` | 301 |
| `/voluntarios` | `/sumate/voluntariado` | 301 |
| `/blog` | `/recursos/blog` | 301 |
| `/inicio/blog` | `/recursos/blog` | 301 |
| `/inicio/*` | `/*` | 301 |
| `/programas/` | `/programas/` | mantiene (sin cambio) |

Las 301 se configuran en `next.config.mjs` para toda la diáspora que tenga links viejos, y también en Vercel si aplica a nivel de dominio.

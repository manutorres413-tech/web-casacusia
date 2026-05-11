# /nosotros/equipo · Copy final

## Metadata
- **Title**: Equipo · Las personas detrás de CASACUSIA
- **Description**: Conocé al equipo que empuja la Fundación CASACUSIA: Rama, Ari, Valen, Melu, Toto, Nico, Manu, Shari y Lucas.

---

## 01 · Hero

**Eyebrow**: Nuestro equipo

**H1**: Las personas que empujan CASACUSIA

**Subtítulo**: Un equipo interdisciplinario que combina legitimidad experiencial, capacidad de comunicación y diseño estratégico. Detrás de cada programa hay una persona que lo cuida.

---

## 02 · Grilla del equipo

**Formato** por miembro:
- Foto cuadrada (recortada a bust)
- Nombre + Apellido
- Rol
- Bio corta (2-3 líneas)
- Link a LinkedIn (icono)
- Frase personal opcional sobre por qué está en CASACUSIA

**Orden sugerido** (Lucas primero como fundador, resto alfabético o por área):

| Nombre | Rol (placeholder — confirmar con Lucas) |
|---|---|
| Lucas Adlerstein | Fundador y director |
| Rama | *pendiente* |
| Ari | *pendiente* |
| Valen | Comunicación |
| Melu | Coordinación general |
| Toto | Líder operativo de Encuentros |
| Nico | *pendiente* |
| Manu | Líder proyecto nueva web |
| Shari | Líder general de Encuentros |

> **Nota**: Los roles específicos (salvo Shari, Toto, Manu y Lucas mencionados en la Hoja de Proyectos) están pendientes de confirmación.

---

## 03 · CTA cierre

**H2**: Sumate al equipo de voluntarios

**Párrafo**: Más allá del núcleo, hay decenas de voluntarios organizados por comisiones que hacen posible el día a día.

**CTA**: "Conocé al voluntariado" → `/sumate/voluntariado`

---

## Schema JSON-LD (por render)

Cada miembro genera:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Lucas Adlerstein",
  "jobTitle": "Fundador y director",
  "worksFor": { "@type": "NGO", "name": "CASACUSIA" },
  "sameAs": ["https://www.linkedin.com/in/lucasadlerstein", "https://instagram.com/..."]
}
```

La página entera `Organization > member[]` apunta a cada Person.

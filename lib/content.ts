import { z } from "zod";

import aliadosData from "@/content/aliados.json";
import equipoData from "@/content/equipo.json";
import voluntariosData from "@/content/voluntarios.json";
import programasData from "@/content/programas.json";
import eventosData from "@/content/eventos.json";
import episodiosData from "@/content/podcast.json";
import testimoniosData from "@/content/testimonios.json";
import impactoData from "@/content/impacto.json";
import faqsData from "@/content/faq.json";
import reconocimientosData from "@/content/reconocimientos.json";

export const comisiones = [
  "comunicacion",
  "encuentros",
  "podcast",
  "red-padres",
  "contenido",
  "fundraising",
  "tecnologia",
  "diseno",
  "otro"
] as const;
export type Comision = (typeof comisiones)[number];

const AliadoSchema = z.object({
  slug: z.string(),
  nombre: z.string(),
  logo: z.string(),
  web: z.string().url().optional(),
  sector: z.string(),
  tipoAlianza: z.array(z.enum(["financiera", "producto", "servicio", "institucional", "comunicacional"])),
  proyectoApoyado: z.array(z.string()),
  impacto: z.string(),
  destacado: z.boolean(),
  orden: z.number(),
  desde: z.string(),
  activo: z.boolean()
});
export type Aliado = z.infer<typeof AliadoSchema>;

const MiembroSchema = z.object({
  slug: z.string(),
  nombre: z.string(),
  apellido: z.string(),
  rol: z.string(),
  esFundador: z.boolean(),
  foto: z.string(),
  bioCorta: z.string(),
  quotePersonal: z.string().optional(),
  linkedin: z.string().url().optional(),
  orden: z.number()
});
export type MiembroEquipo = z.infer<typeof MiembroSchema>;

const VoluntarioSchema = z.object({
  slug: z.string(),
  nombre: z.string(),
  foto: z.string(),
  comision: z.enum(comisiones),
  rolEnComision: z.string().optional(),
  ciudad: z.string().optional()
});
export type Voluntario = z.infer<typeof VoluntarioSchema>;

const ProgramaSchema = z.object({
  slug: z.string(),
  titulo: z.string(),
  subtitulo: z.string(),
  resumen: z.string(),
  categorias: z.array(z.enum(["comunidad", "herramientas", "sociedad"])),
  cta: z.object({ label: z.string(), href: z.string() }),
  destacado: z.boolean(),
  orden: z.number()
});
export type Programa = z.infer<typeof ProgramaSchema>;

const EventoSchema = z.object({
  slug: z.string(),
  titulo: z.string(),
  tipo: z.enum(["presencial", "virtual"]),
  programa: z.string(),
  ciudad: z.string().optional(),
  direccion: z.string().optional(),
  fechaInicio: z.string(),
  fechaFin: z.string(),
  linkInscripcion: z.string().optional(),
  estado: z.enum(["proximo", "realizado", "cancelado"])
});
export type Evento = z.infer<typeof EventoSchema>;

export const podcastCategorias = [
  "historias",
  "salud",
  "tecnologia",
  "bienestar",
  "derechos",
  "tips"
] as const;
export type PodcastCategoria = (typeof podcastCategorias)[number];

const EpisodioSchema = z.object({
  slug: z.string(),
  numero: z.number(),
  titulo: z.string(),
  invitado: z.object({ nombre: z.string(), rol: z.string().optional() }).optional(),
  categoria: z.enum(podcastCategorias),
  descripcion: z.string(),
  fechaPublicacion: z.string(),
  duracion: z.string(),
  youtubeId: z.string().optional(),
  spotifyUrl: z.string().url().optional(),
  applePodcastsUrl: z.string().url().optional(),
  transcripcion: z.string().optional(),
  destacado: z.boolean()
});
export type Episodio = z.infer<typeof EpisodioSchema>;

const TestimonioSchema = z.object({
  id: z.string(),
  texto: z.string(),
  autor: z.string(),
  ubicacion: z.string().optional(),
  contexto: z.string().optional(),
  destacado: z.boolean()
});
export type Testimonio = z.infer<typeof TestimonioSchema>;

const ImpactoSchema = z.object({
  participantesTotales: z.number(),
  encuentrosRealizados: z.number(),
  ciudadesAlcanzadas: z.number(),
  padresEnRed: z.number(),
  episodiosPodcast: z.number(),
  voluntariosActivos: z.number(),
  horasDonadasAnuales: z.number(),
  ultimaActualizacion: z.string()
});
export type Impacto = z.infer<typeof ImpactoSchema>;

const FAQSchema = z.object({
  id: z.string(),
  pregunta: z.string(),
  respuesta: z.string(),
  categoria: z.string(),
  orden: z.number(),
  destacada: z.boolean()
});
export type FAQ = z.infer<typeof FAQSchema>;

const ReconocimientoSchema = z.object({
  titulo: z.string(),
  organismo: z.string(),
  fecha: z.string(),
  descripcion: z.string()
});
export type Reconocimiento = z.infer<typeof ReconocimientoSchema>;

export function getAliados(opts: { destacados?: boolean } = {}): Aliado[] {
  const all = z.array(AliadoSchema).parse(aliadosData).filter((a) => a.activo);
  const filtered = opts.destacados ? all.filter((a) => a.destacado) : all;
  return filtered.sort((a, b) => a.orden - b.orden);
}

export function getAliadoBySlug(slug: string): Aliado | null {
  return getAliados().find((a) => a.slug === slug) ?? null;
}

export function getEquipo(): MiembroEquipo[] {
  return z.array(MiembroSchema).parse(equipoData).sort((a, b) => a.orden - b.orden);
}

export function getVoluntarios(opts: { comision?: Comision } = {}): Voluntario[] {
  const all = z.array(VoluntarioSchema).parse(voluntariosData);
  return opts.comision ? all.filter((v) => v.comision === opts.comision) : all;
}

export function getComisionesConConteo(): { comision: Comision; count: number }[] {
  const all = getVoluntarios();
  const counts = new Map<Comision, number>();
  for (const c of comisiones) counts.set(c, 0);
  for (const v of all) counts.set(v.comision, (counts.get(v.comision) ?? 0) + 1);
  return [...counts.entries()]
    .map(([comision, count]) => ({ comision, count }))
    .filter((c) => c.count > 0);
}

export function getProgramas(): Programa[] {
  return z.array(ProgramaSchema).parse(programasData).sort((a, b) => a.orden - b.orden);
}

export function getProximosEventos(opts: { limit?: number } = {}): Evento[] {
  const all = z
    .array(EventoSchema)
    .parse(eventosData)
    .filter((e) => e.estado === "proximo")
    .sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio));
  return opts.limit ? all.slice(0, opts.limit) : all;
}

export function getEpisodios(opts: { limit?: number; destacados?: boolean } = {}): Episodio[] {
  const all = z
    .array(EpisodioSchema)
    .parse(episodiosData)
    .sort((a, b) => b.numero - a.numero);
  const filtered = opts.destacados ? all.filter((e) => e.destacado) : all;
  return opts.limit ? filtered.slice(0, opts.limit) : filtered;
}

export function getCategoriasPodcastConConteo(): { categoria: PodcastCategoria; count: number }[] {
  const all = getEpisodios();
  const counts = new Map<PodcastCategoria, number>();
  for (const c of podcastCategorias) counts.set(c, 0);
  for (const e of all) counts.set(e.categoria, (counts.get(e.categoria) ?? 0) + 1);
  return [...counts.entries()]
    .map(([categoria, count]) => ({ categoria, count }))
    .filter((c) => c.count > 0);
}

export function getTestimonios(opts: { destacados?: boolean } = {}): Testimonio[] {
  const all = z.array(TestimonioSchema).parse(testimoniosData);
  return opts.destacados ? all.filter((t) => t.destacado) : all;
}

export function getImpacto(): Impacto {
  return ImpactoSchema.parse(impactoData);
}

export function getFAQs(opts: { categoria?: string } = {}): FAQ[] {
  const all = z.array(FAQSchema).parse(faqsData).sort((a, b) => a.orden - b.orden);
  return opts.categoria ? all.filter((f) => f.categoria === opts.categoria) : all;
}

export function getReconocimientos(): Reconocimiento[] {
  return z.array(ReconocimientoSchema).parse(reconocimientosData);
}

"use client";

import { useState, useMemo } from "react";
import { Calendar, MapPin, Video, ArrowRight, Globe, Users, Home } from "lucide-react";
import type { LumaEvent, EventTag } from "@/lib/luma";

const LUMA_CALENDAR_URL = "https://lu.ma/hipoacusia";
const EVENTS_PER_PAGE = 3;

type FilterKey = "todos" | EventTag;

const filterConfig: { key: FilterKey; icon: typeof Calendar }[] = [
  { key: "todos", icon: Calendar },
  { key: "presencial", icon: MapPin },
  { key: "virtual", icon: Video },
  { key: "familias", icon: Users },
  { key: "argentina", icon: Home },
  { key: "mundo", icon: Globe },
];

const cardColors = [
  { border: "border-verde/30", badge: "bg-verde text-white" },
  { border: "border-violeta/30", badge: "bg-violeta text-white" },
  { border: "border-rosa/30", badge: "bg-rosa text-white" },
] as const;

const tagStyles: Record<EventTag, string> = {
  presencial: "bg-verde/20 text-verde-soft",
  virtual: "bg-violeta/20 text-violeta-soft",
  familias: "bg-rosa/20 text-rosa-soft",
  argentina: "bg-amarillo/20 text-amarillo",
  mundo: "bg-white/15 text-white/80",
};

function formatEventDate(startAt: string, timezone: string) {
  const date = new Date(startAt);
  const day = date.toLocaleDateString("es-AR", {
    weekday: "short", day: "numeric", month: "short", timeZone: timezone,
  });
  const time = date.toLocaleTimeString("es-AR", {
    hour: "2-digit", minute: "2-digit", timeZone: timezone,
  });
  return { day: day.charAt(0).toUpperCase() + day.slice(1), time };
}

function cleanEventTitle(name: string): string {
  return name
    .replace(/[\u{1F1E0}-\u{1F1FF}]{2}\s*/gu, "")
    .replace(/\s*-\s*Encuentro\s+(Para|para)\s+Personas\s+Con\s+P[eé]rdida\s+Auditiva/i, "")
    .replace(/\s*-\s*Encuentro\s+para\s+personas\s+con\s+p[eé]rdida\s+auditiva/i, "")
    .replace(/\s*-\s*Encuentro\s+para\s+familias\s+de\s+la\s+hipoacusia/i, " · Familias")
    .trim();
}

interface Props {
  events: LumaEvent[];
  translations: Record<string, string>;
}

export function EventFilterClient({ events, translations }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("todos");

  const availableFilters = useMemo(() => {
    const tagsInEvents = new Set(events.flatMap((e) => e.tags));
    return filterConfig.filter(
      (f) => f.key === "todos" || tagsInEvents.has(f.key as EventTag)
    );
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (activeFilter === "todos") return events.slice(0, EVENTS_PER_PAGE);
    return events
      .filter((e) => e.tags.includes(activeFilter as EventTag))
      .slice(0, EVENTS_PER_PAGE);
  }, [events, activeFilter]);

  return (
    <div className="relative">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Filtrar encuentros">
        {availableFilters.map(({ key, icon: Icon }) => {
          const isActive = activeFilter === key;
          const count = key === "todos"
            ? events.length
            : events.filter((e) => e.tags.includes(key as EventTag)).length;

          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveFilter(key)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-white text-verde-dark shadow-lg"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              <Icon size={14} />
              {translations[key]}
              <span className={`ml-1 text-xs ${isActive ? "text-verde-dark/60" : "text-white/40"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Event cards */}
      {filteredEvents.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {filteredEvents.map((event, i) => (
            <EventCard
              key={event.id}
              event={event}
              index={i}
              translations={translations}
            />
          ))}
        </div>
      ) : (
        <p className="text-white/70 text-lg mb-8">{translations.sinFecha}</p>
      )}

      {/* CTA */}
      <a
        href={LUMA_CALENDAR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-verde-dark transition-all hover:bg-white/90 hover:shadow-lg"
      >
        {translations.cta}
        <ArrowRight size={16} />
      </a>
    </div>
  );
}

function EventCard({
  event,
  index,
  translations,
}: {
  event: LumaEvent;
  index: number;
  translations: Record<string, string>;
}) {
  const colors = cardColors[index % cardColors.length]!;
  const { day, time } = formatEventDate(event.startAt, event.timezone);
  const isVirtual = event.locationType === "online";
  const title = cleanEventTitle(event.title);
  const location = isVirtual ? "Virtual" : (event.city ?? "Por confirmar");

  return (
    <a
      href={event.lumaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col rounded-2xl border bg-white/10 backdrop-blur-sm p-5 md:p-6 transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] hover:shadow-xl ${colors.border}`}
    >
      {/* Date badge */}
      <div className={`inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${colors.badge}`}>
        <Calendar size={13} />
        {day}
      </div>

      {/* Title */}
      <h3 className="mt-3 font-display text-lg font-bold text-white leading-tight md:text-xl">
        {title || location}
      </h3>

      {/* Tags */}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {event.tags.map((tag) => (
          <span
            key={tag}
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tagStyles[tag]}`}
          >
            {translations[tag]}
          </span>
        ))}
      </div>

      {/* Location & time */}
      <div className="mt-auto pt-4 flex items-center justify-between text-sm text-white/70">
        <span className="inline-flex items-center gap-1.5">
          {isVirtual ? <Video size={14} /> : <MapPin size={14} />}
          {location}
        </span>
        <span>{time} hs</span>
      </div>

      {/* Hover CTA */}
      <span className="absolute top-5 right-5 text-xs font-semibold text-white/0 transition-all duration-300 group-hover:text-white/70">
        {translations.inscribite} →
      </span>
    </a>
  );
}

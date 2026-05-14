/**
 * Luma public API client — fetches upcoming events from the CASACUSIA calendar.
 * Uses the public endpoint (no API key required).
 */

const LUMA_CALENDAR_SLUG = "hipoacusia";
const LUMA_API_URL = `https://api.lu.ma/url?url=${LUMA_CALENDAR_SLUG}`;

export type EventTag = "presencial" | "virtual" | "familias" | "argentina" | "mundo";

export interface LumaEvent {
  id: string;
  title: string;
  startAt: string;
  endAt: string;
  timezone: string;
  locationType: "offline" | "online";
  city: string | null;
  country: string | null;
  address: string | null;
  coverUrl: string | null;
  lumaUrl: string;
  tags: EventTag[];
}

interface LumaApiEvent {
  api_id: string;
  name: string;
  start_at: string;
  end_at: string;
  timezone: string;
  location_type: string;
  url: string;
  cover_url: string | null;
  geo_address_info?: {
    city?: string;
    address?: string;
    country_code?: string;
    localized?: {
      es?: {
        city?: string;
        short_address?: string;
      };
    };
  } | null;
}

interface LumaApiFeaturedItem {
  event: LumaApiEvent;
  start_at: string;
}

function deriveTags(e: LumaApiEvent): EventTag[] {
  const tags: EventTag[] = [];
  const nameUpper = e.name.toUpperCase();
  const isVirtual = e.location_type !== "offline" || nameUpper.includes("VIRTUAL");
  // Infer country from code, city name, or event title
  let countryCode = e.geo_address_info?.country_code ?? null;
  if (!countryCode) {
    const city = (e.geo_address_info?.city ?? "").toLowerCase();
    if (city.includes("buenos aires") || nameUpper.includes("CABA")) {
      countryCode = "AR";
    }
  }

  if (isVirtual) {
    tags.push("virtual");
  } else {
    tags.push("presencial");
    if (countryCode === "AR") {
      tags.push("argentina");
    } else if (countryCode) {
      tags.push("mundo");
    }
  }

  if (nameUpper.includes("FAMILIA")) {
    tags.push("familias");
  }

  return tags;
}

function parseEvent(item: LumaApiFeaturedItem): LumaEvent {
  const e = item.event;
  const localized = e.geo_address_info?.localized?.es;

  return {
    id: e.api_id,
    title: e.name,
    startAt: e.start_at,
    endAt: e.end_at,
    timezone: e.timezone,
    locationType: e.location_type === "offline" ? "offline" : "online",
    city: localized?.city ?? localized?.short_address ?? e.geo_address_info?.city ?? null,
    country: e.geo_address_info?.country_code
      ?? ((e.geo_address_info?.city ?? "").toLowerCase().includes("buenos aires") || e.name.toUpperCase().includes("CABA") ? "AR" : null),
    address: e.geo_address_info?.address ?? null,
    coverUrl: e.cover_url,
    lumaUrl: `https://lu.ma/${e.url}`,
    tags: deriveTags(e),
  };
}

/**
 * Fetches ALL upcoming events from the Luma calendar, sorted by start date.
 * Uses Next.js revalidation (1 hour cache).
 */
export async function getUpcomingEvents(): Promise<LumaEvent[]> {
  try {
    const res = await fetch(LUMA_API_URL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const json = await res.json();
    const items: LumaApiFeaturedItem[] = json?.data?.featured_items ?? [];
    const now = new Date();

    return items
      .filter((item) => new Date(item.event.end_at) > now)
      .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
      .map(parseEvent);
  } catch {
    return [];
  }
}

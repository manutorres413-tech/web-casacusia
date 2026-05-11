import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  consent: z.literal(true),
  website: z.string().max(0).optional()
});

const rateBuckets = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const LIMIT = 5;

function checkRate(ip: string): boolean {
  const now = Date.now();
  const prev = rateBuckets.get(ip);
  if (!prev || now - prev.ts > WINDOW_MS) {
    rateBuckets.set(ip, { count: 1, ts: now });
    return true;
  }
  if (prev.count >= LIMIT) return false;
  prev.count += 1;
  return true;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRate(ip)) {
    return NextResponse.json({ error: "rate_limit" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // TODO: forward to provider (Resend, Buttondown, Mailchimp). For now just log.
  console.info("[newsletter] subscribe", {
    name: parsed.data.name,
    email: parsed.data.email.replace(/(.{2}).+(@.+)/, "$1***$2")
  });

  return NextResponse.json({ ok: true });
}

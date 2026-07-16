import { ensureDbSchema, getDb } from "../../../db";
import { trackingEvents } from "../../../db/schema";

const allowedEvents = new Set(["cta_click", "plan_selected", "form_started", "whatsapp_opened", "gallery_click"]);

function clean(value: unknown, max = 160) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const event = clean(payload.event, 40);
    if (!allowedEvents.has(event)) return Response.json({ error: "Evento inválido." }, { status: 400 });
    await ensureDbSchema();
    await getDb().insert(trackingEvents).values({
      event,
      path: clean(payload.path, 180) || "/",
      source: clean(payload.source, 80) || "direto",
      metadata: JSON.stringify(payload.metadata && typeof payload.metadata === "object" ? payload.metadata : {}),
    });
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ ok: false }, { status: 202 });
  }
}

import { desc, eq, sql } from "drizzle-orm";
import { getAdminUser } from "../../../admin-auth";
import { ensureDbSchema, getDb } from "../../../../db";
import { leads, siteSettings, trackingEvents } from "../../../../db/schema";
import { defaultSiteSettings } from "../../../site-settings";

const statuses = new Set(["novo", "retorno", "contatado", "agendado", "matriculado", "perdido"]);

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) return Response.json({ error: "Acesso não autorizado." }, { status: 401 });

  try {
    await ensureDbSchema();
    const db = getDb();
    const [leadRows, eventRows, settingRows] = await Promise.all([
      db.select().from(leads).orderBy(desc(leads.createdAt), desc(leads.id)).limit(400),
      db.select({ event: trackingEvents.event, total: sql<number>`count(*)` }).from(trackingEvents).groupBy(trackingEvents.event),
      db.select().from(siteSettings),
    ]);
    return Response.json({ leads: leadRows, events: eventRows, settings: { ...defaultSiteSettings, ...Object.fromEntries(settingRows.map((row) => [row.key, row.value])) } });
  } catch {
    return Response.json({ error: "Não foi possível carregar os contatos." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const admin = await getAdminUser();
  if (!admin) return Response.json({ error: "Acesso não autorizado." }, { status: 401 });

  try {
    const payload = (await request.json()) as { id?: number; status?: string };
    if (!Number.isInteger(payload.id) || !payload.status || !statuses.has(payload.status)) return Response.json({ error: "Dados inválidos." }, { status: 400 });
    await ensureDbSchema();
    const db = getDb();
    const [lead] = await db
      .update(leads)
      .set({ status: payload.status, updatedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(leads.id, payload.id!))
      .returning();
    return Response.json({ lead });
  } catch {
    return Response.json({ error: "Não foi possível atualizar o contato." }, { status: 500 });
  }
}

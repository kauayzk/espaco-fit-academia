import { desc, eq, sql } from "drizzle-orm";
import { ensureDbSchema, getDb } from "../../../db";
import { leads, trackingEvents } from "../../../db/schema";

const validPlans = new Set(["Individual", "Casal", "+2 Família"]);
const validObjectives = new Set(["Emagrecimento", "Ganho de massa", "Condicionamento", "Saúde e qualidade de vida"]);
const validPeriods = new Set(["Manhã", "Tarde", "Noite", "Horário flexível"]);

function clean(value: unknown, max = 160) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    if (clean(payload.website)) return Response.json({ ok: true }, { status: 201 });

    const name = clean(payload.name, 120);
    const phone = clean(payload.phone, 24);
    const phoneDigits = phone.replace(/\D/g, "");
    const plan = clean(payload.plan, 40);
    const price = clean(payload.price, 20);
    const objective = clean(payload.objective, 80);
    const preferredPeriod = clean(payload.preferredPeriod, 40);
    const preferredDate = clean(payload.preferredDate, 10);
    const experience = clean(payload.experience, 80);
    const notes = clean(payload.notes, 240);
    const source = clean(payload.source, 80) || "direto";
    const consent = payload.consent === true;

    if (name.length < 3 || phoneDigits.length < 10 || !validPlans.has(plan) || !validObjectives.has(objective) || !validPeriods.has(preferredPeriod) || !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || !consent) {
      return Response.json({ error: "Confira os campos obrigatórios." }, { status: 400 });
    }

    await ensureDbSchema();
    const db = getDb();
    const recent = await db
      .select({ id: leads.id })
      .from(leads)
      .where(eq(leads.phone, phone))
      .orderBy(desc(leads.createdAt))
      .limit(1);

    const [lead] = await db
      .insert(leads)
      .values({
        name,
        phone,
        plan,
        price,
        objective,
        preferredPeriod,
        preferredDate,
        experience,
        notes,
        source,
        utmSource: clean(payload.utmSource, 100),
        utmMedium: clean(payload.utmMedium, 100),
        utmCampaign: clean(payload.utmCampaign, 140),
        consentAt: new Date().toISOString(),
        status: recent.length ? "retorno" : "novo",
      })
      .returning({ id: leads.id, createdAt: leads.createdAt });

    await db.insert(trackingEvents).values({
      event: "lead_created",
      path: "/matricula",
      source,
      metadata: JSON.stringify({ plan, objective }),
    });

    return Response.json({ lead }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível salvar a matrícula.";
    return Response.json({ error: message.includes("no such table") ? "O cadastro está sendo preparado. Tente novamente em instantes." : "Não foi possível salvar agora. Tente novamente." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const payload = (await request.json()) as { id?: number; whatsappOpened?: boolean };
    if (!Number.isInteger(payload.id) || payload.whatsappOpened !== true) return Response.json({ error: "Dados inválidos." }, { status: 400 });
    await ensureDbSchema();
    const db = getDb();
    await db.update(leads).set({ whatsappOpened: true, updatedAt: sql`CURRENT_TIMESTAMP` }).where(eq(leads.id, payload.id!));
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Não foi possível atualizar." }, { status: 500 });
  }
}

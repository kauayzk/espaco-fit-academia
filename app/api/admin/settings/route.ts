import { sql } from "drizzle-orm";
import { getAdminUser } from "../../../admin-auth";
import { ensureDbSchema, getDb } from "../../../../db";
import { siteSettings } from "../../../../db/schema";
import { defaultSiteSettings } from "../../../site-settings";

export async function PATCH(request: Request) {
  const admin = await getAdminUser();
  if (!admin) return Response.json({ error: "Acesso não autorizado." }, { status: 401 });

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const entries = Object.keys(defaultSiteSettings).map((key) => {
      const value = typeof payload[key] === "string" ? payload[key].trim().slice(0, 80) : "";
      return { key, value };
    });
    if (entries.some((entry) => !entry.value)) return Response.json({ error: "Preencha todas as informações." }, { status: 400 });

    await ensureDbSchema();
    const db = getDb();
    for (const entry of entries) {
      await db
        .insert(siteSettings)
        .values(entry)
        .onConflictDoUpdate({ target: siteSettings.key, set: { value: entry.value, updatedAt: sql`CURRENT_TIMESTAMP` } });
    }
    return Response.json({ settings: Object.fromEntries(entries.map((entry) => [entry.key, entry.value])) });
  } catch {
    return Response.json({ error: "Não foi possível salvar as informações do site." }, { status: 500 });
  }
}

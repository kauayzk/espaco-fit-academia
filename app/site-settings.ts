import { ensureDbSchema, getDb } from "../db";
import { siteSettings } from "../db/schema";

export const defaultSiteSettings = {
  priceIndividual: "75,00",
  priceCasal: "70,00",
  priceFamilia: "65,00",
  weekdayHours: "05h — 22h",
  saturdayHours: "07h — 18h",
  announcement: "Matrículas abertas",
};

export type SiteSettings = typeof defaultSiteSettings;

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    await ensureDbSchema();
    const rows = await getDb().select().from(siteSettings);
    const stored = Object.fromEntries(rows.map((row) => [row.key, row.value]));
    return { ...defaultSiteSettings, ...stored };
  } catch {
    return defaultSiteSettings;
  }
}

import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable(
  "leads",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    plan: text("plan").notNull(),
    price: text("price").notNull(),
    objective: text("objective").notNull(),
    preferredPeriod: text("preferred_period").notNull(),
    preferredDate: text("preferred_date").notNull(),
    experience: text("experience").notNull(),
    notes: text("notes").notNull().default(""),
    source: text("source").notNull().default("direto"),
    utmSource: text("utm_source").notNull().default(""),
    utmMedium: text("utm_medium").notNull().default(""),
    utmCampaign: text("utm_campaign").notNull().default(""),
    status: text("status").notNull().default("novo"),
    consentAt: text("consent_at").notNull(),
    whatsappOpened: integer("whatsapp_opened", { mode: "boolean" }).notNull().default(false),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("leads_created_at_idx").on(table.createdAt),
    index("leads_status_idx").on(table.status),
    index("leads_phone_idx").on(table.phone),
  ],
);

export const trackingEvents = sqliteTable(
  "tracking_events",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    event: text("event").notNull(),
    path: text("path").notNull().default("/"),
    source: text("source").notNull().default("direto"),
    metadata: text("metadata").notNull().default("{}"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("tracking_event_idx").on(table.event),
    index("tracking_created_at_idx").on(table.createdAt),
  ],
);

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

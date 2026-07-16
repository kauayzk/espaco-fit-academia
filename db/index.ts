import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(env.DB, { schema });
}

let schemaInitialization: Promise<unknown> | null = null;

export function ensureDbSchema() {
  if (!env.DB) throw new Error("Cloudflare D1 binding `DB` is unavailable.");
  if (!schemaInitialization) {
    const d1 = env.DB;
    schemaInitialization = d1.batch([
      d1.prepare(`CREATE TABLE IF NOT EXISTS leads (
        id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        name text NOT NULL,
        phone text NOT NULL,
        plan text NOT NULL,
        price text NOT NULL,
        objective text NOT NULL,
        preferred_period text NOT NULL,
        preferred_date text NOT NULL,
        experience text NOT NULL,
        notes text DEFAULT '' NOT NULL,
        source text DEFAULT 'direto' NOT NULL,
        utm_source text DEFAULT '' NOT NULL,
        utm_medium text DEFAULT '' NOT NULL,
        utm_campaign text DEFAULT '' NOT NULL,
        status text DEFAULT 'novo' NOT NULL,
        consent_at text NOT NULL,
        whatsapp_opened integer DEFAULT false NOT NULL,
        created_at text DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at text DEFAULT CURRENT_TIMESTAMP NOT NULL
      )`),
      d1.prepare("CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at)"),
      d1.prepare("CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status)"),
      d1.prepare("CREATE INDEX IF NOT EXISTS leads_phone_idx ON leads (phone)"),
      d1.prepare(`CREATE TABLE IF NOT EXISTS tracking_events (
        id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        event text NOT NULL,
        path text DEFAULT '/' NOT NULL,
        source text DEFAULT 'direto' NOT NULL,
        metadata text DEFAULT '{}' NOT NULL,
        created_at text DEFAULT CURRENT_TIMESTAMP NOT NULL
      )`),
      d1.prepare("CREATE INDEX IF NOT EXISTS tracking_event_idx ON tracking_events (event)"),
      d1.prepare("CREATE INDEX IF NOT EXISTS tracking_created_at_idx ON tracking_events (created_at)"),
      d1.prepare(`CREATE TABLE IF NOT EXISTS site_settings (
        key text PRIMARY KEY NOT NULL,
        value text NOT NULL,
        updated_at text DEFAULT CURRENT_TIMESTAMP NOT NULL
      )`),
    ]);
  }
  return schemaInitialization;
}

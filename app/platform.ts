import { env } from "cloudflare:workers";

export function isVercelRuntime() {
  return !(env as Cloudflare.Env).DB;
}

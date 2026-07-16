import { env } from "cloudflare:workers";
import { getChatGPTUser } from "./chatgpt-auth";

function configuredAdmins() {
  const value = (env as unknown as { ADMIN_EMAILS?: string }).ADMIN_EMAILS ?? "";
  return value
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function getAdminUser() {
  const user = await getChatGPTUser();
  if (!user) return null;
  return configuredAdmins().includes(user.email.toLowerCase()) ? user : null;
}

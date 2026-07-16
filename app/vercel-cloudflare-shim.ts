/** Build-time replacement for Cloudflare's runtime-only environment module. */
export const env = {
  ADMIN_EMAILS: process.env.ADMIN_EMAILS,
};

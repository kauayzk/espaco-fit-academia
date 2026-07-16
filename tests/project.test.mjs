import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("identifies the project as the Espaço Fit portfolio", async () => {
  const [packageJson, readme, layout, home] = await Promise.all([
    read("package.json"),
    read("README.md"),
    read("app/layout.tsx"),
    read("app/page.tsx"),
  ]);

  assert.match(packageJson, /"name": "espaco-fit-academia"/);
  assert.match(readme, /Espaço Fit Academia/);
  assert.match(readme, /https:\/\/espaco-fit-academia-sjm\.vercel\.app\//);
  assert.match(layout, /Espaço Fit Academia/);
  assert.match(home, /Academia em São José da Mata/);
  assert.doesNotMatch(packageJson, /starter/i);
  assert.doesNotMatch(readme, /vinext-starter/i);
});

test("keeps the enrollment and WhatsApp conversion flow", async () => {
  const [enrollment, leadsApi, eventsApi] = await Promise.all([
    read("app/matricula/PlanSelector.tsx"),
    read("app/api/leads/route.ts"),
    read("app/api/events/route.ts"),
  ]);

  assert.match(enrollment, /\/api\/leads/);
  assert.match(enrollment, /wa\.me/);
  assert.match(enrollment, /Salvar e abrir o WhatsApp/);
  assert.match(leadsApi, /consent/);
  assert.match(leadsApi, /preferredDate/);
  assert.match(leadsApi, /delivery: "whatsapp"/);
  assert.match(eventsApi, /whatsapp_opened/);
});

test("protects the owner dashboard with an environment allowlist", async () => {
  const [managementPage, adminAuth, gitignore] = await Promise.all([
    read("app/gestao/page.tsx"),
    read("app/admin-auth.ts"),
    read(".gitignore"),
  ]);

  assert.match(managementPage, /requireChatGPTUser\("\/gestao"\)/);
  assert.match(managementPage, /getAdminUser\(\)/);
  assert.match(adminAuth, /ADMIN_EMAILS/);
  assert.match(adminAuth, /includes\(user\.email\.toLowerCase\(\)\)/);
  assert.match(gitignore, /^\.env\*/m);

  await assert.rejects(
    access(new URL("examples/d1/app/api/notes/route.ts", root)),
  );
});

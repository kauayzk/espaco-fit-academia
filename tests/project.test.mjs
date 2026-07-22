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

test("sends a validated enrollment to the academy WhatsApp", async () => {
  const [enrollment, leadsApi, eventsApi] = await Promise.all([
    read("app/matricula/PlanSelector.tsx"),
    read("app/api/leads/route.ts"),
    read("app/api/events/route.ts"),
  ]);

  assert.match(enrollment, /Salvar e abrir o WhatsApp/);
  assert.match(enrollment, /wa\.me\/5583998458019/);
  assert.match(enrollment, /Autorizo a Espaço Fit/);
  assert.match(leadsApi, /delivery: "whatsapp"/);
  assert.match(eventsApi, /whatsapp_opened/);
});

test("keeps the original centered hero compact and only one mega menu active", async () => {
  const [header, styles, motion] = await Promise.all([
    read("app/components/SiteHeader.tsx"),
    read("app/globals.css"),
    read("app/components/MotionShell.tsx"),
  ]);

  assert.match(header, /useState<MenuId \| null>/);
  assert.match(header, /aria-expanded=/);
  assert.match(styles, /\.mega-item:not\(\.is-open\) > \.mega-panel/);
  assert.match(styles, /\.ref-hero \{[\s\S]*min-height: auto/);
  assert.match(styles, /\.ref-hero \{[\s\S]*display: block/);
  assert.match(styles, /\.ref-orb \{[\s\S]*position: absolute/);
  assert.match(styles, /\.mobile-menu\.is-open nav/);
  assert.match(styles, /overflow-x: clip/);
  assert.match(styles, /\.motion-ready body::after \{[\s\S]*display: none !important/);
  assert.match(styles, /\.plan-card > \.plan-check,[\s\S]*\.plan-card > \.popular-tag \{[\s\S]*position: absolute/);
  assert.match(motion, /const revealMotions = \["up", "left", "scale", "right"\]/);
});

test("removes the redundant schedule and pricing image gallery", async () => {
  const home = await read("app/page.tsx");

  assert.doesNotMatch(home, /espaco-fit-horarios\.png/);
  assert.doesNotMatch(home, /espaco-fit-valores\.png/);
  assert.doesNotMatch(home, /gallery-content-note/);
});

test("credits the developer in every public footer", async () => {
  const footer = await read("app/components/SiteFooter.tsx");

  assert.match(footer, /Desenvolvido por Kauã Araujo/);
  assert.match(footer, /wa\.me\/5511977147610/);
  assert.match(footer, /Falar com Kauã Araujo pelo WhatsApp/);
  assert.doesNotMatch(footer, /Área do proprietário/);
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

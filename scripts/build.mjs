import { spawnSync } from "node:child_process";

const script = process.env.VERCEL === "1" ? "build:vercel" : "build:sites";
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const result = spawnSync(npm, ["run", script], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);

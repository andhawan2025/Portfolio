import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const root = process.cwd();
const marker = join(root, ".open-next", ".build", "open-next.config.edge.mjs");
const extraArgs = process.argv.slice(2);

function run(cmd, args) {
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: true,
    cwd: root,
    env: process.env,
  });
  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }
  const code = result.status ?? 0;
  if (code !== 0) process.exit(code);
}

if (!existsSync(marker)) {
  console.error(
    "OpenNext build output is missing (.open-next/.build/open-next.config.edge.mjs).",
  );
  console.error("Running `npx opennextjs-cloudflare build` before deploy.");
  run("npx", ["opennextjs-cloudflare", "build"]);
}

run("npx", ["opennextjs-cloudflare", "deploy", ...extraArgs]);

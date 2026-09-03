import path from "node:path";
import { fileURLToPath } from "node:url";
import { configFromFlags, parseCli } from "./args.ts";
import { generateProject } from "./generate.ts";
import { promptConfig } from "./prompts.ts";
import { formatSummary } from "./summary.ts";

const kitRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const cwd = process.cwd();

async function main() {
  const flags = parseCli(process.argv.slice(2));
  const cwd = process.cwd();
  const config = flags.yes
    ? configFromFlags(flags, cwd)
    : await promptConfig(flags, cwd);

  console.log(`\n${formatSummary(config)}\n`);
  generateProject(kitRoot, config);
  console.log(`Created ${config.outDir}`);
  console.log("Next: cd into the folder, copy .env.example to .env.local, then npm install && npm run dev");
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});

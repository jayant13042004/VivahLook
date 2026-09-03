import { alwaysDeps, extraDependencies } from "../catalog.ts";
import { writeFile } from "../fs.ts";
import type { ProjectConfig } from "../types.ts";

export function writePackageJson(outDir: string, config: ProjectConfig) {
  const extra = extraDependencies(config);
  const pkg = {
    name: config.slug,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "eslint",
    },
    dependencies: Object.fromEntries(
      Object.entries({ ...alwaysDeps.dependencies, ...extra }).sort(([a], [b]) =>
        a.localeCompare(b),
      ),
    ),
    devDependencies: alwaysDeps.devDependencies,
  };
  writeFile(outDir, "package.json", `${JSON.stringify(pkg, null, 2)}\n`);
}

export function writeNextConfig(outDir: string, config: ProjectConfig) {
  const mongo = config.mongodb
    ? `
  serverExternalPackages: ["mongodb"],`
    : "";
  writeFile(
    outDir,
    "next.config.ts",
    `import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },${mongo}
};

export default nextConfig;
`,
  );
}

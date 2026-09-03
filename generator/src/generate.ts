import fs from "node:fs";
import path from "node:path";
import { filesForConfig } from "./catalog.ts";
import { copyFiles, readKit, writeFile } from "./fs.ts";
import { hasAuth, type ProjectConfig } from "./types.ts";
import { writeLayout, writeContactActions, writeSitemapLib, writeMiddleware, writeNavbar } from "./writers/app.ts";
import { writeAuthSources } from "./writers/auth.ts";
import {
  writeAuthConfig,
  writeModulesConfig,
  writeNavigation,
  writeSeoConfig,
  writeSiteConfig,
} from "./writers/config.ts";
import { writeProjectDocs } from "./writers/docs.ts";
import { writeEnvExample } from "./writers/env.ts";
import { writeNextConfig, writePackageJson } from "./writers/package.ts";
import { writePaymentSources } from "./writers/payments.ts";

export function generateProject(kitRoot: string, config: ProjectConfig) {
  if (fs.existsSync(config.outDir) && fs.readdirSync(config.outDir).length > 0) {
    throw new Error(`Output directory is not empty: ${config.outDir}`);
  }

  fs.mkdirSync(config.outDir, { recursive: true });
  copyFiles(kitRoot, config.outDir, filesForConfig(config));
  patchPagesCopy(kitRoot, config);

  writePackageJson(config.outDir, config);
  writeNextConfig(config.outDir, config);
  writeEnvExample(config.outDir, config);
  writeSiteConfig(config.outDir, config);
  writeModulesConfig(config.outDir, config);
  writeNavigation(config.outDir, config);
  writeSeoConfig(config.outDir, config);
  writeAuthConfig(config.outDir, config);
  writeLayout(config.outDir, config);
  writeContactActions(config.outDir, config);
  writeSitemapLib(config.outDir, config);
  writeMiddleware(config.outDir, config);
  writeNavbar(config.outDir, config);
  writeAuthSources(config.outDir, config);
  writePaymentSources(kitRoot, config.outDir, config);
  writeProjectDocs(config.outDir, config);

  if (!hasAuth(config) && fs.existsSync(path.join(config.outDir, "src/middleware.ts"))) {
    throw new Error("middleware.ts should not exist without auth.");
  }
}

function patchPagesCopy(kitRoot: string, config: ProjectConfig) {
  let pages = readKit(kitRoot, "src/content/pages.ts");
  pages = pages.replaceAll("Personal Launch Engine", config.name);
  writeFile(config.outDir, "src/content/pages.ts", pages);
}

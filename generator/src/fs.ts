import fs from "node:fs";
import path from "node:path";

export function ensureDir(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

export function writeFile(root: string, relative: string, contents: string) {
  const dest = path.join(root, relative);
  ensureDir(dest);
  fs.writeFileSync(dest, contents.endsWith("\n") ? contents : `${contents}\n`);
}

export function copyFile(fromRoot: string, toRoot: string, relative: string) {
  const from = path.join(fromRoot, relative);
  const to = path.join(toRoot, relative);
  if (!fs.existsSync(from)) {
    throw new Error(`Template file missing: ${relative}`);
  }
  ensureDir(to);
  fs.copyFileSync(from, to);
}

export function copyFiles(fromRoot: string, toRoot: string, files: string[]) {
  for (const file of files) {
    copyFile(fromRoot, toRoot, file);
  }
}

export function readKit(kitRoot: string, relative: string) {
  return fs.readFileSync(path.join(kitRoot, relative), "utf8");
}

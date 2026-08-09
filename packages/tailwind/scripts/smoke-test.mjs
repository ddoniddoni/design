import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const packageDir = resolve(scriptsDir, "..");
const rootDir = resolve(packageDir, "..", "..");
const fixturePath = join(scriptsDir, "tailwind-fixture.css");
const tailwindCliPath = join(rootDir, "node_modules", "@tailwindcss", "cli", "dist", "index.mjs");
const temporaryDir = await mkdtemp(join(tmpdir(), "ddoni-tailwind-"));
const outputPath = join(temporaryDir, "utilities.css");
const requiredUtilities = [
  ".bg-dds-canvas",
  ".bg-dds-surface",
  ".text-dds-text",
  ".text-dds-text-muted",
  ".border-dds-border",
  ".rounded-dds-control",
  ".shadow-dds-md",
  ".p-dds-4",
  ".w-full",
  ".mt-4",
  ".relative",
];

try {
  const command = spawnSync(
    process.execPath,
    [tailwindCliPath, "-i", fixturePath, "-o", outputPath],
    {
      cwd: packageDir,
      encoding: "utf8",
    },
  );

  if (command.status !== 0) {
    throw new Error(`Tailwind CLI failed:\n${command.stderr || command.stdout}`);
  }

  const utilitiesCss = await readFile(outputPath, "utf8");

  for (const utility of requiredUtilities) {
    if (!utilitiesCss.includes(utility)) {
      throw new Error(`Missing Tailwind utility output: ${utility}`);
    }
  }
} finally {
  await rm(temporaryDir, { force: true, recursive: true });
}

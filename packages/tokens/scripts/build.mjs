import { spawn } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const packageDirectory = fileURLToPath(new URL("..", import.meta.url));
const distDirectory = fileURLToPath(new URL("../dist", import.meta.url));
const sassCommand = process.platform === "win32" ? "sass.cmd" : "sass";

await rm(distDirectory, { force: true, recursive: true });
await mkdir(distDirectory, { recursive: true });

await new Promise((resolve, reject) => {
  const child = spawn(
    sassCommand,
    ["src/index.scss", "dist/tokens.css", "--style=compressed", "--no-source-map"],
    {
      cwd: packageDirectory,
      stdio: "inherit",
    },
  );

  child.once("error", reject);
  child.once("exit", (code) => {
    if (code === 0) {
      resolve();
      return;
    }

    reject(new Error(`Sass exited with code ${code ?? "unknown"}.`));
  });
});

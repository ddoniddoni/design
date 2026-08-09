import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const tokensPath = fileURLToPath(new URL("../dist/tokens.css", import.meta.url));
const tokensCss = await readFile(tokensPath, "utf8");
const requiredTokens = [
  "--dds-color-brand-600",
  "--dds-color-text-primary",
  "--dds-control-radius",
];

for (const token of requiredTokens) {
  if (!tokensCss.includes(token)) {
    throw new Error(`Missing required token output: ${token}`);
  }
}

for (const theme of ["dark", "system"]) {
  const themeSelector = new RegExp(`\\[data-dds-theme=(?:"${theme}"|${theme})\\]`);

  if (!themeSelector.test(tokensCss)) {
    throw new Error(`Missing required theme selector: ${theme}`);
  }
}

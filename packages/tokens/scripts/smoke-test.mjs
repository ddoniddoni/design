import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const tokensPath = fileURLToPath(new URL("../dist/tokens.css", import.meta.url));
const tokensCss = await readFile(tokensPath, "utf8");
const requiredTokens = [
  "--dds-color-brand-600",
  "--dds-color-text-primary",
  "--dds-control-radius",
  "--dds-font-family-sans",
  "--dds-checkbox-indicator",
  "--dds-radio-indicator",
  "--dds-switch-thumb-bg",
  "--dds-tabs-border",
  "--dds-tabs-active-border",
  "--dds-tabs-active-text",
  "--dds-accordion-border",
  "--dds-accordion-trigger-hover-bg",
  "--dds-accordion-trigger-open-bg",
  "--dds-popover-bg",
  "--dds-popover-border",
  "--dds-popover-radius",
  "--dds-popover-shadow",
  "--dds-toast-bg",
  "--dds-toast-text",
  "--dds-toast-border",
  "--dds-toast-radius",
  "--dds-toast-shadow",
  "--dds-toast-neutral-accent",
  "--dds-toast-success-accent",
  "--dds-toast-warning-accent",
  "--dds-toast-danger-accent",
  "--dds-toast-info-accent",
  "--dds-skeleton-bg",
  "--dds-skeleton-highlight",
  "--dds-skeleton-radius",
  "--dds-select-bg",
  "--dds-select-text",
  "--dds-select-placeholder",
  "--dds-select-border",
  "--dds-select-border-hover",
  "--dds-select-border-focus",
  "--dds-select-disabled-bg",
  "--dds-select-disabled-text",
  "--dds-select-content-bg",
  "--dds-select-content-border",
  "--dds-select-content-radius",
  "--dds-select-content-shadow",
  "--dds-select-item-highlight-bg",
  "--dds-select-item-selected-text",
  "--dds-pagination-bg",
  "--dds-pagination-text",
  "--dds-pagination-border",
  "--dds-pagination-hover-bg",
  "--dds-pagination-current-bg",
  "--dds-pagination-current-text",
  "--dds-pagination-current-border",
  "--dds-table-bg",
  "--dds-table-text",
  "--dds-table-border",
  "--dds-table-caption-text",
  "--dds-table-header-bg",
  "--dds-table-header-text",
  "--dds-table-row-hover-bg",
  "--dds-empty-state-bg",
  "--dds-empty-state-text",
  "--dds-empty-state-description-text",
  "--dds-empty-state-border",
  "--dds-empty-state-radius",
  "--dds-empty-state-icon-bg",
  "--dds-empty-state-icon-text",
  "--dds-filter-bar-bg",
  "--dds-filter-bar-text",
  "--dds-filter-bar-border",
  "--dds-filter-bar-radius",
];

const expectedBrandPalette = new Map([
  ["--dds-color-brand-50", "#eff6ff"],
  ["--dds-color-brand-100", "#dbeafe"],
  ["--dds-color-brand-200", "#bfdbfe"],
  ["--dds-color-brand-300", "#93c5fd"],
  ["--dds-color-brand-400", "#60a5fa"],
  ["--dds-color-brand-500", "#2f6fed"],
  ["--dds-color-brand-600", "#2563eb"],
  ["--dds-color-brand-700", "#1d4ed8"],
  ["--dds-color-brand-800", "#1e40af"],
  ["--dds-color-brand-900", "#1e3a8a"],
  ["--dds-color-brand-950", "#172554"],
]);

for (const token of requiredTokens) {
  if (!tokensCss.includes(token)) {
    throw new Error(`Missing required token output: ${token}`);
  }
}

function readTokenValue(token) {
  const match = tokensCss.match(new RegExp(`${token}:([^;}]+)`));

  if (!match?.[1]) {
    throw new Error(`Missing token value: ${token}`);
  }

  return match[1];
}

for (const [token, expectedValue] of expectedBrandPalette) {
  const actualValue = readTokenValue(token);

  if (actualValue !== expectedValue) {
    throw new Error(`Unexpected brand token value: ${token}=${actualValue}`);
  }
}

function relativeLuminance(hexColor) {
  const hex = hexColor.slice(1);
  const normalized = hex.length === 3 ? [...hex].map((value) => value.repeat(2)).join("") : hex;
  const channels = normalized.match(/.{2}/g)?.map((value) => Number.parseInt(value, 16) / 255);

  if (!channels || channels.length !== 3) {
    throw new Error(`Unsupported color value: ${hexColor}`);
  }

  const [red, green, blue] = channels.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(firstColor, secondColor) {
  const lighter = Math.max(relativeLuminance(firstColor), relativeLuminance(secondColor));
  const darker = Math.min(relativeLuminance(firstColor), relativeLuminance(secondColor));

  return (lighter + 0.05) / (darker + 0.05);
}

const contrastChecks = [
  ["primary foreground", "--dds-color-neutral-0", "--dds-color-brand-600", 4.5],
  ["dark surface control", "--dds-color-brand-600", "--dds-color-neutral-900", 3],
  ["primary hover foreground", "--dds-color-neutral-0", "--dds-color-brand-500", 4.5],
  ["dark hover control", "--dds-color-brand-500", "--dds-color-neutral-900", 3],
  ["dark focus ring", "--dds-color-brand-400", "--dds-color-neutral-900", 3],
  ["dark accent foreground", "--dds-color-brand-300", "--dds-color-neutral-800", 4.5],
];

for (const [label, foregroundToken, backgroundToken, minimumRatio] of contrastChecks) {
  const ratio = contrastRatio(readTokenValue(foregroundToken), readTokenValue(backgroundToken));

  if (ratio < minimumRatio) {
    throw new Error(`${label} contrast ${ratio.toFixed(2)} is below ${minimumRatio}:1`);
  }
}

const darkThemeBlock = tokensCss.match(/\[data-dds-theme=(?:"dark"|dark)\]\{([^}]*)\}/)?.[1];

if (!darkThemeBlock?.includes("--dds-color-action-primary-text:var(--dds-color-neutral-0)")) {
  throw new Error("Dark primary foreground must use the white neutral token.");
}

if (!darkThemeBlock.includes("--dds-color-text-link:var(--dds-color-brand-300)")) {
  throw new Error("Dark accent foreground must use the high-contrast link text token.");
}

if (
  !darkThemeBlock.includes("--dds-accordion-trigger-open-bg:var(--dds-color-bg-surface-elevated)")
) {
  throw new Error("Dark theme must redefine Accordion open background component tokens.");
}

for (const token of [
  "--dds-button-primary-bg",
  "--dds-input-bg",
  "--dds-tabs-active-text",
  "--dds-select-item-selected-text",
  "--dds-dialog-bg",
  "--dds-tooltip-bg",
  "--dds-pagination-bg",
  "--dds-table-bg",
  "--dds-empty-state-bg",
  "--dds-filter-bar-bg",
]) {
  if (!darkThemeBlock.includes(token)) {
    throw new Error(`Dark theme must redefine component token: ${token}`);
  }
}

for (const token of [
  "--dds-checkbox-indicator",
  "--dds-radio-indicator",
  "--dds-switch-thumb-bg",
]) {
  if (readTokenValue(token) !== "var(--dds-color-neutral-0)") {
    throw new Error(`${token} must use the white neutral token.`);
  }
}

if (!tokensCss.includes("Pretendard")) {
  throw new Error("The sans-serif token must prefer Pretendard.");
}

for (const theme of ["dark", "system"]) {
  const themeSelector = new RegExp(`\\[data-dds-theme=(?:"${theme}"|${theme})\\]`);

  if (!themeSelector.test(tokensCss)) {
    throw new Error(`Missing required theme selector: ${theme}`);
  }
}

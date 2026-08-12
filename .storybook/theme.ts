import { create } from "storybook/theming";

export const ddoniStorybookTheme = create({
  base: "light",
  brandTitle: "DDoni Design System",
  brandTarget: "_self",
  brandUrl: "/",
  fontBase:
    'Pretendard, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
  colorPrimary: "#2563eb",
  colorSecondary: "#1d4ed8",
  appBg: "#f8fafc",
  appContentBg: "#ffffff",
  appPreviewBg: "#f8fafc",
  appBorderColor: "#e2e8f0",
  appBorderRadius: 8,
  textColor: "#0f172a",
  textInverseColor: "#ffffff",
  barTextColor: "#475569",
  barSelectedColor: "#1d4ed8",
  barHoverColor: "#1d4ed8",
  barBg: "#ffffff",
  inputBg: "#ffffff",
  inputBorder: "#cbd5e1",
  inputTextColor: "#0f172a",
  inputBorderRadius: 8,
});

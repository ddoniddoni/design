import type { Preview } from "@storybook/react-vite";
import "./preview.css";
import "../packages/tokens/src/index.scss";

const themeOptions = ["light", "dark", "system"] as const;
type ThemeOption = (typeof themeOptions)[number];

function getThemeOption(value: unknown): ThemeOption {
  return themeOptions.includes(value as ThemeOption) ? (value as ThemeOption) : "light";
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "DDoni Design System theme",
      defaultValue: "light",
      toolbar: {
        dynamicTitle: true,
        icon: "mirror",
        items: [...themeOptions],
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.ddsTheme = getThemeOption(context.globals.theme);

      return Story();
    },
  ],
  parameters: {
    a11y: {
      test: "todo",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

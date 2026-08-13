import type { Preview } from "@storybook/react-vite";
import "./preview.css";
import "../packages/tokens/src/index.scss";
import { DDoniDocsPage } from "./docs/DocsPage";
import { ddoniStorybookTheme } from "./theme";

const themeOptions = ["light", "dark", "system"] as const;
type ThemeOption = (typeof themeOptions)[number];

function getThemeOption(value: unknown): ThemeOption {
  return themeOptions.includes(value as ThemeOption) ? (value as ThemeOption) : "light";
}

const preview: Preview = {
  tags: ["autodocs"],
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
    docs: {
      page: DDoniDocsPage,
      theme: ddoniStorybookTheme,
      toc: {
        headingSelector: "h2",
        ignoreSelector: ".docs-story *, .skip-toc",
        title: "On this page",
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Overview",
          "Foundations",
          ["Colors", "Typography", "Spacing", "Radius", "Shadows", "Motion"],
          "Components",
          [
            "Actions",
            ["Button", "IconButton"],
            "Forms",
            [
              "Field",
              "Input",
              "Textarea",
              "Checkbox",
              "RadioGroup",
              "Select",
              "Switch",
              "FilterBar",
            ],
            "Layout",
            ["Card", "PageHeader"],
            "Navigation",
            ["Breadcrumb", "Accordion", "Tabs", "Pagination"],
            "Data Display",
            ["Avatar", "Badge", "Table"],
            "Feedback",
            ["Alert", "Progress", "EmptyState", "Skeleton", "Spinner", "Toast"],
            "Overlays",
            ["Dialog", "DropdownMenu", "Popover", "Tooltip"],
          ],
        ],
      },
    },
  },
};

export default preview;

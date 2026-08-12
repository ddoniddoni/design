import type { StorybookConfig } from "@storybook/react-vite";

const config = {
  stories: ["../packages/ui/src/**/*.mdx", "../packages/ui/src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  docs: {
    defaultName: "문서",
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
} satisfies StorybookConfig;

export default config;

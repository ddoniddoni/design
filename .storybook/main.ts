import type { StorybookConfig } from "@storybook/react-vite";

function getGitHubPagesBasePath(): string {
  const repository = process.env.GITHUB_REPOSITORY;

  if (!repository) {
    return "/";
  }

  const [owner, repositoryName] = repository.split("/");

  if (!owner || !repositoryName || repositoryName === `${owner}.github.io`) {
    return "/";
  }

  return `/${repositoryName}/`;
}

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
  viteFinal: async (viteConfig) => {
    if (process.env.GITHUB_PAGES !== "true") {
      return viteConfig;
    }

    return {
      ...viteConfig,
      base: getGitHubPagesBasePath(),
    };
  },
} satisfies StorybookConfig;

export default config;

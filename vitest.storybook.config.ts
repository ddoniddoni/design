import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

export default defineConfig({
  test: {
    projects: (["light", "dark"] as const).map((theme) => ({
      plugins: [
        storybookTest({
          configDir: fileURLToPath(new URL("./.storybook", import.meta.url)),
          initialGlobals: { theme },
        }),
      ],
      test: {
        name: `storybook-${theme}`,
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({ contextOptions: { colorScheme: theme } }),
          instances: [{ browser: "chromium" }],
        },
      },
    })),
  },
});

import { addons } from "storybook/manager-api";
import { ddoniStorybookTheme } from "./theme";

addons.setConfig({
  theme: ddoniStorybookTheme,
  sidebar: {
    showRoots: true,
  },
});

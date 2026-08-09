import type { Meta, StoryObj } from "@storybook/react-vite";
import { componentDocs } from "../../stories/internal/componentDocs";
import { expect, within } from "storybook/test";
import { IconButton } from "../IconButton/IconButton";
import { Tooltip } from "./Tooltip";

function HelpTooltip() {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <IconButton aria-label="도움말" icon={<span>?</span>} variant="outline" />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content>
            이 설정은 다음 배포부터 적용됩니다.
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

const meta = {
  title: "Components/Overlays/Tooltip",
  component: Tooltip.Content,
  parameters: {
    a11y: { test: "error" },
    docs: {
      description: {
        component: componentDocs.tooltip,
      },
    },
  },
} satisfies Meta<typeof Tooltip.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <HelpTooltip />,
};

export const Interaction: Story = {
  render: () => <HelpTooltip />,
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "도움말" });

    await userEvent.hover(trigger);
    await expect(within(document.body).getByRole("tooltip")).toBeInTheDocument();
  },
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <HelpTooltip />
    </div>
  ),
};

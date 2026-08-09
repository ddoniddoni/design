import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { IconButton } from "./IconButton";

const meta = {
  title: "Components/Actions/IconButton",
  component: IconButton,
  args: {
    "aria-label": "메뉴 열기",
    icon: <span aria-hidden="true">☰</span>,
    onClick: fn(),
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    tone: { control: "select", options: ["primary", "neutral", "danger"] },
    variant: { control: "select", options: ["solid", "outline", "ghost"] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--dds-space-2)" }}>
      <IconButton aria-label="작은 메뉴 열기" icon={<span aria-hidden="true">☰</span>} size="sm" />
      <IconButton aria-label="메뉴 열기" icon={<span aria-hidden="true">☰</span>} size="md" />
      <IconButton aria-label="큰 메뉴 열기" icon={<span aria-hidden="true">☰</span>} size="lg" />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Interaction: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "메뉴 열기" }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

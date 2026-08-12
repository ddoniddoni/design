import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Components/Actions/Button",
  component: Button,
  tags: ["!autodocs"],
  args: {
    children: "저장",
    onClick: fn(),
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    tone: { control: "select", options: ["primary", "neutral", "danger"] },
    variant: { control: "select", options: ["solid", "outline", "ghost"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const rowStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "var(--dds-space-2)",
};

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={rowStyle}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const AllTones: Story = {
  render: () => (
    <div style={rowStyle}>
      <Button tone="primary">Primary</Button>
      <Button tone="neutral">Neutral</Button>
      <Button tone="danger">Danger</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={rowStyle}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    leadingIcon: <span aria-hidden="true">←</span>,
    trailingIcon: <span aria-hidden="true">→</span>,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const LongText: Story = {
  args: {
    children: "변경 사항을 저장하고 다음 단계로 진행합니다",
  },
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <Button>저장</Button>
    </div>
  ),
};

export const Interaction: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "저장" }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

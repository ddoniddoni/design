import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Data Display/Badge",
  component: Badge,
  tags: ["!autodocs"],
  args: {
    children: "배지",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "danger", "info"],
    },
    variant: { control: "select", options: ["solid", "soft", "outline"] },
  },
} satisfies Meta<typeof Badge>;

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
      <Badge variant="solid">Solid</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const AllTones: Story = {
  render: () => (
    <div style={rowStyle}>
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="primary">Primary</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="danger">Danger</Badge>
      <Badge tone="info">Info</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  args: {
    dot: true,
    tone: "success",
    children: "완료",
  },
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <Badge tone="success">완료</Badge>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const portraitSrc = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="#dbeafe"/><circle cx="40" cy="30" r="15" fill="#eff6ff"/><path d="M12 80c4-19 15-29 28-29s24 10 28 29" fill="#2f6fed"/></svg>',
)}`;

const meta = {
  title: "Components/Data Display/Avatar",
  component: Avatar,
  parameters: {
    a11y: { test: "error" },
  },
  tags: ["!autodocs"],
  args: {
    alt: "김도니",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const rowStyle = {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "var(--dds-space-3)",
};

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={rowStyle}>
      <Avatar alt="김도니" size="sm" />
      <Avatar alt="김도니" size="md" />
      <Avatar alt="김도니" size="lg" />
    </div>
  ),
};

export const ImageAndFallback: Story = {
  render: () => (
    <div style={rowStyle}>
      <Avatar alt="DDoni profile" src={portraitSrc} />
      <Avatar alt="김도니" fallback="도니" />
    </div>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <div style={rowStyle}>
        <Avatar alt="김도니" size="md" />
        <Avatar alt="DDoni profile" size="lg" src={portraitSrc} />
      </div>
    </div>
  ),
};

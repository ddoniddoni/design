import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

function ProfilePreview() {
  return (
    <div
      aria-busy="true"
      aria-label="프로필 정보를 불러오는 중"
      style={{ display: "grid", gap: "var(--dds-space-4)", maxInlineSize: "360px" }}
    >
      <div style={{ alignItems: "center", display: "flex", gap: "var(--dds-space-3)" }}>
        <Skeleton shape="circle" />
        <div style={{ display: "grid", flex: "1", gap: "var(--dds-space-2)" }}>
          <Skeleton style={{ inlineSize: "45%" }} />
          <Skeleton style={{ inlineSize: "75%" }} />
        </div>
      </div>
      <Skeleton shape="rect" style={{ minBlockSize: "120px" }} />
    </div>
  );
}

const meta = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  tags: ["!autodocs"],
  argTypes: {
    shape: { control: "select", options: ["text", "circle", "rect"] },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Shapes: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: "var(--dds-space-3)" }}>
      <Skeleton style={{ inlineSize: "8rem" }} />
      <Skeleton shape="circle" />
      <Skeleton shape="rect" style={{ inlineSize: "8rem" }} />
    </div>
  ),
};

export const ContentPreview: Story = {
  render: () => <ProfilePreview />,
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <ProfilePreview />
    </div>
  ),
};

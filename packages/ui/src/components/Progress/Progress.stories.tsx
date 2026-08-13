import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";

const meta = {
  title: "Components/Feedback/Progress",
  component: Progress,
  parameters: {
    a11y: { test: "error" },
  },
  tags: ["!autodocs"],
  args: {
    "aria-label": "파일 업로드 진행률",
    value: 64,
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

const stackStyle = {
  display: "grid",
  gap: "var(--dds-space-4)",
};

export const Playground: Story = {};

export const Values: Story = {
  render: () => (
    <div style={stackStyle}>
      <Progress aria-label="프로젝트 설정 20% 완료" value={20} />
      <Progress aria-label="프로젝트 설정 64% 완료" value={64} />
      <Progress aria-label="프로젝트 설정 완료" value={100} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={stackStyle}>
      <Progress aria-label="작은 진행률" size="sm" value={64} />
      <Progress aria-label="기본 진행률" size="md" value={64} />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => <Progress aria-label="파일을 준비하는 중" />,
};

export const ValueText: Story = {
  render: () => (
    <Progress aria-label="프로젝트 설정 진행률" aria-valuetext="설정 단계 3/5 완료" value={60} />
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <Progress aria-label="다크 테마 프로젝트 설정 64% 완료" value={64} />
    </div>
  ),
};

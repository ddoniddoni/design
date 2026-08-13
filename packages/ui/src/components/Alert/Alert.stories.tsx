import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import type { AlertRootProps } from "./Alert";
import { Alert } from "./Alert";

function ProjectNotice({ tone = "info", ...props }: AlertRootProps) {
  return (
    <Alert.Root {...props} tone={tone}>
      <Alert.Title>프로젝트 공개 범위가 변경되었습니다</Alert.Title>
      <Alert.Description>이제 링크를 아는 사용자는 프로젝트를 볼 수 있습니다.</Alert.Description>
    </Alert.Root>
  );
}

const meta = {
  title: "Components/Feedback/Alert",
  component: Alert.Root,
  parameters: {
    a11y: { test: "error" },
  },
  tags: ["!autodocs"],
  args: {
    tone: "info",
  },
  argTypes: {
    tone: { control: "select", options: ["info", "success", "warning", "danger"] },
  },
} satisfies Meta<typeof Alert.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <ProjectNotice {...args} />,
};

export const AllTones: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--dds-space-3)" }}>
      <ProjectNotice tone="info" />
      <Alert.Root tone="success">
        <Alert.Title>프로젝트를 저장했습니다</Alert.Title>
        <Alert.Description>모든 변경사항이 팀원에게 반영되었습니다.</Alert.Description>
      </Alert.Root>
      <Alert.Root tone="warning">
        <Alert.Title>저장하지 않은 변경사항이 있습니다</Alert.Title>
        <Alert.Description>페이지를 나가기 전에 변경사항을 저장하세요.</Alert.Description>
      </Alert.Root>
      <Alert.Root tone="danger">
        <Alert.Title>동기화에 실패했습니다</Alert.Title>
        <Alert.Description>네트워크 연결을 확인한 뒤 다시 시도하세요.</Alert.Description>
      </Alert.Root>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Alert.Root tone="danger">
      <Alert.Title>동기화에 실패했습니다</Alert.Title>
      <Alert.Description>네트워크 연결을 확인한 뒤 다시 시도하세요.</Alert.Description>
      <Alert.Actions>
        <Button size="sm">다시 시도</Button>
        <Button size="sm" tone="neutral" variant="outline">
          자세히 보기
        </Button>
      </Alert.Actions>
    </Alert.Root>
  ),
};

export const AssertiveAnnouncement: Story = {
  render: () => (
    <Alert.Root role="alert" tone="danger">
      <Alert.Title>필수 입력값을 확인하세요</Alert.Title>
      <Alert.Description>저장하기 전에 오류가 있는 항목을 수정해야 합니다.</Alert.Description>
    </Alert.Root>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <ProjectNotice tone="info" />
    </div>
  ),
};

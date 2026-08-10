import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { componentDocs } from "../../stories/internal/componentDocs";
import { Tabs } from "./Tabs";

function TabPanels() {
  return (
    <>
      <Tabs.List aria-label="프로젝트 설정">
        <Tabs.Trigger value="overview">개요</Tabs.Trigger>
        <Tabs.Trigger value="members">멤버</Tabs.Trigger>
        <Tabs.Trigger value="activity">활동</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">프로젝트의 기본 정보와 상태를 확인합니다.</Tabs.Content>
      <Tabs.Content value="members">프로젝트에 참여한 멤버를 관리합니다.</Tabs.Content>
      <Tabs.Content value="activity">최근 프로젝트 활동을 확인합니다.</Tabs.Content>
    </>
  );
}

function ControlledExample() {
  const [value, setValue] = useState("overview");

  return (
    <Tabs.Root value={value} onValueChange={setValue}>
      <TabPanels />
    </Tabs.Root>
  );
}

const meta = {
  title: "Components/Navigation/Tabs",
  component: Tabs.Root,
  parameters: { docs: { description: { component: componentDocs.tabs } } },
  args: {
    defaultValue: "overview",
    onValueChange: fn(),
  },
} satisfies Meta<typeof Tabs.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Tabs.Root {...args}>
      <TabPanels />
    </Tabs.Root>
  ),
};

export const Interaction: Story = {
  render: (args) => (
    <Tabs.Root {...args}>
      <TabPanels />
    </Tabs.Root>
  ),
  play: async ({ args, canvas, userEvent }) => {
    const members = canvas.getByRole("tab", { name: "멤버" });

    await userEvent.click(members);
    await expect(members).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent("프로젝트에 참여한 멤버");
    await expect(args.onValueChange).toHaveBeenCalledWith("members");
  },
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const Disabled: Story = {
  render: () => (
    <Tabs.Root defaultValue="overview">
      <Tabs.List aria-label="비활성 프로젝트 설정">
        <Tabs.Trigger value="overview">개요</Tabs.Trigger>
        <Tabs.Trigger disabled value="members">
          멤버
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">프로젝트의 기본 정보입니다.</Tabs.Content>
      <Tabs.Content value="members">프로젝트 멤버입니다.</Tabs.Content>
    </Tabs.Root>
  ),
};

export const LongLabels: Story = {
  render: () => (
    <Tabs.Root defaultValue="overview">
      <Tabs.List aria-label="긴 프로젝트 설정 탭">
        <Tabs.Trigger value="overview">프로젝트 기본 정보와 공개 범위</Tabs.Trigger>
        <Tabs.Trigger value="members">팀 멤버와 권한 관리</Tabs.Trigger>
        <Tabs.Trigger value="activity">최근 활동 및 변경 기록</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">긴 label도 가로 스크롤로 안전하게 표시합니다.</Tabs.Content>
      <Tabs.Content value="members">멤버와 권한 내용을 표시합니다.</Tabs.Content>
      <Tabs.Content value="activity">활동 기록을 표시합니다.</Tabs.Content>
    </Tabs.Root>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <Tabs.Root defaultValue="overview">
        <TabPanels />
      </Tabs.Root>
    </div>
  ),
};

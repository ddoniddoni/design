import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { componentDocs } from "../../stories/internal/componentDocs";
import { Button } from "../Button/Button";
import { Toast } from "./Toast";

function ToastExample({ tone = "success" }: { tone?: "success" | "warning" | "danger" | "info" }) {
  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider duration={5_000} label="프로젝트 알림">
      <Button onClick={() => setOpen(true)}>Toast 표시</Button>
      <Toast.Root open={open} onOpenChange={setOpen} tone={tone} type="background">
        <Toast.Title>프로젝트 설정을 저장했습니다.</Toast.Title>
        <Toast.Description>변경사항은 팀원에게 바로 반영됩니다.</Toast.Description>
        <Toast.Action altText="저장 변경을 실행 취소합니다." asChild>
          <Button size="sm" tone="neutral" variant="outline">
            실행 취소
          </Button>
        </Toast.Action>
        <Toast.Close aria-label="프로젝트 알림 닫기">닫기</Toast.Close>
      </Toast.Root>
      <Toast.Viewport label="프로젝트 알림 ({hotkey})" />
    </Toast.Provider>
  );
}

function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider duration={5_000}>
      <Button tone="neutral" variant="outline" onClick={() => setOpen(true)}>
        제어된 Toast 열기
      </Button>
      <Toast.Root open={open} onOpenChange={setOpen} tone="info" type="background">
        <Toast.Title>동기화가 완료되었습니다.</Toast.Title>
        <Toast.Description>Root의 open과 onOpenChange로 상태를 제어합니다.</Toast.Description>
        <Toast.Close aria-label="동기화 알림 닫기">닫기</Toast.Close>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
}

const meta = {
  title: "Components/Feedback/Toast",
  component: Toast.Root,
  parameters: {
    a11y: { test: "error" },
    docs: { description: { component: componentDocs.toast } },
  },
} satisfies Meta<typeof Toast.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <ToastExample />,
};

export const Interaction: Story = {
  render: () => <ToastExample />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Toast 표시" }));

    const toast = await within(document.body).findByText("프로젝트 설정을 저장했습니다.");
    await expect(toast).toBeVisible();

    await userEvent.click(
      within(document.body).getByRole("button", { name: "프로젝트 알림 닫기" }),
    );
    await expect(
      within(document.body).queryByText("프로젝트 설정을 저장했습니다."),
    ).not.toBeInTheDocument();
  },
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const Tones: Story = {
  render: () => (
    <Toast.Provider duration={60_000}>
      <Toast.Root defaultOpen tone="success" type="background">
        <Toast.Title>성공</Toast.Title>
        <Toast.Description>저장 작업이 완료되었습니다.</Toast.Description>
      </Toast.Root>
      <Toast.Root defaultOpen tone="info" type="background">
        <Toast.Title>안내</Toast.Title>
        <Toast.Description>새로운 동기화가 시작되었습니다.</Toast.Description>
      </Toast.Root>
      <Toast.Root defaultOpen tone="warning" type="background">
        <Toast.Title>주의</Toast.Title>
        <Toast.Description>저장하지 않은 변경사항이 있습니다.</Toast.Description>
      </Toast.Root>
      <Toast.Root defaultOpen tone="danger" type="background">
        <Toast.Title>오류</Toast.Title>
        <Toast.Description>프로젝트를 저장하지 못했습니다.</Toast.Description>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <ToastExample />
    </div>
  ),
};

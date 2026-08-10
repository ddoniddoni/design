import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { componentDocs } from "../../stories/internal/componentDocs";
import { Button } from "../Button/Button";
import { Popover } from "./Popover";

function SharePopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button tone="neutral" variant="outline">
          공유 옵션
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content aria-label="공유 옵션">
          <div>프로젝트 링크를 복사하거나 팀원에게 공유할 수 있습니다.</div>
          <Popover.Close asChild>
            <Button size="sm">링크 복사</Button>
          </Popover.Close>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button tone="neutral" variant="outline">
          제어된 Popover 열기
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content aria-label="제어된 Popover">
          <div>Root의 open과 onOpenChange로 표시 상태를 제어합니다.</div>
          <Popover.Close asChild>
            <Button size="sm" tone="neutral" variant="ghost">
              닫기
            </Button>
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

const meta = {
  title: "Components/Overlays/Popover",
  component: Popover.Content,
  parameters: {
    a11y: { test: "error" },
    docs: { description: { component: componentDocs.popover } },
  },
} satisfies Meta<typeof Popover.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <SharePopover />,
};

export const Interaction: Story = {
  render: () => <SharePopover />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "공유 옵션" });

    await userEvent.click(trigger);
    const popover = await within(document.body).findByRole("dialog", { name: "공유 옵션" });
    await expect(popover).toHaveTextContent(
      "프로젝트 링크를 복사하거나 팀원에게 공유할 수 있습니다.",
    );

    await userEvent.keyboard("{Escape}");
    await expect(
      within(document.body).queryByRole("dialog", { name: "공유 옵션" }),
    ).not.toBeInTheDocument();
    await expect(trigger).toHaveFocus();
  },
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const WithAnchor: Story = {
  render: () => (
    <Popover.Root>
      <div style={{ display: "flex", gap: "var(--dds-space-3)" }}>
        <Popover.Anchor>프로젝트 상태</Popover.Anchor>
        <Popover.Trigger asChild>
          <Button size="sm" tone="neutral" variant="outline">
            상세 보기
          </Button>
        </Popover.Trigger>
      </div>
      <Popover.Portal>
        <Popover.Content aria-label="프로젝트 상태">
          <div>Anchor를 사용하면 Trigger와 다른 요소를 기준으로 Popover를 배치할 수 있습니다.</div>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <SharePopover />
    </div>
  ),
};

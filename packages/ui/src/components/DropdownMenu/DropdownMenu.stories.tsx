import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { componentDocs } from "../../stories/internal/componentDocs";
import { expect, within } from "storybook/test";
import { Button } from "../Button/Button";
import type { CheckboxCheckedState } from "../Checkbox/Checkbox";
import { DropdownMenu } from "./DropdownMenu";

function ProjectMenu() {
  const [notifications, setNotifications] = useState<CheckboxCheckedState>(true);
  const [sort, setSort] = useState("recent");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">프로젝트 메뉴</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.Label>프로젝트</DropdownMenu.Label>
          <DropdownMenu.Group>
            <DropdownMenu.Item shortcut="⌘E">편집</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘D">복제</DropdownMenu.Item>
            <DropdownMenu.Item disabled>공유</DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.CheckboxItem checked={notifications} onCheckedChange={setNotifications}>
            알림 받기
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.RadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenu.Label>정렬</DropdownMenu.Label>
            <DropdownMenu.RadioItem value="recent">최근 순</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="name">이름 순</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
          <DropdownMenu.Separator />
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>내보내기</DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>PDF</DropdownMenu.Item>
                <DropdownMenu.Item>CSV</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
          <DropdownMenu.Separator />
          <DropdownMenu.Item tone="danger">프로젝트 삭제</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const meta = {
  title: "Components/Overlays/DropdownMenu",
  component: DropdownMenu.Content,
  parameters: {
    a11y: { test: "error" },
    docs: { description: { component: componentDocs.dropdownMenu } },
  },
} satisfies Meta<typeof DropdownMenu.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <ProjectMenu />,
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <ProjectMenu />
    </div>
  ),
};

export const Interaction: Story = {
  render: () => <ProjectMenu />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "프로젝트 메뉴" });

    await userEvent.click(trigger);
    await expect(within(document.body).getByRole("menu")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    await expect(within(document.body).queryByRole("menu")).not.toBeInTheDocument();
    await expect(trigger).toHaveFocus();
  },
};

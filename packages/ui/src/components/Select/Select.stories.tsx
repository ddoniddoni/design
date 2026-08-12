import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { componentDocs } from "../../stories/internal/componentDocs";
import { Select } from "./Select";
import type { SelectRootProps } from "./Select";

function ProjectScopeOptions() {
  return (
    <>
      <Select.Group>
        <Select.Label>프로젝트 공개 범위</Select.Label>
        <Select.Item value="team">팀 전용</Select.Item>
        <Select.Item value="public">공개</Select.Item>
        <Select.Item disabled value="private">
          비공개
        </Select.Item>
      </Select.Group>
      <Select.Separator />
      <Select.Group>
        <Select.Label>초대</Select.Label>
        <Select.Item value="invite">초대받은 사용자</Select.Item>
      </Select.Group>
    </>
  );
}

function ProjectScopeSelect(props: SelectRootProps) {
  return (
    <Select.Root {...props}>
      <label htmlFor="project-scope">프로젝트 공개 범위</label>
      <Select.Trigger id="project-scope">
        <Select.Value placeholder="공개 범위를 선택하세요" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.Viewport>
            <ProjectScopeOptions />
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

function ControlledExample() {
  const [value, setValue] = useState("team");

  return <ProjectScopeSelect value={value} onValueChange={setValue} />;
}

const meta = {
  title: "Components/Forms/Select",
  component: Select.Root,
  parameters: {
    a11y: { test: "error" },
    docs: { description: { component: componentDocs.select } },
  },
  args: {
    defaultValue: "team",
    onValueChange: fn(),
  },
} satisfies Meta<typeof Select.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <ProjectScopeSelect {...args} />,
};

export const Interaction: Story = {
  render: (args) => <ProjectScopeSelect {...args} />,
  play: async ({ args, canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox", { name: "프로젝트 공개 범위" });

    await userEvent.click(trigger);
    const publicOption = await within(document.body).findByRole("option", { name: "공개" });
    await userEvent.click(publicOption);
    await expect(args.onValueChange).toHaveBeenCalledWith("public");
    await expect(trigger).toHaveTextContent("공개");
  },
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const Disabled: Story = {
  render: () => <ProjectScopeSelect defaultValue="team" disabled />,
};

export const FormNameAndValue: Story = {
  render: () => (
    <form>
      <ProjectScopeSelect defaultValue="team" name="visibility" required />
    </form>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <ProjectScopeSelect defaultValue="team" />
    </div>
  ),
};

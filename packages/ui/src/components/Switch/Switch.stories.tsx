import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { componentDocs } from "../../stories/internal/componentDocs";
import { expect, fn } from "storybook/test";
import { Switch } from "./Switch";

function ControlledExample() {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ alignItems: "center", display: "flex", gap: "var(--dds-space-2)" }}>
      <Switch aria-label="제어된 프로젝트 알림" checked={checked} onCheckedChange={setChecked} />
      <span>{checked ? "알림 켜짐" : "알림 꺼짐"}</span>
    </div>
  );
}

const meta = {
  title: "Components/Forms/Switch",
  component: Switch,
  parameters: { docs: { description: { component: componentDocs.switch } } },
  args: {
    "aria-label": "프로젝트 알림",
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Interaction: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const toggle = canvas.getByRole("switch", { name: "프로젝트 알림" });

    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true);
  },
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { defaultChecked: true, disabled: true },
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: "var(--dds-space-2)" }}>
      <Switch id="switch-label" />
      <label htmlFor="switch-label">새 프로젝트 알림 받기</label>
    </div>
  ),
};

export const FormNameAndValue: Story = {
  render: () => (
    <form>
      <Switch
        aria-label="이메일 알림"
        defaultChecked
        name="emailNotifications"
        required
        value="enabled"
      />
    </form>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <Switch aria-label="다크 테마 알림" defaultChecked />
    </div>
  ),
};

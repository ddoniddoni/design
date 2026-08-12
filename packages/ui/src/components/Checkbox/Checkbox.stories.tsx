import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { expect, fn } from "storybook/test";
import type { CheckboxCheckedState } from "./Checkbox";
import { Checkbox } from "./Checkbox";

const checkboxLabelLayout: CSSProperties = {
  alignItems: "center",
  color: "var(--dds-color-text-primary)",
  display: "inline-flex",
  fontFamily: "var(--dds-font-family-sans)",
  fontSize: "var(--dds-font-size-sm)",
  gap: "var(--dds-space-2)",
  lineHeight: "var(--dds-line-height-normal)",
};

const checkboxLabelStyle: CSSProperties = { cursor: "pointer" };

function ControlledExample() {
  const [checked, setChecked] = useState<CheckboxCheckedState>(false);

  return (
    <>
      <Checkbox aria-label="제어된 동의" checked={checked} onCheckedChange={setChecked} />
      <span>{checked === true ? "선택됨" : "선택 안 됨"}</span>
    </>
  );
}

const meta = {
  title: "Components/Forms/Checkbox",
  component: Checkbox,
  tags: ["!autodocs"],
  args: {
    "aria-label": "이용약관에 동의합니다",
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {};

export const Interaction: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", { name: "이용약관에 동의합니다" });

    await userEvent.click(checkbox);
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true);
  },
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const Indeterminate: Story = {
  args: { checked: "indeterminate" },
};

export const Disabled: Story = {
  args: { defaultChecked: true, disabled: true },
};

export const WithLabel: Story = {
  render: () => (
    <div style={checkboxLabelLayout}>
      <Checkbox id="checkbox-label" />
      <label htmlFor="checkbox-label" style={checkboxLabelStyle}>
        뉴스레터 수신에 동의합니다
      </label>
    </div>
  ),
};

export const FormNameAndValue: Story = {
  render: () => (
    <form>
      <Checkbox aria-label="이용약관 동의" defaultChecked name="terms" required value="accepted" />
    </form>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <div style={checkboxLabelLayout}>
        <Checkbox defaultChecked id="dark-checkbox-label" />
        <label htmlFor="dark-checkbox-label" style={checkboxLabelStyle}>
          다크 테마 동의
        </label>
      </div>
    </div>
  ),
};

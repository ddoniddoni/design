import { useState } from "react";
import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { RadioGroup } from "./RadioGroup";

const radioOptionLayout: CSSProperties = {
  alignItems: "center",
  color: "var(--dds-color-text-primary)",
  display: "inline-flex",
  fontFamily: "var(--dds-font-family-sans)",
  fontSize: "var(--dds-font-size-sm)",
  gap: "var(--dds-space-2)",
  lineHeight: "var(--dds-line-height-normal)",
};

const radioOptionLabelStyle: CSSProperties = { cursor: "pointer" };

function RadioOptions() {
  return (
    <>
      <div style={radioOptionLayout}>
        <RadioGroup.Item id="team" value="team" />
        <label htmlFor="team" style={radioOptionLabelStyle}>
          팀 전용
        </label>
      </div>
      <div style={radioOptionLayout}>
        <RadioGroup.Item id="public" value="public" />
        <label htmlFor="public" style={radioOptionLabelStyle}>
          공개
        </label>
      </div>
    </>
  );
}

function ControlledExample() {
  const [value, setValue] = useState("team");

  return (
    <RadioGroup.Root aria-label="제어된 공개 범위" value={value} onValueChange={setValue}>
      <RadioOptions />
    </RadioGroup.Root>
  );
}

const meta = {
  title: "Components/Forms/RadioGroup",
  component: RadioGroup.Root,
  tags: ["!autodocs"],
  args: {
    "aria-label": "프로젝트 공개 범위",
    defaultValue: "team",
    onValueChange: fn(),
  },
} satisfies Meta<typeof RadioGroup.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <RadioGroup.Root {...args}>
      <RadioOptions />
    </RadioGroup.Root>
  ),
};

export const Interaction: Story = {
  render: (args) => (
    <RadioGroup.Root {...args}>
      <RadioOptions />
    </RadioGroup.Root>
  ),
  play: async ({ args, canvas, userEvent }) => {
    const publicOption = canvas.getByRole("radio", { name: "공개" });

    await userEvent.click(publicOption);
    await expect(publicOption).toBeChecked();
    await expect(args.onValueChange).toHaveBeenCalledWith("public");
  },
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup.Root aria-label="비활성 공개 범위" defaultValue="team">
      <div style={radioOptionLayout}>
        <RadioGroup.Item disabled id="disabled-team" value="team" />
        <label htmlFor="disabled-team" style={radioOptionLabelStyle}>
          팀 전용
        </label>
      </div>
      <div style={radioOptionLayout}>
        <RadioGroup.Item disabled id="disabled-public" value="public" />
        <label htmlFor="disabled-public" style={radioOptionLabelStyle}>
          공개
        </label>
      </div>
    </RadioGroup.Root>
  ),
};

export const FormNameAndValue: Story = {
  render: () => (
    <form>
      <RadioGroup.Root
        aria-label="프로젝트 공개 범위"
        defaultValue="team"
        name="visibility"
        required
      >
        <RadioOptions />
      </RadioGroup.Root>
    </form>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <RadioGroup.Root aria-label="다크 테마 공개 범위" defaultValue="team">
        <RadioOptions />
      </RadioGroup.Root>
    </div>
  ),
};

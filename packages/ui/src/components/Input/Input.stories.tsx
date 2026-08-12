import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Input } from "./Input";

const meta = {
  title: "Components/Forms/Input",
  component: Input,
  tags: ["!autodocs"],
  args: {
    "aria-label": "입력값",
    onChange: fn(),
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const fieldStyle = { maxInlineSize: "320px" };

export const Playground: Story = {};

export const Interaction: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "입력값" });

    await userEvent.type(input, "ddoni");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={fieldStyle}>
      <Input aria-label="작은 입력" placeholder="Small" size="sm" />
      <Input aria-label="기본 입력" placeholder="Medium" size="md" />
      <Input aria-label="큰 입력" placeholder="Large" size="lg" />
    </div>
  ),
};

export const Placeholder: Story = {
  args: { placeholder: "이메일 주소를 입력하세요" },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "비활성 입력" },
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: "변경할 수 없는 값" },
};

export const Invalid: Story = {
  args: { defaultValue: "올바르지 않은 값", invalid: true },
};

export const WithLabelAndDescription: Story = {
  render: () => (
    <div style={fieldStyle}>
      <label htmlFor="input-email">이메일</label>
      <Input
        aria-describedby="input-email-description"
        id="input-email"
        placeholder="name@example.com"
        type="email"
      />
      <p id="input-email-description">알림과 계정 관련 메일을 받을 주소입니다.</p>
    </div>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <Input aria-label="다크 테마 입력" placeholder="입력하세요" />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";
import type { FieldRootProps } from "./Field";
import { Field } from "./Field";

const meta = {
  title: "Components/Forms/Field",
  component: Field.Root,
  tags: ["!autodocs"],
  args: {
    disabled: false,
    invalid: false,
  },
} satisfies Meta<typeof Field.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const fieldStyle = { maxInlineSize: "320px" };

function EmailField({ disabled = false, invalid = false }: FieldRootProps) {
  const messageId = invalid ? "email-error" : "email-description";

  return (
    <Field.Root disabled={disabled} invalid={invalid} style={fieldStyle}>
      <Field.Label htmlFor="field-email">이메일</Field.Label>
      <Input
        aria-describedby={messageId}
        disabled={disabled}
        id="field-email"
        invalid={invalid}
        placeholder="name@example.com"
        type="email"
      />
      {invalid ? (
        <Field.Error id="email-error">올바른 이메일 주소를 입력하세요.</Field.Error>
      ) : (
        <Field.Description id="email-description">
          알림과 계정 관련 메일을 받을 주소입니다.
        </Field.Description>
      )}
    </Field.Root>
  );
}

export const Playground: Story = {
  render: (args) => <EmailField {...args} />,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "이메일" });

    await userEvent.click(canvas.getByText("이메일"));
    await expect(input).toHaveFocus();
  },
};

export const WithDescription: Story = {
  render: () => <EmailField />,
};

export const Invalid: Story = {
  args: { invalid: true },
  render: (args) => <EmailField {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <EmailField {...args} />,
};

export const WithTextarea: Story = {
  render: () => (
    <Field.Root style={fieldStyle}>
      <Field.Label htmlFor="field-description">프로젝트 설명</Field.Label>
      <Textarea aria-describedby="field-description-help" id="field-description" />
      <Field.Description id="field-description-help">
        최대 500자까지 입력할 수 있습니다.
      </Field.Description>
    </Field.Root>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <EmailField />
    </div>
  ),
};

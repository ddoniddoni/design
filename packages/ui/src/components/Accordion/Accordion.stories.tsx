import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { componentDocs } from "../../stories/internal/componentDocs";
import { Accordion } from "./Accordion";

function AccordionItems() {
  return (
    <>
      <Accordion.Item value="usage">
        <Accordion.Header>
          <Accordion.Trigger>언제 사용하나요?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          연관된 보조 정보를 필요할 때만 펼쳐 보일 때 사용합니다.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accessibility">
        <Accordion.Header>
          <Accordion.Trigger>접근성은 어떻게 지원하나요?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          Trigger와 Content의 관계, keyboard navigation, 상태 관리는 Radix가 제공합니다.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="theme">
        <Accordion.Header>
          <Accordion.Trigger>테마를 바꿀 수 있나요?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          공개 component token을 override해 구분선과 상태 배경을 바꿀 수 있습니다.
        </Accordion.Content>
      </Accordion.Item>
    </>
  );
}

function ControlledExample() {
  const [value, setValue] = useState("usage");

  return (
    <Accordion.Root collapsible type="single" value={value} onValueChange={setValue}>
      <AccordionItems />
    </Accordion.Root>
  );
}

const meta = {
  title: "Components/Disclosure/Accordion",
  component: Accordion.Root,
  parameters: { docs: { description: { component: componentDocs.accordion } } },
  args: {
    collapsible: true,
    defaultValue: "usage",
    onValueChange: fn(),
    type: "single",
  },
} satisfies Meta<typeof Accordion.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Accordion.Root {...args}>
      <AccordionItems />
    </Accordion.Root>
  ),
};

export const Interaction: Story = {
  render: (args) => (
    <Accordion.Root {...args}>
      <AccordionItems />
    </Accordion.Root>
  ),
  play: async ({ args, canvas, userEvent }) => {
    const accessibility = canvas.getByRole("button", { name: "접근성은 어떻게 지원하나요?" });

    await userEvent.click(accessibility);
    await expect(accessibility).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText("Trigger와 Content의 관계")).toBeVisible();
    await expect(args.onValueChange).toHaveBeenCalledWith("accessibility");
  },
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const Multiple: Story = {
  render: () => (
    <Accordion.Root defaultValue={["usage", "accessibility"]} type="multiple">
      <AccordionItems />
    </Accordion.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Accordion.Root defaultValue="usage" type="single">
      <Accordion.Item value="usage">
        <Accordion.Header>
          <Accordion.Trigger>언제 사용하나요?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>연관된 보조 정보를 필요한 순간에 표시합니다.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item disabled value="disabled">
        <Accordion.Header>
          <Accordion.Trigger>비활성 항목</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>비활성 상태에서는 열 수 없습니다.</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Accordion.Root defaultValue="long" type="single">
      <Accordion.Item value="long">
        <Accordion.Header>
          <Accordion.Trigger>긴 설명도 자연스럽게 펼쳐집니다.</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          Accordion Content는 긴 텍스트와 여러 줄의 보조 정보를 포함할 수 있습니다. 좁은 영역에서는
          Trigger가 줄바꿈되고 Content는 원래 너비 안에서 자연스럽게 흐릅니다.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <Accordion.Root defaultValue="usage" type="single">
        <AccordionItems />
      </Accordion.Root>
    </div>
  ),
};

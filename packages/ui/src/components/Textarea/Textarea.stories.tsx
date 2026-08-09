import type { Meta, StoryObj } from "@storybook/react-vite";
import { componentDocs } from "../../stories/internal/componentDocs";
import { expect, fn } from "storybook/test";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Forms/Textarea",
  component: Textarea,
  parameters: { docs: { description: { component: componentDocs.textarea } } },
  args: {
    "aria-label": "설명",
    onChange: fn(),
    placeholder: "설명을 입력하세요",
  },
  argTypes: {
    resize: { control: "select", options: ["none", "vertical", "horizontal", "both"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Interaction: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const textarea = canvas.getByRole("textbox", { name: "설명" });

    await userEvent.type(textarea, "디자인 시스템 설명");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const ResizeModes: Story = {
  render: () => (
    <>
      <Textarea aria-label="세로 리사이즈" defaultValue="Vertical" resize="vertical" />
      <Textarea aria-label="양방향 리사이즈" defaultValue="Both" resize="both" />
      <Textarea aria-label="리사이즈 없음" defaultValue="None" resize="none" />
    </>
  ),
};

export const Invalid: Story = {
  args: { defaultValue: "올바르지 않은 설명", invalid: true },
};

export const WithLabel: Story = {
  render: () => (
    <>
      <label htmlFor="project-description">프로젝트 설명</label>
      <Textarea aria-describedby="project-description-help" id="project-description" />
      <p id="project-description-help">최대 500자까지 입력할 수 있습니다.</p>
    </>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <Textarea aria-label="다크 테마 설명" />
    </div>
  ),
};

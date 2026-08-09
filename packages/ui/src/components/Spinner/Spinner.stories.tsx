import type { Meta, StoryObj } from "@storybook/react-vite";
import { componentDocs } from "../../stories/internal/componentDocs";
import { Spinner } from "./Spinner";

const meta = {
  title: "Components/Feedback/Spinner",
  component: Spinner,
  parameters: { docs: { description: { component: componentDocs.spinner } } },
  args: {
    label: "로딩 중",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: "var(--dds-space-3)" }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Decorative: Story = {
  args: {
    decorative: true,
  },
};

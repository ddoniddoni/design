import type { Meta, StoryObj } from "@storybook/react-vite";
import { TokenValue } from "../internal/TokenValue";

const spacingTokens = [
  "--dds-space-1",
  "--dds-space-2",
  "--dds-space-3",
  "--dds-space-4",
  "--dds-space-5",
  "--dds-space-6",
  "--dds-space-8",
  "--dds-space-10",
  "--dds-space-12",
  "--dds-space-16",
];

function SpacingFoundation({ theme = "light" }: { theme?: string }) {
  return (
    <div
      style={{ color: "var(--dds-color-text-primary)", display: "grid", gap: "var(--dds-space-3)" }}
    >
      {spacingTokens.map((name) => (
        <div
          key={name}
          style={{ alignItems: "center", display: "flex", gap: "var(--dds-space-3)" }}
        >
          <span
            aria-hidden="true"
            style={{
              backgroundColor: "var(--dds-color-action-primary-bg)",
              blockSize: "var(--dds-space-4)",
              inlineSize: `var(${name})`,
            }}
          />
          <code>{name}</code>
          <TokenValue name={name} theme={theme} />
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundations/Spacing",
  component: SpacingFoundation,
} satisfies Meta<typeof SpacingFoundation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (_, context) => <SpacingFoundation theme={String(context.globals.theme ?? "light")} />,
};

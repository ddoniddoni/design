import type { Meta, StoryObj } from "@storybook/react-vite";
import { TokenValue } from "../internal/TokenValue";

const shadowTokens = [
  "--dds-shadow-xs",
  "--dds-shadow-sm",
  "--dds-shadow-md",
  "--dds-shadow-lg",
  "--dds-shadow-overlay",
];

function ShadowsFoundation({ theme = "light" }: { theme?: string }) {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--dds-space-6)",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        padding: "var(--dds-space-6)",
      }}
    >
      {shadowTokens.map((name) => (
        <div
          key={name}
          style={{
            backgroundColor: "var(--dds-color-bg-surface)",
            borderRadius: "var(--dds-radius-md)",
            boxShadow: `var(${name})`,
            color: "var(--dds-color-text-primary)",
            padding: "var(--dds-space-4)",
          }}
        >
          <code>{name}</code>
          <div>
            <TokenValue name={name} theme={theme} />
          </div>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundations/Shadows",
  component: ShadowsFoundation,
} satisfies Meta<typeof ShadowsFoundation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (_, context) => <ShadowsFoundation theme={String(context.globals.theme ?? "light")} />,
};

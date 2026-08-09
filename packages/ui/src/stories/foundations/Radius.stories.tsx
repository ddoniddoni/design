import type { Meta, StoryObj } from "@storybook/react-vite";
import { TokenValue } from "../internal/TokenValue";

const radiusTokens = [
  "--dds-radius-none",
  "--dds-radius-xs",
  "--dds-radius-sm",
  "--dds-radius-md",
  "--dds-radius-lg",
  "--dds-radius-xl",
  "--dds-radius-full",
];

function RadiusFoundation({ theme = "light" }: { theme?: string }) {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--dds-space-3)",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      }}
    >
      {radiusTokens.map((name) => (
        <div key={name} style={{ display: "grid", gap: "var(--dds-space-2)" }}>
          <span
            aria-hidden="true"
            style={{
              backgroundColor: "var(--dds-color-bg-surface-subtle)",
              blockSize: "var(--dds-control-height-lg)",
              border: "var(--dds-control-border-width) solid var(--dds-color-border-default)",
              borderRadius: `var(${name})`,
            }}
          />
          <code>{name}</code> <TokenValue name={name} theme={theme} />
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundations/Radius",
  component: RadiusFoundation,
} satisfies Meta<typeof RadiusFoundation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (_, context) => <RadiusFoundation theme={String(context.globals.theme ?? "light")} />,
};

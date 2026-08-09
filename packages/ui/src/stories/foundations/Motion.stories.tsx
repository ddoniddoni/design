import type { Meta, StoryObj } from "@storybook/react-vite";
import { TokenValue } from "../internal/TokenValue";

const motionTokens = [
  "--dds-duration-fast",
  "--dds-duration-normal",
  "--dds-duration-slow",
  "--dds-ease-standard",
  "--dds-ease-emphasized",
];

function MotionFoundation({ theme = "light" }: { theme?: string }) {
  return (
    <div
      style={{ color: "var(--dds-color-text-primary)", display: "grid", gap: "var(--dds-space-4)" }}
    >
      <p style={{ margin: 0 }}>
        모든 interaction transition은 duration과 easing token을 사용합니다. reduced motion
        환경에서는 animation을 제거합니다.
      </p>
      {motionTokens.map((name) => (
        <div
          key={name}
          style={{ alignItems: "center", display: "flex", gap: "var(--dds-space-3)" }}
        >
          <span
            aria-hidden="true"
            style={{
              backgroundColor: "var(--dds-color-action-primary-bg)",
              blockSize: "var(--dds-space-4)",
              borderRadius: "var(--dds-radius-full)",
              inlineSize: "var(--dds-space-4)",
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
  title: "Foundations/Motion",
  component: MotionFoundation,
} satisfies Meta<typeof MotionFoundation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (_, context) => <MotionFoundation theme={String(context.globals.theme ?? "light")} />,
};

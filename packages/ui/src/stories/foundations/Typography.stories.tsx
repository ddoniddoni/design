import type { Meta, StoryObj } from "@storybook/react-vite";
import { TokenValue } from "../internal/TokenValue";

const textTokens = [
  "--dds-font-size-xs",
  "--dds-font-size-sm",
  "--dds-font-size-md",
  "--dds-font-size-lg",
  "--dds-font-size-xl",
  "--dds-font-size-2xl",
  "--dds-font-size-3xl",
];

function TypographyFoundation({ theme = "light" }: { theme?: string }) {
  return (
    <div
      style={{ color: "var(--dds-color-text-primary)", display: "grid", gap: "var(--dds-space-4)" }}
    >
      <section>
        <h2>Font families</h2>
        <p style={{ fontFamily: "var(--dds-font-family-sans)" }}>
          Pretendard 기반의 sans-serif 본문입니다.
        </p>
        <p style={{ fontFamily: "var(--dds-font-family-mono)" }}>
          const token = &quot;--dds-font-size-md&quot;;
        </p>
      </section>
      <section>
        <h2>Font sizes</h2>
        <div style={{ display: "grid", gap: "var(--dds-space-3)" }}>
          {textTokens.map((name) => (
            <div key={name}>
              <p
                style={{
                  fontFamily: "var(--dds-font-family-sans)",
                  fontSize: `var(${name})`,
                  lineHeight: "var(--dds-line-height-normal)",
                  margin: 0,
                }}
              >
                디자인 시스템의 타이포그래피
              </p>
              <code>{name}</code> <TokenValue name={name} theme={theme} />
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Weight and leading</h2>
        <p style={{ fontWeight: "var(--dds-font-weight-regular)", margin: 0 }}>Regular 400</p>
        <p style={{ fontWeight: "var(--dds-font-weight-semibold)", margin: 0 }}>Semibold 600</p>
        <p style={{ lineHeight: "var(--dds-line-height-relaxed)", margin: 0 }}>
          Relaxed leading은 여러 줄 설명 텍스트에 사용합니다.
        </p>
      </section>
    </div>
  );
}

const meta = {
  title: "Foundations/Typography",
  component: TypographyFoundation,
} satisfies Meta<typeof TypographyFoundation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (_, context) => <TypographyFoundation theme={String(context.globals.theme ?? "light")} />,
};

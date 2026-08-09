import type { Meta, StoryObj } from "@storybook/react-vite";
import { TokenValue } from "../internal/TokenValue";

type ColorToken = {
  name: string;
  recommendation: string;
};

const primitiveColors: ColorToken[] = [
  { name: "--dds-color-neutral-50", recommendation: "canvas와 은은한 배경" },
  { name: "--dds-color-neutral-500", recommendation: "보조 텍스트" },
  { name: "--dds-color-neutral-900", recommendation: "강한 본문 텍스트" },
  { name: "--dds-color-brand-600", recommendation: "primary action" },
  { name: "--dds-color-danger-600", recommendation: "위험한 action" },
  { name: "--dds-color-success-600", recommendation: "성공 상태" },
];

const semanticColors: ColorToken[] = [
  { name: "--dds-color-bg-canvas", recommendation: "화면 전체 배경" },
  { name: "--dds-color-bg-surface", recommendation: "카드와 입력 surface" },
  { name: "--dds-color-text-primary", recommendation: "기본 본문" },
  { name: "--dds-color-text-secondary", recommendation: "보조 설명" },
  { name: "--dds-color-border-default", recommendation: "기본 구분선" },
  { name: "--dds-color-action-primary-bg", recommendation: "primary button" },
  { name: "--dds-color-status-success-text", recommendation: "성공 상태 텍스트" },
];

function ColorGroup({
  items,
  showValues = true,
  theme,
  title,
}: {
  items: ColorToken[];
  showValues?: boolean;
  theme: string;
  title: string;
}) {
  return (
    <section>
      <h2>{title}</h2>
      <div
        style={{
          display: "grid",
          gap: "var(--dds-space-2)",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        }}
      >
        {items.map((item) => (
          <div
            key={item.name}
            style={{
              alignItems: "center",
              border: "var(--dds-control-border-width) solid var(--dds-color-border-default)",
              display: "flex",
              gap: "var(--dds-space-2)",
              padding: "var(--dds-space-2)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                backgroundColor: `var(${item.name})`,
                blockSize: "var(--dds-space-6)",
                border: "var(--dds-control-border-width) solid var(--dds-color-border-default)",
                borderRadius: "var(--dds-radius-sm)",
                inlineSize: "var(--dds-space-6)",
              }}
            />
            <div>
              <code>{item.name}</code>
              {showValues ? (
                <div>
                  <TokenValue name={item.name} theme={theme} />
                </div>
              ) : null}
              <small>{item.recommendation}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ColorsFoundation({ theme = "light" }: { theme?: string }) {
  return (
    <div
      style={{ color: "var(--dds-color-text-primary)", display: "grid", gap: "var(--dds-space-6)" }}
    >
      <ColorGroup items={primitiveColors} theme={theme} title="Primitive colors" />
      <ColorGroup items={semanticColors} theme={theme} title="Semantic colors" />
    </div>
  );
}

const meta = {
  title: "Foundations/Colors",
  component: ColorsFoundation,
} satisfies Meta<typeof ColorsFoundation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (_, context) => <ColorsFoundation theme={String(context.globals.theme ?? "light")} />,
};

export const NestedThemeScope: Story = {
  render: (_, context) => (
    <div style={{ display: "grid", gap: "var(--dds-space-4)" }}>
      <ColorsFoundation theme={String(context.globals.theme ?? "light")} />
      <div
        data-dds-theme="dark"
        style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
      >
        <ColorGroup
          items={semanticColors.slice(0, 4)}
          showValues={false}
          theme="dark"
          title="Nested dark scope"
        />
      </div>
    </div>
  ),
};

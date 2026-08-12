import { useState } from "react";
import type { FormEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Button } from "../Button";
import { Field } from "../Field";
import { Input } from "../Input";
import { FilterBar } from "./FilterBar";

function ProjectFilterBar() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("모든 프로젝트를 표시합니다.");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(query ? `“${query}” 검색 결과를 표시합니다.` : "모든 프로젝트를 표시합니다.");
  }

  function handleReset() {
    setQuery("");
    setStatus("필터를 초기화했습니다.");
  }

  return (
    <div style={{ display: "grid", gap: "var(--dds-space-3)" }}>
      <FilterBar.Root aria-label="프로젝트 필터" onSubmit={handleSubmit}>
        <FilterBar.Controls>
          <Field.Root style={{ flex: "1 1 var(--dds-space-12)" }}>
            <Field.Label htmlFor="project-query">프로젝트 검색</Field.Label>
            <Input
              id="project-query"
              name="query"
              placeholder="프로젝트 이름을 입력하세요"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </Field.Root>
        </FilterBar.Controls>
        <FilterBar.Actions>
          <Button type="submit">검색</Button>
          <Button type="button" tone="neutral" variant="outline" onClick={handleReset}>
            초기화
          </Button>
        </FilterBar.Actions>
      </FilterBar.Root>
      <p aria-live="polite" style={{ margin: 0, color: "var(--dds-color-text-secondary)" }}>
        {status}
      </p>
    </div>
  );
}

const meta = {
  title: "Components/Forms/FilterBar",
  component: FilterBar.Root,
  parameters: {
    a11y: { test: "error" },
  },
  tags: ["!autodocs"],
} satisfies Meta<typeof FilterBar.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <ProjectFilterBar />,
};

export const Interaction: Story = {
  render: () => <ProjectFilterBar />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText("프로젝트 검색"), "디자인 시스템");
    await userEvent.click(canvas.getByRole("button", { name: "검색" }));
    await expect(canvas.getByText("“디자인 시스템” 검색 결과를 표시합니다.")).toBeInTheDocument();
  },
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <ProjectFilterBar />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { componentDocs } from "../../stories/internal/componentDocs";
import { EmptyState } from "./EmptyState";

function ProjectIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M4 6.5C4 5.67 4.67 5 5.5 5h4l1.5 2h7.5c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-13c-.83 0-1.5-.67-1.5-1.5v-11Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function ProjectEmptyState() {
  return (
    <EmptyState.Root>
      <EmptyState.Icon>
        <ProjectIcon />
      </EmptyState.Icon>
      <EmptyState.Title>프로젝트가 없습니다</EmptyState.Title>
      <EmptyState.Description>새 프로젝트를 만들어 팀과 작업을 시작하세요.</EmptyState.Description>
      <EmptyState.Actions>
        <Button>새 프로젝트 만들기</Button>
        <Button tone="neutral" variant="outline">
          템플릿 보기
        </Button>
      </EmptyState.Actions>
    </EmptyState.Root>
  );
}

const meta = {
  title: "Components/Feedback/EmptyState",
  component: EmptyState.Root,
  parameters: {
    a11y: { test: "error" },
    docs: { description: { component: componentDocs.emptyState } },
  },
} satisfies Meta<typeof EmptyState.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <ProjectEmptyState />,
};

export const WithoutActions: Story = {
  render: () => (
    <EmptyState.Root>
      <EmptyState.Icon>
        <ProjectIcon />
      </EmptyState.Icon>
      <EmptyState.Title>검색 결과가 없습니다</EmptyState.Title>
      <EmptyState.Description>다른 검색어 또는 필터를 사용해 보세요.</EmptyState.Description>
    </EmptyState.Root>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <ProjectEmptyState />
    </div>
  ),
};

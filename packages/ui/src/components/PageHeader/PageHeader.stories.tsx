import type { Meta, StoryObj } from "@storybook/react-vite";
import { componentDocs } from "../../stories/internal/componentDocs";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { PageHeader } from "./PageHeader";

const meta = {
  title: "Components/Layout/PageHeader",
  component: PageHeader.Root,
  parameters: { docs: { description: { component: componentDocs.pageHeader } } },
} satisfies Meta<typeof PageHeader.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

function ProjectHeader() {
  return (
    <PageHeader.Root>
      <PageHeader.Content>
        <Badge tone="primary">프로젝트</Badge>
        <PageHeader.Title>디자인 시스템</PageHeader.Title>
        <PageHeader.Description>
          여러 React 제품에서 함께 사용하는 토큰과 컴포넌트를 관리합니다.
        </PageHeader.Description>
      </PageHeader.Content>
      <PageHeader.Actions>
        <Button tone="neutral" variant="outline">
          가져오기
        </Button>
        <Button>새 프로젝트</Button>
      </PageHeader.Actions>
    </PageHeader.Root>
  );
}

export const Playground: Story = {
  render: () => <ProjectHeader />,
};

export const WithoutActions: Story = {
  render: () => (
    <PageHeader.Root>
      <PageHeader.Content>
        <PageHeader.Title>설정</PageHeader.Title>
        <PageHeader.Description>워크스페이스의 기본 설정을 관리합니다.</PageHeader.Description>
      </PageHeader.Content>
    </PageHeader.Root>
  ),
};

export const LongContent: Story = {
  render: () => (
    <PageHeader.Root>
      <PageHeader.Content>
        <PageHeader.Title>여러 팀과 제품에서 함께 사용하는 디자인 시스템 프로젝트</PageHeader.Title>
        <PageHeader.Description>
          긴 제목과 설명이 있더라도 대표 action과 겹치지 않고 사용 가능한 공간 안에서 자연스럽게
          줄바꿈되어야 합니다.
        </PageHeader.Description>
      </PageHeader.Content>
      <PageHeader.Actions>
        <Button>새 프로젝트</Button>
      </PageHeader.Actions>
    </PageHeader.Root>
  ),
};

export const NarrowViewport: Story = {
  render: () => (
    <div style={{ maxWidth: "360px" }}>
      <ProjectHeader />
    </div>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <ProjectHeader />
    </div>
  ),
};

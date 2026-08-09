import type { Meta, StoryObj } from "@storybook/react-vite";
import { componentDocs } from "../../stories/internal/componentDocs";
import { Button } from "../Button/Button";
import { Card } from "./Card";

const meta = {
  title: "Components/Layout/Card",
  component: Card.Root,
  parameters: { docs: { description: { component: componentDocs.card } } },
} satisfies Meta<typeof Card.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

function ProjectCard() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title asChild>
          <h2>프로젝트</h2>
        </Card.Title>
        <Card.Description>다음 배포를 준비하는 프로젝트입니다.</Card.Description>
      </Card.Header>
      <Card.Content>카드 본문에는 소비자가 원하는 내용을 자유롭게 구성합니다.</Card.Content>
      <Card.Footer>
        <Button variant="ghost">취소</Button>
        <Button>저장</Button>
      </Card.Footer>
    </Card.Root>
  );
}

export const Playground: Story = {
  render: () => <ProjectCard />,
};

export const WithoutFooter: Story = {
  render: () => (
    <Card.Root>
      <Card.Header>
        <Card.Title>공지</Card.Title>
        <Card.Description>제목은 기본 div로도 사용할 수 있습니다.</Card.Description>
      </Card.Header>
      <Card.Content>제품별 레이아웃은 Card가 아닌 소비자 코드에서 구성합니다.</Card.Content>
    </Card.Root>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <ProjectCard />
    </div>
  ),
};

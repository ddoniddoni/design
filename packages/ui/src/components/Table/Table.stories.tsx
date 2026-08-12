import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../Badge";
import { componentDocs } from "../../stories/internal/componentDocs";
import { Table } from "./Table";

function ProjectTable() {
  return (
    <Table.Container>
      <Table.Root>
        <Table.Caption>최근 프로젝트</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head scope="col">프로젝트</Table.Head>
            <Table.Head scope="col">공개 범위</Table.Head>
            <Table.Head scope="col">상태</Table.Head>
            <Table.Head scope="col">최근 변경</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>디자인 시스템</Table.Cell>
            <Table.Cell>팀 전용</Table.Cell>
            <Table.Cell>
              <Badge tone="success">진행 중</Badge>
            </Table.Cell>
            <Table.Cell>방금 전</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>마케팅 사이트</Table.Cell>
            <Table.Cell>공개</Table.Cell>
            <Table.Cell>
              <Badge tone="warning">검토 중</Badge>
            </Table.Cell>
            <Table.Cell>2시간 전</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Table.Container>
  );
}

const meta = {
  title: "Components/Data Display/Table",
  component: Table.Root,
  parameters: {
    a11y: { test: "error" },
    docs: { description: { component: componentDocs.table } },
  },
} satisfies Meta<typeof Table.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <ProjectTable />,
};

export const WithFooter: Story = {
  render: () => (
    <Table.Container>
      <Table.Root>
        <Table.Caption>프로젝트 요약</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head scope="col">상태</Table.Head>
            <Table.Head scope="col">프로젝트 수</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>진행 중</Table.Cell>
            <Table.Cell>3개</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Head scope="row">전체</Table.Head>
            <Table.Cell>3개</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </Table.Container>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Table.Container style={{ maxInlineSize: "320px" }}>
      <Table.Root>
        <Table.Caption>긴 프로젝트 정보</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head scope="col">프로젝트 이름</Table.Head>
            <Table.Head scope="col">설명</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>글로벌 디자인 시스템 마이그레이션</Table.Cell>
            <Table.Cell>여러 제품 팀이 함께 사용하는 foundation token을 정리합니다.</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Table.Container>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <ProjectTable />
    </div>
  ),
};

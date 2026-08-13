import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb } from "./Breadcrumb";

function ProjectBreadcrumb() {
  return (
    <Breadcrumb.Root aria-label="프로젝트 경로">
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#workspace">워크스페이스</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#projects">프로젝트</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.CurrentPage>디자인 시스템</Breadcrumb.CurrentPage>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}

const meta = {
  title: "Components/Navigation/Breadcrumb",
  component: Breadcrumb.Root,
  parameters: {
    a11y: { test: "error" },
  },
  tags: ["!autodocs"],
} satisfies Meta<typeof Breadcrumb.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <ProjectBreadcrumb />,
};

export const LongPath: Story = {
  render: () => (
    <Breadcrumb.Root aria-label="설정 경로">
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#workspace">워크스페이스</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#project">디자인 시스템</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#settings">프로젝트 설정</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.CurrentPage>멤버와 권한</Breadcrumb.CurrentPage>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <ProjectBreadcrumb />
    </div>
  ),
};

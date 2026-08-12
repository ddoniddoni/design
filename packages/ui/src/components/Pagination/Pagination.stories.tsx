import { useState } from "react";
import type { MouseEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { componentDocs } from "../../stories/internal/componentDocs";
import { Pagination } from "./Pagination";

const pages = [1, 2, 3, 8] as const;

interface ProjectPaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

function ProjectPagination({ currentPage, onPageChange }: ProjectPaginationProps) {
  function handlePageChange(event: MouseEvent<HTMLAnchorElement>, page: number) {
    event.preventDefault();
    onPageChange(page);
  }

  return (
    <Pagination.Root aria-label="프로젝트 목록 페이지">
      <Pagination.List>
        {currentPage > 1 ? (
          <Pagination.Item>
            <Pagination.Previous
              href={`#page-${currentPage - 1}`}
              onClick={(event) => handlePageChange(event, currentPage - 1)}
            />
          </Pagination.Item>
        ) : null}
        {pages.map((page) => (
          <Pagination.Item key={page}>
            <Pagination.Link
              aria-current={currentPage === page ? "page" : undefined}
              aria-label={`${page}페이지`}
              href={`#page-${page}`}
              onClick={(event) => handlePageChange(event, page)}
            >
              {page}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Ellipsis />
        {currentPage < 3 ? (
          <Pagination.Item>
            <Pagination.Next
              href={`#page-${currentPage + 1}`}
              onClick={(event) => handlePageChange(event, currentPage + 1)}
            />
          </Pagination.Item>
        ) : null}
      </Pagination.List>
    </Pagination.Root>
  );
}

function ControlledExample() {
  const [currentPage, setCurrentPage] = useState(2);

  return (
    <div style={{ display: "grid", gap: "var(--dds-space-3)" }}>
      <p aria-live="polite">현재 {currentPage}페이지</p>
      <ProjectPagination currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

const meta = {
  title: "Components/Navigation/Pagination",
  component: Pagination.Root,
  parameters: {
    a11y: { test: "error" },
    docs: { description: { component: componentDocs.pagination } },
  },
} satisfies Meta<typeof Pagination.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <ProjectPagination currentPage={2} onPageChange={() => undefined} />,
};

export const Interaction: Story = {
  render: () => <ControlledExample />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("link", { name: "다음 페이지" }));
    await expect(canvas.getByText("현재 3페이지")).toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: "3페이지" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};

export const FirstPage: Story = {
  render: () => <ProjectPagination currentPage={1} onPageChange={() => undefined} />,
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <ProjectPagination currentPage={2} onPageChange={() => undefined} />
    </div>
  ),
};

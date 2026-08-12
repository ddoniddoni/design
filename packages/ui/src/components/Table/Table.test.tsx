import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { Table } from "./Table";

function ProjectTable() {
  return (
    <Table.Container>
      <Table.Root>
        <Table.Caption>프로젝트 목록</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head scope="col">프로젝트</Table.Head>
            <Table.Head scope="col">상태</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>디자인 시스템</Table.Cell>
            <Table.Cell>진행 중</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Table.Container>
  );
}

describe("Table", () => {
  it("renders native table semantics with a caption and column headers", () => {
    render(<ProjectTable />);

    expect(screen.getByRole("table", { name: "프로젝트 목록" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "프로젝트" })).toHaveAttribute("scope", "col");
    expect(screen.getByRole("columnheader", { name: "상태" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "디자인 시스템" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "진행 중" })).toBeInTheDocument();
  });

  it("supports native table spans without adding data behavior", () => {
    render(
      <Table.Container>
        <Table.Root>
          <Table.Caption>월간 프로젝트 요약</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head colSpan={2} scope="colgroup">
                프로젝트 상태
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell rowSpan={2}>디자인 시스템</Table.Cell>
              <Table.Cell>진행 중</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>검토 예정</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Table.Container>,
    );

    expect(screen.getByRole("columnheader", { name: "프로젝트 상태" })).toHaveAttribute(
      "colspan",
      "2",
    );
    expect(screen.getByRole("cell", { name: "디자인 시스템" })).toHaveAttribute("rowspan", "2");
  });

  it("forwards refs, native props, and consumer class names for every section", () => {
    const containerRef = createRef<HTMLDivElement>();
    const rootRef = createRef<HTMLTableElement>();
    const captionRef = createRef<HTMLTableCaptionElement>();
    const headerRef = createRef<HTMLTableSectionElement>();
    const bodyRef = createRef<HTMLTableSectionElement>();
    const footerRef = createRef<HTMLTableSectionElement>();
    const rowRef = createRef<HTMLTableRowElement>();
    const headRef = createRef<HTMLTableCellElement>();
    const cellRef = createRef<HTMLTableCellElement>();

    render(
      <Table.Container ref={containerRef} className="container-class" data-testid="table-container">
        <Table.Root ref={rootRef} className="root-class" data-testid="table-root">
          <Table.Caption ref={captionRef} className="caption-class" data-testid="table-caption">
            프로젝트 목록
          </Table.Caption>
          <Table.Header ref={headerRef} className="header-class" data-testid="table-header">
            <Table.Row ref={rowRef} className="row-class" data-testid="table-row">
              <Table.Head ref={headRef} className="head-class" data-testid="table-head" scope="col">
                프로젝트
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body ref={bodyRef} className="body-class" data-testid="table-body">
            <Table.Row>
              <Table.Cell ref={cellRef} className="cell-class" data-testid="table-cell" colSpan={1}>
                디자인 시스템
              </Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Footer ref={footerRef} className="footer-class" data-testid="table-footer">
            <Table.Row>
              <Table.Cell>총 1개</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table.Root>
      </Table.Container>,
    );

    const container = screen.getByTestId("table-container");
    const root = screen.getByTestId("table-root");
    const caption = screen.getByTestId("table-caption");
    const header = screen.getByTestId("table-header");
    const body = screen.getByTestId("table-body");
    const footer = screen.getByTestId("table-footer");
    const row = screen.getByTestId("table-row");
    const head = screen.getByTestId("table-head");
    const cell = screen.getByTestId("table-cell");

    expect(containerRef.current).toBe(container);
    expect(rootRef.current).toBe(root);
    expect(captionRef.current).toBe(caption);
    expect(headerRef.current).toBe(header);
    expect(bodyRef.current).toBe(body);
    expect(footerRef.current).toBe(footer);
    expect(rowRef.current).toBe(row);
    expect(headRef.current).toBe(head);
    expect(cellRef.current).toBe(cell);
    expect(container).toHaveClass("container-class");
    expect(root).toHaveClass("root-class");
    expect(caption).toHaveClass("caption-class");
    expect(header).toHaveClass("header-class");
    expect(body).toHaveClass("body-class");
    expect(footer).toHaveClass("footer-class");
    expect(row).toHaveClass("row-class");
    expect(head).toHaveClass("head-class");
    expect(cell).toHaveClass("cell-class");
    expect(cell).toHaveAttribute("colspan", "1");
  });
});

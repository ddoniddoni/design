import { createRef } from "react";
import type { MouseEvent } from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders semantic navigation with links, a current page, and visual-only separators", () => {
    render(
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#workspace">워크스페이스</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator data-testid="breadcrumb-separator" />
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#projects">프로젝트</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentPage>디자인 시스템</Breadcrumb.CurrentPage>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    );

    expect(screen.getByRole("navigation", { name: "경로 탐색" })).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "워크스페이스" })).toHaveAttribute(
      "href",
      "#workspace",
    );
    expect(screen.getByText("디자인 시스템")).toHaveAttribute("aria-current", "page");
    expect(screen.getByTestId("breadcrumb-separator")).toHaveAttribute("aria-hidden", "true");
  });

  it("uses consumer supplied navigation names and link behavior", () => {
    const onClick = vi.fn((event: MouseEvent<HTMLAnchorElement>) => event.preventDefault());

    render(
      <Breadcrumb.Root aria-label="프로젝트 경로">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#project" onClick={onClick}>
              프로젝트
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    );

    screen.getByRole("link", { name: "프로젝트" }).click();

    expect(screen.getByRole("navigation", { name: "프로젝트 경로" })).toBeInTheDocument();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("forwards refs, native props, and consumer class names for every section", () => {
    const rootRef = createRef<HTMLElement>();
    const listRef = createRef<HTMLOListElement>();
    const itemRef = createRef<HTMLLIElement>();
    const linkRef = createRef<HTMLAnchorElement>();
    const currentPageRef = createRef<HTMLSpanElement>();
    const separatorRef = createRef<HTMLLIElement>();

    render(
      <Breadcrumb.Root ref={rootRef} className="root-class" data-testid="breadcrumb-root">
        <Breadcrumb.List ref={listRef} className="list-class" data-testid="breadcrumb-list">
          <Breadcrumb.Item ref={itemRef} className="item-class" data-testid="breadcrumb-item">
            <Breadcrumb.Link
              ref={linkRef}
              className="link-class"
              data-testid="breadcrumb-link"
              href="#workspace"
              target="_self"
            >
              워크스페이스
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator
            ref={separatorRef}
            className="separator-class"
            data-testid="breadcrumb-separator"
            title="현재 경로 구분"
          />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentPage
              ref={currentPageRef}
              className="current-page-class"
              data-testid="breadcrumb-current-page"
              title="현재 페이지"
            >
              디자인 시스템
            </Breadcrumb.CurrentPage>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>,
    );

    const root = screen.getByTestId("breadcrumb-root");
    const list = screen.getByTestId("breadcrumb-list");
    const item = screen.getByTestId("breadcrumb-item");
    const link = screen.getByTestId("breadcrumb-link");
    const currentPage = screen.getByTestId("breadcrumb-current-page");
    const separator = screen.getByTestId("breadcrumb-separator");

    expect(rootRef.current).toBe(root);
    expect(listRef.current).toBe(list);
    expect(itemRef.current).toBe(item);
    expect(linkRef.current).toBe(link);
    expect(currentPageRef.current).toBe(currentPage);
    expect(separatorRef.current).toBe(separator);
    expect(root).toHaveClass("root-class");
    expect(list).toHaveClass("list-class");
    expect(item).toHaveClass("item-class");
    expect(link).toHaveClass("link-class");
    expect(currentPage).toHaveClass("current-page-class");
    expect(separator).toHaveClass("separator-class");
    expect(link).toHaveAttribute("target", "_self");
    expect(currentPage).toHaveAttribute("title", "현재 페이지");
    expect(separator).toHaveAttribute("title", "현재 경로 구분");
  });
});

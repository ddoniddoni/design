import { createRef } from "react";
import type { MouseEvent } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders semantic navigation with the current page and visual-only ellipsis", () => {
    render(
      <Pagination.Root>
        <Pagination.List>
          <Pagination.Item>
            <Pagination.Previous href="#page-1" />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link aria-label="1페이지" href="#page-1">
              1
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link aria-current="page" aria-label="2페이지" href="#page-2">
              2
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Ellipsis data-testid="pagination-ellipsis" />
          <Pagination.Item>
            <Pagination.Next href="#page-3" />
          </Pagination.Item>
        </Pagination.List>
      </Pagination.Root>,
    );

    expect(screen.getByRole("navigation", { name: "페이지 탐색" })).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2페이지" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "이전 페이지" })).toHaveTextContent("이전");
    expect(screen.getByRole("link", { name: "다음 페이지" })).toHaveTextContent("다음");
    expect(screen.getByTestId("pagination-ellipsis")).toHaveAttribute("aria-hidden", "true");
  });

  it("keeps page navigation in the consumer click handler", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn((event: MouseEvent<HTMLAnchorElement>) => event.preventDefault());

    render(
      <Pagination.Root aria-label="프로젝트 목록 페이지">
        <Pagination.List>
          <Pagination.Item>
            <Pagination.Link aria-label="3페이지" href="#page-3" onClick={onPageChange}>
              3
            </Pagination.Link>
          </Pagination.Item>
        </Pagination.List>
      </Pagination.Root>,
    );

    await user.click(screen.getByRole("link", { name: "3페이지" }));

    expect(onPageChange).toHaveBeenCalledTimes(1);
  });

  it("forwards refs, native props, and consumer class names for every section", () => {
    const rootRef = createRef<HTMLElement>();
    const listRef = createRef<HTMLOListElement>();
    const itemRef = createRef<HTMLLIElement>();
    const linkRef = createRef<HTMLAnchorElement>();
    const previousRef = createRef<HTMLAnchorElement>();
    const nextRef = createRef<HTMLAnchorElement>();
    const ellipsisRef = createRef<HTMLLIElement>();

    render(
      <Pagination.Root ref={rootRef} className="root-class" data-testid="pagination-root">
        <Pagination.List ref={listRef} className="list-class" data-testid="pagination-list">
          <Pagination.Item ref={itemRef} className="item-class" data-testid="pagination-item">
            <Pagination.Link
              ref={linkRef}
              aria-label="1페이지"
              className="link-class"
              data-testid="pagination-link"
              href="#page-1"
              target="_self"
            >
              1
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Previous
              ref={previousRef}
              className="previous-class"
              data-testid="pagination-previous"
              href="#page-1"
            />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Next
              ref={nextRef}
              className="next-class"
              data-testid="pagination-next"
              href="#page-3"
            />
          </Pagination.Item>
          <Pagination.Ellipsis
            ref={ellipsisRef}
            className="ellipsis-class"
            data-testid="pagination-ellipsis"
            title="생략된 페이지"
          />
        </Pagination.List>
      </Pagination.Root>,
    );

    const root = screen.getByTestId("pagination-root");
    const list = screen.getByTestId("pagination-list");
    const item = screen.getByTestId("pagination-item");
    const link = screen.getByTestId("pagination-link");
    const previous = screen.getByTestId("pagination-previous");
    const next = screen.getByTestId("pagination-next");
    const ellipsis = screen.getByTestId("pagination-ellipsis");

    expect(rootRef.current).toBe(root);
    expect(listRef.current).toBe(list);
    expect(itemRef.current).toBe(item);
    expect(linkRef.current).toBe(link);
    expect(previousRef.current).toBe(previous);
    expect(nextRef.current).toBe(next);
    expect(ellipsisRef.current).toBe(ellipsis);
    expect(root).toHaveClass("root-class");
    expect(list).toHaveClass("list-class");
    expect(item).toHaveClass("item-class");
    expect(link).toHaveClass("link-class");
    expect(previous).toHaveClass("previous-class");
    expect(next).toHaveClass("next-class");
    expect(ellipsis).toHaveClass("ellipsis-class");
    expect(link).toHaveAttribute("target", "_self");
    expect(ellipsis).toHaveAttribute("title", "생략된 페이지");
  });
});

import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders a visible title and description with a visual-only icon", () => {
    render(
      <EmptyState.Root>
        <EmptyState.Icon>□</EmptyState.Icon>
        <EmptyState.Title>프로젝트가 없습니다</EmptyState.Title>
        <EmptyState.Description>새 프로젝트를 만들어 작업을 시작하세요.</EmptyState.Description>
      </EmptyState.Root>,
    );

    expect(screen.getByRole("heading", { name: "프로젝트가 없습니다" })).toBeInTheDocument();
    expect(screen.getByText("새 프로젝트를 만들어 작업을 시작하세요.")).toBeInTheDocument();
    expect(screen.getByText("□")).toHaveAttribute("aria-hidden", "true");
  });

  it("preserves actions composed by the consumer", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();

    render(
      <EmptyState.Root>
        <EmptyState.Title>프로젝트가 없습니다</EmptyState.Title>
        <EmptyState.Actions>
          <button type="button" onClick={onCreate}>
            새 프로젝트 만들기
          </button>
        </EmptyState.Actions>
      </EmptyState.Root>,
    );

    await user.click(screen.getByRole("button", { name: "새 프로젝트 만들기" }));

    expect(onCreate).toHaveBeenCalledTimes(1);
  });

  it("forwards refs, native props, and consumer class names for every section", () => {
    const rootRef = createRef<HTMLDivElement>();
    const iconRef = createRef<HTMLSpanElement>();
    const titleRef = createRef<HTMLHeadingElement>();
    const descriptionRef = createRef<HTMLParagraphElement>();
    const actionsRef = createRef<HTMLDivElement>();

    render(
      <EmptyState.Root ref={rootRef} className="root-class" data-testid="empty-root">
        <EmptyState.Icon
          ref={iconRef}
          className="icon-class"
          data-testid="empty-icon"
          title="빈 목록"
        />
        <EmptyState.Title ref={titleRef} className="title-class" data-testid="empty-title">
          프로젝트가 없습니다
        </EmptyState.Title>
        <EmptyState.Description
          ref={descriptionRef}
          className="description-class"
          data-testid="empty-description"
        >
          필터를 초기화하거나 새 프로젝트를 만드세요.
        </EmptyState.Description>
        <EmptyState.Actions ref={actionsRef} className="actions-class" data-testid="empty-actions">
          <button type="button">필터 초기화</button>
        </EmptyState.Actions>
      </EmptyState.Root>,
    );

    const root = screen.getByTestId("empty-root");
    const icon = screen.getByTestId("empty-icon");
    const title = screen.getByTestId("empty-title");
    const description = screen.getByTestId("empty-description");
    const actions = screen.getByTestId("empty-actions");

    expect(rootRef.current).toBe(root);
    expect(iconRef.current).toBe(icon);
    expect(titleRef.current).toBe(title);
    expect(descriptionRef.current).toBe(description);
    expect(actionsRef.current).toBe(actions);
    expect(root).toHaveClass("root-class");
    expect(icon).toHaveClass("icon-class");
    expect(title).toHaveClass("title-class");
    expect(description).toHaveClass("description-class");
    expect(actions).toHaveClass("actions-class");
    expect(icon).toHaveAttribute("title", "빈 목록");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});

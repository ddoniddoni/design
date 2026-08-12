import { createRef } from "react";
import type { FormEvent } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { FilterBar } from "./FilterBar";

describe("FilterBar", () => {
  it("renders a named search landmark while the consumer owns filtering behavior", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((event: FormEvent<HTMLFormElement>) => event.preventDefault());

    render(
      <FilterBar.Root aria-label="프로젝트 필터" onSubmit={onSubmit}>
        <FilterBar.Controls>
          <label htmlFor="project-query">프로젝트 검색</label>
          <input id="project-query" name="query" />
        </FilterBar.Controls>
        <FilterBar.Actions>
          <button type="submit">검색</button>
        </FilterBar.Actions>
      </FilterBar.Root>,
    );

    await user.type(screen.getByLabelText("프로젝트 검색"), "디자인 시스템");
    await user.click(screen.getByRole("button", { name: "검색" }));

    expect(screen.getByRole("search", { name: "프로젝트 필터" })).toBeInTheDocument();
    expect(screen.getByLabelText("프로젝트 검색")).toHaveValue("디자인 시스템");
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("forwards refs, native props, and consumer class names for every section", () => {
    const rootRef = createRef<HTMLFormElement>();
    const controlsRef = createRef<HTMLDivElement>();
    const actionsRef = createRef<HTMLDivElement>();

    render(
      <FilterBar.Root
        ref={rootRef}
        action="/projects"
        className="root-class"
        data-testid="filter-bar-root"
        method="get"
      >
        <FilterBar.Controls
          ref={controlsRef}
          className="controls-class"
          data-testid="filter-bar-controls"
        >
          <input aria-label="프로젝트 검색" name="query" />
        </FilterBar.Controls>
        <FilterBar.Actions
          ref={actionsRef}
          className="actions-class"
          data-testid="filter-bar-actions"
        >
          <button type="submit">검색</button>
        </FilterBar.Actions>
      </FilterBar.Root>,
    );

    const root = screen.getByTestId("filter-bar-root");
    const controls = screen.getByTestId("filter-bar-controls");
    const actions = screen.getByTestId("filter-bar-actions");

    expect(rootRef.current).toBe(root);
    expect(controlsRef.current).toBe(controls);
    expect(actionsRef.current).toBe(actions);
    expect(root).toHaveClass("root-class");
    expect(controls).toHaveClass("controls-class");
    expect(actions).toHaveClass("actions-class");
    expect(root).toHaveAttribute("action", "/projects");
    expect(root).toHaveAttribute("method", "get");
    expect(root).toHaveAttribute("role", "search");
  });
});

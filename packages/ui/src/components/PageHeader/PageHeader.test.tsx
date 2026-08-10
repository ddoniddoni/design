import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  it("renders a semantic page heading with optional actions", () => {
    render(
      <PageHeader.Root>
        <PageHeader.Content>
          <PageHeader.Title>프로젝트</PageHeader.Title>
          <PageHeader.Description>프로젝트 설정과 상태를 관리합니다.</PageHeader.Description>
        </PageHeader.Content>
        <PageHeader.Actions>
          <button type="button">새 프로젝트</button>
        </PageHeader.Actions>
      </PageHeader.Root>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "프로젝트" })).toBeInTheDocument();
    expect(screen.getByText("프로젝트 설정과 상태를 관리합니다.").tagName).toBe("P");
    expect(screen.getByRole("button", { name: "새 프로젝트" })).toBeInTheDocument();
  });

  it("forwards refs, native props, and consumer class names for every section", () => {
    const rootRef = createRef<HTMLElement>();
    const contentRef = createRef<HTMLDivElement>();
    const titleRef = createRef<HTMLHeadingElement>();
    const descriptionRef = createRef<HTMLParagraphElement>();
    const actionsRef = createRef<HTMLDivElement>();

    render(
      <PageHeader.Root ref={rootRef} aria-label="페이지 소개" className="root-class">
        <PageHeader.Content ref={contentRef} className="content-class" data-testid="content">
          <PageHeader.Title ref={titleRef} className="title-class">
            제목
          </PageHeader.Title>
          <PageHeader.Description ref={descriptionRef} className="description-class">
            설명
          </PageHeader.Description>
        </PageHeader.Content>
        <PageHeader.Actions ref={actionsRef} className="actions-class" data-testid="actions" />
      </PageHeader.Root>,
    );

    const root = screen.getByRole("banner", { name: "페이지 소개" });
    const content = screen.getByTestId("content");
    const title = screen.getByRole("heading", { name: "제목" });
    const description = screen.getByText("설명");
    const actions = screen.getByTestId("actions");

    expect(rootRef.current).toBe(root);
    expect(contentRef.current).toBe(content);
    expect(titleRef.current).toBe(title);
    expect(descriptionRef.current).toBe(description);
    expect(actionsRef.current).toBe(actions);
    expect(root).toHaveClass("root-class");
    expect(content).toHaveClass("content-class");
    expect(title).toHaveClass("title-class");
    expect(description).toHaveClass("description-class");
    expect(actions).toHaveClass("actions-class");
  });
});

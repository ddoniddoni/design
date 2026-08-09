import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders compound sections and supports a semantic title through asChild", () => {
    render(
      <Card.Root>
        <Card.Header>
          <Card.Title asChild>
            <h2>프로젝트</h2>
          </Card.Title>
          <Card.Description>프로젝트 설명</Card.Description>
        </Card.Header>
        <Card.Content>본문</Card.Content>
        <Card.Footer>작업 영역</Card.Footer>
      </Card.Root>,
    );

    expect(screen.getByRole("heading", { name: "프로젝트" }).tagName).toBe("H2");
    expect(screen.getByText("프로젝트 설명").tagName).toBe("P");
    expect(screen.getByText("본문")).toBeInTheDocument();
    expect(screen.getByText("작업 영역")).toBeInTheDocument();
  });

  it("forwards refs, native props, and consumer class names", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Card.Root ref={ref} className="consumer-class" data-testid="project-card">
        내용
      </Card.Root>,
    );

    const card = screen.getByTestId("project-card");
    expect(ref.current).toBe(card);
    expect(card).toHaveClass("consumer-class");
  });
});

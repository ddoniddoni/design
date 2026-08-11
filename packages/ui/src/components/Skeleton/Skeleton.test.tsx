import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders a visual-only text placeholder by default", () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton).toHaveAttribute("data-shape", "text");
    expect(skeleton.tagName).toBe("SPAN");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("supports circle and rectangle placeholder shapes", () => {
    render(
      <>
        <Skeleton data-testid="circle" shape="circle" />
        <Skeleton data-testid="rect" shape="rect" />
      </>,
    );

    expect(screen.getByTestId("circle")).toHaveAttribute("data-shape", "circle");
    expect(screen.getByTestId("rect")).toHaveAttribute("data-shape", "rect");
  });

  it("forwards its ref, className, and native props", () => {
    const ref = createRef<HTMLSpanElement>();

    render(
      <Skeleton
        ref={ref}
        className="custom-skeleton"
        data-testid="skeleton"
        data-state="loading"
        style={{ inlineSize: "12rem" }}
        title="프로젝트 정보를 불러오는 중"
      />,
    );

    const skeleton = screen.getByTestId("skeleton");

    expect(ref.current).toBe(skeleton);
    expect(skeleton).toHaveClass("custom-skeleton");
    expect(skeleton).toHaveAttribute("data-state", "loading");
    expect(skeleton).toHaveAttribute("title", "프로젝트 정보를 불러오는 중");
    expect(skeleton.style.getPropertyValue("inline-size")).toBe("12rem");
  });
});

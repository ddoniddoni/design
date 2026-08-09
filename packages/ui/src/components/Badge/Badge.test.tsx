import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders a span with its selected visual state", () => {
    render(
      <Badge size="sm" tone="success" variant="outline">
        완료
      </Badge>,
    );

    const badge = screen.getByText("완료");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveAttribute("data-size", "sm");
    expect(badge).toHaveAttribute("data-tone", "success");
    expect(badge).toHaveAttribute("data-variant", "outline");
  });

  it("marks its dot as decorative", () => {
    render(<Badge dot>새 알림</Badge>);

    const badge = screen.getByText("새 알림");
    expect(badge.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("forwards native props, refs, and class names", () => {
    const ref = createRef<HTMLSpanElement>();

    render(
      <Badge ref={ref} className="consumer-class" title="새로운 항목">
        새 항목
      </Badge>,
    );

    const badge = screen.getByText("새 항목");
    expect(ref.current).toBe(badge);
    expect(badge).toHaveAttribute("title", "새로운 항목");
    expect(badge).toHaveClass("consumer-class");
  });
});

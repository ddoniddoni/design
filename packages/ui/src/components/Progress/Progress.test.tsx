import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("renders a determinate progressbar with normalized semantic values", () => {
    render(<Progress aria-label="파일 업로드 진행률" max={80} size="sm" value={48} />);

    const progress = screen.getByRole("progressbar", { name: "파일 업로드 진행률" });

    expect(progress).toHaveAttribute("aria-valuemin", "0");
    expect(progress).toHaveAttribute("aria-valuemax", "80");
    expect(progress).toHaveAttribute("aria-valuenow", "48");
    expect(progress).toHaveAttribute("data-size", "sm");
    expect(progress).toHaveAttribute("data-state", "determinate");
    expect(progress.firstElementChild).toHaveStyle("--dds-progress-value: 60%");
  });

  it("clamps values to a valid range", () => {
    render(<Progress aria-label="프로젝트 완성도" max={0} value={180} />);

    const progress = screen.getByRole("progressbar", { name: "프로젝트 완성도" });

    expect(progress).toHaveAttribute("aria-valuemax", "100");
    expect(progress).toHaveAttribute("aria-valuenow", "100");
  });

  it("renders an indeterminate progressbar when value is omitted", () => {
    render(<Progress aria-label="파일을 준비하는 중" />);

    const progress = screen.getByRole("progressbar", { name: "파일을 준비하는 중" });

    expect(progress).not.toHaveAttribute("aria-valuenow");
    expect(progress).toHaveAttribute("data-state", "indeterminate");
    expect(progress.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards native props, refs, and consumer class names", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Progress
        ref={ref}
        aria-label="배포 진행률"
        aria-valuetext="배포 단계 3/5 완료"
        className="consumer-class"
        data-testid="progress"
        value={60}
      />,
    );

    const progress = screen.getByTestId("progress");

    expect(ref.current).toBe(progress);
    expect(progress).toHaveClass("consumer-class");
    expect(progress).toHaveAttribute("aria-valuetext", "배포 단계 3/5 완료");
  });
});

import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("announces its default loading label", () => {
    render(<Spinner />);

    expect(screen.getByRole("status", { name: "로딩 중" })).toBeInTheDocument();
  });

  it("uses a custom loading label", () => {
    render(<Spinner label="저장 중" />);

    expect(screen.getByRole("status", { name: "저장 중" })).toBeInTheDocument();
  });

  it("does not expose decorative spinners to assistive technology", () => {
    const { container } = render(<Spinner decorative />);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});

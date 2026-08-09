import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("is available through its associated label and forwards changes", () => {
    const onChange = vi.fn();

    render(
      <>
        <label htmlFor="email">이메일</label>
        <Input id="email" name="email" onChange={onChange} placeholder="name@example.com" />
      </>,
    );

    const input = screen.getByLabelText("이메일");
    fireEvent.change(input, { target: { value: "ddoni@example.com" } });

    expect(input).toHaveValue("ddoni@example.com");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("sets the invalid ARIA state without overriding an explicit native state otherwise", () => {
    const { rerender } = render(<Input aria-label="이메일" invalid />);

    expect(screen.getByLabelText("이메일")).toHaveAttribute("aria-invalid", "true");

    rerender(<Input aria-invalid="grammar" aria-label="이메일" />);
    expect(screen.getByLabelText("이메일")).toHaveAttribute("aria-invalid", "grammar");
  });

  it("preserves disabled and readOnly native behavior", () => {
    render(
      <>
        <Input aria-label="비활성 입력" disabled />
        <Input aria-label="읽기 전용 입력" readOnly value="변경할 수 없음" />
      </>,
    );

    expect(screen.getByLabelText("비활성 입력")).toBeDisabled();
    expect(screen.getByLabelText("읽기 전용 입력")).toHaveAttribute("readonly");
  });

  it("forwards refs, native props, and class names", () => {
    const ref = createRef<HTMLInputElement>();

    render(
      <Input
        ref={ref}
        aria-label="이름"
        className="consumer-class"
        data-testid="name-input"
        required
      />,
    );

    const input = screen.getByTestId("name-input");
    expect(ref.current).toBe(input);
    expect(input).toBeRequired();
    expect(input).toHaveClass("consumer-class");
  });
});

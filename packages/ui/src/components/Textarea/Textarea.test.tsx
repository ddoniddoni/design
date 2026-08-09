import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("is available through its associated label and preserves uncontrolled input", () => {
    const onChange = vi.fn();

    render(
      <>
        <label htmlFor="message">메시지</label>
        <Textarea defaultValue="초안" id="message" onChange={onChange} />
      </>,
    );

    const textarea = screen.getByLabelText("메시지");
    fireEvent.change(textarea, { target: { value: "수정한 메시지" } });

    expect(textarea).toHaveValue("수정한 메시지");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("sets invalid ARIA state and defaults to vertical resizing", () => {
    render(<Textarea aria-label="설명" invalid />);

    const textarea = screen.getByLabelText("설명");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAttribute("data-resize", "vertical");
  });

  it("forwards disabled, readOnly, refs, and native props", () => {
    const ref = createRef<HTMLTextAreaElement>();

    render(
      <Textarea
        ref={ref}
        aria-label="읽기 전용 설명"
        className="consumer-class"
        data-testid="description"
        disabled
        name="description"
        readOnly
      />,
    );

    const textarea = screen.getByTestId("description");
    expect(ref.current).toBe(textarea);
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute("readonly");
    expect(textarea).toHaveAttribute("name", "description");
    expect(textarea).toHaveClass("consumer-class");
  });
});

import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import type { CheckboxCheckedState } from "./Checkbox";
import { Checkbox } from "./Checkbox";

function ControlledCheckbox() {
  const [checked, setChecked] = useState<CheckboxCheckedState>(false);

  return <Checkbox aria-label="제어된 동의" checked={checked} onCheckedChange={setChecked} />;
}

describe("Checkbox", () => {
  it("toggles uncontrolled state with pointer and keyboard interaction", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox aria-label="이용약관 동의" onCheckedChange={onCheckedChange} />);

    const checkbox = screen.getByRole("checkbox", { name: "이용약관 동의" });
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);

    checkbox.focus();
    await user.keyboard(" ");
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
    expect(onCheckedChange).toHaveBeenLastCalledWith(false);
  });

  it("supports controlled and indeterminate states", () => {
    const { rerender } = render(<ControlledCheckbox />);
    const checkbox = screen.getByRole("checkbox", { name: "제어된 동의" });

    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");

    rerender(<Checkbox aria-label="부분 선택" checked="indeterminate" />);
    expect(screen.getByRole("checkbox", { name: "부분 선택" })).toHaveAttribute(
      "data-state",
      "indeterminate",
    );
  });

  it("respects disabled state and works with a native label", () => {
    const onCheckedChange = vi.fn();

    render(
      <>
        <Checkbox aria-label="비활성 동의" disabled onCheckedChange={onCheckedChange} />
        <Checkbox id="newsletter" />
        <label htmlFor="newsletter">뉴스레터 수신 동의</label>
      </>,
    );

    const disabledCheckbox = screen.getByRole("checkbox", { name: "비활성 동의" });
    fireEvent.click(disabledCheckbox);
    expect(disabledCheckbox).toBeDisabled();
    expect(onCheckedChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText("뉴스레터 수신 동의"));
    expect(screen.getByRole("checkbox", { name: "뉴스레터 수신 동의" })).toHaveAttribute(
      "data-state",
      "checked",
    );
  });

  it("forwards form-related props to Radix", () => {
    render(
      <form data-testid="terms-form">
        <Checkbox aria-label="약관 동의" defaultChecked name="terms" required value="accepted" />
      </form>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "약관 동의" });
    const formInput = screen.getByTestId("terms-form").querySelector("input[name=terms]");
    expect(formInput).not.toBeNull();
    expect(formInput).toBeRequired();
    expect(formInput).toHaveAttribute("value", "accepted");
    expect(formInput).toBeChecked();
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });
});

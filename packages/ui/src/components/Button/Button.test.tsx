import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("uses button as its default type and calls the click handler", () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>저장</Button>);

    const button = screen.getByRole("button", { name: "저장" });
    expect(button).toHaveAttribute("type", "button");

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call the click handler when disabled", () => {
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        저장
      </Button>,
    );

    const button = screen.getByRole("button", { name: "저장" });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("prevents duplicate actions while loading", () => {
    const onClick = vi.fn();

    render(
      <Button loading onClick={onClick}>
        저장
      </Button>,
    );

    const button = screen.getByRole("button", { name: "저장" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards native props, refs, and class names", () => {
    const ref = createRef<HTMLButtonElement>();

    render(
      <Button ref={ref} className="consumer-class" form="account-form" name="save">
        저장
      </Button>,
    );

    const button = screen.getByRole("button", { name: "저장" });
    expect(ref.current).toBe(button);
    expect(button).toHaveAttribute("form", "account-form");
    expect(button).toHaveAttribute("name", "save");
    expect(button).toHaveClass("consumer-class");
  });
});

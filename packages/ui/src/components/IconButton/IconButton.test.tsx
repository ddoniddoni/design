import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("uses its aria-label as the accessible name", () => {
    render(<IconButton aria-label="메뉴 열기" icon={<svg />} />);

    const button = screen.getByRole("button", { name: "메뉴 열기" });
    expect(button).toHaveAttribute("type", "button");
    expect(button.querySelector("svg")?.parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("prevents clicks while loading", () => {
    const onClick = vi.fn();

    render(<IconButton aria-label="메뉴 열기" icon={<svg />} loading onClick={onClick} />);

    const button = screen.getByRole("button", { name: "메뉴 열기" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});

import { createRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Switch } from "./Switch";

function ControlledSwitch() {
  const [checked, setChecked] = useState(false);

  return <Switch aria-label="제어된 알림" checked={checked} onCheckedChange={setChecked} />;
}

describe("Switch", () => {
  it("toggles uncontrolled state with pointer and keyboard interaction", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();

    render(<Switch aria-label="프로젝트 알림" onCheckedChange={onCheckedChange} />);

    const toggle = screen.getByRole("switch", { name: "프로젝트 알림" });

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(toggle).toHaveAttribute("data-state", "checked");
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);

    toggle.focus();
    await user.keyboard(" ");
    expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(onCheckedChange).toHaveBeenLastCalledWith(false);
  });

  it("supports controlled state", () => {
    render(<ControlledSwitch />);

    const toggle = screen.getByRole("switch", { name: "제어된 알림" });
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("data-state", "checked");
  });

  it("respects disabled state and works with a native label", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();

    render(
      <>
        <Switch aria-label="비활성 알림" disabled onCheckedChange={onCheckedChange} />
        <Switch id="weekly-digest" />
        <label htmlFor="weekly-digest">주간 요약 메일</label>
      </>,
    );

    const disabledSwitch = screen.getByRole("switch", { name: "비활성 알림" });
    await user.click(disabledSwitch);
    expect(disabledSwitch).toBeDisabled();
    expect(onCheckedChange).not.toHaveBeenCalled();

    await user.click(screen.getByText("주간 요약 메일"));
    expect(screen.getByRole("switch", { name: "주간 요약 메일" })).toHaveAttribute(
      "data-state",
      "checked",
    );
  });

  it("forwards form props, ref, native props, and consumer class names", () => {
    const ref = createRef<HTMLButtonElement>();

    render(
      <form data-testid="settings-form">
        <Switch
          ref={ref}
          aria-label="이메일 알림"
          className="consumer-class"
          data-testid="email-switch"
          defaultChecked
          name="emailNotifications"
          required
          value="enabled"
        />
      </form>,
    );

    const toggle = screen.getByRole("switch", { name: "이메일 알림" });
    const formInput = screen
      .getByTestId("settings-form")
      .querySelector("input[name=emailNotifications]");

    expect(ref.current).toBe(toggle);
    expect(toggle).toHaveClass("consumer-class");
    expect(toggle).toHaveAttribute("data-testid", "email-switch");
    expect(formInput).not.toBeNull();
    expect(formInput).toBeRequired();
    expect(formInput).toHaveAttribute("value", "enabled");
    expect(formInput).toBeChecked();
  });
});

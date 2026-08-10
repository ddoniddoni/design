import { createRef, useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { RadioGroup } from "./RadioGroup";

function ControlledRadioGroup() {
  const [value, setValue] = useState("team");

  return (
    <RadioGroup.Root aria-label="제어된 공개 범위" value={value} onValueChange={setValue}>
      <RadioGroup.Item id="controlled-team" value="team" />
      <label htmlFor="controlled-team">팀 전용</label>
      <RadioGroup.Item id="controlled-public" value="public" />
      <label htmlFor="controlled-public">공개</label>
    </RadioGroup.Root>
  );
}

describe("RadioGroup", () => {
  it("changes uncontrolled value with pointer and arrow-key interaction", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <RadioGroup.Root
        aria-label="프로젝트 공개 범위"
        defaultValue="team"
        onValueChange={onValueChange}
      >
        <RadioGroup.Item id="team" value="team" />
        <label htmlFor="team">팀 전용</label>
        <RadioGroup.Item id="public" value="public" />
        <label htmlFor="public">공개</label>
      </RadioGroup.Root>,
    );

    const team = screen.getByRole("radio", { name: "팀 전용" });
    const publicOption = screen.getByRole("radio", { name: "공개" });

    expect(team).toBeChecked();
    await user.click(publicOption);
    expect(publicOption).toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith("public");

    publicOption.focus();
    fireEvent.keyDown(publicOption, { key: "ArrowUp" });
    await waitFor(() => expect(team).toBeChecked());
    fireEvent.keyUp(team, { key: "ArrowUp" });
    await waitFor(() => expect(onValueChange).toHaveBeenLastCalledWith("team"));
  });

  it("supports controlled state and ignores disabled options", () => {
    const onValueChange = vi.fn();

    render(
      <>
        <ControlledRadioGroup />
        <RadioGroup.Root
          aria-label="비활성 공개 범위"
          defaultValue="team"
          onValueChange={onValueChange}
        >
          <RadioGroup.Item id="disabled-team" value="team" />
          <label htmlFor="disabled-team">팀 전용 선택</label>
          <RadioGroup.Item disabled id="disabled-public" value="public" />
          <label htmlFor="disabled-public">공개 선택</label>
        </RadioGroup.Root>
      </>,
    );

    fireEvent.click(screen.getByRole("radio", { name: "공개" }));
    expect(screen.getByRole("radio", { name: "공개" })).toBeChecked();

    const disabledOption = screen.getByRole("radio", { name: "공개 선택" });
    fireEvent.click(disabledOption);
    expect(disabledOption).toBeDisabled();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("forwards form props, refs, native props, and consumer class names", () => {
    const rootRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLButtonElement>();

    render(
      <form data-testid="visibility-form">
        <RadioGroup.Root
          ref={rootRef}
          aria-label="공개 범위"
          className="root-class"
          data-testid="visibility-group"
          defaultValue="team"
          name="visibility"
          required
        >
          <RadioGroup.Item
            ref={itemRef}
            className="item-class"
            data-testid="team-option"
            id="team-option"
            value="team"
          />
          <label htmlFor="team-option">팀 전용 범위</label>
        </RadioGroup.Root>
      </form>,
    );

    const group = screen.getByRole("radiogroup", { name: "공개 범위" });
    const option = screen.getByRole("radio", { name: "팀 전용 범위" });
    const formInput = screen.getByTestId("visibility-form").querySelector("input[name=visibility]");

    expect(rootRef.current).toBe(group);
    expect(itemRef.current).toBe(option);
    expect(group).toHaveClass("root-class");
    expect(group).toHaveAttribute("data-testid", "visibility-group");
    expect(option).toHaveClass("item-class");
    expect(option).toHaveAttribute("data-testid", "team-option");
    expect(formInput).not.toBeNull();
    expect(formInput).toBeRequired();
    expect(formInput).toHaveAttribute("value", "team");
    expect(formInput).toBeChecked();
  });
});

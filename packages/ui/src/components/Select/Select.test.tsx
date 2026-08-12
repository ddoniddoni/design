import { createRef, useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Select } from "./Select";

function ProjectScopeOptions() {
  return (
    <>
      <Select.Group>
        <Select.Label>프로젝트 공개 범위</Select.Label>
        <Select.Item value="team">팀 전용</Select.Item>
        <Select.Item value="public">공개</Select.Item>
        <Select.Item disabled value="private">
          비공개
        </Select.Item>
      </Select.Group>
      <Select.Separator />
      <Select.Group>
        <Select.Label>초대</Select.Label>
        <Select.Item value="invite">초대받은 사용자</Select.Item>
      </Select.Group>
    </>
  );
}

function SelectFixture({ onValueChange = vi.fn() }: { onValueChange?: (value: string) => void }) {
  return (
    <Select.Root defaultValue="team" name="visibility" onValueChange={onValueChange}>
      <label htmlFor="project-scope">프로젝트 공개 범위</label>
      <Select.Trigger id="project-scope">
        <Select.Value placeholder="공개 범위를 선택하세요" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.Viewport>
            <ProjectScopeOptions />
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

function ControlledSelect() {
  const [value, setValue] = useState("team");

  return (
    <Select.Root value={value} onValueChange={setValue}>
      <label htmlFor="controlled-scope">제어된 공개 범위</label>
      <Select.Trigger id="controlled-scope">
        <Select.Value placeholder="공개 범위를 선택하세요" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="team">팀 전용</Select.Item>
            <Select.Item value="public">공개</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

describe("Select", () => {
  it("opens in a portal, selects an option, and ignores disabled options", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { container } = render(<SelectFixture onValueChange={onValueChange} />);

    const trigger = screen.getByRole("combobox", { name: "프로젝트 공개 범위" });
    await user.click(trigger);

    const listbox = await screen.findByRole("listbox");
    expect(container).not.toContainElement(listbox);

    const disabledOption = screen.getByRole("option", { name: "비공개" });
    expect(disabledOption).toHaveAttribute("data-disabled", "");
    await user.click(disabledOption);
    expect(onValueChange).not.toHaveBeenCalled();

    await user.click(screen.getByRole("option", { name: "공개" }));
    expect(onValueChange).toHaveBeenLastCalledWith("public");
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    expect(trigger).toHaveTextContent("공개");
  });

  it("supports keyboard navigation, controlled state, and Escape focus restore", async () => {
    const user = userEvent.setup();
    render(<ControlledSelect />);

    const trigger = screen.getByRole("combobox", { name: "제어된 공개 범위" });
    await user.click(trigger);
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    await waitFor(() => expect(trigger).toHaveTextContent("공개"));
    expect(trigger).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("forwards form props, refs, native props, and consumer class names", () => {
    const triggerRef = createRef<HTMLButtonElement>();
    const valueRef = createRef<HTMLSpanElement>();
    const iconRef = createRef<HTMLSpanElement>();
    const contentRef = createRef<HTMLDivElement>();
    const viewportRef = createRef<HTMLDivElement>();
    const groupRef = createRef<HTMLDivElement>();
    const labelRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLDivElement>();
    const separatorRef = createRef<HTMLDivElement>();

    render(
      <form data-testid="visibility-form">
        <Select.Root defaultValue="team" name="visibility" required>
          <label htmlFor="visibility-select">공개 범위</label>
          <Select.Trigger
            ref={triggerRef}
            className="trigger-class"
            data-testid="select-trigger"
            id="visibility-select"
          >
            <Select.Value ref={valueRef} className="value-class" data-testid="select-value" />
            <Select.Icon ref={iconRef} className="icon-class" data-testid="select-icon" />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              ref={contentRef}
              className="content-class"
              data-testid="select-content"
              forceMount
            >
              <Select.Viewport
                ref={viewportRef}
                className="viewport-class"
                data-testid="select-viewport"
              >
                <Select.Group ref={groupRef} className="group-class" data-testid="select-group">
                  <Select.Label ref={labelRef} className="label-class" data-testid="select-label">
                    공개 범위
                  </Select.Label>
                  <Select.Item
                    ref={itemRef}
                    className="item-class"
                    data-testid="select-item"
                    value="team"
                  >
                    팀 전용
                  </Select.Item>
                </Select.Group>
                <Select.Separator
                  ref={separatorRef}
                  className="separator-class"
                  data-testid="select-separator"
                />
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </form>,
    );

    const trigger = screen.getByTestId("select-trigger");
    const value = screen.getByTestId("select-value");
    const icon = screen.getByTestId("select-icon");
    const content = screen.getByTestId("select-content");
    const viewport = screen.getByTestId("select-viewport");
    const group = screen.getByTestId("select-group");
    const label = screen.getByTestId("select-label");
    const item = screen.getByTestId("select-item");
    const separator = screen.getByTestId("select-separator");
    const formSelect = screen
      .getByTestId("visibility-form")
      .querySelector("select[name=visibility]");

    expect(triggerRef.current).toBe(trigger);
    expect(valueRef.current).toBe(value);
    expect(iconRef.current).toBe(icon);
    expect(contentRef.current).toBe(content);
    expect(viewportRef.current).toBe(viewport);
    expect(groupRef.current).toBe(group);
    expect(labelRef.current).toBe(label);
    expect(itemRef.current).toBe(item);
    expect(separatorRef.current).toBe(separator);
    expect(trigger).toHaveClass("trigger-class");
    expect(trigger).toHaveAttribute("type", "button");
    expect(value).toHaveClass("value-class");
    expect(icon).toHaveClass("icon-class");
    expect(content).toHaveClass("content-class");
    expect(viewport).toHaveClass("viewport-class");
    expect(group).toHaveClass("group-class");
    expect(label).toHaveClass("label-class");
    expect(item).toHaveClass("item-class");
    expect(separator).toHaveClass("separator-class");
    expect(formSelect).not.toBeNull();
    expect(formSelect).toBeRequired();
    expect(formSelect).toHaveValue("team");
  });

  it("keeps a disabled root unavailable for interaction", () => {
    const onValueChange = vi.fn();

    render(
      <Select.Root disabled onValueChange={onValueChange}>
        <Select.Trigger aria-label="비활성 공개 범위">
          <Select.Value placeholder="공개 범위를 선택하세요" />
          <Select.Icon />
        </Select.Trigger>
      </Select.Root>,
    );

    const trigger = screen.getByRole("combobox", { name: "비활성 공개 범위" });
    fireEvent.click(trigger);

    expect(trigger).toBeDisabled();
    expect(onValueChange).not.toHaveBeenCalled();
  });
});

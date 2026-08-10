import { createRef, useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Tabs } from "./Tabs";

function ControlledTabs() {
  const [value, setValue] = useState("overview");

  return (
    <Tabs.Root value={value} onValueChange={setValue}>
      <Tabs.List aria-label="제어된 프로젝트 설정">
        <Tabs.Trigger value="overview">개요</Tabs.Trigger>
        <Tabs.Trigger value="members">멤버</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">프로젝트 개요</Tabs.Content>
      <Tabs.Content value="members">프로젝트 멤버</Tabs.Content>
    </Tabs.Root>
  );
}

describe("Tabs", () => {
  it("changes an uncontrolled tab with pointer and arrow-key interaction", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Tabs.Root defaultValue="overview" onValueChange={onValueChange}>
        <Tabs.List aria-label="프로젝트 설정">
          <Tabs.Trigger value="overview">개요</Tabs.Trigger>
          <Tabs.Trigger value="members">멤버</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">프로젝트 개요</Tabs.Content>
        <Tabs.Content value="members">프로젝트 멤버</Tabs.Content>
      </Tabs.Root>,
    );

    const overview = screen.getByRole("tab", { name: "개요" });
    const members = screen.getByRole("tab", { name: "멤버" });

    expect(overview).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("프로젝트 개요");

    await user.click(members);
    expect(members).toHaveAttribute("aria-selected", "true");
    expect(onValueChange).toHaveBeenLastCalledWith("members");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("프로젝트 멤버");

    members.focus();
    await user.keyboard("{ArrowLeft}");
    await waitFor(() => expect(overview).toHaveAttribute("aria-selected", "true"));
    await waitFor(() => expect(onValueChange).toHaveBeenLastCalledWith("overview"));
  });

  it("supports controlled state and ignores disabled triggers", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <>
        <ControlledTabs />
        <Tabs.Root defaultValue="overview" onValueChange={onValueChange}>
          <Tabs.List aria-label="비활성 프로젝트 설정">
            <Tabs.Trigger value="overview">비활성 개요</Tabs.Trigger>
            <Tabs.Trigger disabled value="members">
              비활성 멤버
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview">비활성 프로젝트 개요</Tabs.Content>
          <Tabs.Content value="members">비활성 프로젝트 멤버</Tabs.Content>
        </Tabs.Root>
      </>,
    );

    await user.click(screen.getByRole("tab", { name: "멤버" }));
    expect(screen.getByRole("tab", { name: "멤버" })).toHaveAttribute("aria-selected", "true");

    const disabledTrigger = screen.getByRole("tab", { name: "비활성 멤버" });
    await user.click(disabledTrigger);
    expect(disabledTrigger).toBeDisabled();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("forwards refs, native props, and consumer class names for every section", () => {
    const rootRef = createRef<HTMLDivElement>();
    const listRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();

    render(
      <Tabs.Root
        ref={rootRef}
        className="root-class"
        data-testid="tabs-root"
        defaultValue="overview"
      >
        <Tabs.List
          ref={listRef}
          aria-label="프로젝트 탭"
          className="list-class"
          data-testid="tabs-list"
        >
          <Tabs.Trigger
            ref={triggerRef}
            className="trigger-class"
            data-testid="overview-trigger"
            value="overview"
          >
            개요 탭
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          ref={contentRef}
          className="content-class"
          data-testid="overview-content"
          value="overview"
        >
          프로젝트 개요 내용
        </Tabs.Content>
      </Tabs.Root>,
    );

    const root = screen.getByTestId("tabs-root");
    const list = screen.getByRole("tablist", { name: "프로젝트 탭" });
    const trigger = screen.getByRole("tab", { name: "개요 탭" });
    const content = screen.getByRole("tabpanel");

    expect(rootRef.current).toBe(root);
    expect(listRef.current).toBe(list);
    expect(triggerRef.current).toBe(trigger);
    expect(contentRef.current).toBe(content);
    expect(root).toHaveClass("root-class");
    expect(list).toHaveClass("list-class");
    expect(trigger).toHaveClass("trigger-class");
    expect(content).toHaveClass("content-class");
    expect(trigger).toHaveAttribute("data-testid", "overview-trigger");
    expect(content).toHaveAttribute("data-testid", "overview-content");
  });
});

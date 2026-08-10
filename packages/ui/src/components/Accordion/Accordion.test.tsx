import { createRef, useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Accordion } from "./Accordion";

function ControlledAccordion() {
  const [value, setValue] = useState("details");

  return (
    <Accordion.Root collapsible type="single" value={value} onValueChange={setValue}>
      <Accordion.Item value="details">
        <Accordion.Header>
          <Accordion.Trigger>프로젝트 상세</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>프로젝트 기본 정보입니다.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="notifications">
        <Accordion.Header>
          <Accordion.Trigger>알림</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>프로젝트 알림 설정입니다.</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

describe("Accordion", () => {
  it("changes an uncontrolled single accordion with pointer and arrow-key interaction", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Accordion.Root defaultValue="details" type="single" onValueChange={onValueChange}>
        <Accordion.Item value="details">
          <Accordion.Header>
            <Accordion.Trigger>프로젝트 상세</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>프로젝트 기본 정보입니다.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="notifications">
          <Accordion.Header>
            <Accordion.Trigger>알림</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>프로젝트 알림 설정입니다.</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    const details = screen.getByRole("button", { name: "프로젝트 상세" });
    const notifications = screen.getByRole("button", { name: "알림" });

    expect(details).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("프로젝트 기본 정보입니다.")).toBeVisible();

    await user.click(notifications);
    expect(notifications).toHaveAttribute("aria-expanded", "true");
    expect(details).toHaveAttribute("aria-expanded", "false");
    expect(onValueChange).toHaveBeenLastCalledWith("notifications");

    notifications.focus();
    await user.keyboard("{ArrowUp}");
    await waitFor(() => expect(details).toHaveFocus());
  });

  it("supports controlled and multiple values while ignoring disabled items", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <>
        <ControlledAccordion />
        <Accordion.Root defaultValue={["first"]} type="multiple" onValueChange={onValueChange}>
          <Accordion.Item value="first">
            <Accordion.Header>
              <Accordion.Trigger>첫 번째 항목</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>첫 번째 내용</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="second">
            <Accordion.Header>
              <Accordion.Trigger>두 번째 항목</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>두 번째 내용</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item disabled value="disabled">
            <Accordion.Header>
              <Accordion.Trigger>비활성 항목</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>비활성 내용</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </>,
    );

    await user.click(screen.getByRole("button", { name: "알림" }));
    expect(screen.getByRole("button", { name: "알림" })).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: "두 번째 항목" }));
    expect(screen.getByRole("button", { name: "첫 번째 항목" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("button", { name: "두 번째 항목" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(onValueChange).toHaveBeenLastCalledWith(["first", "second"]);

    const disabledTrigger = screen.getByRole("button", { name: "비활성 항목" });
    await user.click(disabledTrigger);
    expect(disabledTrigger).toBeDisabled();
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it("forwards refs, native props, and consumer class names for every section", () => {
    const rootRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLDivElement>();
    const headerRef = createRef<HTMLHeadingElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();

    render(
      <Accordion.Root
        ref={rootRef}
        className="root-class"
        data-testid="accordion-root"
        defaultValue="details"
        type="single"
      >
        <Accordion.Item
          ref={itemRef}
          className="item-class"
          data-testid="accordion-item"
          value="details"
        >
          <Accordion.Header ref={headerRef} className="header-class" data-testid="accordion-header">
            <Accordion.Trigger
              ref={triggerRef}
              className="trigger-class"
              data-testid="accordion-trigger"
            >
              프로젝트 상세 항목
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            ref={contentRef}
            className="content-class"
            data-testid="accordion-content"
          >
            프로젝트 상세 내용
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    const root = screen.getByTestId("accordion-root");
    const item = screen.getByTestId("accordion-item");
    const header = screen.getByTestId("accordion-header");
    const trigger = screen.getByRole("button", { name: "프로젝트 상세 항목" });
    const content = screen.getByTestId("accordion-content");

    expect(rootRef.current).toBe(root);
    expect(itemRef.current).toBe(item);
    expect(headerRef.current).toBe(header);
    expect(triggerRef.current).toBe(trigger);
    expect(contentRef.current).toBe(content);
    expect(root).toHaveClass("root-class");
    expect(item).toHaveClass("item-class");
    expect(header).toHaveClass("header-class");
    expect(trigger).toHaveClass("trigger-class");
    expect(content).toHaveClass("content-class");
  });
});

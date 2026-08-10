import { createRef, useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover } from "./Popover";

function PopoverFixture() {
  return (
    <Popover.Root>
      <Popover.Trigger>공유 옵션</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content aria-label="공유 옵션 패널">
          프로젝트 링크를 공유할 수 있습니다.
          <Popover.Close>닫기</Popover.Close>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function ControlledPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>제어된 Popover 열기</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content aria-label="제어된 Popover">제어된 상태입니다.</Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

describe("Popover", () => {
  it("opens in a portal from its trigger and supports the close action", async () => {
    const user = userEvent.setup();
    const { container } = render(<PopoverFixture />);

    const trigger = screen.getByRole("button", { name: "공유 옵션" });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");

    await user.click(trigger);

    const popover = await screen.findByRole("dialog", { name: "공유 옵션 패널" });
    expect(popover).toHaveTextContent("프로젝트 링크를 공유할 수 있습니다.");
    expect(container).not.toContainElement(popover);

    await user.click(screen.getByRole("button", { name: "닫기" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "공유 옵션 패널" })).not.toBeInTheDocument();
    });
  });

  it("supports controlled state, Escape dismissal, and trigger focus restore", async () => {
    const user = userEvent.setup();
    render(<ControlledPopover />);

    const trigger = screen.getByRole("button", { name: "제어된 Popover 열기" });
    await user.click(trigger);
    expect(await screen.findByRole("dialog", { name: "제어된 Popover" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "제어된 Popover" })).not.toBeInTheDocument();
    });
    expect(trigger).toHaveFocus();
  });

  it("forwards refs, native props, and consumer class names", async () => {
    const anchorRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();
    const closeRef = createRef<HTMLButtonElement>();
    const arrowRef = createRef<SVGSVGElement>();

    render(
      <Popover.Root defaultOpen>
        <Popover.Anchor ref={anchorRef} className="anchor-class" data-testid="popover-anchor" />
        <Popover.Trigger ref={triggerRef} className="trigger-class" data-testid="popover-trigger">
          Popover 열기
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            ref={contentRef}
            aria-label="속성 전달 Popover"
            className="content-class"
            data-testid="popover-content"
          >
            내용
            <Popover.Close ref={closeRef} className="close-class" data-testid="popover-close">
              닫기
            </Popover.Close>
            <Popover.Arrow ref={arrowRef} className="arrow-class" data-testid="popover-arrow" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>,
    );

    const anchor = screen.getByTestId("popover-anchor");
    const trigger = screen.getByTestId("popover-trigger");
    const content = await screen.findByTestId("popover-content");
    const close = screen.getByTestId("popover-close");
    const arrow = screen.getByTestId("popover-arrow");

    expect(anchorRef.current).toBe(anchor);
    expect(triggerRef.current).toBe(trigger);
    expect(contentRef.current).toBe(content);
    expect(closeRef.current).toBe(close);
    expect(arrowRef.current).toBe(arrow);
    expect(anchor).toHaveClass("anchor-class");
    expect(trigger).toHaveClass("trigger-class");
    expect(content).toHaveClass("content-class");
    expect(close).toHaveClass("close-class");
    expect(arrow).toHaveClass("arrow-class");
  });
});

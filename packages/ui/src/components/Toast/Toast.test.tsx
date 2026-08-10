import { createRef, useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Toast } from "./Toast";

function ControlledToast() {
  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider duration={60_000}>
      <button type="button" onClick={() => setOpen(true)}>
        Toast 표시
      </button>
      <Toast.Root open={open} onOpenChange={setOpen} type="background">
        <Toast.Title>제어된 알림</Toast.Title>
        <Toast.Description>외부 상태로 표시 여부를 제어합니다.</Toast.Description>
        <Toast.Close aria-label="제어된 알림 닫기">닫기</Toast.Close>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
}

describe("Toast", () => {
  it("renders a polite notification, supports its action, and closes from the close button", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    const onOpenChange = vi.fn();

    render(
      <Toast.Provider duration={60_000} label="알림">
        <Toast.Root defaultOpen onOpenChange={onOpenChange} tone="success" type="background">
          <Toast.Title>저장 완료</Toast.Title>
          <Toast.Description>프로젝트 설정을 저장했습니다.</Toast.Description>
          <Toast.Action altText="저장 변경을 실행 취소합니다." onClick={onAction}>
            실행 취소
          </Toast.Action>
          <Toast.Close aria-label="알림 닫기">닫기</Toast.Close>
        </Toast.Root>
        <Toast.Viewport label="알림 ({hotkey})" />
      </Toast.Provider>,
    );

    screen.getByRole("region", { name: "알림 (F8)" });
    const toast = screen.getByText("저장 완료").closest("li");
    expect(toast).toHaveAttribute("data-tone", "success");
    expect(toast).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");

    await user.click(screen.getByRole("button", { name: "실행 취소" }));
    expect(onAction).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByText("저장 완료")).not.toBeInTheDocument());
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("supports controlled state, closing, and the viewport keyboard shortcut", async () => {
    const user = userEvent.setup();
    render(<ControlledToast />);

    const trigger = screen.getByRole("button", { name: "Toast 표시" });
    await user.click(trigger);
    expect(await screen.findByText("제어된 알림")).toBeInTheDocument();

    fireEvent.keyDown(document, { code: "F8" });
    expect(screen.getByRole("list")).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "제어된 알림 닫기" }));
    await waitFor(() => expect(screen.queryByText("제어된 알림")).not.toBeInTheDocument());
  });

  it("forwards refs, native props, and consumer class names", () => {
    const viewportRef = createRef<HTMLOListElement>();
    const rootRef = createRef<HTMLLIElement>();
    const titleRef = createRef<HTMLDivElement>();
    const descriptionRef = createRef<HTMLDivElement>();
    const actionRef = createRef<HTMLButtonElement>();
    const closeRef = createRef<HTMLButtonElement>();

    render(
      <Toast.Provider duration={60_000}>
        <Toast.Root
          ref={rootRef}
          className="root-class"
          data-testid="toast-root"
          defaultOpen
          tone="info"
        >
          <Toast.Title ref={titleRef} className="title-class" data-testid="toast-title">
            속성 전달 알림
          </Toast.Title>
          <Toast.Description
            ref={descriptionRef}
            className="description-class"
            data-testid="toast-description"
          >
            설명
          </Toast.Description>
          <Toast.Action
            ref={actionRef}
            altText="알림 작업을 실행합니다."
            className="action-class"
            data-testid="toast-action"
          >
            작업
          </Toast.Action>
          <Toast.Close ref={closeRef} className="close-class" data-testid="toast-close">
            닫기
          </Toast.Close>
        </Toast.Root>
        <Toast.Viewport ref={viewportRef} className="viewport-class" data-testid="toast-viewport" />
      </Toast.Provider>,
    );

    const viewport = screen.getByTestId("toast-viewport");
    const root = screen.getByTestId("toast-root");
    const title = screen.getByTestId("toast-title");
    const description = screen.getByTestId("toast-description");
    const action = screen.getByTestId("toast-action");
    const close = screen.getByTestId("toast-close");

    expect(viewportRef.current).toBe(viewport);
    expect(rootRef.current).toBe(root);
    expect(titleRef.current).toBe(title);
    expect(descriptionRef.current).toBe(description);
    expect(actionRef.current).toBe(action);
    expect(closeRef.current).toBe(close);
    expect(viewport).toHaveClass("viewport-class");
    expect(root).toHaveClass("root-class");
    expect(title).toHaveClass("title-class");
    expect(description).toHaveClass("description-class");
    expect(action).toHaveClass("action-class");
    expect(close).toHaveClass("close-class");
    expect(root).toHaveAttribute("data-tone", "info");
  });
});

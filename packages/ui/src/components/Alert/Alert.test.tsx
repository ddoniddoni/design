import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders a visible title and description with the selected tone", () => {
    render(
      <Alert.Root data-testid="alert-root" tone="warning">
        <Alert.Title>저장하지 않은 변경사항이 있습니다</Alert.Title>
        <Alert.Description>페이지를 나가기 전에 변경사항을 저장하세요.</Alert.Description>
      </Alert.Root>,
    );

    const alert = screen.getByTestId("alert-root");

    expect(
      screen.getByRole("heading", { name: "저장하지 않은 변경사항이 있습니다" }),
    ).toBeInTheDocument();
    expect(screen.getByText("페이지를 나가기 전에 변경사항을 저장하세요.")).toBeInTheDocument();
    expect(alert).toHaveAttribute("data-tone", "warning");
  });

  it("leaves live announcement priority to the consumer", () => {
    render(
      <Alert.Root role="alert">
        <Alert.Title>저장할 수 없습니다</Alert.Title>
        <Alert.Description>필수 입력값을 확인하세요.</Alert.Description>
      </Alert.Root>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("필수 입력값을 확인하세요.");
  });

  it("preserves consumer actions", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(
      <Alert.Root tone="danger">
        <Alert.Title>동기화에 실패했습니다</Alert.Title>
        <Alert.Description>네트워크 연결을 확인한 뒤 다시 시도하세요.</Alert.Description>
        <Alert.Actions>
          <button type="button" onClick={onRetry}>
            다시 시도
          </button>
        </Alert.Actions>
      </Alert.Root>,
    );

    await user.click(screen.getByRole("button", { name: "다시 시도" }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("forwards refs, native props, and consumer class names for every public section", () => {
    const rootRef = createRef<HTMLDivElement>();
    const titleRef = createRef<HTMLHeadingElement>();
    const descriptionRef = createRef<HTMLParagraphElement>();
    const actionsRef = createRef<HTMLDivElement>();

    render(
      <Alert.Root ref={rootRef} aria-live="polite" className="root-class" data-testid="alert-root">
        <Alert.Title ref={titleRef} className="title-class" data-testid="alert-title">
          프로젝트 업데이트
        </Alert.Title>
        <Alert.Description
          ref={descriptionRef}
          className="description-class"
          data-testid="alert-description"
        >
          배포 전 점검 항목이 남아 있습니다.
        </Alert.Description>
        <Alert.Actions ref={actionsRef} className="actions-class" data-testid="alert-actions">
          <button type="button">확인</button>
        </Alert.Actions>
      </Alert.Root>,
    );

    const root = screen.getByTestId("alert-root");
    const title = screen.getByTestId("alert-title");
    const description = screen.getByTestId("alert-description");
    const actions = screen.getByTestId("alert-actions");

    expect(rootRef.current).toBe(root);
    expect(titleRef.current).toBe(title);
    expect(descriptionRef.current).toBe(description);
    expect(actionsRef.current).toBe(actions);
    expect(root).toHaveClass("root-class");
    expect(title).toHaveClass("title-class");
    expect(description).toHaveClass("description-class");
    expect(actions).toHaveClass("actions-class");
    expect(root).toHaveAttribute("aria-live", "polite");
    expect(root).toHaveAttribute("data-tone", "info");
  });
});

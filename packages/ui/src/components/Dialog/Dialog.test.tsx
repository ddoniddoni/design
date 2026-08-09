import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button/Button";
import { Dialog } from "./Dialog";

function DialogFixture() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>열기</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>프로젝트 삭제</Dialog.Title>
            <Dialog.Description>이 작업은 되돌릴 수 없습니다.</Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="ghost">취소</Button>
            </Dialog.Close>
            <Button tone="danger">삭제</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

describe("Dialog", () => {
  it("opens in a portal and connects its title and description", async () => {
    const user = userEvent.setup();
    const { container } = render(<DialogFixture />);

    await user.click(screen.getByRole("button", { name: "열기" }));

    const dialog = await screen.findByRole("dialog", { name: "프로젝트 삭제" });
    expect(dialog).toHaveAccessibleDescription("이 작업은 되돌릴 수 없습니다.");
    expect(container).not.toContainElement(dialog);
  });

  it("closes with Escape and restores focus to its trigger", async () => {
    const user = userEvent.setup();
    render(<DialogFixture />);

    const trigger = screen.getByRole("button", { name: "열기" });
    await user.click(trigger);
    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(trigger).toHaveFocus();
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { DropdownMenu } from "./DropdownMenu";

function DropdownMenuFixture({
  onCheckedChange = vi.fn(),
  onSelect = vi.fn(),
}: {
  onCheckedChange?: (checked: boolean) => void;
  onSelect?: () => void;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>작업 메뉴</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.Label>프로젝트</DropdownMenu.Label>
          <DropdownMenu.Group>
            <DropdownMenu.Item onSelect={onSelect} shortcut="⌘E">
              편집
            </DropdownMenu.Item>
            <DropdownMenu.Item disabled>공유</DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.CheckboxItem onCheckedChange={onCheckedChange}>
            알림 받기
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.RadioGroup value="recent">
            <DropdownMenu.RadioItem value="recent">최근 순</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="name">이름 순</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

describe("DropdownMenu", () => {
  it("opens in a portal, selects enabled items, and ignores disabled items", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const { container } = render(<DropdownMenuFixture onSelect={onSelect} />);

    await user.click(screen.getByRole("button", { name: "작업 메뉴" }));

    const menu = await screen.findByRole("menu");
    expect(container).not.toContainElement(menu);

    await user.click(screen.getByRole("menuitem", { name: "공유" }));
    expect(onSelect).not.toHaveBeenCalled();

    await user.click(screen.getByRole("menuitem", { name: "편집" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("supports checkbox items and returns focus after Escape", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<DropdownMenuFixture onCheckedChange={onCheckedChange} />);

    const trigger = screen.getByRole("button", { name: "작업 메뉴" });
    await user.click(trigger);

    const checkboxItem = await screen.findByRole("menuitemcheckbox", { name: "알림 받기" });
    await user.click(checkboxItem);
    expect(onCheckedChange).toHaveBeenCalledWith(true);

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
    expect(trigger).toHaveFocus();
  });
});

import { useState } from "react";
import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Button } from "../../components/Button/Button";
import { Dialog } from "../../components/Dialog/Dialog";
import { Select } from "../../components/Select/Select";
import { Popover } from "../../components/Popover/Popover";
import { DropdownMenu } from "../../components/DropdownMenu/DropdownMenu";

const teal = {
  "--dds-color-brand-300": "#5eead4",
  "--dds-color-brand-400": "#2dd4bf",
  "--dds-color-brand-500": "#0d8278",
  "--dds-color-brand-600": "#0f766e",
  "--dds-color-brand-700": "#115e59",
  "--dds-color-brand-800": "#134e4a",
} as CSSProperties;

function ThemeIntegration({
  initialTheme = "dark",
}: {
  initialTheme?: "light" | "dark" | "system";
}) {
  const [theme, setTheme] = useState(initialTheme);
  return (
    <section
      data-dds-theme={theme}
      style={{
        ...teal,
        padding: "var(--dds-space-6)",
        color: "var(--dds-color-text-primary)",
        background: "var(--dds-color-bg-canvas)",
      }}
    >
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>테마 전환</Button>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>브랜드 모달 열기</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>브랜드 설정</Dialog.Title>
            <Dialog.Description>하위 테마와 중첩 오버레이를 확인합니다.</Dialog.Description>
            <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              열린 모달 테마 전환
            </Button>
            <Select.Root defaultValue="first">
              <Select.Trigger aria-label="템플릿">
                <Select.Value />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content>
                  <Select.Viewport>
                    <Select.Item value="first">첫 옵션</Select.Item>
                    <Select.Item value="second">둘째 옵션</Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button>공유 설정</Button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content aria-label="공유 설정">
                  <Popover.Close asChild>
                    <Button>공유 완료</Button>
                  </Popover.Close>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Button>추가 작업</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content>
                  <DropdownMenu.Item>이름 변경</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
            <Dialog.Close asChild>
              <Button>모달 닫기</Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

function expectOnTop(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const top = element.ownerDocument.elementFromPoint(
    rect.x + rect.width / 2,
    rect.y + rect.height / 2,
  );
  expect(element.contains(top)).toBe(true);
}

const meta = { title: "Overview/Theme Integration", component: ThemeIntegration } satisfies Meta<
  typeof ThemeIntegration
>;
export default meta;
type Story = StoryObj<typeof meta>;

export const NestedOverlays: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "브랜드 모달 열기" });
    await expect(getComputedStyle(trigger).backgroundColor).toBe("rgb(15, 118, 110)");
    await userEvent.click(trigger);
    const body = within(document.body);
    const dialog = await body.findByRole("dialog", { name: "브랜드 설정" });
    await expect(getComputedStyle(dialog).backgroundColor).toBe("rgb(30, 41, 59)");
    await userEvent.click(body.getByRole("combobox", { name: "템플릿" }));
    const option = await body.findByRole("option", { name: "둘째 옵션" });
    await waitFor(() => expectOnTop(option));
    await userEvent.click(option);
    await expect(body.getByRole("combobox", { name: "템플릿" })).toHaveTextContent("둘째 옵션");
    await userEvent.click(body.getByRole("button", { name: "공유 설정" }));
    const popover = await body.findByRole("dialog", { name: "공유 설정" });
    await expect(getComputedStyle(popover).backgroundColor).toBe("rgb(30, 41, 59)");
    await waitFor(() => expectOnTop(popover));
    await userEvent.click(body.getByRole("button", { name: "공유 완료" }));
    await userEvent.click(body.getByRole("button", { name: "추가 작업" }));
    const item = await body.findByRole("menuitem", { name: "이름 변경" });
    await waitFor(() => expectOnTop(item));
    await userEvent.click(item);
    await userEvent.click(body.getByRole("button", { name: "열린 모달 테마 전환" }));
    await waitFor(() =>
      expect(getComputedStyle(dialog).backgroundColor).toBe("rgb(255, 255, 255)"),
    );
    await userEvent.click(body.getByRole("button", { name: "모달 닫기" }));
    await expect(trigger).toHaveFocus();
    await expect(getComputedStyle(trigger).backgroundColor).toBe("rgb(15, 118, 110)");
  },
};

export const SystemTheme: Story = {
  args: { initialTheme: "system" },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "브랜드 모달 열기" });
    await userEvent.click(trigger);
    const body = within(document.body);
    const dialog = await body.findByRole("dialog", { name: "브랜드 설정" });
    const background = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "rgb(30, 41, 59)"
      : "rgb(255, 255, 255)";
    await expect(getComputedStyle(dialog).backgroundColor).toBe(background);
    await userEvent.click(body.getByRole("button", { name: "모달 닫기" }));
  },
};

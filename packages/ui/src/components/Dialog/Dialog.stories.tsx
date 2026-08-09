import type { Meta, StoryObj } from "@storybook/react-vite";
import { componentDocs } from "../../stories/internal/componentDocs";
import { expect, within } from "storybook/test";
import { Button } from "../Button/Button";
import { Dialog } from "./Dialog";

function ProjectDeleteDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button tone="danger">프로젝트 삭제</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>프로젝트를 삭제할까요?</Dialog.Title>
            <Dialog.Description>삭제한 프로젝트와 데이터는 복구할 수 없습니다.</Dialog.Description>
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

const meta = {
  title: "Components/Overlays/Dialog",
  component: Dialog.Content,
  parameters: {
    a11y: { test: "error" },
    docs: { description: { component: componentDocs.dialog } },
  },
} satisfies Meta<typeof Dialog.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <ProjectDeleteDialog />,
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-dds-theme="dark"
      style={{ backgroundColor: "var(--dds-color-bg-canvas)", padding: "var(--dds-space-4)" }}
    >
      <ProjectDeleteDialog />
    </div>
  ),
};

export const Interaction: Story = {
  render: () => <ProjectDeleteDialog />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "프로젝트 삭제" });

    await userEvent.click(trigger);

    const dialog = await within(document.body).findByRole("dialog", {
      name: "프로젝트를 삭제할까요?",
    });
    await expect(dialog).toHaveAccessibleDescription(
      "삭제한 프로젝트와 데이터는 복구할 수 없습니다.",
    );

    await userEvent.keyboard("{Escape}");
    await expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument();
    await expect(trigger).toHaveFocus();
  },
};

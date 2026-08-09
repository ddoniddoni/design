import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "./Tooltip";

function TooltipFixture() {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger>도움말</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content>
            도움말 내용을 확인하세요.
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

describe("Tooltip", () => {
  it("opens from pointer hover and connects the tooltip to its trigger", async () => {
    const user = userEvent.setup();
    render(<TooltipFixture />);

    const trigger = screen.getByRole("button", { name: "도움말" });
    await user.hover(trigger);

    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent("도움말 내용을 확인하세요.");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
  });

  it("opens from keyboard focus", async () => {
    const user = userEvent.setup();
    render(<TooltipFixture />);

    await user.tab();
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();

    await user.tab();
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });
});

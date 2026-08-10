import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { Input } from "../Input/Input";
import { Field } from "./Field";

describe("Field", () => {
  it("composes a labeled invalid control with native ARIA relationships", () => {
    render(
      <Field.Root data-testid="email-field" invalid>
        <Field.Label htmlFor="email">이메일</Field.Label>
        <Input aria-describedby="email-description email-error" id="email" invalid />
        <Field.Description id="email-description">업무용 주소를 입력하세요.</Field.Description>
        <Field.Error id="email-error">올바른 이메일 주소가 아닙니다.</Field.Error>
      </Field.Root>,
    );

    const input = screen.getByRole("textbox", { name: "이메일" });

    expect(input).toHaveAttribute("aria-describedby", "email-description email-error");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByTestId("email-field")).toHaveAttribute("data-invalid", "true");
    expect(screen.getByText("업무용 주소를 입력하세요.").tagName).toBe("P");
    expect(screen.getByText("올바른 이메일 주소가 아닙니다.").tagName).toBe("P");
  });

  it("forwards refs, native props, state attributes, and consumer class names", () => {
    const rootRef = createRef<HTMLDivElement>();
    const labelRef = createRef<HTMLLabelElement>();
    const descriptionRef = createRef<HTMLParagraphElement>();
    const errorRef = createRef<HTMLParagraphElement>();

    render(
      <Field.Root ref={rootRef} className="consumer-root" data-testid="field" disabled>
        <Field.Label ref={labelRef} className="consumer-label" data-testid="label">
          이름
        </Field.Label>
        <Field.Description ref={descriptionRef} data-testid="description">
          공개 이름입니다.
        </Field.Description>
        <Field.Error ref={errorRef} data-testid="error">
          이름을 입력하세요.
        </Field.Error>
      </Field.Root>,
    );

    expect(rootRef.current).toBe(screen.getByTestId("field"));
    expect(labelRef.current).toBe(screen.getByTestId("label"));
    expect(descriptionRef.current).toBe(screen.getByTestId("description"));
    expect(errorRef.current).toBe(screen.getByTestId("error"));
    expect(rootRef.current).toHaveClass("consumer-root");
    expect(labelRef.current).toHaveClass("consumer-label");
    expect(rootRef.current).toHaveAttribute("data-disabled", "true");
  });
});

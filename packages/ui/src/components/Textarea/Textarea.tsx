import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { classNames } from "../../internal/classNames";
import type { InputSize } from "../Input/Input";
import styles from "./Textarea.module.scss";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: InputSize;
  invalid?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    "aria-invalid": ariaInvalid,
    className,
    invalid = false,
    resize = "vertical",
    size = "md",
    ...props
  },
  ref,
) {
  return (
    <textarea
      {...props}
      ref={ref}
      aria-invalid={invalid || ariaInvalid || undefined}
      className={classNames(styles.root, className)}
      data-invalid={invalid || undefined}
      data-resize={resize}
      data-size={size}
    />
  );
});

Textarea.displayName = "Textarea";

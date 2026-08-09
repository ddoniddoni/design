import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Input.module.scss";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { "aria-invalid": ariaInvalid, className, invalid = false, size = "md", ...props },
  ref,
) {
  return (
    <input
      {...props}
      ref={ref}
      aria-invalid={invalid || ariaInvalid || undefined}
      className={classNames(styles.root, className)}
      data-invalid={invalid || undefined}
      data-size={size}
    />
  );
});

Input.displayName = "Input";

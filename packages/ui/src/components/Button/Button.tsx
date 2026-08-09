import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "../../internal/classNames";
import { Spinner } from "../Spinner/Spinner";
import styles from "./Button.module.scss";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonTone = "primary" | "neutral" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    disabled,
    fullWidth = false,
    leadingIcon,
    loading = false,
    size = "md",
    tone = "primary",
    trailingIcon,
    type = "button",
    variant = "solid",
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      ref={ref}
      aria-busy={loading || undefined}
      className={classNames(styles.root, className)}
      data-full-width={fullWidth || undefined}
      data-size={size}
      data-tone={tone}
      data-variant={variant}
      disabled={isDisabled}
      type={type}
    >
      <span className={styles.content}>
        {leadingIcon ? (
          <span aria-hidden="true" className={styles.icon}>
            {leadingIcon}
          </span>
        ) : null}
        <span>{children}</span>
        {trailingIcon ? (
          <span aria-hidden="true" className={styles.icon}>
            {trailingIcon}
          </span>
        ) : null}
      </span>
      {loading ? <Spinner decorative className={styles.spinner} size="sm" /> : null}
    </button>
  );
});

Button.displayName = "Button";

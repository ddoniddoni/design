import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "../../internal/classNames";
import { Spinner } from "../Spinner/Spinner";
import type { ButtonSize, ButtonTone, ButtonVariant } from "../Button/Button";
import styles from "./IconButton.module.scss";

export interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "color"
> {
  "aria-label": string;
  icon: ReactNode;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  loading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    "aria-label": ariaLabel,
    className,
    disabled,
    icon,
    loading = false,
    size = "md",
    tone = "primary",
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
      aria-label={ariaLabel}
      className={classNames(styles.root, className)}
      data-size={size}
      data-tone={tone}
      data-variant={variant}
      disabled={isDisabled}
      type={type}
    >
      <span aria-hidden="true" className={styles.icon}>
        {icon}
      </span>
      {loading ? <Spinner decorative className={styles.spinner} size="sm" /> : null}
    </button>
  );
});

IconButton.displayName = "IconButton";

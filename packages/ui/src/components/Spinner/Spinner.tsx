import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { VisuallyHidden } from "../../internal/VisuallyHidden";
import { classNames } from "../../internal/classNames";
import styles from "./Spinner.module.scss";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  label?: string;
  decorative?: boolean;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  {
    "aria-label": ariaLabel,
    className,
    decorative = false,
    label = "로딩 중",
    role,
    size = "md",
    ...props
  },
  ref,
) {
  return (
    <span
      {...props}
      ref={ref}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : (ariaLabel ?? label)}
      className={classNames(styles.root, className)}
      data-size={size}
      role={decorative ? undefined : (role ?? "status")}
    >
      <span aria-hidden="true" className={styles.indicator} />
      {decorative ? null : <VisuallyHidden>{label}</VisuallyHidden>}
    </span>
  );
});

Spinner.displayName = "Spinner";

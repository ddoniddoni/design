import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Badge.module.scss";

export type BadgeVariant = "solid" | "soft" | "outline";
export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  tone?: BadgeTone;
  size?: BadgeSize;
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { children, className, dot = false, size = "md", tone = "neutral", variant = "soft", ...props },
  ref,
) {
  return (
    <span
      {...props}
      ref={ref}
      className={classNames(styles.root, className)}
      data-size={size}
      data-tone={tone}
      data-variant={variant}
    >
      {dot ? <span aria-hidden="true" className={styles.dot} /> : null}
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

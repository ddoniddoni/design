import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Skeleton.module.scss";

export type SkeletonShape = "text" | "circle" | "rect";

export interface SkeletonProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "aria-hidden" | "children"
> {
  shape?: SkeletonShape;
}

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  { className, shape = "text", ...props },
  ref,
) {
  return (
    <span
      {...props}
      ref={ref}
      aria-hidden="true"
      className={classNames(styles.root, className)}
      data-shape={shape}
    />
  );
});

Skeleton.displayName = "Skeleton";

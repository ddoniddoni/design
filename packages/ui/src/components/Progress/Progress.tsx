import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Progress.module.scss";

export type ProgressSize = "sm" | "md";

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "role"> {
  max?: number;
  size?: ProgressSize;
  value?: number;
}

function normalizeMax(max: number) {
  return Number.isFinite(max) && max > 0 ? max : 100;
}

function normalizeValue(value: number, max: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(Math.max(value, 0), max);
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { className, max = 100, size = "md", value, ...props },
  ref,
) {
  const resolvedMax = normalizeMax(max);
  const resolvedValue = value === undefined ? undefined : normalizeValue(value, resolvedMax);
  const isIndeterminate = resolvedValue === undefined;
  const indicatorStyle =
    resolvedValue === undefined
      ? undefined
      : ({ "--dds-progress-value": `${(resolvedValue / resolvedMax) * 100}%` } as CSSProperties);

  return (
    <div
      {...props}
      ref={ref}
      aria-valuemax={resolvedMax}
      aria-valuemin={0}
      aria-valuenow={resolvedValue}
      className={classNames(styles.root, className)}
      data-size={size}
      data-state={isIndeterminate ? "indeterminate" : "determinate"}
      role="progressbar"
    >
      <span aria-hidden="true" className={styles.indicator} style={indicatorStyle} />
    </div>
  );
});

Progress.displayName = "Progress";

import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { classNames } from "./classNames";
import styles from "./VisuallyHidden.module.scss";

export type VisuallyHiddenProps = HTMLAttributes<HTMLSpanElement>;

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  function VisuallyHidden({ className, ...props }, ref) {
    return <span {...props} ref={ref} className={classNames(styles.root, className)} />;
  },
);

VisuallyHidden.displayName = "VisuallyHidden";

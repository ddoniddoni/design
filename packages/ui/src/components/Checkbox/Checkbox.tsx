import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { forwardRef } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { classNames } from "../../internal/classNames";
import { CheckIcon } from "../../internal/icons/CheckIcon";
import styles from "./Checkbox.module.scss";

export type CheckboxCheckedState = CheckedState;

export type CheckboxProps = Omit<CheckboxPrimitive.CheckboxProps, "children">;

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { className, ...props },
  ref,
) {
  return (
    <CheckboxPrimitive.Root {...props} ref={ref} className={classNames(styles.root, className)}>
      <CheckboxPrimitive.Indicator className={styles.indicator}>
        <CheckIcon className={styles.icon} />
        <CheckIcon className={styles["indeterminate-icon"]} indeterminate />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = "Checkbox";

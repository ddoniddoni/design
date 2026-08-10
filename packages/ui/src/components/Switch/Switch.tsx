import * as SwitchPrimitive from "@radix-ui/react-switch";
import { forwardRef } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Switch.module.scss";

export type SwitchProps = Omit<SwitchPrimitive.SwitchProps, "children">;

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { className, ...props },
  ref,
) {
  return (
    <SwitchPrimitive.Root {...props} ref={ref} className={classNames(styles.root, className)}>
      <SwitchPrimitive.Thumb className={styles.thumb} />
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = "Switch";

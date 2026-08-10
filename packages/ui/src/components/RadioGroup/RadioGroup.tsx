import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { forwardRef } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./RadioGroup.module.scss";

export type RadioGroupRootProps = RadioGroupPrimitive.RadioGroupProps;
export type RadioGroupItemProps = Omit<RadioGroupPrimitive.RadioGroupItemProps, "children">;

const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupRootProps>(function RadioGroupRoot(
  { className, ...props },
  ref,
) {
  return (
    <RadioGroupPrimitive.Root {...props} ref={ref} className={classNames(styles.root, className)} />
  );
});

const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(function RadioGroupItem(
  { className, ...props },
  ref,
) {
  return (
    <RadioGroupPrimitive.Item {...props} ref={ref} className={classNames(styles.item, className)}>
      <RadioGroupPrimitive.Indicator className={styles.indicator} />
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupRoot.displayName = "RadioGroup.Root";
RadioGroupItem.displayName = "RadioGroup.Item";

export const RadioGroup = {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
};

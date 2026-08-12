import * as SelectPrimitive from "@radix-ui/react-select";
import { forwardRef } from "react";
import { classNames } from "../../internal/classNames";
import { CheckIcon } from "../../internal/icons/CheckIcon";
import styles from "./Select.module.scss";

export type SelectRootProps = SelectPrimitive.SelectProps;
export type SelectTriggerProps = SelectPrimitive.SelectTriggerProps;
export type SelectValueProps = Omit<SelectPrimitive.SelectValueProps, "asChild" | "children">;
export type SelectIconProps = SelectPrimitive.SelectIconProps;
export type SelectPortalProps = SelectPrimitive.SelectPortalProps;
export type SelectContentProps = SelectPrimitive.SelectContentProps;
export type SelectViewportProps = SelectPrimitive.SelectViewportProps;
export type SelectGroupProps = SelectPrimitive.SelectGroupProps;
export type SelectLabelProps = SelectPrimitive.SelectLabelProps;
export type SelectItemProps = SelectPrimitive.SelectItemProps;
export type SelectSeparatorProps = SelectPrimitive.SelectSeparatorProps;

const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger(
  { className, type = "button", ...props },
  ref,
) {
  return (
    <SelectPrimitive.Trigger
      {...props}
      ref={ref}
      className={classNames(styles.trigger, className)}
      type={type}
    />
  );
});

const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(function SelectValue(
  { className, placeholder, ...props },
  ref,
) {
  return (
    <span {...props} ref={ref} className={classNames(styles.value, className)}>
      <SelectPrimitive.Value placeholder={placeholder} />
    </span>
  );
});

const SelectIcon = forwardRef<HTMLSpanElement, SelectIconProps>(function SelectIcon(
  { className, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Icon {...props} ref={ref} className={classNames(styles.icon, className)} />
  );
});

const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  { className, collisionPadding = 16, position = "popper", sideOffset = 8, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Content
      {...props}
      ref={ref}
      className={classNames(styles.content, className)}
      collisionPadding={collisionPadding}
      position={position}
      sideOffset={sideOffset}
    />
  );
});

const SelectViewport = forwardRef<HTMLDivElement, SelectViewportProps>(function SelectViewport(
  { className, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Viewport
      {...props}
      ref={ref}
      className={classNames(styles.viewport, className)}
    />
  );
});

const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(function SelectGroup(
  { className, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Group {...props} ref={ref} className={classNames(styles.group, className)} />
  );
});

const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(function SelectLabel(
  { className, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Label {...props} ref={ref} className={classNames(styles.label, className)} />
  );
});

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { children, className, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Item {...props} ref={ref} className={classNames(styles.item, className)}>
      <SelectPrimitive.ItemText className={styles["item-text"]}>
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className={styles["item-indicator"]}>
        <CheckIcon className={styles["check-icon"]} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(function SelectSeparator(
  { className, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Separator
      {...props}
      ref={ref}
      className={classNames(styles.separator, className)}
    />
  );
});

SelectTrigger.displayName = "Select.Trigger";
SelectValue.displayName = "Select.Value";
SelectIcon.displayName = "Select.Icon";
SelectContent.displayName = "Select.Content";
SelectViewport.displayName = "Select.Viewport";
SelectGroup.displayName = "Select.Group";
SelectLabel.displayName = "Select.Label";
SelectItem.displayName = "Select.Item";
SelectSeparator.displayName = "Select.Separator";

export const Select = {
  Root: SelectPrimitive.Root,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Portal: SelectPrimitive.Portal,
  Content: SelectContent,
  Viewport: SelectViewport,
  Group: SelectGroup,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
};

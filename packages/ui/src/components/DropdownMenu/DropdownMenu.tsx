import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";
import type { ReactNode } from "react";
import { classNames } from "../../internal/classNames";
import { CheckIcon } from "../../internal/icons/CheckIcon";
import styles from "./DropdownMenu.module.scss";

export type DropdownMenuRootProps = DropdownMenuPrimitive.DropdownMenuProps;
export type DropdownMenuTriggerProps = DropdownMenuPrimitive.DropdownMenuTriggerProps;
export type DropdownMenuPortalProps = DropdownMenuPrimitive.DropdownMenuPortalProps;
export type DropdownMenuContentProps = DropdownMenuPrimitive.DropdownMenuContentProps;
export type DropdownMenuGroupProps = DropdownMenuPrimitive.DropdownMenuGroupProps;
export type DropdownMenuLabelProps = DropdownMenuPrimitive.DropdownMenuLabelProps;
export type DropdownMenuSeparatorProps = DropdownMenuPrimitive.DropdownMenuSeparatorProps;
export type DropdownMenuRadioGroupProps = DropdownMenuPrimitive.DropdownMenuRadioGroupProps;
export type DropdownMenuSubProps = DropdownMenuPrimitive.DropdownMenuSubProps;

type DropdownMenuItemOptions = {
  inset?: boolean;
  shortcut?: ReactNode;
  tone?: "default" | "danger";
};

export type DropdownMenuItemProps = DropdownMenuPrimitive.DropdownMenuItemProps &
  DropdownMenuItemOptions;
export type DropdownMenuCheckboxItemProps = DropdownMenuPrimitive.DropdownMenuCheckboxItemProps &
  Pick<DropdownMenuItemOptions, "inset" | "shortcut" | "tone">;
export type DropdownMenuRadioItemProps = DropdownMenuPrimitive.DropdownMenuRadioItemProps &
  Pick<DropdownMenuItemOptions, "inset" | "shortcut" | "tone">;
export type DropdownMenuSubTriggerProps = DropdownMenuPrimitive.DropdownMenuSubTriggerProps &
  Pick<DropdownMenuItemOptions, "inset">;
export type DropdownMenuSubContentProps = DropdownMenuPrimitive.DropdownMenuSubContentProps;

const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  function DropdownMenuContent({ className, sideOffset = 8, ...props }, ref) {
    return (
      <DropdownMenuPrimitive.Content
        {...props}
        ref={ref}
        className={classNames(styles.content, className)}
        sideOffset={sideOffset}
      />
    );
  },
);

const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  function DropdownMenuItem(
    { children, className, inset = false, shortcut, tone = "default", ...props },
    ref,
  ) {
    return (
      <DropdownMenuPrimitive.Item
        {...props}
        ref={ref}
        className={classNames(styles.item, className)}
        data-inset={inset || undefined}
        data-tone={tone}
      >
        <span className={styles.label}>{children}</span>
        {shortcut ? (
          <span aria-hidden="true" className={styles.shortcut}>
            {shortcut}
          </span>
        ) : null}
      </DropdownMenuPrimitive.Item>
    );
  },
);

const DropdownMenuCheckboxItem = forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  function DropdownMenuCheckboxItem(
    { children, className, inset = true, shortcut, tone = "default", ...props },
    ref,
  ) {
    return (
      <DropdownMenuPrimitive.CheckboxItem
        {...props}
        ref={ref}
        className={classNames(styles.item, className)}
        data-inset={inset || undefined}
        data-tone={tone}
      >
        <DropdownMenuPrimitive.ItemIndicator className={styles.indicator}>
          <CheckIcon className={styles.icon} />
        </DropdownMenuPrimitive.ItemIndicator>
        <span className={styles.label}>{children}</span>
        {shortcut ? (
          <span aria-hidden="true" className={styles.shortcut}>
            {shortcut}
          </span>
        ) : null}
      </DropdownMenuPrimitive.CheckboxItem>
    );
  },
);

const DropdownMenuRadioItem = forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  function DropdownMenuRadioItem(
    { children, className, inset = true, shortcut, tone = "default", ...props },
    ref,
  ) {
    return (
      <DropdownMenuPrimitive.RadioItem
        {...props}
        ref={ref}
        className={classNames(styles.item, className)}
        data-inset={inset || undefined}
        data-tone={tone}
      >
        <DropdownMenuPrimitive.ItemIndicator className={styles.indicator}>
          <span aria-hidden="true" className={styles["radio-indicator"]} />
        </DropdownMenuPrimitive.ItemIndicator>
        <span className={styles.label}>{children}</span>
        {shortcut ? (
          <span aria-hidden="true" className={styles.shortcut}>
            {shortcut}
          </span>
        ) : null}
      </DropdownMenuPrimitive.RadioItem>
    );
  },
);

const DropdownMenuLabel = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  function DropdownMenuLabel({ className, ...props }, ref) {
    return (
      <DropdownMenuPrimitive.Label
        {...props}
        ref={ref}
        className={classNames(styles["menu-label"], className)}
      />
    );
  },
);

const DropdownMenuSeparator = forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  function DropdownMenuSeparator({ className, ...props }, ref) {
    return (
      <DropdownMenuPrimitive.Separator
        {...props}
        ref={ref}
        className={classNames(styles.separator, className)}
      />
    );
  },
);

const DropdownMenuSubTrigger = forwardRef<HTMLDivElement, DropdownMenuSubTriggerProps>(
  function DropdownMenuSubTrigger({ children, className, inset = false, ...props }, ref) {
    return (
      <DropdownMenuPrimitive.SubTrigger
        {...props}
        ref={ref}
        className={classNames(styles.item, className)}
        data-inset={inset || undefined}
      >
        <span className={styles.label}>{children}</span>
        <span aria-hidden="true" className={styles["submenu-arrow"]}>
          ›
        </span>
      </DropdownMenuPrimitive.SubTrigger>
    );
  },
);

const DropdownMenuSubContent = forwardRef<HTMLDivElement, DropdownMenuSubContentProps>(
  function DropdownMenuSubContent({ className, sideOffset = 8, ...props }, ref) {
    return (
      <DropdownMenuPrimitive.SubContent
        {...props}
        ref={ref}
        className={classNames(styles["sub-content"], className)}
        sideOffset={sideOffset}
      />
    );
  },
);

DropdownMenuContent.displayName = "DropdownMenu.Content";
DropdownMenuItem.displayName = "DropdownMenu.Item";
DropdownMenuCheckboxItem.displayName = "DropdownMenu.CheckboxItem";
DropdownMenuRadioItem.displayName = "DropdownMenu.RadioItem";
DropdownMenuLabel.displayName = "DropdownMenu.Label";
DropdownMenuSeparator.displayName = "DropdownMenu.Separator";
DropdownMenuSubTrigger.displayName = "DropdownMenu.SubTrigger";
DropdownMenuSubContent.displayName = "DropdownMenu.SubContent";

export const DropdownMenu = {
  Root: DropdownMenuPrimitive.Root,
  Trigger: DropdownMenuPrimitive.Trigger,
  Portal: DropdownMenuPrimitive.Portal,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuPrimitive.RadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Group: DropdownMenuPrimitive.Group,
  Sub: DropdownMenuPrimitive.Sub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
};

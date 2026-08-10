import * as PopoverPrimitive from "@radix-ui/react-popover";
import { forwardRef } from "react";
import { classNames } from "../../internal/classNames";
import styles from "./Popover.module.scss";

export type PopoverRootProps = PopoverPrimitive.PopoverProps;
export type PopoverAnchorProps = PopoverPrimitive.PopoverAnchorProps;
export type PopoverTriggerProps = PopoverPrimitive.PopoverTriggerProps;
export type PopoverPortalProps = PopoverPrimitive.PopoverPortalProps;
export type PopoverContentProps = PopoverPrimitive.PopoverContentProps;
export type PopoverCloseProps = PopoverPrimitive.PopoverCloseProps;
export type PopoverArrowProps = PopoverPrimitive.PopoverArrowProps;

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  { className, collisionPadding = 16, sideOffset = 8, ...props },
  ref,
) {
  return (
    <PopoverPrimitive.Content
      {...props}
      ref={ref}
      className={classNames(styles.content, className)}
      collisionPadding={collisionPadding}
      sideOffset={sideOffset}
    />
  );
});

const PopoverArrow = forwardRef<SVGSVGElement, PopoverArrowProps>(function PopoverArrow(
  { className, ...props },
  ref,
) {
  return (
    <PopoverPrimitive.Arrow {...props} ref={ref} className={classNames(styles.arrow, className)} />
  );
});

PopoverContent.displayName = "Popover.Content";
PopoverArrow.displayName = "Popover.Arrow";

export const Popover = {
  Root: PopoverPrimitive.Root,
  Anchor: PopoverPrimitive.Anchor,
  Trigger: PopoverPrimitive.Trigger,
  Portal: PopoverPrimitive.Portal,
  Content: PopoverContent,
  Close: PopoverPrimitive.Close,
  Arrow: PopoverArrow,
};

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { forwardRef } from "react";
import { ThemedPortal } from "../../internal/ThemedPortal";
import { classNames } from "../../internal/classNames";
import styles from "./Tooltip.module.scss";

export type TooltipProviderProps = TooltipPrimitive.TooltipProviderProps;
function TooltipPortal({ children, container, ...props }: TooltipPortalProps) {
  return (
    <ThemedPortal
      container={container}
      render={(content) => (
        <TooltipPrimitive.Portal {...props} container={container}>
          {content}
        </TooltipPrimitive.Portal>
      )}
    >
      {children}
    </ThemedPortal>
  );
}

export type TooltipRootProps = TooltipPrimitive.TooltipProps;
export type TooltipTriggerProps = TooltipPrimitive.TooltipTriggerProps;
export type TooltipPortalProps = TooltipPrimitive.TooltipPortalProps;
export type TooltipContentProps = TooltipPrimitive.TooltipContentProps;
export type TooltipArrowProps = TooltipPrimitive.TooltipArrowProps;

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(function TooltipContent(
  { className, sideOffset = 8, ...props },
  ref,
) {
  return (
    <TooltipPrimitive.Content
      {...props}
      ref={ref}
      className={classNames(styles.content, className)}
      sideOffset={sideOffset}
    />
  );
});

const TooltipArrow = forwardRef<SVGSVGElement, TooltipArrowProps>(function TooltipArrow(
  { className, ...props },
  ref,
) {
  return (
    <TooltipPrimitive.Arrow {...props} ref={ref} className={classNames(styles.arrow, className)} />
  );
});

TooltipContent.displayName = "Tooltip.Content";
TooltipArrow.displayName = "Tooltip.Arrow";

export const Tooltip = {
  Provider: TooltipPrimitive.Provider,
  Root: TooltipPrimitive.Root,
  Trigger: TooltipPrimitive.Trigger,
  Portal: TooltipPortal,
  Content: TooltipContent,
  Arrow: TooltipArrow,
};
